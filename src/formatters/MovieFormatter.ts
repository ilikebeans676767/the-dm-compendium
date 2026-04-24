import { readFileSync } from "fs";
import * as path from "path";
import { BaseFormatter, FormatterItem } from "./BaseFormatter";

interface MovieEntry {
  title: string;
  director: string;
  year: number;
  genre: string;
  rating: number;
  notes: string;
}

export class MovieFormatter extends BaseFormatter {
  async load(dataDir: string): Promise<FormatterItem[]> {
    const raw = readFileSync(path.join(dataDir, "movies.json"), "utf-8");
    const movies: MovieEntry[] = JSON.parse(raw);
    return movies.map((m) => this.format(m));
  }

  protected format(movie: MovieEntry): FormatterItem {
    const stars = "★".repeat(movie.rating) + "☆".repeat(5 - movie.rating);
    return {
      label: `${movie.title} — ${movie.director} (${movie.year})`,
      body: `## ${movie.title}

| Field    | Value              |
| -------- | ------------------ |
| Director | ${movie.director}  |
| Year     | ${movie.year}      |
| Genre    | ${movie.genre}     |
| Rating   | ${stars}           |

> [!toolkit-highlight]
> ${movie.notes}
`,
    };
  }
}
