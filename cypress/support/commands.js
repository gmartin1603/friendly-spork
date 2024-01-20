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

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import { attachCustomCommands } from 'cypress-firebase';
import { firebaseConfig, firebaseConfig2 } from "../../src/private/firestore.js";
import CYPRESS_ENV from '../../cypress.env.json'

const USER = CYPRESS_ENV['user']
const DEFAULT_UID = CYPRESS_ENV['users'][USER]

firebase.initializeApp(firebaseConfig2);

attachCustomCommands({ Cypress, cy, firebase });

Cypress.Commands.add("firebaseLogin", (uid) => {
  if (!uid) {
    uid = DEFAULT_UID;
  }
  cy.log(`Logging in as ${uid}`)
  cy.task("log", `Logging in as ${uid}`)
  cy.login(uid)

  // navigate to home page and confirm that the schedule loads
  cy.visit("/")
  cy.get("[data-cy='schedule-corner-cell']").should("exist");
});

Cypress.Commands.add("getDataCy", (selector, options) => {
  return cy.get(`[data-cy=${selector}]`, options);
});