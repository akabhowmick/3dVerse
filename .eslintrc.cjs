module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'jsx-a11y'],
  settings: {
    'jsx-a11y': {
      components: {
        NavLink: 'a',
        Link: 'a',
      },
    },
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['NavLink', 'Link'],
        specialLink: ['to'],
        aspects: ['noHref', 'invalidHref'],
      },
    ],
  },
}
