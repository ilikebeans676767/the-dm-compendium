import * as fs from 'fs';
import * as path from 'path';

interface DeployerOptions {
  vaultPath: string;
}

export class Deployer {
  private opts: DeployerOptions;

  constructor(opts: DeployerOptions) {
    this.opts = opts;
  }

  deployAll() {
    this.setCompendiumHotkeys();
  }

  // Write default compendium shortcuts into hotkeys.json.
  // Only sets if the user hasn't already customised this command.
  private setCompendiumHotkeys() {
    const hotkeysPath = path.join(
      this.opts.vaultPath,
      '.obsidian',
      'hotkeys.json',
    );
    let hotkeys: Record<string, any> = {};

    try {
      if (fs.existsSync(hotkeysPath)) {
        hotkeys = JSON.parse(fs.readFileSync(hotkeysPath, 'utf-8'));
      }
    } catch {
      console.warn('[DM Compendium] Could not read hotkeys.json, will create.');
    }

    const oldCommandId = 'the-dm-compendium:insert-from-toolkit';
    const commandId = 'the-dm-compendium:insert-from-compendium';
    let changed = false;
    if (hotkeys[oldCommandId]) {
      if (!hotkeys[commandId]) {
        hotkeys[commandId] = hotkeys[oldCommandId];
      }
      delete hotkeys[oldCommandId];
      changed = true;
    }

    if (!hotkeys[commandId]) {
      hotkeys[commandId] = [{ modifiers: ['Ctrl', 'Shift'], key: 'C' }];
      changed = true;
      console.log(
        '[DM Compendium] Hotkey Ctrl+Shift+C set for compendium insertion.',
      );
    } else {
      console.log(
        '[DM Compendium] Compendium hotkey already set by user, skipping.',
      );
    }

    const refreshCommandId = 'the-dm-compendium:refresh-compendium-database';
    if (!hotkeys[refreshCommandId]) {
      hotkeys[refreshCommandId] = [{ modifiers: ['Ctrl', 'Shift'], key: 'R' }];
      changed = true;
      console.log(
        '[DM Compendium] Hotkey Ctrl+Shift+R set for database refresh.',
      );
    } else {
      console.log(
        '[DM Compendium] Database refresh hotkey already set by user, skipping.',
      );
    }

    if (changed) {
      fs.writeFileSync(hotkeysPath, JSON.stringify(hotkeys, null, 2));
    }
  }
}
