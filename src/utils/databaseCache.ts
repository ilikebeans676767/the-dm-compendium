import * as fs from "fs";
import * as path from "path";
import { requestUrl } from "obsidian";

export interface DatabaseFile {
  name: string;
  description: string;
  sourceUrl: string;
}

const DATABASE_FILES: DatabaseFile[] = [
  {
    name: "books.json",
    description: "books",
    sourceUrl: "https://raw.githubusercontent.com/guykahalani/my-toolkit-plugin/main/data/books.json",
  },
  {
    name: "movies.json",
    description: "movies",
    sourceUrl: "https://raw.githubusercontent.com/guykahalani/my-toolkit-plugin/main/data/movies.json",
  },
];

export function getDatabaseFiles(): DatabaseFile[] {
  return DATABASE_FILES;
}

export function getCacheDir(pluginDir: string): string {
  return path.join(pluginDir, "cache");
}

export async function hasDatabaseCache(pluginDir: string): Promise<boolean> {
  const cacheDir = getCacheDir(pluginDir);
  const results = await Promise.all(
    DATABASE_FILES.map(async (file) => {
      try {
        await fs.promises.access(path.join(cacheDir, file.name), fs.constants.R_OK);
        return true;
      } catch {
        return false;
      }
    })
  );

  return results.every(Boolean);
}

export async function refreshDatabaseCache(pluginDir: string): Promise<void> {
  const cacheDir = getCacheDir(pluginDir);
  await fs.promises.mkdir(cacheDir, { recursive: true });

  await Promise.all(
    DATABASE_FILES.map(async (file) => {
      const response = await requestUrl(file.sourceUrl);
      const data = response.json;

      if (!Array.isArray(data)) {
        throw new Error(`Remote ${file.description} data is not a JSON array.`);
      }

      await fs.promises.writeFile(
        path.join(cacheDir, file.name),
        JSON.stringify(data, null, 2),
        "utf-8"
      );
    })
  );
}
