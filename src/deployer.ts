import * as fs from "fs";
import * as path from "path";

// Embedded templates and data (since BRAT doesn't download directories)
const EMBEDDED_TEMPLATES: Record<string, string> = {
  "book.md": `<%* 
const result = await tp.user.toolkit_search(tp, "books");
tR += result;
%>`,
  "movie.md": `<%* 
const result = await tp.user.toolkit_search(tp, "movies");
tR += result;
%>`
};

const EMBEDDED_DATA: Record<string, string> = {
  "books.json": `[
  {
    "title": "The Dispossessed",
    "author": "Ursula K. Le Guin",
    "year": 1974,
    "genre": "Science Fiction",
    "rating": 5,
    "notes": "Dual-world anarchist utopia. Dense and rewarding."
  },
  {
    "title": "Thinking, Fast and Slow",
    "author": "Daniel Kahneman",
    "year": 2011,
    "genre": "Psychology",
    "rating": 4,
    "notes": "System 1 vs System 2 thinking. Foundational."
  },
  {
    "title": "Blood Meridian",
    "author": "Cormac McCarthy",
    "year": 1985,
    "genre": "Literary Fiction",
    "rating": 5,
    "notes": "Brutal and poetic. Not for the faint-hearted."
  }
]`,
  "movies.json": `[
  {
    "title": "Stalker",
    "director": "Andrei Tarkovsky",
    "year": 1979,
    "genre": "Sci-Fi / Drama",
    "rating": 5,
    "notes": "Slow, philosophical, unforgettable. The Zone."
  },
  {
    "title": "Parasite",
    "director": "Bong Joon-ho",
    "year": 2019,
    "genre": "Thriller",
    "rating": 5,
    "notes": "Class warfare as genre film. Perfect structure."
  },
  {
    "title": "Adaptation",
    "director": "Spike Jonze",
    "year": 2002,
    "genre": "Comedy / Drama",
    "rating": 4,
    "notes": "Meta-screenplay about writing a screenplay. Kaufman at his best."
  }
]`
};

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
    const destDir = path.join(this.opts.vaultPath, this.opts.templateFolder);

    console.log(`[Toolkit] Deploying embedded templates to: ${destDir}`);

    fs.mkdirSync(destDir, { recursive: true });

    for (const [filename, content] of Object.entries(EMBEDDED_TEMPLATES)) {
      const dest = path.join(destDir, filename);
      // Never overwrite — user may have customised their copy
      if (!fs.existsSync(dest)) {
        fs.writeFileSync(dest, content, 'utf-8');
        console.log(`[Toolkit] Template deployed: ${filename}`);
      } else {
        console.log(`[Toolkit] Template already exists (user customized), skipping: ${filename}`);
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
