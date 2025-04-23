import js from '@eslint/js';
import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import chaiFriendly from 'eslint-plugin-chai-friendly';
import cypressPlugin from 'eslint-plugin-cypress';
import prettierPlugin from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
// Import the globals package to get predefined globals
import globals from 'globals';

// Create properly formatted globals that ESLint expects (readonly by default)
function createGlobals(globals) {
  const result = {};
  for (const key in globals) {
    result[key] = 'readonly';
  }
  return result;
}

// Convert globals objects to the format ESLint expects
const nodeGlobals = createGlobals(globals.node);
const browserGlobals = createGlobals(globals.browser);
const mochaGlobals = createGlobals(globals.mocha);
const jestGlobals = createGlobals(globals.jest);

// Create a comprehensive testing globals object that covers all test frameworks
const testingGlobals = {
  ...mochaGlobals,
  ...jestGlobals,
  cy: 'readonly',
  Cypress: 'readonly',
  expect: 'readonly',
  assert: 'readonly',
};

export default [
  {
    ignores: ['eslint.config.js', 'node_modules', 'dist', 'coverage'],
  },
  js.configs.recommended,

  // Base configuration with Node and browser globals for ALL files
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...nodeGlobals,
        ...browserGlobals,
        ...testingGlobals, // Include ALL testing globals for all files
      },
    },
  },

  // TypeScript configuration
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tseslintPlugin,
    },
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      ...tseslintPlugin.configs.recommended.rules,
    },
  },

  // Ensure Cypress plugin rules are applied to Cypress files
  {
    files: ['**/cypress/**/*.ts', '**/cypress/**/*.js', '**/cypress.config.ts', '**/cypress.config.js'],
    plugins: {
      cypress: cypressPlugin,
    },
    rules: {
      ...cypressPlugin.configs.recommended.rules,
    },
  },

  prettierConfig,

  {
    plugins: {
      prettier: prettierPlugin,
      'chai-friendly': chaiFriendly,
      'simple-import-sort': simpleImportSort,
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
    },
  },
];
