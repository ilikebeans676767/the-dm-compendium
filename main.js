"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => MyToolkitPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");

// src/formatters/BaseFormatter.ts
var BaseFormatter = class {
};

// src/formatters/BookFormatter.ts
var BOOKS_DATA = [
  {
    "title": "The Dispossessed",
    "author": "Ursula K. Le Guin",
    "year": 1974,
    "genre": "Science Fiction",
    "rating": 5,
    "notes": "Dual-world anarchist utopia. Dense and rewarding."
  },
  {
    "title": "Thinking, Fast and Slow",
    "author": "Daniel Kahneman",
    "year": 2011,
    "genre": "Psychology",
    "rating": 4,
    "notes": "System 1 vs System 2 thinking. Foundational."
  },
  {
    "title": "Blood Meridian",
    "author": "Cormac McCarthy",
    "year": 1985,
    "genre": "Literary Fiction",
    "rating": 5,
    "notes": "Brutal and poetic. Not for the faint-hearted."
  }
];
var BookFormatter = class extends BaseFormatter {
  async load(dataDir) {
    return BOOKS_DATA.map((b) => this.format(b));
  }
  format(book) {
    const stars = "\u2605".repeat(book.rating) + "\u2606".repeat(5 - book.rating);
    return {
      label: `${book.title} \u2014 ${book.author} (${book.year})`,
      body: `## ${book.title}

| Field    | Value              |
| -------- | ------------------ |
| Author   | ${book.author}     |
| Year     | ${book.year}       |
| Genre    | ${book.genre}      |
| Rating   | ${stars}           |

> [!toolkit-highlight]
> ${book.notes}
`
    };
  }
};

// src/formatters/MovieFormatter.ts
var MOVIES_DATA = [
  {
    "title": "Stalker",
    "director": "Andrei Tarkovsky",
    "year": 1979,
    "genre": "Sci-Fi / Drama",
    "rating": 5,
    "notes": "Slow, philosophical, unforgettable. The Zone."
  },
  {
    "title": "Parasite",
    "director": "Bong Joon-ho",
    "year": 2019,
    "genre": "Thriller",
    "rating": 5,
    "notes": "Class warfare as genre film. Perfect structure."
  },
  {
    "title": "Adaptation",
    "director": "Spike Jonze",
    "year": 2002,
    "genre": "Comedy / Drama",
    "rating": 4,
    "notes": "Meta-screenplay about writing a screenplay. Kaufman at his best."
  }
];
var MovieFormatter = class extends BaseFormatter {
  async load(dataDir) {
    return MOVIES_DATA.map((m) => this.format(m));
  }
  format(movie) {
    const stars = "\u2605".repeat(movie.rating) + "\u2606".repeat(5 - movie.rating);
    return {
      label: `${movie.title} \u2014 ${movie.director} (${movie.year})`,
      body: `## ${movie.title}

| Field    | Value              |
| -------- | ------------------ |
| Director | ${movie.director}  |
| Year     | ${movie.year}      |
| Genre    | ${movie.genre}     |
| Rating   | ${stars}           |

> [!toolkit-highlight]
> ${movie.notes}
`
    };
  }
};

// src/registry.ts
var registry = {
  books: new BookFormatter(),
  movies: new MovieFormatter()
};

// src/deployer.ts
var fs = __toESM(require("fs"));
var path = __toESM(require("path"));
var Deployer = class {
  constructor(opts) {
    this.opts = opts;
  }
  deployAll() {
    this.setToolkitHotkey();
  }
  // Write Option+Shift+E for toolkit insertion into hotkeys.json
  // Only sets if the user hasn't already customised this command.
  setToolkitHotkey() {
    const hotkeysPath = path.join(this.opts.vaultPath, ".obsidian", "hotkeys.json");
    let hotkeys = {};
    try {
      if (fs.existsSync(hotkeysPath)) {
        hotkeys = JSON.parse(fs.readFileSync(hotkeysPath, "utf-8"));
      }
    } catch {
      console.warn("[Toolkit] Could not read hotkeys.json, will create.");
    }
    const commandId = "my-toolkit-plugin:insert-from-toolkit";
    if (!hotkeys[commandId]) {
      hotkeys[commandId] = [{ modifiers: ["Alt", "Shift"], key: "E" }];
      fs.writeFileSync(hotkeysPath, JSON.stringify(hotkeys, null, 2));
      console.log("[Toolkit] Hotkey Option+Shift+E set for toolkit insertion.");
    } else {
      console.log("[Toolkit] Toolkit hotkey already set by user, skipping.");
    }
  }
};

// src/settings.ts
var DEFAULT_SETTINGS = {};

// src/main.ts
var MyToolkitPlugin = class extends import_obsidian.Plugin {
  constructor() {
    super(...arguments);
    this.settings = DEFAULT_SETTINGS;
  }
  async onload() {
    console.log("[Toolkit] Loading...");
    await this.loadSettings();
    const vaultPath = this.app.vault.adapter.getBasePath();
    globalThis.__toolkit = {
      getItems: async (dataType) => {
        const formatter = registry[dataType];
        if (!formatter) {
          console.warn(`[Toolkit] Unknown data type: ${dataType}`);
          return [];
        }
        return formatter.load("");
      }
    };
    this.addCommand({
      id: "insert-from-toolkit",
      name: "Insert from toolkit",
      editorCallback: async (editor, ctx) => {
        await this.insertFromToolkit(editor);
      }
    });
    const deployer = new Deployer({
      vaultPath
    });
    deployer.deployAll();
    new import_obsidian.Notice("\u2705 Toolkit Plugin loaded.");
    console.log("[Toolkit] Ready. Bridge attached, assets deployed.");
  }
  onunload() {
    delete globalThis.__toolkit;
    console.log("[Toolkit] Unloaded. Bridge removed.");
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  // Direct insertion command - no templates required
  async insertFromToolkit(editor) {
    const typeModal = new TypeSelectionModal(this.app, async (selectedType) => {
      if (!selectedType) return;
      const items = await globalThis.__toolkit.getItems(selectedType);
      if (!items || items.length === 0) {
        new import_obsidian.Notice(`No ${selectedType} found.`);
        return;
      }
      const itemModal = new ItemSelectionModal(this.app, items, selectedType, (selectedItem) => {
        if (selectedItem) {
          editor.replaceSelection(selectedItem.body);
          new import_obsidian.Notice("Content inserted!");
        }
      });
      itemModal.open();
    });
    typeModal.open();
  }
};
var TypeSelectionModal = class extends import_obsidian.FuzzySuggestModal {
  constructor(app, onSelect) {
    super(app);
    this.onSelect = onSelect;
    this.setPlaceholder("Choose what to insert...");
  }
  getItems() {
    return [
      { label: "Insert book", value: "books" },
      { label: "Insert movie", value: "movies" }
    ];
  }
  getItemText(item) {
    return item.label;
  }
  onChooseItem(item, evt) {
    this.onSelect(item.value);
  }
};
var ItemSelectionModal = class extends import_obsidian.FuzzySuggestModal {
  constructor(app, items, typeName, onSelect) {
    super(app);
    this.items = items;
    this.typeName = typeName;
    this.onSelect = onSelect;
    this.setPlaceholder(`Search ${typeName}...`);
  }
  getItems() {
    return this.items;
  }
  getItemText(item) {
    return item.label;
  }
  onChooseItem(item, evt) {
    this.onSelect(item);
  }
};
