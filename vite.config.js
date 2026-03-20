import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [
    cloudflare(),
    process.env.ANALYZE &&
      import("rollup-plugin-visualizer").then((m) =>
        m.visualizer({ open: true, gzipSize: true, brotliSize: true })
      ),
  ],
});
