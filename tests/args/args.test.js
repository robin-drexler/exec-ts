const test = require("ava").default;
const { execTS } = require("../exec-ts");

test("compiles TS file", async (t) => {
  const result = await execTS(
    "./args.fixture.ts -- log --planet=mars --life easy"
  );
  t.regex(result.stdout, /Today we log that life is easy on mars/);
});
