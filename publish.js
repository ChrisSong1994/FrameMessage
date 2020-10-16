/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs-extra");
const path = require("path");
const version = require(path.resolve(__dirname, "./package.json")).version;

async function copyFiles() {
  try {
    fs.copyFile(
      path.resolve(__dirname, "./dist/index.js"),
      path.resolve(__dirname, "./dist/", `frameMessage_${version}.js`)
    );
  } catch (err) {
    console.error(err);
  }
}

copyFiles();
