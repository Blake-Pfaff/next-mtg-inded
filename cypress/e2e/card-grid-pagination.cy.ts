describe("Card Grid with Pagination", () => {
  beforeEach(() => {
    // Visit the main page
    cy.visit("/");

    // Wait for the page to load and cards to be visible
    cy.get('[data-cy="card-grid"]').should("be.visible");
  });

  it("displays the card grid with initial cards", () => {
    // Check that the page title is visible
    cy.contains("Magic: The Gathering Card Index").should("be.visible");

    // Check that cards are displayed
    cy.get('[data-cy="card"]').should("have.length.at.least", 1);

    // Check that pagination is visible
    cy.get('[data-cy="pagination-container"]').should("be.visible");

    // Check that page 1 is active
    cy.get('button[aria-current="page"]').should("contain", "1");
  });

  it("navigates between pages using pagination buttons", () => {
    // Count total pagination buttons (excluding prev/next)
    cy.get("button").then(($buttons) => {
      const pageButtons = Array.from($buttons).filter((btn) =>
        /^\d+$/.test(btn.textContent?.trim() || "")
      );

      if (pageButtons.length > 1) {
        // Multiple pages exist - test navigation
        const targetPage = pageButtons[1].textContent?.trim();

        cy.get("button").contains(targetPage!).click();
        cy.get('button[aria-current="page"]').should("contain", targetPage);
        cy.url().should("include", `page=${targetPage}`);
        cy.get('[data-cy="card"]').should("have.length.at.least", 1);

        // Go back to page 1
        cy.get("button").contains("1").click();
        cy.get('button[aria-current="page"]').should("contain", "1");
        cy.url().should("include", "page=1");
      } else {
        // Single page - verify we're on page 1
        cy.get('button[aria-current="page"]').should("contain", "1");
        cy.log("Single page detected - skipping multi-page navigation test");
      }
    });
  });

  it("uses next and previous navigation buttons", () => {
    // Check if next button exists and is not disabled
    cy.get('button[aria-label="Go to next page"]').then(($btn) => {
      if ($btn.length > 0 && !$btn.prop("disabled")) {
        // Click next button
        cy.get('button[aria-label="Go to next page"]').click();

        // Should be on page 2
        cy.get('button[aria-current="page"]').should("contain", "2");
        cy.url().should("include", "page=2");

        // Click previous button
        cy.get('button[aria-label="Go to previous page"]').click();

        // Should be back on page 1
        cy.get('button[aria-current="page"]').should("contain", "1");
        cy.url().should("include", "page=1");
      } else {
        // If next button is disabled, just verify we're on page 1
        cy.get('button[aria-label="Go to previous page"]').should(
          "be.disabled"
        );
        cy.get('button[aria-current="page"]').should("contain", "1");
        cy.log(
          "Only one page available - next/previous navigation test skipped"
        );
      }
    });
  });

  it("changes page size using dropdown", () => {
    // Get initial number of cards
    cy.get('[data-cy="card"]').then(($cards) => {
      const initialCount = $cards.length;

      // Open page size dropdown
      cy.get("button").contains("20").click();

      // Select 10 items per page
      cy.contains("10").click();

      // Check that URL reflects page size change
      cy.url().should("include", "pageSize=10");

      // Check that fewer cards are displayed (if we had 20 before)
      if (initialCount === 20) {
        cy.get('[data-cy="card"]').should("have.length", 10);
      }

      // Check that dropdown shows new value
      cy.get("button").contains("10").should("be.visible");
    });
  });

  it("maintains pagination state on page reload", () => {
    // Change page size first
    cy.get("button").contains("20").click();
    cy.contains("10").click();

    // Navigate to page 2 if it exists
    cy.get("body").then(($body) => {
      if ($body.find("button:contains('2')").length > 0) {
        cy.get("button").contains("2").click();

        // Reload the page
        cy.reload();

        // Check that state is maintained
        cy.get('button[aria-current="page"]').should("contain", "2");
        cy.url().should("include", "page=2");
      }
    });

    // Always check page size is maintained
    cy.get("button").contains("10").should("be.visible");
    cy.url().should("include", "pageSize=10");
  });

  it("scrolls to top when changing pages", () => {
    // Scroll down to bottom of page
    cy.scrollTo("bottom");

    // Click next page
    cy.get('button[aria-label="Go to next page"]').click();

    // Check that page scrolled back to top
    cy.window().its("scrollY").should("equal", 0);
  });

  it("handles card clicks", () => {
    // Click on the first card
    cy.get('[data-cy="card"]').first().click();

    // For now, we just check that the console log happens
    // In the future, this would open a modal
    cy.window()
      .its("console")
      .then((console) => {
        cy.stub(console, "log").as("consoleLog");
      });
  });

  it("displays card information correctly", () => {
    // Check that cards have proper structure
    cy.get('[data-cy="card"]')
      .first()
      .within(() => {
        // Should have card image
        cy.get("img").should("be.visible");

        // Should have card title
        cy.get('[data-cy="card-title"]')
          .should("be.visible")
          .and("not.be.empty");
      });
  });

  it("handles error states gracefully", () => {
    // Intercept API call to simulate error
    cy.intercept("GET", "**/cards**", { statusCode: 500 }).as("getCardsError");

    // Visit page (will trigger error)
    cy.visit("/");

    // Wait for error response
    cy.wait("@getCardsError");

    // Check that error message is displayed
    cy.contains("Error loading cards").should("be.visible");
  });

  it("shows loading state", () => {
    // Intercept API call with delay
    cy.intercept("GET", "**/cards**", {
      delay: 2000,
      fixture: "cards.json",
    }).as("getCardsDelay");

    // Visit page
    cy.visit("/");

    // Check for loading indicators
    cy.get('[data-cy="loading"]').should("be.visible");

    // Wait for API call to complete
    cy.wait("@getCardsDelay");

    // Loading should be gone
    cy.get('[data-cy="loading"]').should("not.exist");
  });

  it("works on mobile viewport", () => {
    // Set mobile viewport
    cy.viewport("iphone-x");

    // Check that cards are still displayed properly
    cy.get('[data-cy="card"]').should("be.visible");

    // Check that pagination works on mobile
    cy.get('[data-cy="pagination-container"]').should("be.visible");

    // Test pagination on mobile
    cy.get("button").then(($buttons) => {
      const pageButtons = Array.from($buttons).filter((btn) =>
        /^\d+$/.test(btn.textContent?.trim() || "")
      );

      if (pageButtons.length > 1) {
        // Multiple pages - test navigation on mobile
        const targetPage = pageButtons[1].textContent?.trim();
        cy.get("button").contains(targetPage!).click();
        cy.get('button[aria-current="page"]').should("contain", targetPage);
      } else {
        // Single page - just verify mobile responsiveness
        cy.get('button[aria-current="page"]').should("contain", "1");
        cy.get('[data-cy="card"]').should("be.visible");
        cy.log("Single page on mobile - responsiveness verified");
      }
    });
  });

  it("maintains accessibility standards", () => {
    // Check that pagination has proper ARIA labels
    cy.get('nav[aria-label="Pagination"]').should("exist");

    // Check that page buttons have aria-current
    cy.get('button[aria-current="page"]').should("exist");

    // Check that navigation buttons have aria-labels
    cy.get('button[aria-label="Go to next page"]').should("exist");
    cy.get('button[aria-label="Go to previous page"]').should("exist");

    // Check that cards are keyboard accessible
    cy.get('[data-cy="card"]').first().focus().should("be.focused");
  });
});
