module.exports = {
  root: true,
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-typescript'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    project: `./tsconfig.json`
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'no-underscore-dangle': 0,
    "no-param-reassign": ["error", { "props": false }]
  },
};
