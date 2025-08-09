import lezer from "unplugin-lezer/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: (_, entryName) => `${entryName}.js`,
    },
    outDir: "dist/es",
    rollupOptions: {
      external: [/^@lezer\//],
    },
  },
  plugins: [lezer()],
  test: {
    globals: true,
    environment: "node",
    forceRerunTriggers: [
      "**/package.json/**",
      "**/vitest.config.*/**",
      "**/vite.config.*/**",
      "**/fixtures/**",
    ],
  },
});
