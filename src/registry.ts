import { BaseFormatter } from "./formatters/BaseFormatter";
import { MonsterFormatter } from "./formatters/MonsterFormatter";
import { SpellFormatter } from "./formatters/SpellFormatter";

// Add a new data type: create a JSON, a Formatter, one line here.
export const registry: Record<string, BaseFormatter> = {
  bestiary: new MonsterFormatter(),
  monsters: new MonsterFormatter(),
  spells: new SpellFormatter(),
};

export type DataType = keyof typeof registry;
