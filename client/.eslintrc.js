module.exports = {
  root: true,
  ignorePatterns: ['testing/*'],
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'import'],
  env: {
    browser: true,
    jest: true,
    es2020: true,
  },
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      'typescript': {},
    },
  },
  rules: {
    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': 'default',
        'format': ['strictCamelCase'],
      },
      {
        'selector': 'typeAlias',
        'format': ['StrictPascalCase'],
      },
      {
        'selector': ['enum', 'enumMember'],
        'format': ['StrictPascalCase'],
      },

      // for http headers
      {
        'selector': [
          'classProperty',
          'objectLiteralProperty',
          'typeProperty',
          'classMethod',
          'objectLiteralMethod',
          'typeMethod',
          'accessor',
          'enumMember',
        ],
        'format': null,
        'modifiers': ['requiresQuotes'],
      },
      {
        'selector': 'variable',
        'format': ['strictCamelCase', 'StrictPascalCase'],
        'leadingUnderscore': 'allow',
        'trailingUnderscore': 'forbid',
      },
    ],
    'linebreak-style': 0,
    'max-len': [
      1,
      {
        code: 100,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'prefer-promise-reject-errors': 0,
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
    'no-return-assign': 0,
    'react/jsx-props-no-spreading': 0,
    'no-shadow': 0,
    'react/jsx-curly-newline': 0,
    'react/jsx-wrap-multilines': [
      'error',
      {
        'prop': 'ignore',
      },
    ],
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 1,
    'react/forbid-prop-types': 0,
    'import/prefer-default-export': 0,
    'import/no-unresolved': 'error',
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': 0,
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-unused-vars': [1, { 'vars': 'all', 'args': 'none' }],
    '@typescript-eslint/unbound-method': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/order': [
      'error',
      {
        'groups': [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        'pathGroups': [
          {
            'pattern': 'types/**',
            'group': 'internal',
            'position': 'after',
          },
          {
            'pattern': 'utils/**',
            'group': 'internal',
            'position': 'after',
          },
          {
            'pattern': 'store',
            'group': 'internal',
            'position': 'after',
          },
          {
            'pattern': 'store/**',
            'group': 'internal',
            'position': 'after',
          },
          {
            'pattern': 'components/**',
            'group': 'internal',
            'position': 'after',
          },
          {
            'pattern': 'pages/**',
            'group': 'internal',
            'position': 'after',
          },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['*.spec.ts', '*.spec.tsx'],
      rules: {
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/require-await': 'off',
      },
    },
    {
      files: ['*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-implied-eval': 'off',
        '@typescript-eslint/prefer-regexp-exec': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/restrict-plus-operands': 'off',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/quotes': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unused-vars': 1,
      },
    },
  ],
};
