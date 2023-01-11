module.exports = {
  extends: ['plugin:import/typescript', 'prettier', 'plugin:storybook/recommended'],
  ignorePatterns: ['**/*'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        '@nrwl/nx/enforce-module-boundaries': [
          'error',
          {
            allow: [],
            depConstraints: [
              {
                onlyDependOnLibsWithTags: ['*'],
                sourceTag: '*',
              },
              {
                onlyDependOnLibsWithTags: ['scope:shared', 'scope:cmms', 'scope:ui'],
                sourceTag: 'scope:shared',
              },
              {
                onlyDependOnLibsWithTags: ['scope:shared', 'scope:cmms', 'scope:ui'],
                sourceTag: 'scope:cmms',
              },
              {
                onlyDependOnLibsWithTags: ['scope:shared', 'scope:workspaces', 'scope:ui'],
                sourceTag: 'scope:workspaces',
              },
            ],
            enforceBuildableLibDependency: true,
          },
        ],
      },
    },
    {
      extends: ['plugin:@nrwl/nx/javascript'],
      files: ['*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/no-empty-function': 'warn',
        '@typescript-eslint/no-this-alias': 'warn',
        '@typescript-eslint/no-unused-expressions': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-useless-constructor': 'warn',
        'import/first': 'warn',
        'jsx-a11y/alt-text': 'warn',
        'no-dupe-keys': 'warn',
        'no-extra-boolean-cast': 'off',
        'no-restricted-globals': 'warn',
        'no-undef': 'warn',
        'react-hooks/rules-of-hooks': 'warn',
        'react/jsx-no-duplicate-props': 'warn',
        'react/jsx-no-target-blank': 'warn',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    project: ['./tsconfig.base.json'],
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@nrwl/nx', 'deprecation', 'import', 'prefer-arrow'],
  root: true,
  rules: {
    '@typescript-eslint/prefer-for-of': 'error',
    'deprecation/deprecation': 'warn',
    'import/no-duplicates': 'warn',
    'import/no-unresolved': [
      'warn',
      {
        ignore: ['.css$'],
      },
    ],
    'import/order': [
      'warn',
      {
        'alphabetize': {
          caseInsensitive: true,
          order: 'asc',
        },
        'groups': [
          ['builtin', 'external'],
          ['internal', 'parent', 'sibling', 'index'],
        ],
        'newlines-between': 'always',
        'pathGroups': [
          {
            group: 'external',
            pattern: '@flowpath/**/*',
            position: 'after',
          },
        ],
        'pathGroupsExcludedImportTypes': ['builtin'],
      },
    ],
    'indent': [
      'off',
      2,
      {
        ArrayExpression: 1,
        CallExpression: {
          arguments: 1,
        },
        FunctionDeclaration: {
          body: 1,
          parameters: 1,
        },
        ImportDeclaration: 1,
        MemberExpression: 1,
        ObjectExpression: 1,
        SwitchCase: 1,
        flatTernaryExpressions: true,
      },
    ],
    'max-len': [
      'warn',
      {
        code: 140,
        ignoreRegExpLiterals: true,
        ignoreUrls: true,
      },
    ],
    'no-extra-boolean-cast': 'off',
    'no-lone-blocks': 'warn',
    'object-curly-newline': [
      'warn',
      {
        consistent: true,
      },
    ],
    'one-var': ['error', 'never'],
    'prefer-const': 'error',
    'prefer-object-spread': 'error',
    'prefer-template': 'error',
    'quote-props': ['warn', 'consistent-as-needed'],
    'quotes': 'off',
    'radix': 'error',
    'yoda': 'error',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      'eslint-import-resolver-typescript': true,
      'node': true,
      'typescript': {
        project: ['./tsconfig.base.json'],
      },
    },
  },
};
