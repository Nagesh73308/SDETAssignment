const { defineConfig } = require("cypress");
const { downloadFile } = require('cypress-downloadfile/lib/addPlugin');

module.exports = defineConfig({
  // Top-level Cypress configuration
  video: true, // Enable video recording for all test runs

  e2e: {
    setupNodeEvents(on, config) {
      // Register 'downloadFile' task
      on('task', { downloadFile });
      // You can implement other node event listeners here if needed
    },
  },

  // Environment variables
  env: {
    baseUrl: "https://testpages.herokuapp.com/styled/tag/dynamic-table.html"
  }
});

