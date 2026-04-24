import { Notice, Plugin } from "obsidian";
import * as path from "path";
import { registry } from "./registry";
import { Deployer } from "./deployer";
import { DEFAULT_SETTINGS, ToolkitSettings } from "./settings";
import { FormatterItem } from "./formatters/BaseFormatter";

export default class MyToolkitPlugin extends Plugin {
  settings: ToolkitSettings = DEFAULT_SETTINGS;

  async onload() {
    console.log("[Toolkit] Loading...");

    await this.loadSettings();

    const vaultPath = (this.app.vault.adapter as any).getBasePath() as string;
    const pluginDir = path.join(vaultPath, ".obsidian", "plugins", "my-toolkit-plugin");
    const dataDir = path.join(pluginDir, "data");

    // ── Global bridge ──────────────────────────────────────────────────────
    // The compiled toolkit_search.js user script calls into this at runtime.
    // Keeps all formatter logic inside the plugin bundle.
    (globalThis as any).__toolkit = {
      getItems: async (dataType: string): Promise<FormatterItem[]> => {
        const formatter = registry[dataType];
        if (!formatter) {
          console.warn(`[Toolkit] Unknown data type: ${dataType}`);
          return [];
        }
        return formatter.load(""); // dataDir no longer needed - data is embedded
      },
    };

    // ── Deploy assets ──────────────────────────────────────────────────────
    const deployer = new Deployer({
      vaultPath,
      pluginDir,
      templateFolder: this.settings.templateFolder,
      scriptsFolder: this.settings.scriptsFolder,
    });
    deployer.deployAll();

    new Notice("✅ Toolkit Plugin loaded.");
    console.log("[Toolkit] Ready. Bridge attached, assets deployed.");
  }

  onunload() {
    // Clean up the global bridge so nothing leaks after the plugin is disabled
    delete (globalThis as any).__toolkit;
    console.log("[Toolkit] Unloaded. Bridge removed.");
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
