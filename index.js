#!/usr/bin/env node

// https://github.com/natemoo-re/clack/blob/main/examples/basic/index.ts

import buildProject from "./prompts/buildProject.js";
import onCancel from "./prompts/onCancel.js";
import { init } from "./utils/init.js";
import installDependencies from "./utils/installDependencies.js";
import installProject from "./utils/installProject.js";
import * as p from "@clack/prompts";
import outro from "./utils/outro.js";
import reactRouterConfig from "./setup/react_router.js";
import initYarnLock from "./setup/yarn_lock.js";

async function main() {
  await init();

  const buildProjectResults = await buildProject();
  if (p.isCancel(buildProjectResults) || !buildProjectResults.wantToBuild)
    return onCancel.onCancel();

  const s = p.spinner();
  s.start("Installing project...");
  await installProject(buildProjectResults);
  if (buildProjectResults.packageManager === "yarn")
    initYarnLock(buildProjectResults.name);
  console.clear();
  s.stop("Project installed.");

  if (buildProjectResults.appType === "Custom App") {
    if (!buildProjectResults.install) return;
    s.start("Installing dependencies...");
    installDependencies(buildProjectResults);
    s.stop("Dependencies installed.");
  }

  outro(buildProjectResults);
}

main().catch(console.error);
