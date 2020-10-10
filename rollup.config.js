/* eslint-disable no-undef */
import typescript from "rollup-plugin-typescript2";
import { eslint } from "rollup-plugin-eslint";
import { uglify } from "rollup-plugin-uglify";
import strip from "@rollup/plugin-strip";

const isDev = process.env.NODE_ENV === "development";

const config = {
  input: "./src/index.ts",
  plugins: [
    eslint(),
    typescript({ useTsconfigDeclarationDir: !isDev }),
    !isDev && strip(),
    !isDev && uglify(),
  ],
  watch: {
    include: "src/**",
  },
  output: {
    file: "./dist/index.js",
    format: "umd",
    sourcemap: isDev,
    name: "frameMessage",
  },
};

export default config;
