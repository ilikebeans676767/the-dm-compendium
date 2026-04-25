"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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

// src/source-list.json
var require_source_list = __commonJS({
  "src/source-list.json"(exports2, module2) {
    module2.exports = {
      PHB: {
        full: "Player's Handbook",
        short: "PHB'14",
        include: true
      },
      XPHB: {
        full: "Player's Handbook (2024)",
        short: "PHB'24",
        include: true
      },
      TCE: {
        full: "Tasha's Cauldron of Everything",
        short: "TCE",
        include: true
      },
      XGE: {
        full: "Xanathar's Guide to Everything",
        short: "XGE",
        include: true
      },
      MPMM: {
        full: "Mordenkainen's Presents: Monsters and Minions",
        short: "MPMM",
        include: true
      },
      MM: {
        full: "Monster Manual",
        short: "MM'14",
        include: true
      },
      XMM: {
        full: "Monster Manual (2025)",
        short: "MM'25",
        include: true
      },
      DMG: {
        full: "Dungeon Master's Guide",
        short: "DMG'14",
        include: true
      },
      XDMG: {
        full: "Dungeon Master's Guide (2024)",
        short: "DMG'24",
        include: true
      },
      AAG: {
        full: "Astral Adventurer's Guide",
        short: "AAG",
        include: false
      },
      AATM: {
        full: "Adventure Atlas: The Mortuary",
        short: "AATM",
        include: false
      },
      ABH: {
        full: "Astarion's Book of Hungers",
        short: "ABH",
        include: false
      },
      AI: {
        full: "Acquisitions Incorporated",
        short: "AI",
        include: false
      },
      "AITFR-AVT": {
        full: "AitFR: A Verdant Tomb",
        short: "AITFR-AVT",
        include: false
      },
      "AITFR-THP": {
        full: "AitFR: The Hidden Page",
        short: "AITFR-THP",
        include: false
      },
      AWM: {
        full: "Adventure with Muk",
        short: "AWM",
        include: false
      },
      AZFYT: {
        full: "A Zib for Your Thoughts",
        short: "AZFYT",
        include: false
      },
      BAM: {
        full: "Boo's Astral Menagerie",
        short: "BAM",
        include: false
      },
      BGDIA: {
        full: "Baldur's Gate: Descent Into Avernus",
        short: "BGDIA",
        include: false
      },
      BGG: {
        full: "Bigby Presents: Glory of the Giants",
        short: "BGG",
        include: false
      },
      BMT: {
        full: "The Book of Many Things",
        short: "BMT",
        include: false
      },
      CM: {
        full: "Candlekeep Mysteries",
        short: "CM",
        include: false
      },
      COA: {
        full: "Chains of Asmodeus",
        short: "COA",
        include: false
      },
      COS: {
        full: "Curse of Strahd",
        short: "COS",
        include: false
      },
      CRCOTN: {
        full: "Critical Role: Call of the Netherdeep",
        short: "CRCOTN",
        include: false
      },
      DC: {
        full: "ESK: Divine Contention",
        short: "DC",
        include: false
      },
      DIP: {
        full: "ESK: Dragon of Icespire Peak",
        short: "DIP",
        include: false
      },
      DITLCOT: {
        full: "Descent into the Lost Caverns of Tsojcanth",
        short: "DITLCOT",
        include: false
      },
      DOD: {
        full: "Domains of Delight",
        short: "DOD",
        include: false
      },
      DOSI: {
        full: "Dragons of Stormwreck Isle",
        short: "DOSI",
        include: false
      },
      DSOTDQ: {
        full: "Dragonlance: Shadow of the Dragon Queen",
        short: "DSOTDQ",
        include: false
      },
      EET: {
        full: "Elemental Evil: Trinkets",
        short: "EET",
        include: false
      },
      EFA: {
        full: "Eberron: Forge of the Artificer",
        short: "EFA",
        include: false
      },
      EGW: {
        full: "Explorer's Guide to Wildemount",
        short: "EGW",
        include: false
      },
      ERLW: {
        full: "Eberron: Rising from the Last War",
        short: "ERLW",
        include: false
      },
      ESK: {
        full: "Essentials Kit",
        short: "ESK",
        include: false
      },
      FRAIF: {
        full: "Forgotten Realms: Adventures in Faer\xFBn",
        short: "FRAIF",
        include: false
      },
      FRHOF: {
        full: "Forgotten Realms: Heroes of Faer\xFBn",
        short: "FRHOF",
        include: false
      },
      FTD: {
        full: "Fizban's Treasury of Dragons",
        short: "FTD",
        include: false
      },
      GGR: {
        full: "Guildmasters' Guide to Ravnica",
        short: "GGR",
        include: false
      },
      GOS: {
        full: "Ghosts of Saltmarsh",
        short: "GOS",
        include: false
      },
      GOTSF: {
        full: "Giants of the Star Forge",
        short: "GOTSF",
        include: false
      },
      "HAT-LMI": {
        full: "Honor Among Thieves: Legendary Magic Items",
        short: "HAT-LMI",
        include: false
      },
      HFTT: {
        full: "Hunt for the Thessalhydra",
        short: "HFTT",
        include: false
      },
      HOL: {
        full: "Ravenloft: The House of Lament",
        short: "HOL",
        include: false
      },
      HOTB: {
        full: "Heroes of the Borderlands",
        short: "HOTB",
        include: false
      },
      HOTDQ: {
        full: "Hoard of the Dragon Queen",
        short: "HOTDQ",
        include: false
      },
      IDROTF: {
        full: "Icewind Dale: Rime of the Frostmaiden",
        short: "IDROTF",
        include: false
      },
      IMR: {
        full: "Infernal Machine Rebuild",
        short: "IMR",
        include: false
      },
      JTTRC: {
        full: "Journeys Through the Radiant Citadel",
        short: "JTTRC",
        include: false
      },
      KFTGV: {
        full: "Keys from the Golden Vault",
        short: "KFTGV",
        include: false
      },
      KKW: {
        full: "Krenko's Way",
        short: "KKW",
        include: false
      },
      LFL: {
        full: "Lorwyn: First Light",
        short: "LFL",
        include: false
      },
      LLK: {
        full: "Lost Library of Kwalish",
        short: "LLK",
        include: false
      },
      LMOP: {
        full: "Lost Mine of Phandelver",
        short: "LMOP",
        include: false
      },
      LOX: {
        full: "Light of Xaryxis",
        short: "LOX",
        include: false
      },
      LR: {
        full: "Locathah Rising",
        short: "LR",
        include: false
      },
      LRDT: {
        full: "Red Dragon's Tale: A LEGO Adventure",
        short: "LRDT",
        include: false
      },
      MABJOV: {
        full: "Minsc and Boo's Journal of Villainy",
        short: "MABJOV",
        include: false
      },
      MCV1SC: {
        full: "Monstrous Compendium Volume 1: Spelljammer Creatures",
        short: "MCV1SC",
        include: false
      },
      MCV2DC: {
        full: "Monstrous Compendium Volume 2: Dragonlance Creatures",
        short: "MCV2DC",
        include: false
      },
      MCV3MC: {
        full: "Monstrous Compendium Volume 3: Minecraft Creatures",
        short: "MCV3MC",
        include: false
      },
      MCV4EC: {
        full: "Monstrous Compendium Volume 4: Eldraine Creatures",
        short: "MCV4EC",
        include: false
      },
      MFF: {
        full: "Mordenkainen's Fiendish Folio",
        short: "MFF",
        include: false
      },
      MGELFT: {
        full: "Muk's Guide to Everything He Learned From Tasha",
        short: "MGELFT",
        include: false
      },
      MISMV1: {
        full: "Misplaced Monsters: Volume 1",
        short: "MISMV1",
        include: false
      },
      MOT: {
        full: "Mythic Odysseys of Theros",
        short: "MOT",
        include: false
      },
      MPP: {
        full: "Morte's Planar Parade",
        short: "MPP",
        include: false
      },
      MTF: {
        full: "Mordenkainen\u2019s Tome of Foes",
        short: "MTF",
        include: false
      },
      NF: {
        full: "Netheril's Fall",
        short: "NF",
        include: false
      },
      "NRH-AT": {
        full: "NRH: Adventure Together",
        short: "NRH-AT",
        include: false
      },
      "NRH-TLT": {
        full: "NRH: The Lost Tomb",
        short: "NRH-TLT",
        include: false
      },
      OGA: {
        full: "One Grung Above",
        short: "OGA",
        include: false
      },
      OOTA: {
        full: "Out of the Abyss",
        short: "OOTA",
        include: false
      },
      OOW: {
        full: "The Orrery of the Wanderer",
        short: "OOW",
        include: false
      },
      PABTSO: {
        full: "Phandelver and Below: The Shattered Obelisk",
        short: "PABTSO",
        include: false
      },
      POTA: {
        full: "Princes of the Apocalypse",
        short: "POTA",
        include: false
      },
      PSX: {
        full: "Plane Shift: Ixalan",
        short: "PSX",
        include: false
      },
      QFTIS: {
        full: "Quests from the Infinite Staircase",
        short: "QFTIS",
        include: false
      },
      RMBRE: {
        full: "The Lost Dungeon of Rickedness: Big Rick Energy",
        short: "RMBRE",
        include: false
      },
      ROT: {
        full: "Rise of Tiamat",
        short: "ROT",
        include: false
      },
      ROTOS: {
        full: "The Rise of Tiamat Online Supplement",
        short: "ROTOS",
        include: false
      },
      RTG: {
        full: "Return to the Glory",
        short: "RTG",
        include: false
      },
      SADS: {
        full: "Sapphire Anniversary Dice Set",
        short: "SADS",
        include: false
      },
      SATO: {
        full: "Sigil and the Outlands",
        short: "SATO",
        include: false
      },
      SCC: {
        full: "Strixhaven: A Curriculum of Chaos",
        short: "SCC",
        include: false
      },
      SDW: {
        full: "ESK: Sleeping Dragon's Wake",
        short: "SDW",
        include: false
      },
      SKT: {
        full: "Storm King's Thunder",
        short: "SKT",
        include: false
      },
      SLW: {
        full: "ESK: Storm Lord's Wrath",
        short: "SLW",
        include: false
      },
      TFTYP: {
        full: "TftYP: Against the Giants",
        short: "TFTYP",
        include: false
      },
      TOA: {
        full: "Tomb of Annihilation",
        short: "TOA",
        include: false
      },
      TOFW: {
        full: "Turn of Fortune's Wheel",
        short: "TOFW",
        include: false
      },
      TTP: {
        full: "The Tortle Package",
        short: "TTP",
        include: false
      },
      UTHFTLH: {
        full: "UTHFTLH",
        short: "UTHFTLH",
        include: false
      },
      VD: {
        full: "Vecna Dossier",
        short: "VD",
        include: false
      },
      VEOR: {
        full: "Vecna: Eve of Ruin",
        short: "VEOR",
        include: false
      },
      VGM: {
        full: "Volo's Guide to Monsters",
        short: "VGM",
        include: false
      },
      VRGR: {
        full: "Van Richten's Guide to Ravenloft",
        short: "VRGR",
        include: false
      },
      WBTW: {
        full: "The Wild Beyond the Witchlight",
        short: "WBTW",
        include: false
      },
      WDH: {
        full: "Waterdeep: Dragon Heist",
        short: "WDH",
        include: false
      },
      WDMM: {
        full: "Waterdeep: Dungeon of the Mad Mage",
        short: "WDMM",
        include: false
      },
      WTTHC: {
        full: "Stranger Things: Welcome to the Hellfire Club",
        short: "WTTHC",
        include: false
      },
      XMTS: {
        full: "X Marks the Spot",
        short: "XMTS",
        include: false
      }
    };
  }
});

