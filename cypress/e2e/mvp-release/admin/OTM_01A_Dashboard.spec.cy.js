/// <reference types="cypress" />

describe("Admin - Dashboard Check", () => {
  beforeEach(() => {
    cy.firebaseLogin();
  });

  it("Verify Dashboard page loads", () => {
    cy.getDataCy('dashboard-nav-link').should("exist").click();
    cy.getDataCy('dashboard-add-user-button').should("exist");
  });

  it("Check Jobs tab", () => {
    cy.intercept("POST", "**/fsApp/getJobs**").as("getJobs");
    
    cy.getDataCy('dashboard-nav-link').should("exist").click();
    
    cy.getDataCy('dashboard-jobs-tab').should("exist").click();
    cy.getDataCy('dashboard-add-job-button').should("exist");
    cy.wait("@getJobs").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
    
    cy.intercept("POST", "**/fsApp/addJob**").as("addJob");
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy="dashboard-add-job-button"]').click();
    cy.get('#add-job-name').clear('T');
    cy.get('#add-job-name').type('Test Job');
    cy.get('[value="first"]').click();
    cy.get('[value="second"]').click();
    cy.get(':nth-child(5) > .w-\\.5').click();
    cy.get(':nth-child(6) > .min-h-min').click();
    /* ==== End Cypress Studio ==== */
    cy.wait("@addJob").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });

    cy.intercept("POST", "**/fsApp/deleteJob**").as("deleteJob");
    cy.getDataCy('test-job').should("exist").click();
    cy.getDataCy('delete-job-test-job-button').should("exist").click();
    cy.getDataCy('confirm-delete-test-job-button').should("exist").click();
    cy.wait("@deleteJob").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
  });

  it("Check Settings tab", () => {
    cy.getDataCy('dashboard-nav-link').should("exist").click();
    
    cy.getDataCy('dashboard-settings-tab').should("exist").click();
    cy.getDataCy('department-settings-table').should("exist");
  });

  afterEach(() => {
    cy.logout();
  });

});