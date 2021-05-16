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
 * @property {string[]} scriptArgs
 */

/**
 * @param options {Options}
 */
exports.run = function ({ filePath, scriptArgs }) {
  /** @type {any} */ (Module)._extensions[".ts"] = (
    /**@type {Module} */ module,
    /**@type {string} */ filename
  ) => {
    const result = buildSync({
      entryPoints: [filename],
      write: false,
      platform: "node",
      format: "cjs",
      sourcemap: "inline",
    });

    const originalCompile = /** @type {any}) */ (module)._compile.bind(module);
    /** @type {any}) */ (module)._compile = function (
      /** @type {Module} */ _,
      /** @type {string} */ filename
    ) {
      return originalCompile(result.outputFiles[0].text, filename);
    };

    return /** @type {any}) */ (Module)._extensions[".js"](module, filename);
  };

  process.argv = [process.argv[1], filePath, ...scriptArgs];
  Module.runMain();
};
