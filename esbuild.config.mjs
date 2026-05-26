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
    sourcemap: "inline",
  });
  await pluginCtx.watch();
  console.log("Watching for changes...");
} else {
  await esbuild.build({
    ...baseConfig,
    entryPoints: ["src/main.ts"],
    outfile: "main.js",
    format: "cjs",
    minify: true,
  });
  console.log("Build complete.");
}
