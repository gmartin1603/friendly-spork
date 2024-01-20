/// <reference types="cypress" />

describe("Schedule Page Check", () => {
  it("Verify Scheduel page loads", () => {
    cy.login("admin@ota.com", "test1234")
    cy.visit("/");
    cy.get("Schedule").should("exist");
  });

});