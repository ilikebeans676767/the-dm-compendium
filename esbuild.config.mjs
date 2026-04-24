import esbuild from "esbuild";
import * as fs from "fs";
import * as path from "path";

const watch = process.argv.includes("--watch");

const baseConfig = {
  bundle: true,
  platform: "node",
  external: ["obsidian", "electron"],
  logLevel: "info",
};

// Helper to copy directories
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  for (const file of fs.readdirSync(src)) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (watch) {
  const pluginCtx = await esbuild.context({
    ...baseConfig,
    entryPoints: ["src/main.ts"],
    outfile: "main.js",
    format: "cjs",
  });
  const scriptCtx = await esbuild.context({
    ...baseConfig,
    entryPoints: ["src/userScripts/toolkit_search.ts"],
    outfile: "toolkit_search.js",
    format: "cjs",
    external: [],
  });
  await Promise.all([pluginCtx.watch(), scriptCtx.watch()]);
  console.log("Watching for changes...");
} else {
  await esbuild.build({
    ...baseConfig,
    entryPoints: ["src/main.ts"],
    outfile: "main.js",
    format: "cjs",
  });
  await esbuild.build({
    ...baseConfig,
    entryPoints: ["src/userScripts/toolkit_search.ts"],
    outfile: "toolkit_search.js",
    format: "cjs",
    external: [],
  });
  // Copy templates and data directories after build
  copyDir("templates", "templates");
  copyDir("data", "data");
  console.log("Build complete. Assets copied.");
}
