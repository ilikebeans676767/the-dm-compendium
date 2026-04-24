import { BaseFormatter, FormatterItem } from "./BaseFormatter";

interface BookEntry {
  title: string;
  author: string;
  year: number;
  genre: string;
  rating: number;
  notes: string;
}

// Embedded books data
const BOOKS_DATA: BookEntry[] = [
  {
    "title": "The Dispossessed",
    "author": "Ursula K. Le Guin",
    "year": 1974,
    "genre": "Science Fiction",
    "rating": 5,
    "notes": "Dual-world anarchist utopia. Dense and rewarding."
  },
  {
    "title": "Thinking, Fast and Slow",
    "author": "Daniel Kahneman",
    "year": 2011,
    "genre": "Psychology",
    "rating": 4,
    "notes": "System 1 vs System 2 thinking. Foundational."
  },
  {
    "title": "Blood Meridian",
    "author": "Cormac McCarthy",
    "year": 1985,
    "genre": "Literary Fiction",
    "rating": 5,
    "notes": "Brutal and poetic. Not for the faint-hearted."
  }
];

export class BookFormatter extends BaseFormatter {
  async load(dataDir: string): Promise<FormatterItem[]> {
    return BOOKS_DATA.map((b) => this.format(b));
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
