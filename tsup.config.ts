import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    outDir: "build",
    target: "node18",
    platform: "node",
    format: ["esm"],
    splitting: false,
    sourcemap: false,
    minify: false,
    shims: true,
    dts: false,
  },
]);
