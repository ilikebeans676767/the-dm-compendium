import { BaseFormatter } from "./formatters/BaseFormatter";
import { BookFormatter } from "./formatters/BookFormatter";
import { MonsterFormatter } from "./formatters/MonsterFormatter";
import { MovieFormatter } from "./formatters/MovieFormatter";
import { SpellFormatter } from "./formatters/SpellFormatter";

// Add a new data type: create a JSON, a Formatter, one line here.
export const registry: Record<string, BaseFormatter> = {
  bestiary: new MonsterFormatter(),
  books: new BookFormatter(),
  movies: new MovieFormatter(),
  monsters: new MonsterFormatter(),
  spells: new SpellFormatter(),
};

export type DataType = keyof typeof registry;
