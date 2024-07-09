const { defineConfig } = require("cypress");
const { downloadFile } = require('cypress-downloadfile/lib/addPlugin');

module.exports = defineConfig({
  // Top-level Cypress configuration
  video: true, // Enable video recording for all test runs

  e2e: {
    setupNodeEvents(on, config) {
      // Register 'downloadFile' task
      on('task', { downloadFile });

      // Register 'csvToJson' task
      on('task', {
        csvToJson(data) {
          const lines = data.split("\n");
          const result = [];
          const headers = lines[0].split(",");
          
          for (let i = 1; i < lines.length; i++) {
            const obj = {};
            const currentline = lines[i].split(",");
            
            for (let j = 0; j < headers.length; j++) {
              obj[headers[j]] = currentline[j];
            }
            result.push(obj);
          }
          
          return result;
        }
      });
    },
  },

  // Environment variables
  env: {
    baseUrl: "https://testpages.herokuapp.com/styled/tag/dynamic-table.html"
  }
});
