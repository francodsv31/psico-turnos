
/** Config rápida solamente para inconsistencias obvias.
 *  No me volví loco con reglas raras; la idea es mantener esto simple. */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-refresh'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended'
  ],
  env: { browser: true, es2021: true },
  settings: { react: { version: 'detect' } },
  rules: {
    'react-refresh/only-export-components': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-console': 'off'
  }
}
