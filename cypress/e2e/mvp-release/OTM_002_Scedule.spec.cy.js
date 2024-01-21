/// <reference types="cypress" />

describe("Schedule Page Check", () => {
  beforeEach(() => {
    cy.firebaseLogin();
  });

  it("Verify Schedule page loads", () => {
    cy.getDataCy('schedule-corne-cell').should("exist");
  });

  it("Test week forward button", () => {
    cy.getDataCy('next-week-button').click();
    cy.getDataCy('schedule-corner-cell').should("exist");
  });

  it("Test week back button", () => {
    cy.getDataCy('prev-week-button').click();
    cy.getDataCy('schedule-corner-cell').should("exist");
  });

});