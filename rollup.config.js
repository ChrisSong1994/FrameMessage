/* eslint-disable no-undef */
import typescript from "rollup-plugin-typescript2";
import { eslint } from "rollup-plugin-eslint";
import strip from "@rollup/plugin-strip";

const isDev = process.env.NODE_ENV === "development";

console.log(isDev, process.env.NODE_ENV);

const config = {
  input: "./src/index.ts",
  plugins: [
    strip({
      debugger: true,
      functions: ["console.log", "assert.*", "debug", "alert"],
      sourceMap: true,
    }),
    eslint(),
    typescript({ useTsconfigDeclarationDir: !isDev }),
  ],
  watch: {
    include: "src/**",
  },
};

const umd = {
  ...config,
  output: {
    file: "./dist/index.js",
    format: "umd",
    sourcemap: isDev,
    name: "frameMessage",
  },
};

const esm = {
  ...config,
  output: {
    file: "./es/index.js",
    format: "es",
    sourcemap: isDev,
  },
};

export default isDev ? [umd, esm] : [umd, esm];
