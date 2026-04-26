import * as fs from "fs";
import * as path from "path";

const ROOT_DIR = process.cwd();
const SPELLS_DIR = path.join(ROOT_DIR, "5etools-src", "data", "spells");
const BESTIARY_DIR = path.join(ROOT_DIR, "5etools-src", "data", "bestiary");
const DATA_DIR = path.join(ROOT_DIR, "data");
const GENERATED_SPELLS_DIR = path.join(DATA_DIR, "spells");
const GENERATED_BESTIARY_DIR = path.join(DATA_DIR, "bestiary");
const SPELL_SOURCE_LIST_PATH = path.join(ROOT_DIR, "src", "spell-source-list.json");
const MONSTER_SOURCE_LIST_PATH = path.join(ROOT_DIR, "src", "monster-source-list.json");
const SPELL_SCHOOL_NAMES = {
  A: "abjuration",
  C: "conjuration",
  D: "divination",
  E: "enchantment",
  I: "illusion",
  N: "necromancy",
  T: "transmutation",
  V: "evocation",
};

function cleanTagText(value) {
  return String(value)
    .replace(/{@atk ([^}]+)}/g, (_, attackTypes) => formatAttackTag(attackTypes))
    .replace(/{@atkr ([^}]+)}/g, (_, attackTypes) => formatAttackRollTag(attackTypes))
    .replace(/{@actSave ([a-z]+)}\s*{@dc ([^}|]+)(?:\|[^}]*)?}/g, (_, ability, dc) => `*${formatSavingThrowAbility(ability)} Saving Throw:* DC ${dc}`)
    .replace(/{@actSave ([a-z]+)}/g, (_, ability) => `*${formatSavingThrowAbility(ability)} Saving Throw:*`)
    .replace(/{@actSaveFailt?(?: ([^}]+))?}/g, (_, suffix) => `*Failure${suffix ? ` ${suffix}` : ""}:*`)
    .replace(/{@actSaveSuccess(?: ([^}]+))?}/g, (_, suffix) => `*Success${suffix ? ` ${suffix}` : ""}:*`)
    .replace(/{@actSaveSuccessOrFail(?: ([^}]+))?}/g, (_, suffix) => `*Success or Failure${suffix ? ` ${suffix}` : ""}:*`)
    .replace(/{@hitYourSpellAttack}/g, "your spell attack modifier")
    .replace(/{@h}/g, "*Hit:* ")
    .replace(/{@dc ([^}|]+)(?:\|[^}]*)?}/g, "DC $1")
    .replace(/{@hit ([^}|]+)(?:\|[^}]*)?}/g, (_, hitBonus) => formatHitBonus(hitBonus))
    .replace(/{@(?:damage|dice|scaledamage|scaledice|d20) ([^}|]+)(?:\|[^}]*)?}/g, "$1")
    .replace(/{@(?:spell|item|creature|condition|disease|status|skill|action|feat|class|filter|book|adventure|variantrule) ([^}|]+)(?:\|[^}]*)?}/g, "$1")
    .replace(/{@(?:chance|recharge|coinflip|note|quickref|sense|actSave|actSaveFail|actSaveSuccess|actSaveSuccessOrFail|actTrigger) ([^}|]+)(?:\|[^}]*)?}/g, "$1")
    .replace(/{@b ([^}]+)}/g, "**$1**")
    .replace(/{@i ([^}]+)}/g, "*$1*")
    .replace(/{@scaledamage ([^}|]+)\|[^}]+}/g, "$1")
    .replace(/{@[^ ]+ ([^}|]+)(?:\|[^}]*)?}/g, "$1")
    .replace(/{@[^}]+}/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function formatAttackTag(attackTypes) {
  const labels = String(attackTypes).split(",").map((attackType) => {
    switch (attackType.trim()) {
      case "m":
      case "mw":
        return "Melee Weapon";
      case "r":
      case "rw":
        return "Ranged Weapon";
      case "ms":
        return "Melee Spell";
      case "rs":
        return "Ranged Spell";
      default:
        return "";
    }
  }).filter(Boolean);

  return `*${Array.from(new Set(labels)).join(" or ")} Attack:*`;
}

