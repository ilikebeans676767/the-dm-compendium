import * as path from "path";
import { Notice, Plugin, Editor, FuzzySuggestModal } from "obsidian";
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
    const pluginDir = path.join(vaultPath, this.app.vault.configDir, "plugins", this.manifest.id);

    // ── Global bridge ──────────────────────────────────────────────────────
    // Keeps all formatter logic inside the plugin bundle.
    (globalThis as any).__toolkit = {
      getItems: async (dataType: string): Promise<FormatterItem[]> => {
        const formatter = registry[dataType];
        if (!formatter) {
          console.warn(`[Toolkit] Unknown data type: ${dataType}`);
          return [];
        }
        return formatter.load(pluginDir);
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

    // ── Deploy assets ──────────────────────────────────────────────────────
    const deployer = new Deployer({
      vaultPath,
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
      { label: "Insert movie", value: "movies" }
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
