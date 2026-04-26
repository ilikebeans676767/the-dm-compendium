import * as path from "path";
import { BaseFormatter, FormatterItem } from "./BaseFormatter";
import { loadJsonData } from "../utils/dataLoader";
import { getSourceLabel } from "../settings";

interface ItemEntry {
  name: string;
  source: string;
  page?: number;
  type: string;
  rarity: string;
  attunement: string;
  weight: string;
  value: string;
  valueRarity: string;
  weaponCategory: string;
  armorClass: string;
  damage: string;
  range: string;
  properties: string[];
  mastery: string[];
  entries: string[];
}

export class ItemFormatter extends BaseFormatter {
  async load(dataDir: string): Promise<FormatterItem[]> {
    const items = await loadJsonData<ItemEntry>(
      path.join(dataDir, "cache", "items.json"),
      "item"
    );
    return items.map((item) => this.format(item));
  }

  protected format(item: ItemEntry): FormatterItem {
    const sourceLabel = getSourceLabel(item.source);

    return {
      label: `${item.name} (${sourceLabel})`,
      source: item.source,
      body: `\`\`\`itemcard
name: ${yamlScalar(item.name)}
source: ${yamlScalar(sourceLabel)}
${item.page ? `page: ${item.page}\n` : ""}type: ${yamlScalar(item.type)}
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
entries:${formatYamlListValue(item.entries)}
\`\`\``,
    };
  }
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

function yamlScalar(value: unknown): string {
  if (value === undefined || value === null || value === "") {
    return "\"\"";
  }

  return JSON.stringify(String(value));
}
