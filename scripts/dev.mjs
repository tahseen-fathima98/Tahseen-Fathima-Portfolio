import { spawn } from "node:child_process";
import { createRequire } from "node:module";

process.env.NODE_ENV = "development";

const require = createRequire(import.meta.url);
const nextCli = require.resolve("next/dist/bin/next");
const incoming = process.argv.slice(2);
const args = [];

for (let index = 0; index < incoming.length; index += 1) {
  const value = incoming[index];
  if (value === "--strictPort") continue;
  if (value === "--host") {
    args.push("--hostname");
    if (incoming[index + 1]) args.push(incoming[++index]);
    continue;
  }
  args.push(value);
}

const child = spawn(process.execPath, [nextCli, "dev", ...args], {
  stdio: "inherit",
  shell: false,
});

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code ?? 0);
});
