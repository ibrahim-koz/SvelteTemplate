module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    extraFileExtensions: ['.svelte'],
  },
  plugins: [
    '@typescript-eslint',
    'svelte3',
  ],
  rules: {
    indent: 'off',
    '@typescript-eslint/indent': ['error', 2],
  },
  settings: {
    'svelte3/typescript': require('typescript'),
    'svelte3/ignore-styles': () => true,
  },

  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
};