// src/spell-source-list.json
var require_spell_source_list = __commonJS({
  "src/spell-source-list.json"(exports2, module2) {
    module2.exports = [
      "AAG",
      "AI",
      "AITFR-AVT",
      "BMT",
      "EFA",
      "EGW",
      "FRHOF",
      "FTD",
      "GGR",
      "IDROTF",
      "LLK",
      "PHB",
      "SATO",
      "SCC",
      "TCE",
      "XGE",
      "XPHB"
    ];
  }
});

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => MyToolkitPlugin
});
module.exports = __toCommonJS(main_exports);
var path6 = __toESM(require("path"));
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

// src/formatters/SpellFormatter.ts
var path3 = __toESM(require("path"));

// src/settings.ts
var SOURCE_LIST = require_source_list();
var DEFAULT_SETTINGS = {
  githubToken: "",
  includedSources: []
};
function normalizeSourceKey(source) {
  return source.toUpperCase();
}
function getDefaultIncludedSources() {
  return Object.entries(SOURCE_LIST).filter(([, source]) => source.include).map(([sourceKey]) => normalizeSourceKey(sourceKey));
}
function getSourceLabel(source) {
  const sourceInfo = SOURCE_LIST[normalizeSourceKey(source)];
  return sourceInfo?.short ?? source;
}

