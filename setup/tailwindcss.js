import fs from "fs";
import path from "path";

const viteConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`;

const webpackConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`;

const cssConfig = `@tailwind base;
@tailwind components;
@tailwind utilities;
`;

export default function setupTailwindConfig(dir) {
  const configPath = path.join(dir, "tailwind.config.js");
  const isVite = fs.existsSync(path.join(dir, "vite.config.js"));
  fs.writeFileSync(configPath, isVite ? viteConfig : webpackConfig);
  const indexCssContent = fs.readFileSync(
    path.join(dir, "src", "index.css"),
    "utf-8"
  );
  fs.writeFileSync(
    path.join(dir, "src", "index.css"),
    `${cssConfig}\n${indexCssContent}`
  );
}
