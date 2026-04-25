import * as path from "path";
import { BaseFormatter, FormatterItem } from "./BaseFormatter";
import { loadJsonData } from "../utils/dataLoader";
import { getSourceLabel } from "../settings";

interface SpellEntry {
  name: string;
  source: string;
  page?: number;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  entries: string[];
  higherLevel?: string[];
}

const LEVEL_NAMES: Record<number, string> = {
  0: "Cantrip",
  1: "1st-level",
  2: "2nd-level",
  3: "3rd-level",
};

export class SpellFormatter extends BaseFormatter {
  async load(dataDir: string): Promise<FormatterItem[]> {
    const spells = await loadJsonData<SpellEntry>(
      path.join(dataDir, "cache", "spells.json"),
      "spell"
    );
    return spells.map((spell) => this.format(spell));
  }

  protected format(spell: SpellEntry): FormatterItem {
    const sourceLabel = getSourceLabel(spell.source);
    const levelText = LEVEL_NAMES[spell.level] ?? `${spell.level}th-level`;
    const pageText = spell.page ? `, p. ${spell.page}` : "";
    const higherLevel = spell.higherLevel?.length
      ? `\n### At Higher Levels\n\n${spell.higherLevel.join("\n\n")}\n`
      : "";

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
${higherLevel}`,
    };
  }
}
