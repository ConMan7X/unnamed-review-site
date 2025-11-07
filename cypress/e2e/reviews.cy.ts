describe("Reviews", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display at least 4 reviews on home page", () => {
    cy.get('[data-cy="review-card"]').should("have.length.at.least", 4);
  });

  it("should display limited (at most 4) reviews on home page", () => {
    cy.get('[data-cy="review-card"]').should("have.length.at.most", 4);
  });

  it("should display all reviews on reviews page", () => {
    cy.visit("/reviews");
    cy.get('[data-cy="review-card"]').should("have.length.at.least", 5);
  });

  it("should display most recent review first on home page", () => {
    // Collect the displayed date text from each review card, parse to Date,
    // and assert the array is sorted descending (most recent first).
    cy.get('[data-cy="review-card"]').then((cards) => {
      const dates: Date[] = [];
      // For each card, find the date text (rendered using en-AU locale in UI)
      // the date is in a <p> with text like '15/01/2025' depending on locale.
      Cypress.$(cards).each((_, el) => {
        const dateText = Cypress.$(el).find("p").text().trim();
        if (dateText) {
          // Parse day/month/year formats (en-AU) safely
          const parts = dateText.split("/").map((p) => parseInt(p, 10));
          if (parts.length === 3 && parts.every((n) => !Number.isNaN(n))) {
            const [day, month, year] = parts;
            dates.push(new Date(year, month - 1, day));
          }
        }
      });

      // Ensure we collected at least two dates to compare ordering
      expect(dates.length).to.be.gte(2);

      // Check non-increasing order
      for (let i = 0; i < dates.length - 1; i++) {
        expect(dates[i].getTime()).to.be.at.least(dates[i + 1].getTime());
      }
    });
  });

  it("should have a sort by date button on reviews page", () => {
    cy.visit("/reviews");
    cy.get('[data-cy="sort-by"]').should("exist");
  });
});
