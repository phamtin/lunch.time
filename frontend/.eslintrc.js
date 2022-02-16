module.exports = {
  extends: ['airbnb-typescript-prettier'],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['filenames'],
  rules: {
    'no-restricted-globals': 'off',
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 85,
        bracketSpacing: true,
        tabWidth: 2,
        semi: true,
        endOfLine: 'auto',
      },
    ],
    'react/prefer-stateless-function': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['ts', 'tsx'],
      },
    ],
    'react/function-component-definition': [
      0,
      {
        namedComponents: 'function-declaration',
      },
    ],
    'react/prefer-stateless-function': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-props-no-spreading': 0,
    'react/require-default-props': 0,
    'import/prefer-default-export': 0,
    'no-unused-expressions': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': ['error', { props: false }],
    'import/no-cycle': 0,
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/button-has-type': 0,
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/no-unused-vars': 1,
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [
          ['builtin', 'external'],
          'internal',
          ['parent', 'sibling', 'index'],
          'unknown',
        ],
        alphabetize: { order: 'asc' },
        pathGroups: [
          {
            pattern: 'styles/**',
            group: 'internal',
            position: 'after',
          },
          { group: 'builtin', pattern: 'react', position: 'before' },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        'filenames/match-regex': [2, '^[a-z-.]+$', true],
      },
    },
    {
      files: ['*.tsx'],
      rules: {
        'filenames/match-regex': [2, '^[A-Z][a-z].+(?:[A-Z][a-z].+)*$', true],
      },
    },
    {
      files: ['src/index.tsx'],
      rules: {
        'filenames/match-regex': 'off',
      },
    },
    {
      files: ['*hook.ts'],
      rules: { '@typescript-eslint/no-explicit-any': 'off' },
    },
  ],
};
