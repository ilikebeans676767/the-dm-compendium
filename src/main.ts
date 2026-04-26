import * as path from "path";
import { App, Notice, Plugin, Editor, FuzzySuggestModal, PluginSettingTab, Setting } from "obsidian";
import { registry } from "./registry";
import { Deployer } from "./deployer";
import {
  DEFAULT_SETTINGS,
  getDefaultIncludedSources,
  normalizeSourceKey,
  SourceInfo,
  SOURCE_LIST,
  ToolkitSettings,
} from "./settings";
import { FormatterItem } from "./formatters/BaseFormatter";
import {
  hasDatabaseCache,
  refreshDatabaseCache,
  refreshSourceFilteredDatabaseCache,
} from "./utils/databaseCache";

const PRIORITY_SOURCE_KEYS = ["PHB", "XPHB", "DMG", "XDMG", "MM", "XMM"];

export default class MyToolkitPlugin extends Plugin {
  settings: ToolkitSettings = DEFAULT_SETTINGS;
  private pluginDir = "";
  private sourceRefreshTimer: ReturnType<typeof setTimeout> | null = null;

  async onload() {
    console.log("[Toolkit] Loading...");

    await this.loadSettings();

    const vaultPath = (this.app.vault.adapter as any).getBasePath() as string;
    this.pluginDir = path.join(vaultPath, this.app.vault.configDir, "plugins", this.manifest.id);

    await this.ensureDatabaseCache();
    this.addSettingTab(new ToolkitSettingTab(this.app, this));

    // ── Global bridge ──────────────────────────────────────────────────────
    // Keeps all formatter logic inside the plugin bundle.
    (globalThis as any).__toolkit = {
      getItems: async (dataType: string): Promise<FormatterItem[]> => {
        const formatter = registry[dataType];
        if (!formatter) {
          console.warn(`[Toolkit] Unknown data type: ${dataType}`);
          return [];
        }
        await this.ensureDatabaseCache();
        const items = await formatter.load(this.pluginDir);
        return this.filterItemsBySource(items);
      },
    };

    // ── Add command for direct insertion ────────────────────────────────────
    this.addCommand({
      id: "insert-from-toolkit",
      name: "Insert from toolkit",
      editorCallback: async (editor: Editor, ctx: any) => {
        await this.insertFromToolkit(editor);
      },
    });

    this.addCommand({
      id: "refresh-toolkit-database",
      name: "Refresh Toolkit Database",
      callback: async () => {
        await this.refreshToolkitDatabase(true);
      },
    });

    // ── Deploy assets ──────────────────────────────────────────────────────
    const deployer = new Deployer({
      vaultPath,
    });
    deployer.deployAll();

    new Notice("✅ Toolkit Plugin loaded.");
    console.log("[Toolkit] Ready. Bridge attached, assets deployed.");
  }

  onunload() {
    if (this.sourceRefreshTimer) {
      clearTimeout(this.sourceRefreshTimer);
    }
    // Clean up the global bridge so nothing leaks after the plugin is disabled
    delete (globalThis as any).__toolkit;
    console.log("[Toolkit] Unloaded. Bridge removed.");
  }

  async loadSettings() {
    const loadedSettings = (await this.loadData()) as Partial<ToolkitSettings> | null;
    this.settings = Object.assign({}, DEFAULT_SETTINGS, loadedSettings);
    if (!Array.isArray(loadedSettings?.includedSources)) {
      this.settings.includedSources = getDefaultIncludedSources();
    }
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  private async ensureDatabaseCache() {
    if (await hasDatabaseCache(this.pluginDir, this.settings.includedSources)) {
      return;
    }

    await this.refreshToolkitDatabase(false);
  }

  private async refreshToolkitDatabase(showSuccessNotice: boolean) {
    try {
      await refreshDatabaseCache(this.pluginDir, this.settings.githubToken, this.settings.includedSources);
      if (showSuccessNotice) {
        new Notice("Toolkit database refreshed.");
      }
      console.log("[Toolkit] Database cache refreshed.");
    } catch (error) {
      console.error("[Toolkit] Failed to refresh database cache:", error);
      new Notice("Toolkit database refresh failed. For a private repo, add a GitHub token in plugin settings.");
    }
  }

  scheduleSourceFilteredCacheRefresh() {
    if (this.sourceRefreshTimer) {
      clearTimeout(this.sourceRefreshTimer);
    }

    this.sourceRefreshTimer = setTimeout(async () => {
      this.sourceRefreshTimer = null;
      await this.refreshSourceFilteredCache();
    }, 900);
  }

  private async refreshSourceFilteredCache() {
    try {
      await refreshSourceFilteredDatabaseCache(
        this.pluginDir,
        this.settings.githubToken,
        this.settings.includedSources
      );
      console.log("[Toolkit] Source-filtered database cache refreshed.");
    } catch (error) {
      console.error("[Toolkit] Failed to refresh source-filtered database cache:", error);
      new Notice("Toolkit source cache refresh failed. Check the developer console.");
    }
  }

  private filterItemsBySource(items: FormatterItem[]) {
    const includedSources = new Set(this.settings.includedSources.map(normalizeSourceKey));
    return items.filter((item) => !item.source || includedSources.has(normalizeSourceKey(item.source)));
  }

  // Direct insertion command - no templates required
  private async insertFromToolkit(editor: Editor) {
    // First modal: choose content type
    const typeModal = new TypeSelectionModal(this.app, async (selectedType: string) => {
      if (!selectedType) return;

      // Get items for selected type
      const items = await (globalThis as any).__toolkit.getItems(selectedType);

      if (!items || items.length === 0) {
        new Notice(`No ${selectedType} found.`);
        return;
      }

      // Second modal: choose specific item
      const itemModal = new ItemSelectionModal(this.app, items, selectedType, (selectedItem: FormatterItem) => {
        if (selectedItem) {
          editor.replaceSelection(selectedItem.body);
          new Notice("Content inserted!");
        }
      });

      itemModal.open();
    });

    typeModal.open();
  }
}

class ToolkitSettingTab extends PluginSettingTab {
  plugin: MyToolkitPlugin;

