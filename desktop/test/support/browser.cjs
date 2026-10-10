const fs = require("node:fs");

function resolveChromeExecutable({ configured = process.env.MAOYAN_E2E_CHROME, platform = process.platform, exists = fs.existsSync } = {}) {
  const candidates = [
    configured,
    platform === "darwin" ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" : "",
    platform === "win32" ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" : "",
    platform === "linux" ? "/usr/bin/google-chrome" : "",
    platform === "linux" ? "/usr/bin/chromium" : "",
  ].filter(Boolean);
  const executable = candidates.find((candidate) => exists(candidate));
  if (!executable) throw new Error("Chrome/Chromium not found; set MAOYAN_E2E_CHROME to an executable path");
  return executable;
}

module.exports = { resolveChromeExecutable };
