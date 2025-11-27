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
    device: 'CI Pipeline',
    platform: {
      name: process.platform,
      version: process.version,
    },
  },
  // optional, but nice if you tag scenarios
  customData: {
    title: 'Execution Info',
    data: [
      { label: 'Project', value: 'patrick_interview' },
      { label: 'Run Date', value: new Date().toISOString() },
      { label: 'Environment', value: process.env.NODE_ENV || 'local' },
    ],
  },
});