function formatAttackRollTag(attackTypes) {
  const labels = String(attackTypes).split(",").map((attackType) => {
    switch (attackType.trim()) {
      case "m":
      case "mw":
      case "ms":
        return "Melee";
      case "r":
      case "rw":
      case "rs":
        return "Ranged";
      default:
        return "";
    }
  }).filter(Boolean);

  return `*${Array.from(new Set(labels)).join(" or ")} Attack Roll:*`;
}

function formatHitBonus(hitBonus) {
  const value = String(hitBonus).trim();
  return value.startsWith("+") || value.startsWith("-") ? value : `+${value}`;
}

function formatSavingThrowAbility(ability) {
  switch (String(ability).toLowerCase()) {
    case "str":
      return "Strength";
    case "dex":
      return "Dexterity";
    case "con":
      return "Constitution";
    case "int":
      return "Intelligence";
    case "wis":
      return "Wisdom";
    case "cha":
      return "Charisma";
    default:
      return ability;
  }
}

function renderEntry(entry) {
  if (typeof entry === "string") {
    return cleanTagText(entry);
  }

  if (!entry || typeof entry !== "object") {
    return "";
  }

  if (entry.type === "list" && Array.isArray(entry.items)) {
    return entry.items
      .map((item) => `- ${renderEntry(item)}`)
      .filter(Boolean)
      .join("\n");
  }

  if (entry.type === "item") {
    const name = entry.name ? `${cleanTagText(entry.name)} ` : "";
    return `${name}${renderEntry(entry.entry)}`.trim();
  }

  if (entry.type === "entries" && Array.isArray(entry.entries)) {
    const body = entry.entries.map(renderEntry).filter(Boolean).join("\n\n");
    return entry.name ? `**${cleanTagText(entry.name)}**\n\n${body}` : body;
  }

  if (entry.type === "table" && Array.isArray(entry.rows)) {
    return entry.rows
      .map((row) => (Array.isArray(row) ? row.map(renderEntry).join(" | ") : renderEntry(row)))
      .filter(Boolean)
      .join("\n");
  }

  if (entry.entry) {
    return renderEntry(entry.entry);
  }

  if (Array.isArray(entry.entries)) {
    return entry.entries.map(renderEntry).filter(Boolean).join("\n\n");
  }

  return "";
}

function renderEntries(entries) {
  return (entries ?? []).map(renderEntry).filter(Boolean);
}

function renderNamedEntries(entries = []) {
  return (entries ?? []).map((entry) => ({
    name: cleanTagText(entry.name ?? ""),
    entries: renderEntries(entry.entries),
  })).filter((entry) => entry.name || entry.entries.length);
}

function formatCastingTime(time = []) {
  return time
    .map((part) => {
      const base = `${part.number ?? 1} ${part.unit}`;
      return part.condition ? `${base}, ${cleanTagText(part.condition)}` : base;
    })
    .join("; ");
}

function formatRange(range) {
  if (!range) return "";
  if (range.type === "point" && range.distance) {
    const { type, amount } = range.distance;
    return amount ? `${amount} ${type}` : type;
  }
  if (range.type === "radius" && range.distance) {
    return `${range.distance.amount} ${range.distance.type} radius`;
  }
  if (range.type === "line" && range.distance) {
    return `${range.distance.amount} ${range.distance.type} line`;
  }
  if (range.type === "cone" && range.distance) {
    return `${range.distance.amount} ${range.distance.type} cone`;
  }
  return range.type ?? "";
}

function formatComponents(components = {}) {
  const parts = [];
  if (components.v) parts.push("V");
  if (components.s) parts.push("S");
  if (components.m) {
    const material = typeof components.m === "string" ? components.m : components.m.text;
    parts.push(material ? `M (${cleanTagText(material)})` : "M");
  }
  return parts.join(", ");
}

