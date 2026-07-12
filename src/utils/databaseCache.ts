import * as fs from 'fs';
import * as path from 'path';
import { requestUrl } from 'obsidian';
import { normalizeSourceKey } from '../settings';

const SPELL_SOURCE_LIST = require('../spell-source-list.json') as string[];
const MONSTER_SOURCE_LIST = require('../monster-source-list.json') as string[];
const ITEM_SOURCE_LIST = require('../item-source-list.json') as string[];
const SPELL_SOURCE_SET = new Set(SPELL_SOURCE_LIST.map(normalizeSourceKey));
const MONSTER_SOURCE_SET = new Set(MONSTER_SOURCE_LIST.map(normalizeSourceKey));
const ITEM_SOURCE_SET = new Set(ITEM_SOURCE_LIST.map(normalizeSourceKey));
const CACHE_METADATA_FILE = '.database-cache.json';

interface SourceFilteredDatabaseFile {
  name: string;
  description: string;
  sourceSet: Set<string>;
  getSourceUrl: (sourceKey: string) => string;
}

const SOURCE_FILTERED_DATABASE_FILES: SourceFilteredDatabaseFile[] = [
  {
    name: 'spells.json',
    description: 'spells',
    sourceSet: SPELL_SOURCE_SET,
    getSourceUrl: getSpellSourceUrl,
  },
  {
    name: 'bestiary.json',
    description: 'monsters',
    sourceSet: MONSTER_SOURCE_SET,
    getSourceUrl: getBestiarySourceUrl,
  },
  {
    name: 'items.json',
    description: 'items',
    sourceSet: ITEM_SOURCE_SET,
    getSourceUrl: getItemSourceUrl,
  },
];

export function getCacheDir(pluginDir: string): string {
  return path.join(pluginDir, 'cache');
}

export async function hasDatabaseCache(
  pluginDir: string,
  includedSources: string[],
): Promise<boolean> {
  const cacheDir = getCacheDir(pluginDir);
  const results = await Promise.all(
    SOURCE_FILTERED_DATABASE_FILES.map((file) =>
      hasFile(path.join(cacheDir, file.name)),
    ),
  );

  return (
    results.every(Boolean) &&
    (await hasMatchingCacheMetadata(cacheDir, includedSources))
  );
}

export async function refreshDatabaseCache(
  pluginDir: string,
  includedSources: string[],
): Promise<void> {
  const cacheDir = getCacheDir(pluginDir);
  await fs.promises.mkdir(cacheDir, { recursive: true });

  await refreshSourceFilteredDatabaseCache(
    pluginDir,
    includedSources,
  );
}

export async function refreshSourceFilteredDatabaseCache(
  pluginDir: string,
  includedSources: string[],
): Promise<void> {
  const cacheDir = getCacheDir(pluginDir);
  await fs.promises.mkdir(cacheDir, { recursive: true });

  await Promise.all(
    SOURCE_FILTERED_DATABASE_FILES.map((file) =>
      writeSourceFilteredJsonCacheFile(
        cacheDir,
        file,
        includedSources,
      ),
    ),
  );
  await writeCacheMetadata(cacheDir, includedSources);
}

async function writeSourceFilteredJsonCacheFile(
  cacheDir: string,
  file: SourceFilteredDatabaseFile,
  includedSources: string[],
) {
  const selectedSources = getSelectedSources(includedSources, file.sourceSet);
  const sourceGroups = await Promise.all(
    selectedSources.map((sourceKey) =>
      fetchJsonArrayFromGithub(
        file.getSourceUrl(sourceKey),
        `${sourceKey} ${file.description}`,
      ),
    ),
  );
  const data = sourceGroups.flat().sort((left: any, right: any) => {
    const byName = String(left.name).localeCompare(String(right.name));
    return byName || String(left.source).localeCompare(String(right.source));
  });

  await fs.promises.writeFile(
    path.join(cacheDir, file.name),
    JSON.stringify(data, null, 2),
    'utf-8',
  );
}

async function fetchJsonArrayFromGithub(
  sourceUrl: string,
  description: string,
): Promise<any[]> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.raw+json',
    'X-GitHub-Api-Version': '2022-11-28',
    Authorization: 'Bearer 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',
  };

  const response = await requestUrl({
    url: sourceUrl,
    method: 'GET',
    headers,
  });
  const data = response.json;

  if (!Array.isArray(data)) {
    throw new Error(`Remote ${description} data is not a JSON array.`);
  }

  return data;
}

function getSelectedSources(includedSources: string[], sourceSet: Set<string>) {
  return includedSources
    .map(normalizeSourceKey)
    .filter((sourceKey) => sourceSet.has(sourceKey))
    .sort();
}

function getSpellSourceUrl(sourceKey: string) {
  return `https://api.github.com/repos/guykahalani/the-dm-compendium/contents/data/spells/${sourceKey.toLowerCase()}.json?ref=main`;
}

function getBestiarySourceUrl(sourceKey: string) {
  return `https://api.github.com/repos/guykahalani/the-dm-compendium/contents/data/bestiary/${sourceKey.toLowerCase()}.json?ref=main`;
}

function getItemSourceUrl(sourceKey: string) {
  return `https://api.github.com/repos/guykahalani/the-dm-compendium/contents/data/items/${sourceKey.toLowerCase()}.json?ref=main`;
}

async function hasFile(filePath: string): Promise<boolean> {
  try {
    await fs.promises.access(filePath, fs.constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

async function hasMatchingCacheMetadata(
  cacheDir: string,
  includedSources: string[],
) {
  try {
    const metadata = JSON.parse(
      await fs.promises.readFile(
        path.join(cacheDir, CACHE_METADATA_FILE),
        'utf-8',
      ),
    ) as { includedSources?: string[] };
    return sourcesMatch(metadata.includedSources ?? [], includedSources);
  } catch {
    return false;
  }
}

async function writeCacheMetadata(cacheDir: string, includedSources: string[]) {
  await fs.promises.writeFile(
    path.join(cacheDir, CACHE_METADATA_FILE),
    JSON.stringify(
      { includedSources: normalizeSources(includedSources) },
      null,
      2,
    ),
    'utf-8',
  );
}

function sourcesMatch(left: string[], right: string[]) {
  return (
    JSON.stringify(normalizeSources(left)) ===
    JSON.stringify(normalizeSources(right))
  );
}

function normalizeSources(sources: string[]) {
  return sources.map(normalizeSourceKey).sort();
}
