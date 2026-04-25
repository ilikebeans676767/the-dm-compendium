import * as fs from "fs";
import * as path from "path";

const ROOT_DIR = process.cwd();
const SPELLS_DIR = path.join(ROOT_DIR, "5etools-src", "data", "spells");
const DATA_DIR = path.join(ROOT_DIR, "data");
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
    .replace(/{@(?:damage|dice|scaledamage|scaledice|hit|d20) ([^}|]+)(?:\|[^}]*)?}/g, "$1")
    .replace(/{@(?:spell|item|creature|condition|disease|status|skill|action|feat|class|filter|book|adventure|variantrule) ([^}|]+)(?:\|[^}]*)?}/g, "$1")
    .replace(/{@(?:chance|recharge|coinflip|note|quickref|sense) ([^}|]+)(?:\|[^}]*)?}/g, "$1")
    .replace(/{@b ([^}]+)}/g, "**$1**")
    .replace(/{@i ([^}]+)}/g, "*$1*")
    .replace(/{@scaledamage ([^}|]+)\|[^}]+}/g, "$1")
    .replace(/{@[^ ]+ ([^}|]+)(?:\|[^}]*)?}/g, "$1")
    .replace(/{@[^}]+}/g, "")
    .replace(/\s+/g, " ")
    .trim();
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
  fs.writeFileSync(path.join(DATA_DIR, "spells.json"), `${JSON.stringify(spells, null, 2)}\n`);
  console.log(`Built data/spells.json with ${spells.length} spells.`);
}

buildSpells();
