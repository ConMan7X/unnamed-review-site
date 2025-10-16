describe("Responsive Design", () => {
  it("should display correctly on mobile", () => {
    cy.viewport("iphone-x");
    cy.visit("/");
    cy.get("nav").should("be.visible");
    cy.get('[data-cy="review-card"]').should("be.visible");
  });

  it("should display correctly on tablet", () => {
    cy.viewport("ipad-2");
    cy.visit("/");
    cy.get('[data-cy="review-card"]').should("be.visible");
  });

  // it("should have working mobile navigation", () => {
  //   cy.viewport("iphone-x");
  //   cy.visit("/");
  //   // Test mobile menu if you have one
  //   cy.get('button[aria-label="Toggle menu"]').click();
  //   cy.get("nav").should("contain", "Home");
  //   cy.get("nav").should("contain", "Reviews");
  // });
});
