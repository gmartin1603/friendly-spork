/// <reference types="cypress" />

describe("Login", () => {
  it("Valid Login", () => {
    // cy.logout();
    cy.login("eb1MMem5XtWzE1NjxqYYemoQ4m32");
    cy.visit("/")
    cy.get("[data-cy='schedule-corner-cell']").should("exist");
    // Logout
    cy.logout();
  });

  xit("Invalid Login", () => {
    cy.login("admin@otm.com", "WrongPassword");
    // cy.url().should("include", "/dashboard");
  });

});