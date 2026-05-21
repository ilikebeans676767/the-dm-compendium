import { MarkdownPostProcessorContext, MarkdownRenderer, parseYaml, Plugin } from "obsidian";

interface SpellCardData {
  name?: string;
  source?: string;
  page?: number | string;
  level?: number | string;
  school?: string;
  castingTime?: string;
  range?: string;
  components?: string;
  duration?: string;
  entries?: string[];
  higherLevel?: string[];
}

const LEVEL_NAMES: Record<number, string> = {
  0: "Cantrip",
  1: "1st-level",
  2: "2nd-level",
  3: "3rd-level",
};

export function registerSpellCardProcessor(plugin: Plugin) {
  plugin.registerMarkdownCodeBlockProcessor("spellcard", async (source, el, ctx) => {
    await renderSpellCard(plugin, source, el, ctx);
  });
}

async function renderSpellCard(
  plugin: Plugin,
  source: string,
  el: HTMLElement,
  ctx: MarkdownPostProcessorContext
) {
  let spell: SpellCardData;

  try {
    spell = normalizeSpellCardData(parseYaml(source));
  } catch (error) {
    renderError(el, error);
    return;
  }

  el.empty();

  const card = createElement("article", "compendium-spell-card");
  el.appendChild(card);

  const header = createElement("header", "compendium-spell-card__header");
  card.appendChild(header);

  header.appendChild(createElement("h2", "", spell.name ?? "Unknown Spell"));
  header.appendChild(createElement("p", "", getSpellSubtitle(spell)));

  const sourceText = getSourceText(spell);
  if (sourceText) {
    header.appendChild(createElement("span", "", sourceText));
  }

  const meta = createElement("section", "compendium-spell-card__meta");
  card.appendChild(meta);
  appendMeta(meta, "Casting Time", spell.castingTime);
  appendMeta(meta, "Range", spell.range);
  appendMeta(meta, "Components", spell.components);
  appendMeta(meta, "Duration", spell.duration);

  await appendMarkdownSection(plugin, card, ctx, "compendium-spell-card__body", spell.entries);

  if (spell.higherLevel?.length) {
    const higher = createElement("section", "compendium-spell-card__higher");
    card.appendChild(higher);
    higher.appendChild(createElement("h3", "", "At Higher Levels"));
    await appendMarkdownSection(plugin, higher, ctx, "compendium-spell-card__higher-body", spell.higherLevel);
  }
}

function normalizeSpellCardData(raw: unknown): SpellCardData {
  if (!raw || typeof raw !== "object") {
    throw new Error("Spell card block must contain YAML fields.");
  }

  const spell = raw as SpellCardData;
  return {
    ...spell,
    entries: normalizeStringList(spell.entries),
    higherLevel: normalizeStringList(spell.higherLevel),
  };
}

function normalizeStringList(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => (item == null ? "" : String(item).trim()))
    .filter((item) => item.length > 0);
}

function getSpellSubtitle(spell: SpellCardData): string {
  const level = Number(spell.level);
  const levelText = Number.isFinite(level) ? LEVEL_NAMES[level] ?? `${level}th-level` : "";
  return [levelText, spell.school].filter(Boolean).join(" ");
}

function getSourceText(spell: SpellCardData): string {
  if (!spell.source && !spell.page) {
    return "";
  }

  return `${spell.source ?? ""}${spell.page ? `, p. ${spell.page}` : ""}`;
}

function appendMeta(parent: HTMLElement, label: string, value: string | undefined) {
  const item = createElement("div", "compendium-spell-card__meta-item");
  item.appendChild(createElement("strong", "", label));
  item.appendChild(createElement("span", "", value || "-"));
  parent.appendChild(item);
}

async function appendMarkdownSection(
  plugin: Plugin,
  parent: HTMLElement,
  ctx: MarkdownPostProcessorContext,
  className: string,
  entries: string[] | undefined
) {
  if (!entries?.length) {
    return;
  }

  const section = createElement("section", className);
  parent.appendChild(section);

  for (const entry of entries) {
    const entryEl = createElement("div", "compendium-spell-card__entry");
    section.appendChild(entryEl);
    await MarkdownRenderer.render(plugin.app, entry, entryEl, ctx.sourcePath, plugin);
  }
}

function renderError(el: HTMLElement, error: unknown) {
  el.empty();
  const message = error instanceof Error ? error.message : "Unable to render spell card.";
  const errorEl = createElement("div", "compendium-spell-card-error", `Invalid spellcard YAML: ${message}`);
  el.appendChild(errorEl);
}

function createElement(tagName: string, className = "", text = ""): HTMLElement {
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  if (text) {
    element.textContent = text;
  }

  return element;
}
