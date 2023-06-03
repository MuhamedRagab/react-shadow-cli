import * as p from "@clack/prompts";
import onCancel from "./onCancel.js";

export default async function buildProject() {
  const buildResults = await build();

  const customAppResults = await customApp(buildResults);

  return { ...buildResults, ...customAppResults };
}

async function build() {
  let wantToBuild = await p.confirm({
    message: "Do you want to build a new (React) app?",
    initialValue: false,
  });

  if (!wantToBuild || p.isCancel(wantToBuild)) return { wantToBuild: false };

  const results = await p.group(
    {
      name: () =>
        p.text({
          message: "What should we name your app?",
          placeholder: "mrs-app",
          defaultValue: "mrs-app",
        }),
      packageManager: () =>
        p.select({
          message: "Pick a package manager",
          options: [
            { value: "npm", label: "npm" },
            { value: "yarn", label: "yarn" },
          ],
        }),
      language: () =>
        p.select({
          message: "Pick a language",
          options: [
            { value: "js", label: "JavaScript" },
            { value: "ts", label: "TypeScript" },
          ],
        }),
      buildTool: () =>
        p.select({
          message: "Pick a build tool",
          options: [
            { value: "vite", label: "Vite" },
            { value: "webpack", label: "Webpack" },
          ],
        }),
      appType: () =>
        p.select({
          message: "Pick a app type",
          options: [
            {
              label: "Default",
              value: "Default App",
              hint: "plain app with no dependencies",
            },
            {
              label: "Custom",
              value: "Custom App",
              hint: "add common used dependencies",
            },
          ],
        }),
    },
    onCancel
  );

  return { ...results, wantToBuild };
}

async function customApp(buildResults) {
  if (!buildResults.wantToBuild || buildResults.appType === "Default App")
    return buildResults;

  const results = await p.group(
    {
      dependencies: () =>
        p.multiselect({
          message: "Select your dependencies.",
          initialValues: ["react-router-dom", "tailwindcss", "axios"],
          options: [
            // {
            //   value: "select all",
            //   label: "Select All",
            //   hint: "This choice will install all dependencies.",
            // },
            { value: "react-router-dom", label: "React Router" },
            { value: "tailwindcss", label: "Tailwind CSS" },
            { value: "axios", label: "Axios" },
            { value: "zustand", label: "Zustand" },
            { value: "react-query", label: "React Query" },
            { value: "zod", label: "Zod" },
            { value: "react-icons", label: "React Icons" },
            { value: "react-cookie", label: "React Cookie" },
            {
              value: "i18next react-i18next i18next-browser-languagedetector",
              label: "i18next",
            },
            { value: "react-hot-toast", label: "React Hot Toast" },
          ],
          required: true,
        }),
      install: () =>
        p.confirm({
          message: "Install dependencies?",
          initialValue: true,
        }),
    },
    onCancel
  );

  return { ...buildResults, ...results };
}
