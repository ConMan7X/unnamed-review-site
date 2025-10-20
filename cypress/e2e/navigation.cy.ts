describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should navigate to the home page", () => {
    cy.contains("Connor and Nicole");
  });

  it("should navigate to all reviews page", () => {
    cy.get('nav a[href*="/reviews"]').click();
    cy.url().should("include", "/reviews");
    cy.contains("All Reviews");
  });

  it("should navigate to about page", () => {
    cy.get('nav a[href*="/about"]').click();
    cy.url().should("include", "/about");
    cy.contains("About NCSFood");
  });
});
