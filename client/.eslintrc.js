module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb-typescript/base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    'import/extensions': [
      'error',
      'never'
    ]
  },
  settings: {
    react: {
      version: "detect",
    },
    'import/resolver': {
      node: {
        extensions: [ '.json' ]
      }
    },
  }
};
