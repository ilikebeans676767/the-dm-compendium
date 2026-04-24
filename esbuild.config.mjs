import esbuild from "esbuild";

const watch = process.argv.includes("--watch");

const baseConfig = {
  bundle: true,
  platform: "node",
  external: ["obsidian", "electron"],
  logLevel: "info",
};

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
  console.log("Build complete.");
}
