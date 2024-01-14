const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    browser: "chrome",
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
