import {addCucumberPreprocessorPlugin} from '@badeball/cypress-cucumber-preprocessor';
import {createEsbuildPlugin} from '@badeball/cypress-cucumber-preprocessor/esbuild';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import {defineConfig} from 'cypress';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  e2e: {
    viewportWidth: 2000,
    viewportHeight: 950,
    retries: 0,
    chromeWebSecurity: true,
    watchForFileChanges: false,
    experimentalRunAllSpecs: true,
    experimentalOriginDependencies: true,
    experimentalMemoryManagement: true,
    videosFolder: '.run/reports/videos',
    downloadsFolder: '.run/reports/downloads',
    screenshotsFolder: '.run/reports/screenshots',
    defaultCommandTimeout: 40000,
    requestTimeout: 90000,
    responseTimeout: 90000,
    pageLoadTimeout: 120000,
    numTestsKeptInMemory: 1,
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/test_features/**/*.feature', // Path to feature files

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        }),
      );

      return config;
    },
    baseUrl: 'https://www.saucedemo.com/',
    env: {
      ...process.env,
      cucumberJson: {
        generate: true,
        output: '.run/reports/json/[name].cucumber.json',
      },
    },
  },
});