// src/formatters/SpellFormatter.ts
var LEVEL_NAMES = {
  0: "Cantrip",
  1: "1st-level",
  2: "2nd-level",
  3: "3rd-level"
};
var SpellFormatter = class extends BaseFormatter {
  async load(dataDir) {
    const spells = await loadJsonData(
      path3.join(dataDir, "cache", "spells.json"),
      "spell"
    );
    return spells.map((spell) => this.format(spell));
  }
  format(spell) {
    const sourceLabel = getSourceLabel(spell.source);
    const levelText = LEVEL_NAMES[spell.level] ?? `${spell.level}th-level`;
    const pageText = spell.page ? `, p. ${spell.page}` : "";
    const higherLevel = spell.higherLevel?.length ? `
### At Higher Levels

${spell.higherLevel.join("\n\n")}
` : "";
    return {
      label: `${spell.name} (${sourceLabel})`,
      source: spell.source,
      body: `## ${spell.name}

*${levelText} ${spell.school} (${sourceLabel}${pageText})*

| Field | Value |
| ----- | ----- |
| Casting Time | ${spell.castingTime} |
| Range | ${spell.range} |
| Components | ${spell.components} |
| Duration | ${spell.duration} |

${spell.entries.join("\n\n")}
${higherLevel}`
    };
  }
};

