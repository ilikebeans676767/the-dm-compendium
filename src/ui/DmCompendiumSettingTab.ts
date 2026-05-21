import { App, Plugin, PluginSettingTab, Setting } from "obsidian";
import {
  getDefaultIncludedSources,
  normalizeSourceKey,
  SourceInfo,
  SOURCE_LIST,
  DmCompendiumSettings,
} from "../settings";

const PRIORITY_SOURCE_KEYS = ["PHB", "XPHB", "DMG", "XDMG", "MM", "XMM"];

export interface DmCompendiumSettingsPlugin {
  settings: DmCompendiumSettings;
  saveSettings(): Promise<void>;
  scheduleSourceFilteredCacheRefresh(): void;
}

export class DmCompendiumSettingTab extends PluginSettingTab {
  plugin: Plugin & DmCompendiumSettingsPlugin;
  private sourceSearchQuery = "";
  private sourceSearchTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(app: App, plugin: Plugin & DmCompendiumSettingsPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    if (this.sourceSearchTimer) {
      clearTimeout(this.sourceSearchTimer);
      this.sourceSearchTimer = null;
    }
    containerEl.empty();

    this.renderGithubTokenSetting(containerEl);
    this.renderSourceActions(containerEl);

    const sourceSearchEl = containerEl.createDiv();
    const sourceListEl = containerEl.createDiv();
    this.renderSourceSearch(sourceSearchEl, sourceListEl);
    this.renderSourceSettings(sourceListEl);
  }

  private renderGithubTokenSetting(containerEl: HTMLElement) {
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
  }

  private renderSourceActions(containerEl: HTMLElement) {
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
  }

  private renderSourceSearch(containerEl: HTMLElement, sourceListEl: HTMLElement) {
    new Setting(containerEl)
      .setName("Search sources")
      .addText((text) => {
        text
          .setPlaceholder("Type a source name or abbreviation...")
          .setValue(this.sourceSearchQuery)
          .onChange((value) => {
            if (this.sourceSearchTimer) {
              clearTimeout(this.sourceSearchTimer);
            }

            this.sourceSearchTimer = setTimeout(() => {
              this.sourceSearchTimer = null;
              this.sourceSearchQuery = value;
              this.renderSourceSettings(sourceListEl);
            }, 200);
          });
      })
      .addButton((button) => {
        button
          .setButtonText("Clear")
          .onClick(() => {
            this.sourceSearchQuery = "";
            this.display();
          });
      });
  }

  private renderSourceSettings(containerEl: HTMLElement) {
    containerEl.empty();

    const includedSources = new Set(this.plugin.settings.includedSources.map(normalizeSourceKey));
    const sourceEntries = Object.entries(SOURCE_LIST)
      .sort(compareSourcesForSettings)
      .filter(([sourceKey, source]) => sourceMatchesSearch(sourceKey, source, this.sourceSearchQuery));

    if (!sourceEntries.length) {
      new Setting(containerEl)
        .setName("No matching sources")
        .setDesc("Try another source name or abbreviation.");
      return;
    }

    sourceEntries.forEach(([sourceKey, source]) => {
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

function sourceMatchesSearch(sourceKey: string, source: SourceInfo, query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;

  return [
    sourceKey,
    normalizeSourceKey(sourceKey),
    source.full,
    source.short,
  ].some((value) => value.toLowerCase().includes(normalizedQuery));
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
