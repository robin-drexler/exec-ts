const test = require("ava").default;
const { execTS } = require("../exec-ts");

test("allows scripts to import other TS files", async (t) => {
  const result = await execTS("./import-root.fixture.ts");
  t.regex(result.stdout, /hello you/);
});
