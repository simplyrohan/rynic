const path = require("path");

module.exports = [
  {
    mode: "development",
    entry: "./src/index.js",
    output: {
      filename: "rynic.js",
      path: path.resolve(__dirname, "dist"),

      libraryTarget: 'umd',
      library: 'rynic',
    },
  },
  {
    mode: "development",
    entry: "./src/worker/index.js",
    target: "webworker",
    output: {
      filename: "rynicWorker.js",
      path: path.resolve(__dirname, "dist"),
    },
  },
];
