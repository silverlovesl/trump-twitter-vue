module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/prettier', '@vue/typescript'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        bracketSpacing: true,
        tabWidth: 2,
        printWidth: 200,
        proseWrap: 'preserve',
        singleQuote: true,
        semi: true,
      },
    ],
  },
  parserOptions: {
    parser: 'typescript-eslint-parser',
  },
};
