const test = require("ava").default;
const { execTS } = require("../exec-ts");

test("compiles TS file", async (t) => {
  const result = await execTS("./import-root.fixture.ts");
  t.regex(result.stdout, /hello you/);
});
