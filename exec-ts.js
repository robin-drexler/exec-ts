#!/usr/bin/env node

const { resolve } = require("path");

const { run } = require("./index");

run({ filePath: resolve(process.argv[2]) });
