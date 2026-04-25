import * as fs from "fs";
import * as path from "path";
import { requestUrl } from "obsidian";
import { normalizeSourceKey } from "../settings";

const SPELL_SOURCE_LIST = require("../spell-source-list.json") as string[];
const SPELL_SOURCE_SET = new Set(SPELL_SOURCE_LIST.map(normalizeSourceKey));
const CACHE_METADATA_FILE = ".database-cache.json";

export interface DatabaseFile {
  name: string;
  description: string;
  sourceUrl: string;
}

const DATABASE_FILES: DatabaseFile[] = [
  {
    name: "books.json",
    description: "books",
    sourceUrl: "https://api.github.com/repos/guykahalani/my-toolkit-plugin/contents/data/books.json?ref=main",
  },
  {
    name: "movies.json",
    description: "movies",
    sourceUrl: "https://api.github.com/repos/guykahalani/my-toolkit-plugin/contents/data/movies.json?ref=main",
  },
];

export function getDatabaseFiles(): DatabaseFile[] {
  return DATABASE_FILES;
}

export function getCacheDir(pluginDir: string): string {
  return path.join(pluginDir, "cache");
}

export async function hasDatabaseCache(pluginDir: string, includedSources: string[]): Promise<boolean> {
  const cacheDir = getCacheDir(pluginDir);
  const results = await Promise.all(
    DATABASE_FILES.map((file) => hasFile(path.join(cacheDir, file.name)))
  );

  return results.every(Boolean)
    && await hasFile(path.join(cacheDir, "spells.json"))
    && await hasMatchingCacheMetadata(cacheDir, includedSources);
}

export async function refreshDatabaseCache(
  pluginDir: string,
  githubToken: string,
  includedSources: string[]
): Promise<void> {
  const cacheDir = getCacheDir(pluginDir);
  await fs.promises.mkdir(cacheDir, { recursive: true });

  await Promise.all(
    DATABASE_FILES.map((file) => writeJsonCacheFile(cacheDir, file, githubToken))
  );
  await refreshSourceFilteredDatabaseCache(pluginDir, githubToken, includedSources);
}

export async function refreshSourceFilteredDatabaseCache(
  pluginDir: string,
  githubToken: string,
  includedSources: string[]
): Promise<void> {
  const cacheDir = getCacheDir(pluginDir);
  await fs.promises.mkdir(cacheDir, { recursive: true });

  const selectedSpellSources = getSelectedSpellSources(includedSources);
  const sourceSpellGroups = await Promise.all(
    selectedSpellSources.map((sourceKey) => fetchJsonArrayFromGithub(
      getSpellSourceUrl(sourceKey),
      githubToken,
      `${sourceKey} spells`
    ))
  );
  const spells = sourceSpellGroups
    .flat()
    .sort((left: any, right: any) => {
      const byName = String(left.name).localeCompare(String(right.name));
      return byName || String(left.source).localeCompare(String(right.source));
    });

  await fs.promises.writeFile(
    path.join(cacheDir, "spells.json"),
    JSON.stringify(spells, null, 2),
    "utf-8"
  );
  await writeCacheMetadata(cacheDir, includedSources);
}

async function writeJsonCacheFile(cacheDir: string, file: DatabaseFile, githubToken: string) {
  const data = await fetchJsonArrayFromGithub(file.sourceUrl, githubToken, file.description);
  await fs.promises.writeFile(
    path.join(cacheDir, file.name),
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}

async function fetchJsonArrayFromGithub(sourceUrl: string, githubToken: string, description: string): Promise<any[]> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.raw+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (githubToken.trim()) {
    headers.Authorization = `Bearer ${githubToken.trim()}`;
  }

  const response = await requestUrl({
    url: sourceUrl,
    method: "GET",
    headers,
  });
  const data = response.json;

  if (!Array.isArray(data)) {
    throw new Error(`Remote ${description} data is not a JSON array.`);
  }

  return data;
}

function getSelectedSpellSources(includedSources: string[]) {
  return includedSources
    .map(normalizeSourceKey)
    .filter((sourceKey) => SPELL_SOURCE_SET.has(sourceKey))
    .sort();
}

function getSpellSourceUrl(sourceKey: string) {
  return `https://api.github.com/repos/guykahalani/my-toolkit-plugin/contents/data/spells/${sourceKey.toLowerCase()}.json?ref=main`;
}

async function hasFile(filePath: string): Promise<boolean> {
  try {
    await fs.promises.access(filePath, fs.constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

async function hasMatchingCacheMetadata(cacheDir: string, includedSources: string[]) {
  try {
    const metadata = JSON.parse(
      await fs.promises.readFile(path.join(cacheDir, CACHE_METADATA_FILE), "utf-8")
    ) as { includedSources?: string[] };
    return sourcesMatch(metadata.includedSources ?? [], includedSources);
  } catch {
    return false;
  }
}

async function writeCacheMetadata(cacheDir: string, includedSources: string[]) {
  await fs.promises.writeFile(
    path.join(cacheDir, CACHE_METADATA_FILE),
    JSON.stringify({ includedSources: normalizeSources(includedSources) }, null, 2),
    "utf-8"
  );
}

function sourcesMatch(left: string[], right: string[]) {
  return JSON.stringify(normalizeSources(left)) === JSON.stringify(normalizeSources(right));
}

function normalizeSources(sources: string[]) {
  return sources.map(normalizeSourceKey).sort();
}
