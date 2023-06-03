import childProcess from "child_process";
import commands from "../commands/commands.js";

export default async function installProject({
  name,
  language,
  packageManager,
  buildTool,
}) {
  const { buildBy, dash, template } = commands.buildProject[buildTool];
  const installCommand = `${buildBy[packageManager]} ${name} ${dash[packageManager]} ${template[language]}`;

  childProcess.execSync(installCommand, {
    cwd: process.cwd(),
    stdio: "inherit",
  });
}
