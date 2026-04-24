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
var path2 = __toESM(require("path"));

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
var EMBEDDED_TEMPLATES = {
  "Insert book.md": `<%* 
const result = await toolkit_search(tp, "books");
tR += result;
%>`,
  "Insert movie.md": `<%* 
const result = await toolkit_search(tp, "movies");
tR += result;
%>`
};
var Deployer = class {
  constructor(opts) {
    this.opts = opts;
  }
  deployAll() {
    this.deployTemplates();
    this.setTemplaterHotkey();
  }
  // Deploy .md templates into the vault's Templater template folder
  deployTemplates() {
    const destDir = path.join(this.opts.vaultPath, this.opts.templateFolder);
    console.log(`[Toolkit] Deploying embedded templates to: ${destDir}`);
    fs.mkdirSync(destDir, { recursive: true });
    for (const [filename, content] of Object.entries(EMBEDDED_TEMPLATES)) {
      const dest = path.join(destDir, filename);
      if (!fs.existsSync(dest)) {
        fs.writeFileSync(dest, content, "utf-8");
        console.log(`[Toolkit] Template deployed: ${filename}`);
      } else {
        console.log(`[Toolkit] Template already exists (user customized), skipping: ${filename}`);
      }
    }
  }
  // Write Alt+Shift+E for Templater's insert modal into hotkeys.json
  // Only sets if the user hasn't already customised this command.
  setTemplaterHotkey() {
    const hotkeysPath = path.join(this.opts.vaultPath, ".obsidian", "hotkeys.json");
    let hotkeys = {};
    try {
      if (fs.existsSync(hotkeysPath)) {
        hotkeys = JSON.parse(fs.readFileSync(hotkeysPath, "utf-8"));
      }
    } catch {
      console.warn("[Toolkit] Could not read hotkeys.json, will create.");
    }
    const commandId = "templater-obsidian:insert-templater";
    if (!hotkeys[commandId]) {
      hotkeys[commandId] = [{ modifiers: ["Alt", "Shift"], key: "E" }];
      fs.writeFileSync(hotkeysPath, JSON.stringify(hotkeys, null, 2));
      console.log("[Toolkit] Hotkey Alt+Shift+E set for Templater insert modal.");
    } else {
      console.log("[Toolkit] Templater hotkey already set by user, skipping.");
    }
  }
};

// src/settings.ts
var DEFAULT_SETTINGS = {
  templateFolder: "Templates",
  scriptsFolder: ".obsidian/scripts"
};

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
    const pluginDir = path2.join(vaultPath, ".obsidian", "plugins", "my-toolkit-plugin");
    const dataDir = path2.join(pluginDir, "data");
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
    globalThis.toolkit_search = async (tp, dataType) => {
      const bridge = globalThis.__toolkit;
      if (!bridge) {
        tp.system.notice("[Toolkit] Plugin not loaded. Enable My Toolkit Plugin first.");
        return "";
      }
      const items = await bridge.getItems(dataType);
      if (!items || items.length === 0) {
        tp.system.notice(`[Toolkit] No items found for type: ${dataType}`);
        return "";
      }
      const selected = await tp.system.suggester(
        (item) => item.label,
        items,
        true,
        // throw_on_cancel
        `Search ${dataType}...`
      );
      return selected ? selected.body : "";
    };
    const deployer = new Deployer({
      vaultPath,
      pluginDir,
      templateFolder: this.settings.templateFolder,
      scriptsFolder: this.settings.scriptsFolder
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
};
