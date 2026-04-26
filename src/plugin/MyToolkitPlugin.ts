import * as path from "path";
import { Editor, Notice, Plugin } from "obsidian";
import { Deployer } from "../deployer";
import { FormatterItem } from "../formatters/BaseFormatter";
import { registry } from "../registry";
import {
  DEFAULT_SETTINGS,
  getDefaultIncludedSources,
  normalizeSourceKey,
  ToolkitSettings,
} from "../settings";
import { ToolkitSettingTab } from "../ui/ToolkitSettingTab";
import { insertFromToolkit } from "../ui/InsertModals";
import {
  hasDatabaseCache,
  refreshDatabaseCache,
  refreshSourceFilteredDatabaseCache,
} from "../utils/databaseCache";

export class MyToolkitPlugin extends Plugin {
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
    this.attachGlobalBridge();
    this.addCommands();
    this.deployVaultAssets(vaultPath);

    new Notice("Toolkit Plugin loaded.");
    console.log("[Toolkit] Ready. Bridge attached, assets deployed.");
  }

  onunload() {
    if (this.sourceRefreshTimer) {
      clearTimeout(this.sourceRefreshTimer);
    }

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

  scheduleSourceFilteredCacheRefresh() {
    if (this.sourceRefreshTimer) {
      clearTimeout(this.sourceRefreshTimer);
    }

    this.sourceRefreshTimer = setTimeout(async () => {
      this.sourceRefreshTimer = null;
      await this.refreshSourceFilteredCache();
    }, 900);
  }

  private attachGlobalBridge() {
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
  }

  private addCommands() {
    this.addCommand({
      id: "insert-from-toolkit",
      name: "Insert from toolkit",
      editorCallback: async (editor: Editor) => {
        await insertFromToolkit(this.app, editor);
      },
    });

    this.addCommand({
      id: "refresh-toolkit-database",
      name: "Refresh Toolkit Database",
      callback: async () => {
        await this.refreshToolkitDatabase(true);
      },
    });
  }

  private deployVaultAssets(vaultPath: string) {
    const deployer = new Deployer({ vaultPath });
    deployer.deployAll();
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
}