// src/registry.ts
var registry = {
  books: new BookFormatter(),
  movies: new MovieFormatter(),
  spells: new SpellFormatter()
};

// src/deployer.ts
var fs2 = __toESM(require("fs"));
var path4 = __toESM(require("path"));
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
    const hotkeysPath = path4.join(this.opts.vaultPath, ".obsidian", "hotkeys.json");
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

// src/utils/databaseCache.ts
var fs3 = __toESM(require("fs"));
var path5 = __toESM(require("path"));
var import_obsidian = require("obsidian");
var SPELL_SOURCE_LIST = require_spell_source_list();
var SPELL_SOURCE_SET = new Set(SPELL_SOURCE_LIST.map(normalizeSourceKey));
var CACHE_METADATA_FILE = ".database-cache.json";
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
  return path5.join(pluginDir, "cache");
}
async function hasDatabaseCache(pluginDir, includedSources) {
  const cacheDir = getCacheDir(pluginDir);
  const results = await Promise.all(
    DATABASE_FILES.map((file) => hasFile(path5.join(cacheDir, file.name)))
  );
  return results.every(Boolean) && await hasFile(path5.join(cacheDir, "spells.json")) && await hasMatchingCacheMetadata(cacheDir, includedSources);
}
async function refreshDatabaseCache(pluginDir, githubToken, includedSources) {
  const cacheDir = getCacheDir(pluginDir);
  await fs3.promises.mkdir(cacheDir, { recursive: true });
  await Promise.all(
    DATABASE_FILES.map((file) => writeJsonCacheFile(cacheDir, file, githubToken))
  );
  await refreshSourceFilteredDatabaseCache(pluginDir, githubToken, includedSources);
}
async function refreshSourceFilteredDatabaseCache(pluginDir, githubToken, includedSources) {
  const cacheDir = getCacheDir(pluginDir);
  await fs3.promises.mkdir(cacheDir, { recursive: true });
  const selectedSpellSources = getSelectedSpellSources(includedSources);
  const sourceSpellGroups = await Promise.all(
    selectedSpellSources.map((sourceKey) => fetchJsonArrayFromGithub(
      getSpellSourceUrl(sourceKey),
      githubToken,
      `${sourceKey} spells`
    ))
  );
  const spells = sourceSpellGroups.flat().sort((left, right) => {
    const byName = String(left.name).localeCompare(String(right.name));
    return byName || String(left.source).localeCompare(String(right.source));
  });
  await fs3.promises.writeFile(
    path5.join(cacheDir, "spells.json"),
    JSON.stringify(spells, null, 2),
    "utf-8"
  );
  await writeCacheMetadata(cacheDir, includedSources);
}
async function writeJsonCacheFile(cacheDir, file, githubToken) {
  const data = await fetchJsonArrayFromGithub(file.sourceUrl, githubToken, file.description);
  await fs3.promises.writeFile(
    path5.join(cacheDir, file.name),
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}
async function fetchJsonArrayFromGithub(sourceUrl, githubToken, description) {
  const headers = {
    Accept: "application/vnd.github.raw+json",
    "X-GitHub-Api-Version": "2022-11-28"
  };
  if (githubToken.trim()) {
    headers.Authorization = `Bearer ${githubToken.trim()}`;
  }
  const response = await (0, import_obsidian.requestUrl)({
    url: sourceUrl,
    method: "GET",
    headers
  });
  const data = response.json;
  if (!Array.isArray(data)) {
    throw new Error(`Remote ${description} data is not a JSON array.`);
  }
  return data;
}
function getSelectedSpellSources(includedSources) {
  return includedSources.map(normalizeSourceKey).filter((sourceKey) => SPELL_SOURCE_SET.has(sourceKey)).sort();
}
function getSpellSourceUrl(sourceKey) {
  return `https://api.github.com/repos/guykahalani/my-toolkit-plugin/contents/data/spells/${sourceKey.toLowerCase()}.json?ref=main`;
}
async function hasFile(filePath) {
  try {
    await fs3.promises.access(filePath, fs3.constants.R_OK);
    return true;
  } catch {
    return false;
  }
}
async function hasMatchingCacheMetadata(cacheDir, includedSources) {
  try {
    const metadata = JSON.parse(
      await fs3.promises.readFile(path5.join(cacheDir, CACHE_METADATA_FILE), "utf-8")
    );
    return sourcesMatch(metadata.includedSources ?? [], includedSources);
  } catch {
    return false;
  }
}
async function writeCacheMetadata(cacheDir, includedSources) {
  await fs3.promises.writeFile(
    path5.join(cacheDir, CACHE_METADATA_FILE),
    JSON.stringify({ includedSources: normalizeSources(includedSources) }, null, 2),
    "utf-8"
  );
}
function sourcesMatch(left, right) {
  return JSON.stringify(normalizeSources(left)) === JSON.stringify(normalizeSources(right));
}
function normalizeSources(sources) {
  return sources.map(normalizeSourceKey).sort();
}

// src/main.ts
var PRIORITY_SOURCE_KEYS = ["PHB", "XPHB", "DMG", "XDMG", "MM", "XMM"];
var MyToolkitPlugin = class extends import_obsidian2.Plugin {
  constructor() {
    super(...arguments);
    this.settings = DEFAULT_SETTINGS;
    this.pluginDir = "";
    this.sourceRefreshTimer = null;
  }
  async onload() {
    console.log("[Toolkit] Loading...");
    await this.loadSettings();
    const vaultPath = this.app.vault.adapter.getBasePath();
    this.pluginDir = path6.join(vaultPath, this.app.vault.configDir, "plugins", this.manifest.id);
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
        const items = await formatter.load(this.pluginDir);
        return this.filterItemsBySource(items);
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
    if (this.sourceRefreshTimer) {
      clearTimeout(this.sourceRefreshTimer);
    }
    delete globalThis.__toolkit;
    console.log("[Toolkit] Unloaded. Bridge removed.");
  }
  async loadSettings() {
    const loadedSettings = await this.loadData();
    this.settings = Object.assign({}, DEFAULT_SETTINGS, loadedSettings);
    if (!Array.isArray(loadedSettings?.includedSources)) {
      this.settings.includedSources = getDefaultIncludedSources();
    }
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  async ensureDatabaseCache() {
    if (await hasDatabaseCache(this.pluginDir, this.settings.includedSources)) {
      return;
    }
    await this.refreshToolkitDatabase(false);
  }
  async refreshToolkitDatabase(showSuccessNotice) {
    try {
      await refreshDatabaseCache(this.pluginDir, this.settings.githubToken, this.settings.includedSources);
      if (showSuccessNotice) {
        new import_obsidian2.Notice("Toolkit database refreshed.");
      }
      console.log("[Toolkit] Database cache refreshed.");
    } catch (error) {
      console.error("[Toolkit] Failed to refresh database cache:", error);
      new import_obsidian2.Notice("Toolkit database refresh failed. For a private repo, add a GitHub token in plugin settings.");
    }
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
  async refreshSourceFilteredCache() {
    try {
      await refreshSourceFilteredDatabaseCache(
        this.pluginDir,
        this.settings.githubToken,
        this.settings.includedSources
      );
      console.log("[Toolkit] Source-filtered database cache refreshed.");
    } catch (error) {
      console.error("[Toolkit] Failed to refresh source-filtered database cache:", error);
      new import_obsidian2.Notice("Toolkit source cache refresh failed. Check the developer console.");
    }
  }
  filterItemsBySource(items) {
    const includedSources = new Set(this.settings.includedSources.map(normalizeSourceKey));
    return items.filter((item) => !item.source || includedSources.has(normalizeSourceKey(item.source)));
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
    new import_obsidian2.Setting(containerEl).setName("D&D sources").setDesc("Choose which sources appear in D&D search results.").addButton((button) => {
      button.setButtonText("Defaults").onClick(async () => {
        this.plugin.settings.includedSources = getDefaultIncludedSources();
        await this.plugin.saveSettings();
        this.plugin.scheduleSourceFilteredCacheRefresh();
        this.display();
      });
    }).addButton((button) => {
      button.setButtonText("All").onClick(async () => {
        this.plugin.settings.includedSources = Object.keys(SOURCE_LIST).map(normalizeSourceKey);
        await this.plugin.saveSettings();
        this.plugin.scheduleSourceFilteredCacheRefresh();
        this.display();
      });
    }).addButton((button) => {
      button.setButtonText("None").onClick(async () => {
        this.plugin.settings.includedSources = [];
        await this.plugin.saveSettings();
        this.plugin.scheduleSourceFilteredCacheRefresh();
        this.display();
      });
    });
    const includedSources = new Set(this.plugin.settings.includedSources.map(normalizeSourceKey));
    Object.entries(SOURCE_LIST).sort(compareSourcesForSettings).forEach(([sourceKey, source]) => {
      const normalizedSourceKey = normalizeSourceKey(sourceKey);
      new import_obsidian2.Setting(containerEl).setName(`${source.short} - ${source.full}`).addToggle((toggle) => {
        toggle.setValue(includedSources.has(normalizedSourceKey)).onChange(async (value) => {
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
};
function compareSourcesForSettings([leftKey, leftSource], [rightKey, rightSource]) {
  const leftPriority = PRIORITY_SOURCE_KEYS.indexOf(normalizeSourceKey(leftKey));
  const rightPriority = PRIORITY_SOURCE_KEYS.indexOf(normalizeSourceKey(rightKey));
  if (leftPriority !== -1 || rightPriority !== -1) {
    if (leftPriority === -1) return 1;
    if (rightPriority === -1) return -1;
    return leftPriority - rightPriority;
  }
  return leftSource.full.localeCompare(rightSource.full) || leftKey.localeCompare(rightKey);
}
var TypeSelectionModal = class extends import_obsidian2.FuzzySuggestModal {
  constructor(app, onSelect) {
    super(app);
    this.onSelect = onSelect;
    this.setPlaceholder("Choose what to insert...");
  }
  getItems() {
    return [
      { label: "Insert book", value: "books" },
      { label: "Insert movie", value: "movies" },
      { label: "Insert spell", value: "spells" }
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
