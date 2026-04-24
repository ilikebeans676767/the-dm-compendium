import * as fs from "fs";
import * as path from "path";

interface DeployerOptions {
  vaultPath: string;
}

export class Deployer {
  private opts: DeployerOptions;

  constructor(opts: DeployerOptions) {
    this.opts = opts;
  }

  deployAll() {
    this.setToolkitHotkey();
  }

  // Write Option+Shift+E for toolkit insertion into hotkeys.json
  // Only sets if the user hasn't already customised this command.
  private setToolkitHotkey() {
    const hotkeysPath = path.join(this.opts.vaultPath, ".obsidian", "hotkeys.json");
    let hotkeys: Record<string, any> = {};

    try {
      if (fs.existsSync(hotkeysPath)) {
        hotkeys = JSON.parse(fs.readFileSync(hotkeysPath, "utf-8"));
      }
    } catch {
      console.warn("[Toolkit] Could not read hotkeys.json, will create.");
    }

    const commandId = "my-toolkit-plugin:insert-from-toolkit";
    if (!hotkeys[commandId]) {
      hotkeys[commandId] = [{ modifiers: ["Alt", "Shift"], key: "E" }];
      fs.writeFileSync(hotkeysPath, JSON.stringify(hotkeys, null, 2));
      console.log("[Toolkit] Hotkey Option+Shift+E set for toolkit insertion.");
    } else {
      console.log("[Toolkit] Toolkit hotkey already set by user, skipping.");
    }
  }
}
