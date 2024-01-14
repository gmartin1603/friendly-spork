/// <reference types="cypress" />

describe("Login", () => {
  it("Valid Login", () => {
    cy.login("admin@otm.com", "test1234");
    cy.get("Schedule").should("exist");
    // TODO: Logout

  });

  xit("Invalid Login", () => {
    cy.login("admin@otm.com", "WrongPassword");
    // cy.url().should("include", "/dashboard");
  });

});