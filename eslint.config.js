import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import chaiFriendly from 'eslint-plugin-chai-friendly';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import cypressPlugin from 'eslint-plugin-cypress';


export default [
  {
    ignores: ['eslint.config.js', 'node_modules', 'dist', 'coverage'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    plugins: {
      prettier: prettierPlugin,
      'chai-friendly': chaiFriendly,
      'simple-import-sort': simpleImportSort,
      'cypress': cypressPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',

      'no-unused-expressions': 'off',

      'chai-friendly/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],

      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      ...cypressPlugin.configs.recommended.rules,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
];
