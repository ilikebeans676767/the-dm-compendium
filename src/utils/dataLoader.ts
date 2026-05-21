import * as fs from "fs";

const cache = new Map<string, { mtimeMs: number; data: any[] }>();

export async function loadJsonData<T>(jsonPath: string, description: string): Promise<T[]> {
  try {
    const stat = await fs.promises.stat(jsonPath);
    const cached = cache.get(jsonPath);
    if (cached && cached.mtimeMs === stat.mtimeMs) {
      return cached.data as T[];
    }

    const fileContents = await fs.promises.readFile(jsonPath, "utf-8");
    const data = JSON.parse(fileContents) as T[];
    cache.set(jsonPath, { mtimeMs: stat.mtimeMs, data });
    return data;
  } catch (error) {
    console.error(`[DM Compendium] Failed to load ${description} data from ${jsonPath}:`, error);
    return [];
  }
}
