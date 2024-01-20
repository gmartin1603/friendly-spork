/// <reference types="cypress" />

describe("Authentication Checks", () => {
  it("Valid Login", () => {
    cy.firebaseLogin();
    // Logout
    cy.logout();
  });

  xit("Test invalid password", () => {
    cy.visit("/");
    cy.getDataCy('login-email').type("admin@otm.com");
    cy.getDataCy('login-password').type("invalidpassword");
    cy.getDataCy('login-button').click();
    cy.contains("wrong-password");
  });

  it("Test invalid username", () => {
    cy.visit("/");
    cy.getDataCy('login-email').type("admin@ota.com");
    cy.getDataCy('login-password').type("invalidpassword");
    cy.getDataCy('login-button').click();
    cy.contains("user-not-found");
  });

});