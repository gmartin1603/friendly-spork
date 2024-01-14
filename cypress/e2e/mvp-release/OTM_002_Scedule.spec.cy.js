/// <reference types="cypress" />

describe("Schedule Page Check", () => {
  it("Navigate to Schedule Page", () => {
    cy.visit("/");
    cy.get("Schedule").should("exist");
  });

  xit("Invalid Login", () => {
    cy.login("admin@otm.com", "WrongPassword");
    // cy.url().should("include", "/dashboard");
  });

});