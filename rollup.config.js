"use strict";
import builtins from "rollup-plugin-node-builtins";
// const resolve = require("rollup-plugin-node-resolve");
import alias from 'rollup-plugin-alias';
import resolve from '@rollup/plugin-node-resolve'


const nodeResolve = resolve({
  preferBuiltins: false,
  mainFields: ["module", "jsnext:main", "browser"],
});

const BROWSERIFY_ALIASES = {
  path: "path-browserify",
};

const browserify = {
  name: 'browserify',
  resolveId(source, importer) {
    if (source in BROWSERIFY_ALIASES) {
      if (BROWSERIFY_ALIASES[source] === EMPTY_MODULE_ID)
        return EMPTY_MODULE_ID;
      return nodeResolve.resolveId(BROWSERIFY_ALIASES[source], undefined);
    }
    if (source === EMPTY_MODULE_ID) return EMPTY_MODULE_ID;
  },
  load(id) {
    if (id === EMPTY_MODULE_ID) return EMPTY_MODULE;
  },
};

const inputOptions = {
  plugins:[
    // builtins(),
    nodeResolve,
    alias({
      path: 'path-browserify'
    })
  ]
}

module.exports={inputOptions}
