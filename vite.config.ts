import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build", // output folder for gh-pages
  },
  base: "/GrimTok/", // important for GitHub Pages
});
