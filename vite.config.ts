import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  css: {
    postcss: "./postcss.config.cjs",
  },
});
