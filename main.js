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
var path4 = __toESM(require("path"));

// src/formatters/BookFormatter.ts
var import_fs = require("fs");
var path = __toESM(require("path"));

// src/formatters/BaseFormatter.ts
var BaseFormatter = class {
};

// src/formatters/BookFormatter.ts
var BookFormatter = class extends BaseFormatter {
  async load(dataDir) {
    const raw = (0, import_fs.readFileSync)(path.join(dataDir, "books.json"), "utf-8");
    const books = JSON.parse(raw);
    return books.map((b) => this.format(b));
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
var import_fs2 = require("fs");
var path2 = __toESM(require("path"));
var MovieFormatter = class extends BaseFormatter {
  async load(dataDir) {
    const raw = (0, import_fs2.readFileSync)(path2.join(dataDir, "movies.json"), "utf-8");
    const movies = JSON.parse(raw);
    return movies.map((m) => this.format(m));
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
var path3 = __toESM(require("path"));
var Deployer = class {
  constructor(opts) {
    this.opts = opts;
  }
  deployAll() {
    this.deployTemplates();
    this.deployUserScript();
    this.setTemplaterHotkey();
  }
  // Deploy .md templates into the vault's Templater template folder
  deployTemplates() {
    const srcDir = path3.join(this.opts.pluginDir, "templates");
    const destDir = path3.join(this.opts.vaultPath, this.opts.templateFolder);
    fs.mkdirSync(destDir, { recursive: true });
    for (const file of fs.readdirSync(srcDir)) {
      if (!file.endsWith(".md")) continue;
      const dest = path3.join(destDir, file);
      if (!fs.existsSync(dest)) {
        fs.copyFileSync(path3.join(srcDir, file), dest);
        console.log(`[Toolkit] Template deployed: ${file}`);
      }
    }
  }
  // Deploy the compiled user script so Templater can call tp.user.toolkit_search()
  deployUserScript() {
    const src = path3.join(this.opts.pluginDir, "toolkit_search.js");
    const destDir = path3.join(this.opts.vaultPath, this.opts.scriptsFolder);
    if (!fs.existsSync(src)) {
      console.warn("[Toolkit] toolkit_search.js not built yet. Run npm run build.");
      return;
    }
    fs.mkdirSync(destDir, { recursive: true });
    const dest = path3.join(destDir, "toolkit_search.js");
    fs.copyFileSync(src, dest);
    console.log("[Toolkit] User script deployed.");
  }
  // Write Alt+Shift+E for Templater's insert modal into hotkeys.json
  // Only sets if the user hasn't already customised this command.
  setTemplaterHotkey() {
    const hotkeysPath = path3.join(this.opts.vaultPath, ".obsidian", "hotkeys.json");
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
  templateFolder: "Templates/toolkit",
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
    const pluginDir = path4.join(vaultPath, ".obsidian", "plugins", "my-toolkit-plugin");
    const dataDir = path4.join(pluginDir, "data");
    globalThis.__toolkit = {
      getItems: async (dataType) => {
        const formatter = registry[dataType];
        if (!formatter) {
          console.warn(`[Toolkit] Unknown data type: ${dataType}`);
          return [];
        }
        return formatter.load(dataDir);
      }
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
