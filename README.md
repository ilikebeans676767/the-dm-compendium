# The DM Compendium

Search and insert Dungeons & Dragons 5th Edition monsters, spells, and items into your notes.

## Features

- Insert formatted monsters, spells, and items from the command palette.
- Render inline spell and item cards in reading view.
- Choose which D&D sources are included in search results.
- Cache selected compendium data locally for faster searching after the first load.

## Usage

1. Open the command palette.
2. Run **The DM Compendium: Insert from compendium**.
3. Choose monsters, items, or spells.
4. Search for an entry and select it to insert formatted content at the cursor.

To refresh cached data manually, run **The DM Compendium: Refresh database**.

You can assign custom shortcuts for these commands from **Settings > Hotkeys**.

## Settings

Open **Settings > Community plugins > The DM Compendium** to choose which sources appear in search results.

## Disclosures

- **Network access:** The plugin downloads selected compendium JSON files from the GitHub API at `api.github.com/repos/guykahalani/the-dm-compendium` when the local cache is missing, when sources are changed, or when the refresh command is run.
- **Local file access:** The plugin writes cache files into its own plugin folder under `.obsidian/plugins/the-dm-compendium/cache`.
- **Account requirements:** No account is required.
- **Telemetry and ads:** The plugin does not collect telemetry, analytics, or usage data, and it does not show ads.
- **Platform support:** This plugin is desktop-only because it uses Node.js filesystem APIs for local caching.

## Development

```bash
npm ci
npm run typecheck
npm run build
```

Community releases should be created from a tag that exactly matches `manifest.json`'s `version`, for example:

```bash
git tag 1.0.1
git push origin 1.0.1
```

The release workflow uploads `main.js`, `manifest.json`, and `styles.css` as individual release assets.

## License

This project is licensed under the ISC License. See [LICENSE](LICENSE).
