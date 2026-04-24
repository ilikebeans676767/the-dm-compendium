import { BaseFormatter } from "./formatters/BaseFormatter";
import { BookFormatter } from "./formatters/BookFormatter";
import { MovieFormatter } from "./formatters/MovieFormatter";

// Add a new data type: create a JSON, a Formatter, one line here.
export const registry: Record<string, BaseFormatter> = {
  books: new BookFormatter(),
  movies: new MovieFormatter(),
};

export type DataType = keyof typeof registry;
