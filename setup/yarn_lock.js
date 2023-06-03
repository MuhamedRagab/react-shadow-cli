import fs from "fs";

export default function initYarnLock(path) {
  if (!fs.existsSync(`${path}/yarn.lock`))
    fs.writeFileSync(`${path}/yarn.lock`, "");
}
