describe("Review Detail Page", () => {
  it("should navigate to individual review page", () => {
    cy.visit("/");

    // Capture the restaurant name
    let restaurantName;
    cy.get('[data-cy="review-card"]')
      .first()
      .find("h2")
      .invoke("text")
      .then((text) => {
        restaurantName = text;

        // Click the first review card AFTER capturing the name
        cy.get('[data-cy="review-card"]').first().click();

        // Verify navigation and content
        cy.url().should("include", "/reviews/");
        cy.get("h1").should("contain", restaurantName);
      });
  });

  it("should display full review content", () => {
    // Visit a specific review directly
    cy.visit("/reviews/611d4986-6f35-4eb2-85ed-5705512c9057");
    cy.get("h1").should("contain", "Meat District Co.");
    cy.get("p").should("contain", "Steak with a Darling Harbour View!");
    cy.contains("Reviewed on");
  });

  it("should display review image if available", () => {
    cy.visit("/reviews/611d4986-6f35-4eb2-85ed-5705512c9057");
    cy.get("img").should("exist");
    cy.get("img").should("be.visible");
  });

  it('should have working "More Reviews" button', () => {
    cy.visit("/reviews/611d4986-6f35-4eb2-85ed-5705512c9057");
    cy.contains("More Reviews").click();
    cy.url().should("include", "/reviews");
  });

  it("should display review rating correctly", () => {
    cy.visit("/reviews/611d4986-6f35-4eb2-85ed-5705512c9057");
    cy.get("h2").should("contain", "Good");
  });
});
