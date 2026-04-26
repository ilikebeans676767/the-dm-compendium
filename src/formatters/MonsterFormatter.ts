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
    const pageText = monster.page ? `, p. ${monster.page}` : "";
    const subtitle = [monster.size, monster.type, monster.alignment].filter(Boolean).join(", ");

    return {
      label: `${monster.name} (${sourceLabel})`,
      source: monster.source,
      body: `## ${monster.name}

*${subtitle} (${sourceLabel}${pageText})*

| Field | Value |
| ----- | ----- |
| Armor Class | ${monster.armorClass || "-"} |
| Hit Points | ${monster.hitPoints || "-"} |
| Speed | ${monster.speed || "-"} |
| Saving Throws | ${monster.savingThrows || "-"} |
| Skills | ${monster.skills || "-"} |
| Senses | ${monster.senses || "-"} |
| Languages | ${monster.languages || "-"} |
| Challenge | ${monster.challengeRating || "-"} |

${this.formatAbilities(monster)}
${this.formatSection("Traits", monster.traits)}
${this.formatSection("Spellcasting", monster.spellcasting)}
${this.formatSection("Actions", monster.actions)}
${this.formatSection("Bonus Actions", monster.bonusActions)}
${this.formatSection("Reactions", monster.reactions)}
${this.formatSection("Legendary Actions", monster.legendaryActions)}
${this.formatSection("Mythic Actions", monster.mythicActions)}
${this.formatSection("Lair Actions", monster.lairActions)}
${this.formatEnvironment(monster.environment)}`.trim(),
    };
  }

  private formatAbilities(monster: MonsterEntry): string {
    const headings = ABILITY_LABELS.map((ability) => ability.toUpperCase()).join(" | ");
    const dividers = ABILITY_LABELS.map(() => "-----").join(" | ");
    const values = ABILITY_LABELS.map((ability) => {
      const score = monster.abilities[ability];
      return `${score} (${formatModifier(score)})`;
    }).join(" | ");

    return `| ${headings} |
| ${dividers} |
| ${values} |
`;
  }

  private formatSection(title: string, entries: MonsterNamedEntry[]): string {
    if (!entries.length) return "";

    const body = entries
      .map((entry) => {
        const heading = entry.name ? `**${entry.name}.** ` : "";
        return `${heading}${entry.entries.join("\n\n")}`.trim();
      })
      .join("\n\n");

    return `\n### ${title}\n\n${body}\n`;
  }

  private formatEnvironment(environment: string[]): string {
    return environment.length
      ? `\n### Environment\n\n${environment.join(", ")}\n`
      : "";
  }
}

function formatModifier(score: number): string {
  const modifier = Math.floor((score - 10) / 2);
  return modifier >= 0 ? `+${modifier}` : String(modifier);
}
