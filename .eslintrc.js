module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ["tsconfig.json"]
  },
  plugins: ['@typescript-eslint', 'react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-unused-vars': "warn",
    'react-hooks/exhaustive-deps': 'off',
  },
}
