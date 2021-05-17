const { resolve, dirname } = require("path");
const { promisify } = require("util");
const { exec: originalExec } = require("child_process");

const callsites = require("callsites");

const exec = promisify(originalExec);

const packageJson = require("../package.json");
const bin = packageJson.bin;

/**
 * @typedef {Object} Options
 * @property {Record<string, string>=} env
 */

/**
 *
 * @param {string} argv
 * @param {Options=} options
 */
async function execTS(argv, options = {}) {
  const cwd = dirname(callsites()[1].getFileName() || "");

  return exec(resolve(bin) + " " + argv, {
    cwd,
    env: { ...process.env, ...(options.env || {}) },
  });
}

module.exports.execTS = execTS;
