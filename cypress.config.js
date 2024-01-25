const admin = require('firebase-admin');
const { defineConfig } = require('cypress');
const cypressFirebasePlugin = require('cypress-firebase').plugin;

const serviceAccount = require("./src/private/firebase_admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = defineConfig({
  screenshotsFolder: "./cypress/report/assets",
	chromeWebSecurity: false,
	defaultCommandTimeout: 12000,
	pageLoadTimeout: 60000,
	experimentalModifyObstructiveThirdPartyCode: true,
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "mochawesome",
    mochawesomeReporterOptions: {
      reportDir: "./cypress/report/mochawesome-report",
      overwrite: false,
      html: false,
      json: true,
      charts: true,
      reportTitle: "OTM Test Report",
      inline: false,
    },
  },
	e2e: {
		// default env chrome
		browser: "chrome",
		experimentalStudio: true,
		baseUrl: "http://localhost:3000/",
		setupNodeEvents(on, config) {
			on('task', {
				log(message) {
					// Then to see the log messages in the terminal
					//   cy.task("log", "my message");
					console.log(message);
					return null;
				},
			});
      return cypressFirebasePlugin(on, config, admin,{
        // Here is where you can pass special options. 
        // If you have not set the GCLOUD_PROJECT environment variable, give the projectId here, like so:
        projectId: 'otm-staging-725a6',
        // if your databaseURL is not just your projectId plus ".firebaseio.com", then you _must_ give it here, like so:
        //    databaseURL: 'some-project-default-rtdb.europe-west1.firebasedatabase.app',
      });
		},
	},
});
