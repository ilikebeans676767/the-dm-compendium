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
      "AITFR-DN": {
        full: "Adventures in the Forgotten Realms: Deepest Night",
        short: "AITFR-DN",
        include: false
      },
      "AITFR-FCD": {
        full: "Adventures in the Forgotten Realms: From Cyan Depths",
        short: "AITFR-FCD",
        include: false
      },
      "AITFR-ISF": {
        full: "Adventures in the Forgotten Realms: In Scarlet Flames",
        short: "AITFR-ISF",
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
      "HAT-TG": {
        full: "Honor Among Thieves: Thieves' Gallery",
        short: "HAT-TG",
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
      "NRH-ASS": {
        full: "NERDS Restoring Harmony: A Sticky Situation",
        short: "NRH-ASS",
        include: false
      },
      "NRH-AVITW": {
        full: "NERDS Restoring Harmony: A Voice in the Wilderness",
        short: "NRH-AVITW",
        include: false
      },
      "NRH-AWOL": {
        full: "NERDS Restoring Harmony: A Web of Lies",
        short: "NRH-AWOL",
        include: false
      },
      "NRH-COI": {
        full: "NERDS Restoring Harmony: Circus of Illusion",
        short: "NRH-COI",
        include: false
      },
      "NRH-TCMC": {
        full: "NERDS Restoring Harmony: The Candy Mountain Caper",
        short: "NRH-TCMC",
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
      PSA: {
        full: "Plane Shift: Amonkhet",
        short: "PSA",
        include: false
      },
      PSD: {
        full: "Plane Shift: Dominaria",
        short: "PSD",
        include: false
      },
      PSI: {
        full: "Plane Shift: Innistrad",
        short: "PSI",
        include: false
      },
      PSK: {
        full: "Plane Shift: Kaladesh",
        short: "PSK",
        include: false
      },
      PSX: {
        full: "Plane Shift: Ixalan",
        short: "PSX",
        include: false
      },
      PSZ: {
        full: "Plane Shift: Zendikar",
        short: "PSZ",
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
      SCAG: {
        full: "Sword Coast Adventurer's Guide",
        short: "SCAG",
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

// src/monster-source-list.json
var require_monster_source_list = __commonJS({
  "src/monster-source-list.json"(exports2, module2) {
    module2.exports = [
      "AATM",
      "ABH",
      "AI",
      "AITFR-DN",
      "AITFR-FCD",
      "AITFR-ISF",
      "AITFR-THP",
      "AWM",
      "BAM",
      "BGDIA",
      "BGG",
      "BMT",
      "CM",
      "COA",
      "COS",
      "CRCOTN",
      "DC",
      "DIP",
      "DITLCOT",
      "DMG",
      "DOD",
      "DOSI",
      "DSOTDQ",
      "EFA",
      "EGW",
      "ERLW",
      "ESK",
      "FRAIF",
      "FTD",
      "GGR",
      "GOS",
      "GOTSF",
      "HAT-TG",
      "HFTT",
      "HOL",
      "HOTB",
      "HOTDQ",
      "IDROTF",
      "IMR",
      "JTTRC",
      "KFTGV",
      "KKW",
      "LFL",
      "LLK",
      "LMOP",
      "LOX",
      "LR",
      "LRDT",
      "MABJOV",
      "MCV1SC",
      "MCV2DC",
      "MCV3MC",
      "MCV4EC",
      "MFF",
      "MGELFT",
      "MISMV1",
      "MM",
      "MOT",
      "MPMM",
      "MPP",
      "MTF",
      "NF",
      "NRH-ASS",
      "NRH-AT",
      "NRH-AVITW",
      "NRH-AWOL",
      "NRH-COI",
      "NRH-TCMC",
      "OOTA",
      "OOW",
      "PABTSO",
      "PHB",
      "POTA",
      "PSA",
      "PSD",
      "PSI",
      "PSK",
      "PSX",
      "PSZ",
      "QFTIS",
      "RMBRE",
      "ROT",
      "RTG",
      "SADS",
      "SCC",
      "SDW",
      "SKT",
      "SLW",
      "TCE",
      "TFTYP",
      "TOA",
      "TOFW",
      "TTP",
      "VD",
      "VEOR",
      "VGM",
      "VRGR",
      "WBTW",
      "WDH",
      "WDMM",
      "WTTHC",
      "XDMG",
      "XGE",
      "XMM",
      "XPHB"
    ];
  }
});

// src/item-source-list.json
var require_item_source_list = __commonJS({
  "src/item-source-list.json"(exports2, module2) {
    module2.exports = [
      "AAG",
      "AI",
      "AITFR-AVT",
      "AITFR-THP",
      "AZFYT",
      "BAM",
      "BGDIA",
      "BGG",
      "BMT",
      "CM",
      "COA",
      "COS",
      "CRCOTN",
      "DC",
      "DITLCOT",
      "DMG",
      "DSOTDQ",
      "EET",
      "EFA",
      "EGW",
      "ERLW",
      "FRAIF",
      "FRHOF",
      "FTD",
      "GGR",
      "GOS",
      "HAT-LMI",
      "HFTT",
      "HOTB",
      "HOTDQ",
      "IDROTF",
      "IMR",
      "JTTRC",
      "KFTGV",
      "LFL",
      "LLK",
      "LMOP",
      "LOX",
      "MCV2DC",
      "MM",
      "MOT",
      "MTF",
      "NF",
      "NRH-AT",
      "NRH-TLT",
      "OGA",
      "OOTA",
      "PABTSO",
      "PHB",
      "POTA",
      "PSX",
      "QFTIS",
      "RMBRE",
      "ROT",
      "ROTOS",
      "SATO",
      "SCAG",
      "SCC",
      "SDW",
      "SKT",
      "TCE",
      "TFTYP",
      "TOA",
      "TTP",
      "UTHFTLH",
      "VEOR",
      "VGM",
      "VRGR",
      "WBTW",
      "WDH",
      "WDMM",
      "WTTHC",
      "XDMG",
      "XGE",
      "XMM",
      "XMTS",
      "XPHB"
    ];
  }
});

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => main_default
});
module.exports = __toCommonJS(main_exports);

// src/plugin/MyToolkitPlugin.ts
var path6 = __toESM(require("path"));
var import_obsidian6 = require("obsidian");

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

// src/formatters/ItemFormatter.ts
var path2 = __toESM(require("path"));

// src/formatters/BaseFormatter.ts
var BaseFormatter = class {
};

// src/utils/dataLoader.ts
var fs2 = __toESM(require("fs"));
var cache = /* @__PURE__ */ new Map();
async function loadJsonData(jsonPath, description) {
  try {
    const stat = await fs2.promises.stat(jsonPath);
    const cached = cache.get(jsonPath);
    if (cached && cached.mtimeMs === stat.mtimeMs) {
      return cached.data;
    }
    const fileContents = await fs2.promises.readFile(jsonPath, "utf-8");
    const data = JSON.parse(fileContents);
    cache.set(jsonPath, { mtimeMs: stat.mtimeMs, data });
    return data;
  } catch (error) {
    console.error(`[Toolkit] Failed to load ${description} data from ${jsonPath}:`, error);
    return [];
  }
}

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

// src/formatters/ItemFormatter.ts
var ItemFormatter = class extends BaseFormatter {
  async load(dataDir) {
    const items = await loadJsonData(
      path2.join(dataDir, "cache", "items.json"),
      "item"
    );
    return items.map((item) => this.format(item));
  }
  format(item) {
    const sourceLabel = getSourceLabel(item.source);
    return {
      label: `${item.name} (${sourceLabel})`,
      source: item.source,
      body: `\`\`\`itemcard
name: ${yamlScalar(item.name)}
source: ${yamlScalar(sourceLabel)}
${item.page ? `page: ${item.page}
` : ""}type: ${yamlScalar(item.type)}
rarity: ${yamlScalar(item.rarity)}
attunement: ${yamlScalar(item.attunement)}
weight: ${yamlScalar(item.weight)}
value: ${yamlScalar(item.value)}
valueRarity: ${yamlScalar(item.valueRarity)}
weaponCategory: ${yamlScalar(item.weaponCategory)}
armorClass: ${yamlScalar(item.armorClass)}
damage: ${yamlScalar(item.damage)}
range: ${yamlScalar(item.range)}
properties:${formatYamlListValue(item.properties)}
mastery:${formatYamlListValue(item.mastery)}
entries:${formatYamlEntryListValue(item.entries)}
\`\`\``
    };
  }
};
function formatYamlListValue(items) {
  return formatYamlListItems(items, "\n");
}
function formatYamlEntryListValue(items) {
  return formatYamlListItems(items, "\n\n");
}
function formatYamlListItems(items, separator) {
  if (!items?.length) {
    return " []";
  }
  return `
${items.map((item) => {
    const lines = item.split(/\r?\n/);
    return [`  - |-`, ...lines.map((line) => `    ${line}`)].join("\n");
  }).join(separator)}`;
}
function yamlScalar(value) {
  if (value === void 0 || value === null || value === "") {
    return '""';
  }
  return JSON.stringify(String(value));
}

// src/formatters/MonsterFormatter.ts
var path3 = __toESM(require("path"));
var ABILITY_LABELS = ["str", "dex", "con", "int", "wis", "cha"];
var SAVE_KEYS = {
  str: "strength",
  dex: "dexterity",
  con: "constitution",
  int: "intelligence",
  wis: "wisdom",
  cha: "charisma"
};
var MonsterFormatter = class extends BaseFormatter {
  async load(dataDir) {
    const monsters = await loadJsonData(
      path3.join(dataDir, "cache", "bestiary.json"),
      "monster"
    );
    return monsters.map((monster) => this.format(monster));
  }
  format(monster) {
    const sourceLabel = getSourceLabel(monster.source);
    const typeParts = splitType(monster.type);
    return {
      label: `${monster.name} (${sourceLabel})`,
      source: monster.source,
      body: `\`\`\`statblock
layout: Basic 5e Layout
name: ${yamlScalar2(monster.name)}
image: [[${monster.name}.jpg]]
size: ${yamlScalar2(monster.size)}
type: ${yamlScalar2(typeParts.type)}
subtype: ${yamlScalar2(typeParts.subtype)}
alignment: ${yamlScalar2(monster.alignment)}
ac: ${yamlValue(parseLeadingNumber(monster.armorClass) ?? monster.armorClass)}
hp: ${yamlValue(parseLeadingNumber(monster.hitPoints) ?? monster.hitPoints)}
hit_dice: ${yamlScalar2(parseHitDice(monster.hitPoints))}
speed: ${yamlScalar2(formatStatblockSpeed(monster.speed))}
stats: [${ABILITY_LABELS.map((ability) => monster.abilities[ability]).join(", ")}]
saves:${formatKeyValueList(monster.savingThrows, SAVE_KEYS)}
skillsaves:${formatKeyValueList(monster.skills)}
senses: ${yamlScalar2(monster.senses)}
languages: ${yamlScalar2(monster.languages)}
damage_resistances: ${yamlScalar2(monster.damageResistances)}
damage_immunities: ${yamlScalar2(monster.damageImmunities)}
condition_immunities: ${yamlScalar2(monster.conditionImmunities)}
cr: ${yamlScalar2(monster.challengeRating)}
traits:${formatNamedEntries(monster.traits)}
actions:${formatNamedEntries([...monster.actions, ...monster.bonusActions])}
reactions:${formatNamedEntries(monster.reactions)}
legendary_actions:${formatNamedEntries(monster.legendaryActions)}
mythic_actions:${formatNamedEntries(monster.mythicActions)}
lair_actions:${formatNamedEntries(monster.lairActions)}
spells:${formatSpellcasting(monster.spellcasting)}
source: ${yamlScalar2(sourceLabel)}
page: ${yamlValue(monster.page ?? "")}
\`\`\``
    };
  }
};
function splitType(type) {
  const match = type.match(/^(.+?)\s*\((.+)\)$/);
  return match ? { type: match[1], subtype: match[2] } : { type, subtype: "" };
}
function parseLeadingNumber(value) {
  const match = value.match(/^(\d+)/);
  return match ? Number(match[1]) : null;
}
function parseHitDice(value) {
  const match = value.match(/\(([^)]+)\)/);
  if (!match) {
    return "";
  }
  return match[1].replace(/\s*[+-]\s*\d+$/, "").trim();
}
function formatStatblockSpeed(speed) {
  return speed.replace(/\bwalk\s+/gi, "");
}
function formatKeyValueList(value, keyMap = {}) {
  const entries = parseKeyValueString(value, keyMap);
  if (!entries.length) {
    return " []";
  }
  return `
${entries.map(([key, entryValue]) => `  - ${key}: ${entryValue}`).join("\n")}`;
}
function parseKeyValueString(value, keyMap) {
  if (!value) {
    return [];
  }
  return value.split(",").map((part) => {
    const [rawKey, ...rawValue] = part.split(":");
    if (!rawKey || !rawValue.length) {
      return null;
    }
    const normalizedKey = rawKey.trim().toLowerCase();
    const key = keyMap[normalizedKey] ?? normalizedKey;
    const stringValue = rawValue.join(":").trim();
    const numberValue = Number(stringValue.replace(/^\+/, ""));
    return [key, Number.isFinite(numberValue) ? numberValue : stringValue];
  }).filter((entry) => Boolean(entry));
}
function formatNamedEntries(entries) {
  if (!entries.length) {
    return " []";
  }
  return `
${entries.map(formatNamedEntry).join("\n")}`;
}
function formatNamedEntry(entry) {
  return [
    `  - name: ${yamlScalar2(entry.name)}`,
    `    desc:${formatBlockText(joinEntries(entry.entries), 6)}`
  ].join("\n");
}
function formatSpellcasting(entries) {
  const spellLines = entries.flatMap((entry) => {
    const body = entry.entries.map((line) => line.trim()).filter(Boolean);
    return entry.name && entry.name !== "Spellcasting" ? [`${entry.name}. ${body[0] ?? ""}`.trim(), ...body.slice(1)] : body;
  });
  if (!spellLines.length) {
    return " []";
  }
  return `
${spellLines.map((line) => `  -${formatBlockText(line, 4)}`).join("\n")}`;
}
function joinEntries(entries) {
  return entries.map((entry) => entry.trim()).filter(Boolean).join("\n\n");
}
function formatBlockText(value, indent) {
  const indentation = " ".repeat(indent);
  const lines = value.split(/\r?\n/);
  return ` |-
${lines.map((line) => `${indentation}${line}`).join("\n")}`;
}
function yamlValue(value) {
  return typeof value === "number" ? String(value) : yamlScalar2(value);
}
function yamlScalar2(value) {
  if (value === void 0 || value === null || value === "") {
    return '""';
  }
  return JSON.stringify(String(value));
}

// src/formatters/SpellFormatter.ts
var path4 = __toESM(require("path"));
function formatYamlEntryListValue2(items) {
  return formatYamlListItems2(items, "\n\n");
}
function formatYamlListItems2(items, separator) {
  if (!items?.length) {
    return " []";
  }
  return `
${items.map((item) => {
    const lines = item.split(/\r?\n/);
    return [`  - |-`, ...lines.map((line) => `    ${line}`)].join("\n");
  }).join(separator)}`;
}
var SpellFormatter = class extends BaseFormatter {
  async load(dataDir) {
    const spells = await loadJsonData(
      path4.join(dataDir, "cache", "spells.json"),
      "spell"
    );
    return spells.map((spell) => this.format(spell));
  }
  format(spell) {
    const sourceLabel = getSourceLabel(spell.source);
    return {
      label: `${spell.name} (${sourceLabel})`,
      source: spell.source,
      body: `\`\`\`spellcard
name: ${JSON.stringify(spell.name)}
source: ${JSON.stringify(sourceLabel)}
${spell.page ? `page: ${spell.page}
` : ""}level: ${spell.level}
school: ${JSON.stringify(spell.school.toLowerCase())}
castingTime: ${JSON.stringify(spell.castingTime)}
range: ${JSON.stringify(spell.range)}
components: ${JSON.stringify(spell.components)}
duration: ${JSON.stringify(spell.duration)}
entries:${formatYamlEntryListValue2(spell.entries)}
higherLevel:${formatYamlEntryListValue2(spell.higherLevel)}
\`\`\``
    };
  }
};

// src/registry.ts
var registry = {
  bestiary: new MonsterFormatter(),
  items: new ItemFormatter(),
  monsters: new MonsterFormatter(),
  spells: new SpellFormatter()
};

// src/ui/ToolkitSettingTab.ts
var import_obsidian = require("obsidian");
var PRIORITY_SOURCE_KEYS = ["PHB", "XPHB", "DMG", "XDMG", "MM", "XMM"];
var ToolkitSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.sourceSearchQuery = "";
    this.sourceSearchTimer = null;
    this.plugin = plugin;
  }
  display() {
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
  renderGithubTokenSetting(containerEl) {
    new import_obsidian.Setting(containerEl).setName("GitHub token").setDesc("Fine-grained token with read-only Contents access to the private data repository.").addText((text) => {
      text.setPlaceholder("github_pat_...").setValue(this.plugin.settings.githubToken).onChange(async (value) => {
        this.plugin.settings.githubToken = value.trim();
        await this.plugin.saveSettings();
      });
      text.inputEl.type = "password";
    });
  }
  renderSourceActions(containerEl) {
    new import_obsidian.Setting(containerEl).setName("D&D sources").setDesc("Choose which sources appear in D&D search results.").addButton((button) => {
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
  }
  renderSourceSearch(containerEl, sourceListEl) {
    new import_obsidian.Setting(containerEl).setName("Search sources").addText((text) => {
      text.setPlaceholder("Type a source name or abbreviation...").setValue(this.sourceSearchQuery).onChange((value) => {
        if (this.sourceSearchTimer) {
          clearTimeout(this.sourceSearchTimer);
        }
        this.sourceSearchTimer = setTimeout(() => {
          this.sourceSearchTimer = null;
          this.sourceSearchQuery = value;
          this.renderSourceSettings(sourceListEl);
        }, 200);
      });
    }).addButton((button) => {
      button.setButtonText("Clear").onClick(() => {
        this.sourceSearchQuery = "";
        this.display();
      });
    });
  }
  renderSourceSettings(containerEl) {
    containerEl.empty();
    const includedSources = new Set(this.plugin.settings.includedSources.map(normalizeSourceKey));
    const sourceEntries = Object.entries(SOURCE_LIST).sort(compareSourcesForSettings).filter(([sourceKey, source]) => sourceMatchesSearch(sourceKey, source, this.sourceSearchQuery));
    if (!sourceEntries.length) {
      new import_obsidian.Setting(containerEl).setName("No matching sources").setDesc("Try another source name or abbreviation.");
      return;
    }
    sourceEntries.forEach(([sourceKey, source]) => {
      const normalizedSourceKey = normalizeSourceKey(sourceKey);
      new import_obsidian.Setting(containerEl).setName(`${source.full} (${source.short})`).addToggle((toggle) => {
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
function sourceMatchesSearch(sourceKey, source, query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;
  return [
    sourceKey,
    normalizeSourceKey(sourceKey),
    source.full,
    source.short
  ].some((value) => value.toLowerCase().includes(normalizedQuery));
}
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

// src/ui/InsertModals.ts
var import_obsidian2 = require("obsidian");
async function insertFromToolkit(app, editor) {
  const typeModal = new TypeSelectionModal(app, async (selectedType) => {
    if (!selectedType) return;
    const items = await globalThis.__toolkit.getItems(selectedType);
    if (!items || items.length === 0) {
      new import_obsidian2.Notice(`No ${selectedType} found.`);
      return;
    }
    const itemModal = new ItemSelectionModal(app, items, selectedType, (selectedItem) => {
      if (selectedItem) {
        editor.replaceSelection(selectedItem.body);
        new import_obsidian2.Notice("Content inserted!");
      }
    });
    itemModal.open();
  });
  typeModal.open();
}
var TypeSelectionModal = class extends import_obsidian2.FuzzySuggestModal {
  constructor(app, onSelect) {
    super(app);
    this.onSelect = onSelect;
    this.setPlaceholder("Choose what to insert...");
  }
  getItems() {
    return [
      { label: "Insert monster", value: "monsters" },
      { label: "Insert item", value: "items" },
      { label: "Insert spell", value: "spells" }
    ];
  }
  getItemText(item) {
    return item.label;
  }
  onChooseItem(item) {
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
  onChooseItem(item) {
    this.onSelect(item);
  }
};

// src/renderers/ItemCardRenderer.ts
var import_obsidian3 = require("obsidian");
function registerItemCardProcessor(plugin) {
  plugin.registerMarkdownCodeBlockProcessor("itemcard", async (source, el, ctx) => {
    await renderItemCard(plugin, source, el, ctx);
  });
}
async function renderItemCard(plugin, source, el, ctx) {
  let item;
  try {
    item = normalizeItemCardData((0, import_obsidian3.parseYaml)(source));
  } catch (error) {
    renderError(el, error);
    return;
  }
  el.empty();
  const card = createElement("article", "toolkit-item-card");
  el.appendChild(card);
  const header = createElement("header", "toolkit-item-card__header");
  card.appendChild(header);
  header.appendChild(createElement("h2", "", item.name ?? "Unknown Item"));
  header.appendChild(createElement("p", "", getItemSubtitle(item)));
  const sourceText = getSourceText(item);
  if (sourceText) {
    header.appendChild(createElement("span", "", sourceText));
  }
  const facts = getItemFacts(item);
  if (facts.length) {
    const meta = createElement("section", "toolkit-item-card__meta");
    card.appendChild(meta);
    for (const [label, value] of facts) {
      appendMeta(meta, label, value);
    }
  }
  appendTagList(card, "Properties", item.properties);
  appendTagList(card, "Mastery", item.mastery);
  await appendMarkdownSection(plugin, card, ctx, "toolkit-item-card__body", item.entries);
}
function normalizeItemCardData(raw) {
  if (!raw || typeof raw !== "object") {
    throw new Error("Item card block must contain YAML fields.");
  }
  const item = raw;
  return {
    ...item,
    properties: normalizeStringList(item.properties),
    mastery: normalizeStringList(item.mastery),
    entries: normalizeStringList(item.entries)
  };
}
function normalizeStringList(value) {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.map((item) => item == null ? "" : String(item).trim()).filter((item) => item.length > 0);
}
function getItemSubtitle(item) {
  return [item.type, item.rarity, item.attunement].filter(Boolean).join(", ");
}
function getSourceText(item) {
  if (!item.source && !item.page) {
    return "";
  }
  return `${item.source ?? ""}${item.page ? `, p. ${item.page}` : ""}`;
}
function getItemFacts(item) {
  const facts = [
    ["Value", item.value || item.valueRarity],
    ["Weight", item.weight],
    ["Weapon", item.weaponCategory],
    ["Armor Class", item.armorClass],
    ["Damage", item.damage],
    ["Range", item.range]
  ];
  return facts.filter(([, value]) => Boolean(value));
}
function appendMeta(parent, label, value) {
  const item = createElement("div", "toolkit-item-card__meta-item");
  item.appendChild(createElement("strong", "", label));
  item.appendChild(createElement("span", "", value || "-"));
  parent.appendChild(item);
}
function appendTagList(parent, label, values) {
  if (!values?.length) {
    return;
  }
  const section = createElement("section", "toolkit-item-card__tags");
  section.appendChild(createElement("strong", "", label));
  const list = createElement("div", "toolkit-item-card__tag-list");
  section.appendChild(list);
  for (const value of values) {
    list.appendChild(createElement("span", "", value));
  }
  parent.appendChild(section);
}
async function appendMarkdownSection(plugin, parent, ctx, className, entries) {
  if (!entries?.length) {
    return;
  }
  const section = createElement("section", className);
  parent.appendChild(section);
  for (const entry of entries) {
    const entryEl = createElement("div", "toolkit-item-card__entry");
    section.appendChild(entryEl);
    await import_obsidian3.MarkdownRenderer.render(plugin.app, entry, entryEl, ctx.sourcePath, plugin);
  }
}
function renderError(el, error) {
  el.empty();
  const message = error instanceof Error ? error.message : "Unable to render item card.";
  const errorEl = createElement("div", "toolkit-item-card-error", `Invalid itemcard YAML: ${message}`);
  el.appendChild(errorEl);
}
function createElement(tagName, className = "", text = "") {
  const element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  if (text) {
    element.textContent = text;
  }
  return element;
}

// src/renderers/SpellCardRenderer.ts
var import_obsidian4 = require("obsidian");
var LEVEL_NAMES = {
  0: "Cantrip",
  1: "1st-level",
  2: "2nd-level",
  3: "3rd-level"
};
function registerSpellCardProcessor(plugin) {
  plugin.registerMarkdownCodeBlockProcessor("spellcard", async (source, el, ctx) => {
    await renderSpellCard(plugin, source, el, ctx);
  });
}
async function renderSpellCard(plugin, source, el, ctx) {
  let spell;
  try {
    spell = normalizeSpellCardData((0, import_obsidian4.parseYaml)(source));
  } catch (error) {
    renderError2(el, error);
    return;
  }
  el.empty();
  const card = createElement2("article", "toolkit-spell-card");
  el.appendChild(card);
  const header = createElement2("header", "toolkit-spell-card__header");
  card.appendChild(header);
  header.appendChild(createElement2("h2", "", spell.name ?? "Unknown Spell"));
  header.appendChild(createElement2("p", "", getSpellSubtitle(spell)));
  const sourceText = getSourceText2(spell);
  if (sourceText) {
    header.appendChild(createElement2("span", "", sourceText));
  }
  const meta = createElement2("section", "toolkit-spell-card__meta");
  card.appendChild(meta);
  appendMeta2(meta, "Casting Time", spell.castingTime);
  appendMeta2(meta, "Range", spell.range);
  appendMeta2(meta, "Components", spell.components);
  appendMeta2(meta, "Duration", spell.duration);
  await appendMarkdownSection2(plugin, card, ctx, "toolkit-spell-card__body", spell.entries);
  if (spell.higherLevel?.length) {
    const higher = createElement2("section", "toolkit-spell-card__higher");
    card.appendChild(higher);
    higher.appendChild(createElement2("h3", "", "At Higher Levels"));
    await appendMarkdownSection2(plugin, higher, ctx, "toolkit-spell-card__higher-body", spell.higherLevel);
  }
}
function normalizeSpellCardData(raw) {
  if (!raw || typeof raw !== "object") {
    throw new Error("Spell card block must contain YAML fields.");
  }
  const spell = raw;
  return {
    ...spell,
    entries: normalizeStringList2(spell.entries),
    higherLevel: normalizeStringList2(spell.higherLevel)
  };
}
function normalizeStringList2(value) {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.map((item) => item == null ? "" : String(item).trim()).filter((item) => item.length > 0);
}
function getSpellSubtitle(spell) {
  const level = Number(spell.level);
  const levelText = Number.isFinite(level) ? LEVEL_NAMES[level] ?? `${level}th-level` : "";
  return [levelText, spell.school].filter(Boolean).join(" ");
}
function getSourceText2(spell) {
  if (!spell.source && !spell.page) {
    return "";
  }
  return `${spell.source ?? ""}${spell.page ? `, p. ${spell.page}` : ""}`;
}
function appendMeta2(parent, label, value) {
  const item = createElement2("div", "toolkit-spell-card__meta-item");
  item.appendChild(createElement2("strong", "", label));
  item.appendChild(createElement2("span", "", value || "-"));
  parent.appendChild(item);
}
async function appendMarkdownSection2(plugin, parent, ctx, className, entries) {
  if (!entries?.length) {
    return;
  }
  const section = createElement2("section", className);
  parent.appendChild(section);
  for (const entry of entries) {
    const entryEl = createElement2("div", "toolkit-spell-card__entry");
    section.appendChild(entryEl);
    await import_obsidian4.MarkdownRenderer.render(plugin.app, entry, entryEl, ctx.sourcePath, plugin);
  }
}
function renderError2(el, error) {
  el.empty();
  const message = error instanceof Error ? error.message : "Unable to render spell card.";
  const errorEl = createElement2("div", "toolkit-spell-card-error", `Invalid spellcard YAML: ${message}`);
  el.appendChild(errorEl);
}
function createElement2(tagName, className = "", text = "") {
  const element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  if (text) {
    element.textContent = text;
  }
  return element;
}

// src/utils/databaseCache.ts
var fs3 = __toESM(require("fs"));
var path5 = __toESM(require("path"));
var import_obsidian5 = require("obsidian");
var SPELL_SOURCE_LIST = require_spell_source_list();
var MONSTER_SOURCE_LIST = require_monster_source_list();
var ITEM_SOURCE_LIST = require_item_source_list();
var SPELL_SOURCE_SET = new Set(SPELL_SOURCE_LIST.map(normalizeSourceKey));
var MONSTER_SOURCE_SET = new Set(MONSTER_SOURCE_LIST.map(normalizeSourceKey));
var ITEM_SOURCE_SET = new Set(ITEM_SOURCE_LIST.map(normalizeSourceKey));
var CACHE_METADATA_FILE = ".database-cache.json";
var SOURCE_FILTERED_DATABASE_FILES = [
  {
    name: "spells.json",
    description: "spells",
    sourceSet: SPELL_SOURCE_SET,
    getSourceUrl: getSpellSourceUrl
  },
  {
    name: "bestiary.json",
    description: "monsters",
    sourceSet: MONSTER_SOURCE_SET,
    getSourceUrl: getBestiarySourceUrl
  },
  {
    name: "items.json",
    description: "items",
    sourceSet: ITEM_SOURCE_SET,
    getSourceUrl: getItemSourceUrl
  }
];
function getCacheDir(pluginDir) {
  return path5.join(pluginDir, "cache");
}
async function hasDatabaseCache(pluginDir, includedSources) {
  const cacheDir = getCacheDir(pluginDir);
  const results = await Promise.all(
    SOURCE_FILTERED_DATABASE_FILES.map((file) => hasFile(path5.join(cacheDir, file.name)))
  );
  return results.every(Boolean) && await hasMatchingCacheMetadata(cacheDir, includedSources);
}
async function refreshDatabaseCache(pluginDir, githubToken, includedSources) {
  const cacheDir = getCacheDir(pluginDir);
  await fs3.promises.mkdir(cacheDir, { recursive: true });
  await refreshSourceFilteredDatabaseCache(pluginDir, githubToken, includedSources);
}
async function refreshSourceFilteredDatabaseCache(pluginDir, githubToken, includedSources) {
  const cacheDir = getCacheDir(pluginDir);
  await fs3.promises.mkdir(cacheDir, { recursive: true });
  await Promise.all(
    SOURCE_FILTERED_DATABASE_FILES.map((file) => writeSourceFilteredJsonCacheFile(
      cacheDir,
      file,
      githubToken,
      includedSources
    ))
  );
  await writeCacheMetadata(cacheDir, includedSources);
}
async function writeSourceFilteredJsonCacheFile(cacheDir, file, githubToken, includedSources) {
  const selectedSources = getSelectedSources(includedSources, file.sourceSet);
  const sourceGroups = await Promise.all(
    selectedSources.map((sourceKey) => fetchJsonArrayFromGithub(
      file.getSourceUrl(sourceKey),
      githubToken,
      `${sourceKey} ${file.description}`
    ))
  );
  const data = sourceGroups.flat().sort((left, right) => {
    const byName = String(left.name).localeCompare(String(right.name));
    return byName || String(left.source).localeCompare(String(right.source));
  });
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
  const response = await (0, import_obsidian5.requestUrl)({
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
function getSelectedSources(includedSources, sourceSet) {
  return includedSources.map(normalizeSourceKey).filter((sourceKey) => sourceSet.has(sourceKey)).sort();
}
function getSpellSourceUrl(sourceKey) {
  return `https://api.github.com/repos/guykahalani/my-toolkit-plugin/contents/data/spells/${sourceKey.toLowerCase()}.json?ref=main`;
}
function getBestiarySourceUrl(sourceKey) {
  return `https://api.github.com/repos/guykahalani/my-toolkit-plugin/contents/data/bestiary/${sourceKey.toLowerCase()}.json?ref=main`;
}
function getItemSourceUrl(sourceKey) {
  return `https://api.github.com/repos/guykahalani/my-toolkit-plugin/contents/data/items/${sourceKey.toLowerCase()}.json?ref=main`;
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

// src/plugin/MyToolkitPlugin.ts
var MyToolkitPlugin = class extends import_obsidian6.Plugin {
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
    this.attachGlobalBridge();
    registerItemCardProcessor(this);
    registerSpellCardProcessor(this);
    this.addCommands();
    this.deployVaultAssets(vaultPath);
    new import_obsidian6.Notice("Toolkit Plugin loaded.");
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
  scheduleSourceFilteredCacheRefresh() {
    if (this.sourceRefreshTimer) {
      clearTimeout(this.sourceRefreshTimer);
    }
    this.sourceRefreshTimer = setTimeout(async () => {
      this.sourceRefreshTimer = null;
      await this.refreshSourceFilteredCache();
    }, 900);
  }
  attachGlobalBridge() {
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
  }
  addCommands() {
    this.addCommand({
      id: "insert-from-toolkit",
      name: "Insert from toolkit",
      editorCallback: async (editor) => {
        await insertFromToolkit(this.app, editor);
      }
    });
    this.addCommand({
      id: "refresh-toolkit-database",
      name: "Refresh Toolkit Database",
      callback: async () => {
        await this.refreshToolkitDatabase(true);
      }
    });
  }
  deployVaultAssets(vaultPath) {
    const deployer = new Deployer({ vaultPath });
    deployer.deployAll();
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
        new import_obsidian6.Notice("Toolkit database refreshed.");
      }
      console.log("[Toolkit] Database cache refreshed.");
    } catch (error) {
      console.error("[Toolkit] Failed to refresh database cache:", error);
      new import_obsidian6.Notice("Toolkit database refresh failed. For a private repo, add a GitHub token in plugin settings.");
    }
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
      new import_obsidian6.Notice("Toolkit source cache refresh failed. Check the developer console.");
    }
  }
  filterItemsBySource(items) {
    const includedSources = new Set(this.settings.includedSources.map(normalizeSourceKey));
    return items.filter((item) => !item.source || includedSources.has(normalizeSourceKey(item.source)));
  }
};

// src/main.ts
var main_default = MyToolkitPlugin;
