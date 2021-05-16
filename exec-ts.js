#!/usr/bin/env node

const { resolve } = require("path");
const minimist = require("minimist");
const { run } = require("./index");

const argv = minimist(process.argv.slice(2), { "--": true });

run({ filePath: resolve(process.argv[2]), scriptArgs: argv["--"] || [] });
