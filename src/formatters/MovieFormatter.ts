import * as fs from "fs";
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

const MOVIES_DATA_FILE = path.join(__dirname, "..", "data", "movies.json");
let cachedMovies: MovieEntry[] | null = null;
let cachedMoviesMtimeMs = 0;

async function loadMovies(): Promise<MovieEntry[]> {
  try {
    const stat = await fs.promises.stat(MOVIES_DATA_FILE);
    if (cachedMovies && stat.mtimeMs === cachedMoviesMtimeMs) {
      return cachedMovies;
    }

    const fileContents = await fs.promises.readFile(MOVIES_DATA_FILE, "utf-8");
    const movies = JSON.parse(fileContents) as MovieEntry[];
    cachedMovies = movies;
    cachedMoviesMtimeMs = stat.mtimeMs;
    return movies;
  } catch (error) {
    console.error("[Toolkit] Failed to load movie data:", error);
    return [];
  }
}

export class MovieFormatter extends BaseFormatter {
  async load(dataDir: string): Promise<FormatterItem[]> {
    const movies = await loadMovies();
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
