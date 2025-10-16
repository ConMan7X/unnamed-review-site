describe("Images", () => {
  it("should load review card images", () => {
    cy.visit("/");
    cy.get('[data-cy="review-card"] img').each(($img) => {
      cy.wrap($img).should("be.visible");
      cy.wrap($img).should("have.attr", "src");
      cy.wrap($img).should("have.attr", "alt");
    });
  });

  // it("should handle missing images gracefully", () => {
  //   // Test a review without an image
  //   cy.visit("/reviews/review-without-image");
  //   cy.get("img").should("not.exist");
  //   // Or if you have a fallback, test that
  //   // cy.get('[data-cy="image-fallback"]').should('exist')
  // });
});
