import { setTimeout } from "node:timers/promises";
import * as p from "@clack/prompts";
import color from "picocolors";

export async function init() {
  console.clear();
  await setTimeout(1000);
  p.intro(`${color.bgCyan(color.black(" create-react-app "))}`);
}
