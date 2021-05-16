const test = require("ava").default;
const { execTS } = require("../exec-ts");

test("uses source files when printing errors", async (t) => {
  try {
    await execTS("./source-maps.fixture.ts");
  } catch (error) {
    // without source map support, the error would show on line 1
    t.regex(error.stderr, /source-maps.fixture.ts:4/);
  }
});
