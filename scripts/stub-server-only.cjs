const Module = require("module");
const path = require("path");

const original = Module._resolveFilename;
const empty = path.join(__dirname, "stub-server-only-empty.cjs");

Module._resolveFilename = function (request, parent, isMain, options) {
  if (request === "server-only") return empty;
  return original.call(this, request, parent, isMain, options);
};
