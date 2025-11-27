import reporter from 'multiple-cucumber-html-reporter';

reporter.generate({
  jsonDir: '.run/reports/json',
  reportPath: '.run/reports/html',
  reportName: 'Cypress BDD Test Report',
  metadata: {
    browser: {
      name: 'chrome',
      version: 'latest',
    },
    device: 'Local machine',
    platform: {
      name: process.platform,
      version: process.version,
    },
  },
  customData: {
    title: 'Execution Info',
    data: [
      { label: 'Project', value: 'patrick_interview' },
      { label: 'Run Date', value: new Date().toISOString() },
      { label: 'Environment', value: process.env.NODE_ENV || 'local' },
    ],
  },
});
