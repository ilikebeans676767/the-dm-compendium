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
var path5 = __toESM(require("path"));
var import_obsidian2 = require("obsidian");

// src/formatters/BookFormatter.ts
var path = __toESM(require("path"));

// src/formatters/BaseFormatter.ts
var BaseFormatter = class {
};

// src/utils/dataLoader.ts
var fs = __toESM(require("fs"));
var cache = /* @__PURE__ */ new Map();
async function loadJsonData(jsonPath, description) {
  try {
    const stat = await fs.promises.stat(jsonPath);
    const cached = cache.get(jsonPath);
    if (cached && cached.mtimeMs === stat.mtimeMs) {
      return cached.data;
    }
    const fileContents = await fs.promises.readFile(jsonPath, "utf-8");
    const data = JSON.parse(fileContents);
    cache.set(jsonPath, { mtimeMs: stat.mtimeMs, data });
    return data;
  } catch (error) {
    console.error(`[Toolkit] Failed to load ${description} data from ${jsonPath}:`, error);
    return [];
  }
}

// src/formatters/BookFormatter.ts
var BookFormatter = class extends BaseFormatter {
  async load(dataDir) {
    const books = await loadJsonData(
      path.join(dataDir, "cache", "books.json"),
      "book"
    );
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
var path2 = __toESM(require("path"));
var MovieFormatter = class extends BaseFormatter {
  async load(dataDir) {
    const movies = await loadJsonData(
      path2.join(dataDir, "cache", "movies.json"),
      "movie"
    );
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
var fs2 = __toESM(require("fs"));
var path3 = __toESM(require("path"));
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
    const hotkeysPath = path3.join(this.opts.vaultPath, ".obsidian", "hotkeys.json");
    let hotkeys = {};
    try {
      if (fs2.existsSync(hotkeysPath)) {
        hotkeys = JSON.parse(fs2.readFileSync(hotkeysPath, "utf-8"));
      }
    } catch {
      console.warn("[Toolkit] Could not read hotkeys.json, will create.");
    }
    const commandId = "my-toolkit-plugin:insert-from-toolkit";
    if (!hotkeys[commandId]) {
      hotkeys[commandId] = [{ modifiers: ["Alt", "Shift"], key: "E" }];
      fs2.writeFileSync(hotkeysPath, JSON.stringify(hotkeys, null, 2));
      console.log("[Toolkit] Hotkey Option+Shift+E set for toolkit insertion.");
    } else {
      console.log("[Toolkit] Toolkit hotkey already set by user, skipping.");
    }
  }
};

// src/settings.ts
var DEFAULT_SETTINGS = {
  githubToken: ""
};

// src/utils/databaseCache.ts
var fs3 = __toESM(require("fs"));
var path4 = __toESM(require("path"));
var import_obsidian = require("obsidian");
var DATABASE_FILES = [
  {
    name: "books.json",
    description: "books",
    sourceUrl: "https://api.github.com/repos/guykahalani/my-toolkit-plugin/contents/data/books.json?ref=main"
  },
  {
    name: "movies.json",
    description: "movies",
    sourceUrl: "https://api.github.com/repos/guykahalani/my-toolkit-plugin/contents/data/movies.json?ref=main"
  }
];
function getCacheDir(pluginDir) {
  return path4.join(pluginDir, "cache");
}
async function hasDatabaseCache(pluginDir) {
  const cacheDir = getCacheDir(pluginDir);
  const results = await Promise.all(
    DATABASE_FILES.map(async (file) => {
      try {
        await fs3.promises.access(path4.join(cacheDir, file.name), fs3.constants.R_OK);
        return true;
      } catch {
        return false;
      }
    })
  );
  return results.every(Boolean);
}
async function refreshDatabaseCache(pluginDir, githubToken) {
  const cacheDir = getCacheDir(pluginDir);
  await fs3.promises.mkdir(cacheDir, { recursive: true });
  await Promise.all(
    DATABASE_FILES.map(async (file) => {
      const headers = {
        Accept: "application/vnd.github.raw+json",
        "X-GitHub-Api-Version": "2022-11-28"
      };
      if (githubToken.trim()) {
        headers.Authorization = `Bearer ${githubToken.trim()}`;
      }
      const response = await (0, import_obsidian.requestUrl)({
        url: file.sourceUrl,
        method: "GET",
        headers
      });
      const data = response.json;
      if (!Array.isArray(data)) {
        throw new Error(`Remote ${file.description} data is not a JSON array.`);
      }
      await fs3.promises.writeFile(
        path4.join(cacheDir, file.name),
        JSON.stringify(data, null, 2),
        "utf-8"
      );
    })
  );
}

// src/main.ts
var MyToolkitPlugin = class extends import_obsidian2.Plugin {
  constructor() {
    super(...arguments);
    this.settings = DEFAULT_SETTINGS;
    this.pluginDir = "";
  }
  async onload() {
    console.log("[Toolkit] Loading...");
    await this.loadSettings();
    const vaultPath = this.app.vault.adapter.getBasePath();
    this.pluginDir = path5.join(vaultPath, this.app.vault.configDir, "plugins", this.manifest.id);
    await this.ensureDatabaseCache();
    this.addSettingTab(new ToolkitSettingTab(this.app, this));
    globalThis.__toolkit = {
      getItems: async (dataType) => {
        const formatter = registry[dataType];
        if (!formatter) {
          console.warn(`[Toolkit] Unknown data type: ${dataType}`);
          return [];
        }
        await this.ensureDatabaseCache();
        return formatter.load(this.pluginDir);
      }
    };
    this.addCommand({
      id: "insert-from-toolkit",
      name: "Insert from toolkit",
      editorCallback: async (editor, ctx) => {
        await this.insertFromToolkit(editor);
      }
    });
    this.addCommand({
      id: "refresh-toolkit-database",
      name: "Refresh Toolkit Database",
      callback: async () => {
        await this.refreshToolkitDatabase(true);
      }
    });
    const deployer = new Deployer({
      vaultPath
    });
    deployer.deployAll();
    new import_obsidian2.Notice("\u2705 Toolkit Plugin loaded.");
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
  async ensureDatabaseCache() {
    if (await hasDatabaseCache(this.pluginDir)) {
      return;
    }
    await this.refreshToolkitDatabase(false);
  }
  async refreshToolkitDatabase(showSuccessNotice) {
    try {
      await refreshDatabaseCache(this.pluginDir, this.settings.githubToken);
      if (showSuccessNotice) {
        new import_obsidian2.Notice("Toolkit database refreshed.");
      }
      console.log("[Toolkit] Database cache refreshed.");
    } catch (error) {
      console.error("[Toolkit] Failed to refresh database cache:", error);
      new import_obsidian2.Notice("Toolkit database refresh failed. For a private repo, add a GitHub token in plugin settings.");
    }
  }
  // Direct insertion command - no templates required
  async insertFromToolkit(editor) {
    const typeModal = new TypeSelectionModal(this.app, async (selectedType) => {
      if (!selectedType) return;
      const items = await globalThis.__toolkit.getItems(selectedType);
      if (!items || items.length === 0) {
        new import_obsidian2.Notice(`No ${selectedType} found.`);
        return;
      }
      const itemModal = new ItemSelectionModal(this.app, items, selectedType, (selectedItem) => {
        if (selectedItem) {
          editor.replaceSelection(selectedItem.body);
          new import_obsidian2.Notice("Content inserted!");
        }
      });
      itemModal.open();
    });
    typeModal.open();
  }
};
var ToolkitSettingTab = class extends import_obsidian2.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    new import_obsidian2.Setting(containerEl).setName("GitHub token").setDesc("Fine-grained token with read-only Contents access to the private data repository.").addText((text) => {
      text.setPlaceholder("github_pat_...").setValue(this.plugin.settings.githubToken).onChange(async (value) => {
        this.plugin.settings.githubToken = value.trim();
        await this.plugin.saveSettings();
      });
      text.inputEl.type = "password";
    });
  }
};
var TypeSelectionModal = class extends import_obsidian2.FuzzySuggestModal {
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
var ItemSelectionModal = class extends import_obsidian2.FuzzySuggestModal {
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