function formatDuration(duration = []) {
  return duration
    .map((part) => {
      if (part.type === "instant") return "Instantaneous";
      if (part.type === "permanent") return "Until dispelled";
      if (part.type === "special") return "Special";
      if (part.type === "timed" && part.duration) {
        const amount = part.duration.amount ?? 1;
        const unit = amount === 1 ? part.duration.type : `${part.duration.type}s`;
        const base = `${amount} ${unit}`;
        return part.concentration ? `Concentration, up to ${base}` : base;
      }
      return part.type ?? "";
    })
    .join("; ");
}

function normalizeSpell(spell) {
  return {
    name: spell.name,
    source: spell.source,
    sourceKey: String(spell.source).toUpperCase(),
    page: spell.page,
    level: spell.level,
    school: SPELL_SCHOOL_NAMES[spell.school] ?? spell.school,
    castingTime: formatCastingTime(spell.time),
    range: formatRange(spell.range),
    components: formatComponents(spell.components),
    duration: formatDuration(spell.duration),
    entries: renderEntries(spell.entries),
    higherLevel: renderEntries(spell.entriesHigherLevel),
  };
}

const SIZE_NAMES = {
  T: "Tiny",
  S: "Small",
  M: "Medium",
  L: "Large",
  H: "Huge",
  G: "Gargantuan",
};

const ALIGNMENT_NAMES = {
  L: "lawful",
  N: "neutral",
  C: "chaotic",
  G: "good",
  E: "evil",
  U: "unaligned",
  A: "any alignment",
};

const ABILITY_NAMES = {
  str: "STR",
  dex: "DEX",
  con: "CON",
  int: "INT",
  wis: "WIS",
  cha: "CHA",
};

function formatSize(size = []) {
  return size.map((part) => SIZE_NAMES[part] ?? part).join(", ");
}

function formatType(type) {
  if (!type) return "";
  if (typeof type === "string") return type;

  const tags = Array.isArray(type.tags)
    ? type.tags.map((tag) => typeof tag === "string" ? tag : tag.tag).filter(Boolean)
    : [];
  return [type.type, tags.length ? `(${tags.join(", ")})` : ""].filter(Boolean).join(" ");
}

function formatAlignment(alignment = []) {
  if (!alignment.length) return "";
  if (alignment.some((part) => typeof part === "object")) {
    return alignment.map((part) => {
      if (typeof part === "string") return ALIGNMENT_NAMES[part] ?? part;
      if (part.special) return cleanTagText(part.special);
      if (part.alignment) return formatAlignment(part.alignment);
      return "";
    }).filter(Boolean).join(" or ");
  }
  return alignment.map((part) => ALIGNMENT_NAMES[part] ?? part).join(" ");
}

function formatArmorClass(ac = []) {
  return ac.map((part) => {
    if (typeof part === "number") return String(part);
    if (!part || typeof part !== "object") return "";
    if (part.special) return cleanTagText(part.special);

    const base = part.ac ? String(part.ac) : "";
    const from = Array.isArray(part.from) && part.from.length
      ? ` (${part.from.map(cleanTagText).join(", ")})`
      : "";
    const condition = part.condition ? ` ${cleanTagText(part.condition)}` : "";
    return `${base}${from}${condition}`.trim();
  }).filter(Boolean).join(", ");
}

function formatHitPoints(hp = {}) {
  if (hp.special) return cleanTagText(hp.special);
  if (hp.average && hp.formula) return `${hp.average} (${hp.formula})`;
  if (hp.average) return String(hp.average);
  return "";
}

