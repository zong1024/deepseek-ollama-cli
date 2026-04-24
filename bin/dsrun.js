#!/usr/bin/env node

const { spawnSync } = require("child_process");
const path = require("path");

const script = path.resolve(__dirname, "..", "dsrun");
const args = process.argv.slice(2);

const candidates =
  process.platform === "win32"
    ? [
        ["python3", []],
        ["python", []],
        ["py", ["-3"]],
      ]
    : [
        ["python3", []],
        ["python", []],
      ];

for (const [command, prefixArgs] of candidates) {
  const result = spawnSync(command, [...prefixArgs, script, ...args], {
    stdio: "inherit",
  });

  if (result.error && result.error.code === "ENOENT") {
    continue;
  }

  if (result.error) {
    console.error(`dsrun: failed to start ${command}: ${result.error.message}`);
    process.exit(1);
  }

  if (process.platform === "win32" && result.status === 9009) {
    continue;
  }

  if (typeof result.status === "number") {
    process.exit(result.status);
  }

  process.exit(1);
}

console.error("dsrun requires Python 3. Install python3 and try again.");
process.exit(127);
