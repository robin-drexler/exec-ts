import { buildSync } from "esbuild";
import Module from "module";

/**
 * @typedef {Object} Options
 * @property {string} filePath
 */

/**
 *
 * @param options {Options}
 */
export async function run({ filePath } = {}) {
  Module._extensions[".ts"] = (module, filename) => {
    const result = buildSync({
      entryPoints: [filename],
      write: false,
      platform: "node",
      format: "cjs",
    });

    module._compile(result.outputFiles[0].text, filename);
  };

  Module.runMain(filePath);
}
