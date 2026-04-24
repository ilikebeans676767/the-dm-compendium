import * as fs from "fs";
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

const BOOKS_DATA_FILE = path.join(__dirname, "..", "data", "books.json");
let cachedBooks: BookEntry[] | null = null;
let cachedBooksMtimeMs = 0;

async function loadBooks(): Promise<BookEntry[]> {
  try {
    const stat = await fs.promises.stat(BOOKS_DATA_FILE);
    if (cachedBooks && stat.mtimeMs === cachedBooksMtimeMs) {
      return cachedBooks;
    }

    const fileContents = await fs.promises.readFile(BOOKS_DATA_FILE, "utf-8");
    const books = JSON.parse(fileContents) as BookEntry[];
    cachedBooks = books;
    cachedBooksMtimeMs = stat.mtimeMs;
    return books;
  } catch (error) {
    console.error("[Toolkit] Failed to load book data:", error);
    return [];
  }
}

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
