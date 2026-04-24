/**
 * toolkit_search.js
 *
 * Templater user script. Call from any template as:
 *   <% await tp.user.toolkit_search(tp, "books") %>
 *
 * The plugin attaches window.__toolkit on load (global bridge pattern).
 * This script delegates to it so all real logic stays in the plugin.
 */

async function toolkit_search(tp: any, dataType: string): Promise<string> {
  const bridge = (globalThis as any).__toolkit;

  if (!bridge) {
    tp.system.notice("[Toolkit] Plugin not loaded. Enable My Toolkit Plugin first.");
    return "";
  }

  // Get formatted items from the plugin via the global bridge
  const items: Array<{ label: string; body: string }> = await bridge.getItems(dataType);

  if (!items || items.length === 0) {
    tp.system.notice(`[Toolkit] No items found for type: ${dataType}`);
    return "";
  }

  // Drive Templater's suggester: user picks from the dropdown
  const selected = await tp.system.suggester(
    (item: { label: string }) => item.label,
    items,
    true, // throw_on_cancel
    `Search ${dataType}...`
  );

  return selected ? selected.body : "";
}

// Templater expects a CommonJS export
module.exports = toolkit_search;
