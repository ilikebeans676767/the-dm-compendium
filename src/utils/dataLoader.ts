import * as fs from "fs";

export type JsonLoader<T> = () => Promise<T[]>;

export function createJsonLoader<T>(jsonPath: string, description: string): JsonLoader<T> {
  let cachedData: T[] | null = null;
  let cachedMtimeMs = 0;

  return async function loadJsonData(): Promise<T[]> {
    try {
      const stat = await fs.promises.stat(jsonPath);
      if (cachedData && stat.mtimeMs === cachedMtimeMs) {
        return cachedData;
      }

      const fileContents = await fs.promises.readFile(jsonPath, "utf-8");
      const data = JSON.parse(fileContents) as T[];
      cachedData = data;
      cachedMtimeMs = stat.mtimeMs;
      return data;
    } catch (error) {
      console.error(`[Toolkit] Failed to load ${description} data from ${jsonPath}:`, error);
      return [];
    }
  };
}
