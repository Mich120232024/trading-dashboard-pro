// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  server: {
    port: 5173,
    host: true,
    strictPort: true,
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
    preprocessorOptions: {
      postcss: {
        config: true,
      },
    },
  },
});
