import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(),tailwindcss()],
  base: "/GrimTok/",
  build: {
    outDir: "dist", // output folder for gh-pages
  },
  // base: "/GrimTok/", // important for GitHub Pages
});