function formatSpeed(speed = {}) {
  if (typeof speed === "string") return cleanTagText(speed);

  return Object.entries(speed).map(([type, value]) => {
    if (type === "canHover") return "";
    const suffix = speed.canHover && type === "fly" ? " (hover)" : "";
    if (typeof value === "number") return `${type} ${value} ft.${suffix}`;
    if (value && typeof value === "object") {
      const amount = value.number ?? value.amount;
      const condition = value.condition ? ` ${cleanTagText(value.condition)}` : "";
      return amount ? `${type} ${amount} ft.${condition}${suffix}` : "";
    }
    return "";
  }).filter(Boolean).join(", ");
}

function formatChallengeRating(cr) {
  if (!cr) return "";
  if (typeof cr === "string") return cr;
  if (typeof cr === "object") return cr.cr ?? "";
  return String(cr);
}

function formatKeyValueMap(value = {}) {
  return Object.entries(value)
    .map(([key, entryValue]) => `${key}: ${cleanTagText(entryValue)}`)
    .join(", ");
}

function formatDelimitedTextList(values = []) {
  return (values ?? []).map((value) => {
    if (typeof value === "string") return cleanTagText(value);
    if (!value || typeof value !== "object") return "";

    const parts = [];
    if (Array.isArray(value.preNote)) parts.push(cleanTagText(value.preNote.join(", ")));
    else if (value.preNote) parts.push(cleanTagText(value.preNote));
    if (Array.isArray(value.resist)) parts.push(formatDelimitedTextList(value.resist));
    if (Array.isArray(value.immune)) parts.push(formatDelimitedTextList(value.immune));
    if (Array.isArray(value.conditionImmune)) parts.push(formatDelimitedTextList(value.conditionImmune));
    if (Array.isArray(value.vulnerable)) parts.push(formatDelimitedTextList(value.vulnerable));
    if (value.special) parts.push(cleanTagText(value.special));
    if (value.note) parts.push(cleanTagText(value.note));

    return parts.filter(Boolean).join(" ");
  }).filter(Boolean).join(", ");
}

function normalizeSpellcasting(spellcasting = []) {
  return (spellcasting ?? []).map((entry) => {
    const sections = [];
    if (entry.headerEntries) sections.push(...renderEntries(entry.headerEntries));
    if (entry.will) sections.push(`At will: ${entry.will.map(cleanTagText).join(", ")}`);
    if (entry.daily) {
      for (const [uses, spells] of Object.entries(entry.daily)) {
        sections.push(`${uses}/day: ${spells.map(cleanTagText).join(", ")}`);
      }
    }
    if (entry.spells) {
      for (const [level, levelInfo] of Object.entries(entry.spells)) {
        const slots = levelInfo.slots ? ` (${levelInfo.slots} slots)` : "";
        sections.push(`${level}${slots}: ${(levelInfo.spells ?? []).map(cleanTagText).join(", ")}`);
      }
    }
    if (entry.footerEntries) sections.push(...renderEntries(entry.footerEntries));

    return {
      name: cleanTagText(entry.name ?? "Spellcasting"),
      entries: sections.filter(Boolean),
      displayAs: entry.displayAs,
    };
  }).filter((entry) => entry.entries.length);
}

function normalizeMonster(monster) {
  return {
    name: monster.name,
    source: monster.source,
    sourceKey: String(monster.source).toUpperCase(),
    page: monster.page,
    size: formatSize(monster.size),
    type: formatType(monster.type),
    alignment: formatAlignment(monster.alignment),
    armorClass: formatArmorClass(monster.ac),
    hitPoints: formatHitPoints(monster.hp),
    speed: formatSpeed(monster.speed),
    abilities: {
      str: monster.str,
      dex: monster.dex,
      con: monster.con,
      int: monster.int,
      wis: monster.wis,
      cha: monster.cha,
    },
    savingThrows: formatKeyValueMap(monster.save),
    skills: formatKeyValueMap(monster.skill),
    senses: [...(monster.senses ?? []).map(cleanTagText), monster.passive ? `passive Perception ${monster.passive}` : ""].filter(Boolean).join(", "),
    languages: (monster.languages ?? []).map(cleanTagText).join(", "),
    damageResistances: formatDelimitedTextList(monster.resist),
    damageImmunities: formatDelimitedTextList(monster.immune),
    conditionImmunities: formatDelimitedTextList(monster.conditionImmune),
    challengeRating: formatChallengeRating(monster.cr),
    traits: renderNamedEntries(monster.trait),
    spellcasting: normalizeSpellcasting(monster.spellcasting),
    actions: renderNamedEntries(monster.action),
    bonusActions: renderNamedEntries(monster.bonus),
    reactions: renderNamedEntries(monster.reaction),
    legendaryActions: renderNamedEntries(monster.legendary),
    mythicActions: renderNamedEntries(monster.mythic),
    lairActions: renderNamedEntries(monster.lairActions),
    environment: (monster.environment ?? []).map(cleanTagText),
  };
}

