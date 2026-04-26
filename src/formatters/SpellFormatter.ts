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

function formatYamlListValue(items: string[] | undefined): string {
  if (!items?.length) {
    return " []";
  }

  return `\n${items
    .map((item) => {
      const lines = item.split(/\r?\n/);
      return [`  - |-`, ...lines.map((line) => `    ${line}`)].join("\n");
    })
    .join("\n")}`;
}

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

    return {
      label: `${spell.name} (${sourceLabel})`,
      source: spell.source,
      body: `\`\`\`spellcard
name: ${JSON.stringify(spell.name)}
source: ${JSON.stringify(sourceLabel)}
${spell.page ? `page: ${spell.page}\n` : ""}level: ${spell.level}
school: ${JSON.stringify(spell.school.toLowerCase())}
castingTime: ${JSON.stringify(spell.castingTime)}
range: ${JSON.stringify(spell.range)}
components: ${JSON.stringify(spell.components)}
duration: ${JSON.stringify(spell.duration)}
entries:${formatYamlListValue(spell.entries)}
higherLevel:${formatYamlListValue(spell.higherLevel)}
\`\`\``,
    };
  }
}
