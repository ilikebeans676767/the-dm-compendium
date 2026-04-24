import * as path from "path";
import { BaseFormatter, FormatterItem } from "./BaseFormatter";
import { createJsonLoader } from "../utils/dataLoader";

interface BookEntry {
  title: string;
  author: string;
  year: number;
  genre: string;
  rating: number;
  notes: string;
}

const loadBooks = createJsonLoader<BookEntry>(
  path.join(__dirname, "..", "data", "books.json"),
  "book"
);

export class BookFormatter extends BaseFormatter {
  async load(dataDir: string): Promise<FormatterItem[]> {
    const books = await loadBooks();
    return books.map((b) => this.format(b));
  }

  protected format(book: BookEntry): FormatterItem {
    const stars = "★".repeat(book.rating) + "☆".repeat(5 - book.rating);
    return {
      label: `${book.title} — ${book.author} (${book.year})`,
      body: `## ${book.title}

| Field    | Value              |
| -------- | ------------------ |
| Author   | ${book.author}     |
| Year     | ${book.year}       |
| Genre    | ${book.genre}      |
| Rating   | ${stars}           |

> [!toolkit-highlight]
> ${book.notes}
`,
    };
  }
}
