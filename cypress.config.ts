import { defineConfig } from 'cypress';
import { writeFileSync } from 'fs';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import {
  addCucumberPreprocessorPlugin
} from '@badeball/cypress-cucumber-preprocessor';
// @ts-ignore
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild';
import fetch from 'node-fetch';

let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

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

      // Set up file preprocessor with esbuild
      on(
          'file:preprocessor',
          createBundler({
            plugins: [createEsbuildPlugin(config)],
          }),
      );

      // ✅ Add custom Cypress task for token management
      on('task', {
        async getToken() {
          const now = Date.now();

          if (cachedToken && tokenExpiry && now < tokenExpiry) {
            console.log('✅ Reusing cached token');
            return cachedToken;
          }

          console.log('🔄 Fetching new token...');
          const res = await fetch('https://sandbox-partners-api.airalo.com/v2/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              client_id: '7e29e2facf83359855f746fc490443e6',
              client_secret: 'e5NNajm6jNAzrWsKoAdr41WfDiMeS1l6IcGdhmbb',
              grant_type: 'client_credentials'
            }),
          });

          if (!res.ok) {
            throw new Error(`❌ Failed to fetch token: ${res.status} ${res.statusText}`);
          }

          interface TokenResponse {
            data: {
              access_token: string;
              expires_in: number;
              token_type: string;
            };
            meta: {
              message: string;
            };
          }

          const raw = await res.json();
          const data = raw as TokenResponse;

          cachedToken = data.data.access_token;
          tokenExpiry = now + data.data.expires_in * 1000;

          console.log(`🆕 Token fetched. Expires at: ${new Date(tokenExpiry).toISOString()}`);
          return cachedToken;
        }
      });


      return config;
    },
    baseUrl: 'https://www.airalo.com/',
    env: {
      cucumberJson: {
        generate: true,
        output: ".run/reports/json/[name].cucumber.json",
      },
    },
  },
});
