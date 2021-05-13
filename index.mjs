import { buildSync } from "esbuild";
import Module from "module";
import sourceMapSupport from "source-map-support";

sourceMapSupport.install({
  environment: "node",
  hookRequire: true,
});

/**
 * @typedef {Object} Options
 * @property {string} filePath
 */

/**
 *
 * @param options {Options}
 */
export function run({ filePath } = {}) {
  Module._extensions[".ts"] = (module, filename) => {
    const result = buildSync({
      entryPoints: [filename],
      write: false,
      platform: "node",
      format: "cjs",
      sourcemap: "inline",
    });

    const originalCompile = module._compile;
    module._compile = function (module, filename) {
      return originalCompile.call(this, result.outputFiles[0].text, filename);
    };

    return Module._extensions[".js"](module, filename);
  };

  Module.runMain(filePath);
}
