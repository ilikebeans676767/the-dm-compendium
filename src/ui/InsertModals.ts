import { App, Editor, FuzzySuggestModal, Notice } from "obsidian";
import { FormatterItem } from "../formatters/BaseFormatter";

interface TypeSelectionItem {
  label: string;
  value: string;
}

export async function insertFromCompendium(
  app: App,
  editor: Editor,
  getItems: (dataType: string) => Promise<FormatterItem[]>,
) {
  const typeModal = new TypeSelectionModal(app, async (selectedType: string) => {
    if (!selectedType) return;

    const items = await getItems(selectedType);
    if (!items || items.length === 0) {
      new Notice(`No ${selectedType} found.`);
      return;
    }

    const itemModal = new ItemSelectionModal(app, items, selectedType, (selectedItem: FormatterItem) => {
      if (selectedItem) {
        editor.replaceSelection(selectedItem.body);
        new Notice("Content inserted!");
      }
    });

    itemModal.open();
  });

  typeModal.open();
}

class TypeSelectionModal extends FuzzySuggestModal<TypeSelectionItem> {
  private onSelect: (type: string) => void;

  constructor(app: App, onSelect: (type: string) => void) {
    super(app);
    this.onSelect = onSelect;
    this.setPlaceholder("Choose what to insert...");
  }

  getItems(): TypeSelectionItem[] {
    return [
      { label: "Insert monster", value: "monsters" },
      { label: "Insert item", value: "items" },
      { label: "Insert spell", value: "spells" },
    ];
  }

  getItemText(item: TypeSelectionItem): string {
    return item.label;
  }

  onChooseItem(item: TypeSelectionItem): void {
    this.onSelect(item.value);
  }
}

class ItemSelectionModal extends FuzzySuggestModal<FormatterItem> {
  private items: FormatterItem[];
  private typeName: string;
  private onSelect: (item: FormatterItem) => void;

  constructor(app: App, items: FormatterItem[], typeName: string, onSelect: (item: FormatterItem) => void) {
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

  onChooseItem(item: FormatterItem): void {
    this.onSelect(item);
  }
}
