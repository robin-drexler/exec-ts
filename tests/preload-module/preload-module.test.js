const test = require("ava").default;
const { execTS } = require("../exec-ts");

test("preloads required modules before running", async (t) => {
  const result = await execTS(
    "./preload-module.fixture.ts --require tsconfig-paths/register"
  );
  t.regex(result.stdout, /venus/);
});
