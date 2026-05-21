import * as path from "path";
import { Editor, Notice, Plugin } from "obsidian";
import { Deployer } from "../deployer";
import { FormatterItem } from "../formatters/BaseFormatter";
import { registry } from "../registry";
import {
  DEFAULT_SETTINGS,
  getDefaultIncludedSources,
  normalizeSourceKey,
  DmCompendiumSettings,
} from "../settings";
import { DmCompendiumSettingTab } from "../ui/DmCompendiumSettingTab";
import { insertFromCompendium } from "../ui/InsertModals";
import { registerItemCardProcessor } from "../renderers/ItemCardRenderer";
import { registerSpellCardProcessor } from "../renderers/SpellCardRenderer";
import {
  hasDatabaseCache,
  refreshDatabaseCache,
  refreshSourceFilteredDatabaseCache,
} from "../utils/databaseCache";

export class DmCompendiumPlugin extends Plugin {
  settings: DmCompendiumSettings = DEFAULT_SETTINGS;
  private pluginDir = "";
  private sourceRefreshTimer: ReturnType<typeof setTimeout> | null = null;

  async onload() {
    console.log("[DM Compendium] Loading...");

    await this.loadSettings();

    const vaultPath = (this.app.vault.adapter as any).getBasePath() as string;
    this.pluginDir = path.join(vaultPath, this.app.vault.configDir, "plugins", this.manifest.id);

    await this.ensureDatabaseCache();
    this.addSettingTab(new DmCompendiumSettingTab(this.app, this));
    this.attachGlobalBridge();
    registerItemCardProcessor(this);
    registerSpellCardProcessor(this);
    this.addCommands();
    this.deployVaultAssets(vaultPath);

    new Notice("The DM Compendium loaded.");
    console.log("[DM Compendium] Ready. Bridge attached, assets deployed.");
  }

  onunload() {
    if (this.sourceRefreshTimer) {
      clearTimeout(this.sourceRefreshTimer);
    }

    delete (globalThis as any).__dmCompendium;
    console.log("[DM Compendium] Unloaded. Bridge removed.");
  }

  async loadSettings() {
    const loadedSettings = (await this.loadData()) as Partial<DmCompendiumSettings> | null;
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
    (globalThis as any).__dmCompendium = {
      getItems: async (dataType: string): Promise<FormatterItem[]> => {
        const formatter = registry[dataType];
        if (!formatter) {
          console.warn(`[DM Compendium] Unknown data type: ${dataType}`);
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
      id: "insert-from-compendium",
      name: "Insert from compendium",
      editorCallback: async (editor: Editor) => {
        await insertFromCompendium(this.app, editor);
      },
    });

    this.addCommand({
      id: "refresh-compendium-database",
      name: "Refresh Compendium Database",
      callback: async () => {
        await this.refreshCompendiumDatabase(true);
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

    await this.refreshCompendiumDatabase(false);
  }

  private async refreshCompendiumDatabase(showSuccessNotice: boolean) {
    try {
      await refreshDatabaseCache(this.pluginDir, this.settings.githubToken, this.settings.includedSources);
      if (showSuccessNotice) {
        new Notice("Compendium database refreshed.");
      }
      console.log("[DM Compendium] Database cache refreshed.");
    } catch (error) {
      console.error("[DM Compendium] Failed to refresh database cache:", error);
      new Notice("Compendium database refresh failed. For a private repo, add a GitHub token in plugin settings.");
    }
  }

  private async refreshSourceFilteredCache() {
    try {
      await refreshSourceFilteredDatabaseCache(
        this.pluginDir,
        this.settings.githubToken,
        this.settings.includedSources
      );
      console.log("[DM Compendium] Source-filtered database cache refreshed.");
    } catch (error) {
      console.error("[DM Compendium] Failed to refresh source-filtered database cache:", error);
      new Notice("Compendium source cache refresh failed. Check the developer console.");
    }
  }

  private filterItemsBySource(items: FormatterItem[]) {
    const includedSources = new Set(this.settings.includedSources.map(normalizeSourceKey));
    return items.filter((item) => !item.source || includedSources.has(normalizeSourceKey(item.source)));
  }
}
