import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import json from '@rollup/plugin-json';
import svgr from "@svgr/rollup";
import postcss from "rollup-plugin-postcss";
import { uglify } from "rollup-plugin-uglify";
import { visualizer } from "rollup-plugin-visualizer";

export default {
  input: "./src/index.tsx",
  output: {
    dir: "dist",
    format: "esm",
    filename: "index.js",
  },
  plugins: [
    resolve(),
    commonjs(),
    svgr({ exportType: "named", jsxRuntime: "automatic" }),
    postcss(),
    babel(),
    typescript(),
    json(),
    uglify(),
    visualizer({ projectRoot: "./dist", open: true }),
  ],
  external: ["react", 'react-dom'],
};
