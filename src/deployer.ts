import * as fs from "fs";
import * as path from "path";

interface DeployerOptions {
  vaultPath: string;
  pluginDir: string;
  templateFolder: string;  // configurable — where Templater looks
  scriptsFolder: string;   // configurable — Templater user scripts folder
}

export class Deployer {
  private opts: DeployerOptions;

  constructor(opts: DeployerOptions) {
    this.opts = opts;
  }

  deployAll() {
    this.deployTemplates();
    this.deployUserScript();
    this.setTemplaterHotkey();
  }

  // Deploy .md templates into the vault's Templater template folder
  private deployTemplates() {
    const srcDir = path.join(this.opts.pluginDir, "templates");
    const destDir = path.join(this.opts.vaultPath, this.opts.templateFolder);
    
    console.log(`[Toolkit] Looking for templates at: ${srcDir}`);
    console.log(`[Toolkit] Will deploy to: ${destDir}`);

    // Check if templates directory exists (may not be present in deployed plugin)
    if (!fs.existsSync(srcDir)) {
      console.warn(`[Toolkit] Templates directory not found at ${srcDir}. Skipping template deployment.`);
      return;
    }

    fs.mkdirSync(destDir, { recursive: true });

    const files = fs.readdirSync(srcDir);
    console.log(`[Toolkit] Found ${files.length} items in templates directory.`);

    for (const file of files) {
      if (!file.endsWith(".md")) {
        console.log(`[Toolkit] Skipping non-markdown file: ${file}`);
        continue;
      }
      const dest = path.join(destDir, file);
      // Never overwrite — user may have customised their copy
      if (!fs.existsSync(dest)) {
        fs.copyFileSync(path.join(srcDir, file), dest);
        console.log(`[Toolkit] Template deployed: ${file}`);
      } else {
        console.log(`[Toolkit] Template already exists (user customized), skipping: ${file}`);
      }
    }
  }

  // Deploy the compiled user script so Templater can call tp.user.toolkit_search()
  private deployUserScript() {
    const src = path.join(this.opts.pluginDir, "toolkit_search.js");
    const destDir = path.join(this.opts.vaultPath, this.opts.scriptsFolder);

    if (!fs.existsSync(src)) {
      console.warn("[Toolkit] toolkit_search.js not built yet. Run npm run build.");
      return;
    }

    fs.mkdirSync(destDir, { recursive: true });
    const dest = path.join(destDir, "toolkit_search.js");
    fs.copyFileSync(src, dest);
    console.log("[Toolkit] User script deployed.");
  }

  // Write Alt+Shift+E for Templater's insert modal into hotkeys.json
  // Only sets if the user hasn't already customised this command.
  private setTemplaterHotkey() {
    const hotkeysPath = path.join(this.opts.vaultPath, ".obsidian", "hotkeys.json");
    let hotkeys: Record<string, any> = {};

    try {
      if (fs.existsSync(hotkeysPath)) {
        hotkeys = JSON.parse(fs.readFileSync(hotkeysPath, "utf-8"));
      }
    } catch {
      console.warn("[Toolkit] Could not read hotkeys.json, will create.");
    }

    const commandId = "templater-obsidian:insert-templater";
    if (!hotkeys[commandId]) {
      hotkeys[commandId] = [{ modifiers: ["Alt", "Shift"], key: "E" }];
      fs.writeFileSync(hotkeysPath, JSON.stringify(hotkeys, null, 2));
      console.log("[Toolkit] Hotkey Alt+Shift+E set for Templater insert modal.");
    } else {
      console.log("[Toolkit] Templater hotkey already set by user, skipping.");
    }
  }
}
