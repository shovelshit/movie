const assert = require("node:assert/strict");
const test = require("node:test");
const path = require("node:path");
const { resolveFixtureRoots, startWebFixture } = require("./support/web.cjs");

test("web fixture serves the Movie page from its own repository", async () => {
  const roots = resolveFixtureRoots();
  assert.equal(roots.movie, path.resolve(__dirname, "../../pages/maoyan"));
  const web = await startWebFixture({ workerUrl: "http://127.0.0.1:1" });
  try {
    const response = await fetch(`${web.url}/maoyan/`);
    assert.equal(response.status, 200);
    assert.match(await response.text(), /<html\b/i);
  } finally {
    await web.close();
  }
});

test("parent-backed Store fixture resolves from the tools repository", { skip: !process.env.TOOLS_REPO_ROOT }, () => {
  const roots = resolveFixtureRoots();
  assert.equal(roots.store, path.join(path.resolve(process.env.TOOLS_REPO_ROOT), "modules", "store", "pages", "store"));
});
