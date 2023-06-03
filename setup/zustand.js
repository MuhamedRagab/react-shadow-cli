import { mkdirSync } from "fs";

export default function zustandConfig(targetDirectory) {
  mkdirSync(targetDirectory);
}
