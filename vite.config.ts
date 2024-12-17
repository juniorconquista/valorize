import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "valorize",
  plugins: [svgr(), react()],
  define: {
    global: {},
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@useCases": path.resolve(__dirname, "./src/useCases"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
});
