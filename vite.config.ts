import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  server: {
    port: 5173,
    host: true, // Add this line to listen on all network interfaces
    strictPort: true, // Add this to ensure it uses exactly this port
  },
  css: {
    postcss: "./postcss.config.cjs",
  },
});
