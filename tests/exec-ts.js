const { resolve, dirname } = require("path");
const { promisify } = require("util");
const { exec: originalExec } = require("child_process");

const callsites = require("callsites");

const exec = promisify(originalExec);

const packageJson = require("../package.json");
const bin = packageJson.bin;

/**
 *
 * @param {string} argv
 */
async function execTS(argv) {
  const cwd = dirname(callsites()[1].getFileName() || "");
  return exec(resolve(bin) + " " + argv, { cwd });
}

module.exports.execTS = execTS;
