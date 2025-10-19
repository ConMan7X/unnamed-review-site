describe("Images", () => {
  it("should load review card images", () => {
    cy.visit("/");
    cy.get('[data-cy="review-card"] img').each(($img) => {
      cy.wrap($img).should("be.visible");
      cy.wrap($img).should("have.attr", "src");
      cy.wrap($img).should("have.attr", "alt");
    });
  });
});