function buildSpells() {
  const spells = fs.readdirSync(SPELLS_DIR)
    .filter((fileName) => /^spells-.+\.json$/.test(fileName))
    .flatMap((fileName) => {
      const filePath = path.join(SPELLS_DIR, fileName);
      const fileData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      return (fileData.spell ?? []).map(normalizeSpell);
    })
    .sort((left, right) => {
      const byName = left.name.localeCompare(right.name);
      return byName || left.source.localeCompare(right.source);
    });

  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.rmSync(GENERATED_SPELLS_DIR, { recursive: true, force: true });
  fs.mkdirSync(GENERATED_SPELLS_DIR, { recursive: true });

  const spellsBySource = new Map();
  for (const spell of spells) {
    const sourceSpells = spellsBySource.get(spell.sourceKey) ?? [];
    sourceSpells.push(spell);
    spellsBySource.set(spell.sourceKey, sourceSpells);
  }

  for (const [sourceKey, sourceSpells] of spellsBySource) {
    fs.writeFileSync(
      path.join(GENERATED_SPELLS_DIR, `${sourceKey.toLowerCase()}.json`),
      `${JSON.stringify(sourceSpells, null, 2)}\n`
    );
  }
  fs.writeFileSync(
    SPELL_SOURCE_LIST_PATH,
    `${JSON.stringify(Array.from(spellsBySource.keys()).sort(), null, 2)}\n`
  );
  console.log(`Built ${spells.length} spells across ${spellsBySource.size} source files.`);
}

function buildMonsters() {
  const monsters = fs.readdirSync(BESTIARY_DIR)
    .filter((fileName) => /^bestiary-.+\.json$/.test(fileName))
    .flatMap((fileName) => {
      const filePath = path.join(BESTIARY_DIR, fileName);
      const fileData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      return (fileData.monster ?? []).map(normalizeMonster);
    })
    .sort((left, right) => {
      const byName = left.name.localeCompare(right.name);
      return byName || left.source.localeCompare(right.source);
    });

  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.rmSync(GENERATED_BESTIARY_DIR, { recursive: true, force: true });
  fs.mkdirSync(GENERATED_BESTIARY_DIR, { recursive: true });

  const monstersBySource = new Map();
  for (const monster of monsters) {
    const sourceMonsters = monstersBySource.get(monster.sourceKey) ?? [];
    sourceMonsters.push(monster);
    monstersBySource.set(monster.sourceKey, sourceMonsters);
  }

  for (const [sourceKey, sourceMonsters] of monstersBySource) {
    fs.writeFileSync(
      path.join(GENERATED_BESTIARY_DIR, `${sourceKey.toLowerCase()}.json`),
      `${JSON.stringify(sourceMonsters, null, 2)}\n`
    );
  }
  fs.writeFileSync(
    MONSTER_SOURCE_LIST_PATH,
    `${JSON.stringify(Array.from(monstersBySource.keys()).sort(), null, 2)}\n`
  );
  console.log(`Built ${monsters.length} monsters across ${monstersBySource.size} source files.`);
}

buildSpells();
buildMonsters();
