const { resolve } = require("path");
const { buildSync } = require("esbuild");
const Module = require("module");
const sourceMapSupport = require("source-map-support");

sourceMapSupport.install({
  environment: "node",
  hookRequire: true,
});

/**
 * @typedef {Object} Options
 * @property {string} filePath
 * @property {string[]=} preloadedModules
 * @property {string[]} scriptArgs
 * @property {string=} tsConfigPath
 */

/**
 * @param options {Options}
 */
exports.run = function ({
  filePath,
  scriptArgs,
  preloadedModules = [],
  tsConfigPath,
}) {
  function handler(/**@type {Module} */ module, /**@type {string} */ filename) {
    const result = buildSync({
      entryPoints: [filename],
      write: false,
      platform: "node",
      format: "cjs",
      sourcemap: "inline",
      tsconfig: tsConfigPath,
    });

    const originalCompile = /** @type {any}) */ (module)._compile.bind(module);
    /** @type {any}) */ (module)._compile = function (
      /** @type {Module} */ _,
      /** @type {string} */ filename
    ) {
      return originalCompile(result.outputFiles[0].text, filename);
    };

    return /** @type {any}) */ (Module)._extensions[".js"](module, filename);
  }

  /** @type {any} */ (Module)._extensions[".ts"] = handler;
  /** @type {any} */ (Module)._extensions[".tsx"] = handler;

  process.argv = [process.argv[1], filePath, ...scriptArgs];

  for (const preloadedModule of preloadedModules) {
    require(preloadedModule);
  }

  Module.runMain();
};
