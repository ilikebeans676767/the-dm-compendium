export interface SourceInfo {
  full: string;
  short: string;
  include: boolean;
}

export const SOURCE_LIST = require("./source-list.json") as Record<string, SourceInfo>;

export interface DmCompendiumSettings {
  includedSources: string[];
}

export const DEFAULT_SETTINGS: DmCompendiumSettings = {
  includedSources: [],
};

export function normalizeSourceKey(source: string): string {
  return source.toUpperCase();
}

export function getDefaultIncludedSources(): string[] {
  return Object.entries(SOURCE_LIST)
    .filter(([, source]) => source.include)
    .map(([sourceKey]) => normalizeSourceKey(sourceKey));
}

export function getSourceLabel(source: string): string {
  const sourceInfo = SOURCE_LIST[normalizeSourceKey(source)];
  return sourceInfo?.short ?? source;
}
