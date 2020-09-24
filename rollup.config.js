import typescript from "rollup-plugin-typescript2";
import { eslint } from "rollup-plugin-eslint";

const isDev = process.env.NODE_ENV === "development";

console.log(isDev,process.env.NODE_ENV)

const config = {
  input: "./src/index.ts",
  plugins: [eslint(), typescript({ useTsconfigDeclarationDir: !isDev })],
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

export default isDev ? umd : [umd, esm];