  constructor(app: App, plugin: MyToolkitPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl)
      .setName("GitHub token")
      .setDesc("Fine-grained token with read-only Contents access to the private data repository.")
      .addText((text) => {
        text
          .setPlaceholder("github_pat_...")
          .setValue(this.plugin.settings.githubToken)
          .onChange(async (value) => {
            this.plugin.settings.githubToken = value.trim();
            await this.plugin.saveSettings();
          });

        text.inputEl.type = "password";
      });

    new Setting(containerEl)
      .setName("D&D sources")
      .setDesc("Choose which sources appear in D&D search results.")
      .addButton((button) => {
        button
          .setButtonText("Defaults")
          .onClick(async () => {
            this.plugin.settings.includedSources = getDefaultIncludedSources();
            await this.plugin.saveSettings();
            this.plugin.scheduleSourceFilteredCacheRefresh();
            this.display();
          });
      })
      .addButton((button) => {
        button
          .setButtonText("All")
          .onClick(async () => {
            this.plugin.settings.includedSources = Object.keys(SOURCE_LIST).map(normalizeSourceKey);
            await this.plugin.saveSettings();
            this.plugin.scheduleSourceFilteredCacheRefresh();
            this.display();
          });
      })
      .addButton((button) => {
        button
          .setButtonText("None")
          .onClick(async () => {
            this.plugin.settings.includedSources = [];
            await this.plugin.saveSettings();
            this.plugin.scheduleSourceFilteredCacheRefresh();
            this.display();
          });
      });

    const includedSources = new Set(this.plugin.settings.includedSources.map(normalizeSourceKey));
    Object.entries(SOURCE_LIST)
      .sort(compareSourcesForSettings)
      .forEach(([sourceKey, source]) => {
        const normalizedSourceKey = normalizeSourceKey(sourceKey);
        new Setting(containerEl)
          .setName(`${source.full} (${source.short})`)
          .addToggle((toggle) => {
            toggle
              .setValue(includedSources.has(normalizedSourceKey))
              .onChange(async (value) => {
                const nextSources = new Set(this.plugin.settings.includedSources.map(normalizeSourceKey));
                if (value) {
                  nextSources.add(normalizedSourceKey);
                } else {
                  nextSources.delete(normalizedSourceKey);
                }
                this.plugin.settings.includedSources = Array.from(nextSources).sort();
                await this.plugin.saveSettings();
                this.plugin.scheduleSourceFilteredCacheRefresh();
              });
          });
      });
  }
}

function compareSourcesForSettings(
  [leftKey, leftSource]: [string, SourceInfo],
  [rightKey, rightSource]: [string, SourceInfo]
) {
  const leftPriority = PRIORITY_SOURCE_KEYS.indexOf(normalizeSourceKey(leftKey));
  const rightPriority = PRIORITY_SOURCE_KEYS.indexOf(normalizeSourceKey(rightKey));

  if (leftPriority !== -1 || rightPriority !== -1) {
    if (leftPriority === -1) return 1;
    if (rightPriority === -1) return -1;
    return leftPriority - rightPriority;
  }

  return leftSource.full.localeCompare(rightSource.full) || leftKey.localeCompare(rightKey);
}

// Modal for selecting content type (books/movies)
class TypeSelectionModal extends FuzzySuggestModal<{ label: string; value: string }> {
  private onSelect: (type: string) => void;

  constructor(app: any, onSelect: (type: string) => void) {
    super(app);
    this.onSelect = onSelect;
    this.setPlaceholder("Choose what to insert...");
  }

  getItems(): { label: string; value: string }[] {
    return [
      { label: "Insert book", value: "books" },
      { label: "Insert movie", value: "movies" },
      { label: "Insert monster", value: "monsters" },
      { label: "Insert spell", value: "spells" },
    ];
  }

  getItemText(item: { label: string; value: string }): string {
    return item.label;
  }

  onChooseItem(item: { label: string; value: string }, evt: MouseEvent | KeyboardEvent): void {
    this.onSelect(item.value);
  }
}

// Modal for selecting specific item
class ItemSelectionModal extends FuzzySuggestModal<FormatterItem> {
  private items: FormatterItem[];
  private typeName: string;
  private onSelect: (item: FormatterItem) => void;

  constructor(app: any, items: FormatterItem[], typeName: string, onSelect: (item: FormatterItem) => void) {
    super(app);
    this.items = items;
    this.typeName = typeName;
    this.onSelect = onSelect;
    this.setPlaceholder(`Search ${typeName}...`);
  }

  getItems(): FormatterItem[] {
    return this.items;
  }

  getItemText(item: FormatterItem): string {
    return item.label;
  }

  onChooseItem(item: FormatterItem, evt: MouseEvent | KeyboardEvent): void {
    this.onSelect(item);
  }
}
