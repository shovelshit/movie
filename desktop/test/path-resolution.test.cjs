const assert = require("node:assert/strict");
const test = require("node:test");
const path = require("node:path");
const { resolveFixtureRoots } = require("./support/web.cjs");

test("web fixture resolves Movie from the child and Store from the parent modules", () => {
  const roots = resolveFixtureRoots();
  assert.equal(path.basename(roots.movie), "maoyan");
  assert.equal(roots.movie.endsWith(path.join("modules", "movie", "pages", "maoyan")), true);
  if (process.env.TOOLS_REPO_ROOT) {
    assert.equal(roots.store.endsWith(path.join("modules", "store", "pages", "store")), true);
  }
});
