"use strict";

// src/userScripts/toolkit_search.ts
async function toolkit_search(tp, dataType) {
  const bridge = globalThis.__toolkit;
  if (!bridge) {
    tp.system.notice("[Toolkit] Plugin not loaded. Enable My Toolkit Plugin first.");
    return "";
  }
  const items = await bridge.getItems(dataType);
  if (!items || items.length === 0) {
    tp.system.notice(`[Toolkit] No items found for type: ${dataType}`);
    return "";
  }
  const selected = await tp.system.suggester(
    (item) => item.label,
    items,
    true,
    // throw_on_cancel
    `Search ${dataType}...`
  );
  return selected ? selected.body : "";
}
module.exports = toolkit_search;
