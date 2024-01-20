// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Cypress.Commands.add("login", (email, password) => {
//   cy.visit("/");
//   cy.get('[data-cy="login-email"]').type(email);
//   cy.get('[data-cy="login-password"]').type(password);
//   cy.get('button[data-cy="login-button"]').click();
// });

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import { attachCustomCommands } from 'cypress-firebase';
import { firebaseConfig, firebaseConfig2 } from "../../src/private/firestore.js";


// const fbConfig = {
//   // Your config from Firebase Console
// };

firebase.initializeApp(firebaseConfig2);

attachCustomCommands({ Cypress, cy, firebase });