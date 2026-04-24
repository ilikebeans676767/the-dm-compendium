import { BaseFormatter, FormatterItem } from "./BaseFormatter";

interface MovieEntry {
  title: string;
  director: string;
  year: number;
  genre: string;
  rating: number;
  notes: string;
}

// Embedded movies data
const MOVIES_DATA: MovieEntry[] = [
  {
    "title": "Stalker",
    "director": "Andrei Tarkovsky",
    "year": 1979,
    "genre": "Sci-Fi / Drama",
    "rating": 5,
    "notes": "Slow, philosophical, unforgettable. The Zone."
  },
  {
    "title": "Parasite",
    "director": "Bong Joon-ho",
    "year": 2019,
    "genre": "Thriller",
    "rating": 5,
    "notes": "Class warfare as genre film. Perfect structure."
  },
  {
    "title": "Adaptation",
    "director": "Spike Jonze",
    "year": 2002,
    "genre": "Comedy / Drama",
    "rating": 4,
    "notes": "Meta-screenplay about writing a screenplay. Kaufman at his best."
  }
];

export class MovieFormatter extends BaseFormatter {
  async load(dataDir: string): Promise<FormatterItem[]> {
    return MOVIES_DATA.map((m) => this.format(m));
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
