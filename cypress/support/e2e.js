// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import addContext from 'mochawesome/addContext';


Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    const spec = Cypress.spec
    console.log(spec)
    console.log(runnable)
    console.log(test)

    // Normalize the file path to handle both nested and base-level directories
    const specFilePath = spec.relative
    const normalizedSpecPath = specFilePath
        .replace(/\\/g, '/') // Replace backslashes with forward slashes
        // .replace('.spec.js', '') // Remove the .spec.js extension
        .replace('cypress/e2e/mvp-release', ''); // Adjust this based on your directory structure

    const screenshotFileName = `${runnable.parent.title} -- ${test.title} (failed).png`
    addContext({ test }, `assets/screenshots${normalizedSpecPath}/${screenshotFileName}`)
  }
});



// Cypress.on('test:after:run', (test, runnable) => {
//   if (test.state === 'failed') {
//     const spec = Cypress.spec
//     console.log(spec)
//     console.log(runnable)
//     console.log(test)

//     // Extract the spec file name without the .spec.cy.js extension
//     const specFileName = spec.name.replace('.spec.cy.js', '');

//     const screenshotFileName = `${runnable.parent.title} -- ${test.title} (failed).png`
//     addContext({ test }, `assets/${specFileName}/${screenshotFileName}`)
//   }
// });

