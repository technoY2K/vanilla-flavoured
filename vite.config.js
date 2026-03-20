import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
  },
  plugins: [
    process.env.ANALYZE &&
      import("rollup-plugin-visualizer").then((m) =>
        m.visualizer({ open: true, gzipSize: true, brotliSize: true })
      ),
  ],
});
