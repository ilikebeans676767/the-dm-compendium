import { readFileSync } from "fs";
import * as path from "path";
import { BaseFormatter, FormatterItem } from "./BaseFormatter";

interface BookEntry {
  title: string;
  author: string;
  year: number;
  genre: string;
  rating: number;
  notes: string;
}

export class BookFormatter extends BaseFormatter {
  async load(dataDir: string): Promise<FormatterItem[]> {
    const raw = readFileSync(path.join(dataDir, "books.json"), "utf-8");
    const books: BookEntry[] = JSON.parse(raw);
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
