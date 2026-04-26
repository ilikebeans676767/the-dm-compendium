import * as path from "path";
import { BaseFormatter, FormatterItem } from "./BaseFormatter";
import { loadJsonData } from "../utils/dataLoader";
import { getSourceLabel } from "../settings";

interface MonsterNamedEntry {
  name: string;
  entries: string[];
}

interface MonsterEntry {
  name: string;
  source: string;
  page?: number;
  size: string;
  type: string;
  alignment: string;
  armorClass: string;
  hitPoints: string;
  speed: string;
  abilities: Record<"str" | "dex" | "con" | "int" | "wis" | "cha", number>;
  savingThrows: string;
  skills: string;
  senses: string;
  languages: string;
  damageResistances?: string;
  damageImmunities?: string;
  conditionImmunities?: string;
  challengeRating: string;
  traits: MonsterNamedEntry[];
  spellcasting: MonsterNamedEntry[];
  actions: MonsterNamedEntry[];
  bonusActions: MonsterNamedEntry[];
  reactions: MonsterNamedEntry[];
  legendaryActions: MonsterNamedEntry[];
  mythicActions: MonsterNamedEntry[];
  lairActions: MonsterNamedEntry[];
  environment: string[];
}

const ABILITY_LABELS: Array<keyof MonsterEntry["abilities"]> = ["str", "dex", "con", "int", "wis", "cha"];
const SAVE_KEYS: Record<string, string> = {
  str: "strength",
  dex: "dexterity",
  con: "constitution",
  int: "intelligence",
  wis: "wisdom",
  cha: "charisma",
};

export class MonsterFormatter extends BaseFormatter {
  async load(dataDir: string): Promise<FormatterItem[]> {
    const monsters = await loadJsonData<MonsterEntry>(
      path.join(dataDir, "cache", "bestiary.json"),
      "monster"
    );
    return monsters.map((monster) => this.format(monster));
  }

  protected format(monster: MonsterEntry): FormatterItem {
    const sourceLabel = getSourceLabel(monster.source);
    const typeParts = splitType(monster.type);

    return {
      label: `${monster.name} (${sourceLabel})`,
      source: monster.source,
      body: `\`\`\`statblock
layout: Basic 5e Layout
name: ${yamlScalar(monster.name)}
image: [[${monster.name}.jpg]]
size: ${yamlScalar(monster.size)}
type: ${yamlScalar(typeParts.type)}
subtype: ${yamlScalar(typeParts.subtype)}
alignment: ${yamlScalar(monster.alignment)}
ac: ${yamlValue(parseLeadingNumber(monster.armorClass) ?? monster.armorClass)}
hp: ${yamlValue(parseLeadingNumber(monster.hitPoints) ?? monster.hitPoints)}
hit_dice: ${yamlScalar(parseHitDice(monster.hitPoints))}
speed: ${yamlScalar(formatStatblockSpeed(monster.speed))}
stats: [${ABILITY_LABELS.map((ability) => monster.abilities[ability]).join(", ")}]
saves:${formatKeyValueList(monster.savingThrows, SAVE_KEYS)}
skillsaves:${formatKeyValueList(monster.skills)}
senses: ${yamlScalar(monster.senses)}
languages: ${yamlScalar(monster.languages)}
damage_resistances: ${yamlScalar(monster.damageResistances)}
damage_immunities: ${yamlScalar(monster.damageImmunities)}
condition_immunities: ${yamlScalar(monster.conditionImmunities)}
cr: ${yamlScalar(monster.challengeRating)}
traits:${formatNamedEntries(monster.traits)}
actions:${formatNamedEntries([...monster.actions, ...monster.bonusActions])}
reactions:${formatNamedEntries(monster.reactions)}
legendary_actions:${formatNamedEntries(monster.legendaryActions)}
mythic_actions:${formatNamedEntries(monster.mythicActions)}
lair_actions:${formatNamedEntries(monster.lairActions)}
spells:${formatSpellcasting(monster.spellcasting)}
source: ${yamlScalar(sourceLabel)}
page: ${yamlValue(monster.page ?? "")}
\`\`\``,
    };
  }
}

function splitType(type: string): { type: string; subtype: string } {
  const match = type.match(/^(.+?)\s*\((.+)\)$/);
  return match ? { type: match[1], subtype: match[2] } : { type, subtype: "" };
}

function parseLeadingNumber(value: string): number | null {
  const match = value.match(/^(\d+)/);
  return match ? Number(match[1]) : null;
}

function parseHitDice(value: string): string {
  const match = value.match(/\(([^)]+)\)/);
  if (!match) {
    return "";
  }

  return match[1].replace(/\s*[+-]\s*\d+$/, "").trim();
}

function formatStatblockSpeed(speed: string): string {
  return speed.replace(/\bwalk\s+/gi, "");
}

function formatKeyValueList(value: string, keyMap: Record<string, string> = {}): string {
  const entries = parseKeyValueString(value, keyMap);
  if (!entries.length) {
    return " []";
  }

  return `\n${entries.map(([key, entryValue]) => `  - ${key}: ${entryValue}`).join("\n")}`;
}

function parseKeyValueString(value: string, keyMap: Record<string, string>): Array<[string, number | string]> {
  if (!value) {
    return [];
  }

  return value.split(",")
    .map((part): [string, number | string] | null => {
      const [rawKey, ...rawValue] = part.split(":");
      if (!rawKey || !rawValue.length) {
        return null;
      }

      const normalizedKey = rawKey.trim().toLowerCase();
      const key = keyMap[normalizedKey] ?? normalizedKey;
      const stringValue = rawValue.join(":").trim();
      const numberValue = Number(stringValue.replace(/^\+/, ""));
      return [key, Number.isFinite(numberValue) ? numberValue : stringValue];
    })
    .filter((entry): entry is [string, number | string] => Boolean(entry));
}

function formatNamedEntries(entries: MonsterNamedEntry[]): string {
  if (!entries.length) {
    return " []";
  }

  return `\n${entries.map(formatNamedEntry).join("\n")}`;
}

function formatNamedEntry(entry: MonsterNamedEntry): string {
  return [
    `  - name: ${yamlScalar(entry.name)}`,
    `    desc:${formatBlockText(joinEntries(entry.entries), 6)}`,
  ].join("\n");
}

function formatSpellcasting(entries: MonsterNamedEntry[]): string {
  const spellLines = entries.flatMap((entry) => {
    const body = entry.entries.map((line) => line.trim()).filter(Boolean);
    return entry.name && entry.name !== "Spellcasting"
      ? [`${entry.name}. ${body[0] ?? ""}`.trim(), ...body.slice(1)]
      : body;
  });

  if (!spellLines.length) {
    return " []";
  }

  return `\n${spellLines.map((line) => `  -${formatBlockText(line, 4)}`).join("\n")}`;
}

function joinEntries(entries: string[]): string {
  return entries.map((entry) => entry.trim()).filter(Boolean).join("\n\n");
}

function formatBlockText(value: string, indent: number): string {
  const indentation = " ".repeat(indent);
  const lines = value.split(/\r?\n/);
  return ` |-\n${lines.map((line) => `${indentation}${line}`).join("\n")}`;
}

function yamlValue(value: number | string): string {
  return typeof value === "number" ? String(value) : yamlScalar(value);
}

function yamlScalar(value: unknown): string {
  if (value === undefined || value === null || value === "") {
    return "\"\"";
  }

  return JSON.stringify(String(value));
}
