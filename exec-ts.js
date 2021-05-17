#!/usr/bin/env node

const { resolve } = require("path");
const minimist = require("minimist");
const { run } = require("./index");

const argv = minimist(process.argv.slice(2), { "--": true });

if (!argv._ || argv.length === 0) {
  throw new Error("Missing file to run.");
}

/**
 * ensure it is always an array even if only one require is passed
 * @type string[]
 */
const preloadedModules = argv.require ? [].concat(argv.require) : [];

/**
 * @type string=
 */
const tsConfigPath = argv.project;

run({
  filePath: resolve(argv._[0]),
  scriptArgs: argv["--"] || [],
  preloadedModules,
  tsConfigPath,
});
