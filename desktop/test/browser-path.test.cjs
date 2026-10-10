const assert = require("node:assert/strict");
const test = require("node:test");
const { resolveChromeExecutable } = require("./support/browser.cjs");

test("uses a configured Chrome executable when it exists", () => {
  assert.equal(resolveChromeExecutable({ configured: "/custom/chrome", platform: "linux", exists: (candidate) => candidate === "/custom/chrome" }), "/custom/chrome");
});

test("finds Chrome on Ubuntu without a macOS-specific path", () => {
  assert.equal(resolveChromeExecutable({ configured: "", platform: "linux", exists: (candidate) => candidate === "/usr/bin/google-chrome" }), "/usr/bin/google-chrome");
});

test("fails clearly when no Chrome executable is installed", () => {
  assert.throws(() => resolveChromeExecutable({ configured: "", platform: "linux", exists: () => false }), /Chrome\/Chromium not found/);
});
