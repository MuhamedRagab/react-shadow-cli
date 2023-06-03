import childProcess from "child_process";
import commands from "../commands/commands.js";
import setupTailwindConfig from "../setup/tailwindcss.js";
import reactRouterConfig from "../setup/react_router.js";
import zustandConfig from "../setup/zustand.js";
import fs from "fs";

export default function installDependencies({
  name,
  packageManager,
  dependencies,
  language,
  buildTool,
}) {
  const installTool = commands.installCommand[packageManager];
  const installCommand = `${installTool} ${dependencies.join(" ")}`;
  const installPath = `${process.cwd()}/${name}`;
  const tailwindcssIndex = dependencies.indexOf("tailwindcss");

  if (tailwindcssIndex !== -1) tailwindcssInstall();
  execSync(installCommand);
  if (dependencies.includes("zustand")) zustandInstall();
  if (dependencies.includes("react-router-dom")) reactRouterInstall();

  // Methods
  function execSync(command) {
    childProcess.execSync(command, {
      cwd: installPath, // cwd: current working directory
      stdio: "inherit",
    });
  }

  function tailwindcssInstall() {
    const { library: tailwindcssTool, config: tailwindcssConfig } =
      commands.devDependencies.tailwindcss[buildTool];

    dependencies.splice(tailwindcssIndex, 1);
    execSync(`${installTool} ${tailwindcssTool}`);
    execSync(tailwindcssConfig);
    setupTailwindConfig(installPath);
  }

  function zustandInstall() {
    zustandConfig(`${installPath}/src/stores`);
  }

  function reactRouterInstall() {
    reactRouterConfig(buildTool, language, installPath);
  }
}
