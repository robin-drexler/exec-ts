const test = require("ava").default;
const { execTS } = require("../exec-ts");

test("allows to override tsconfig path", async (t) => {
  /**
   * This one is a bit more complicated.
   * Esbuild only supports a subset of tsconfig options.
   * https://esbuild.github.io/content-types/#tsconfig-json
   *
   * Hence we had to get a bit creative here.
   * The overriden tsconfig changes `jsxFactory` from `React.createElement` to a function that merely logs.
   *
   * We then assert that the log happened which proves that the config override was sucessful.
   */
  const result = await execTS(
    "./tsconfig-path.fixture.ts --project ./foo/tsconfig.json"
  );

  t.regex(result.stdout, /override worked/);
});
