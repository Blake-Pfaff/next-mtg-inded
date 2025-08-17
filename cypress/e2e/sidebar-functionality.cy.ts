describe("Sidebar Functionality E2E", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("loads the homepage successfully", () => {
    cy.contains("Magic: The Gathering Card Index").should("be.visible");
    cy.contains("Browse and search through Magic: The Gathering cards").should(
      "be.visible"
    );
  });

  it("opens and closes sidebar via hamburger menu", () => {
    // Initially, sidebar should not be visible
    cy.get("aside").should("not.exist");

    // Click hamburger menu to open sidebar
    cy.get('[aria-label="Toggle menu"]').click();

    // Sidebar should be visible with filters
    cy.get("aside").should("be.visible");
    cy.contains("Filters").should("be.visible");
    cy.contains("Sidebar content coming soon").should("be.visible");

    // Click hamburger menu again to close sidebar
    cy.get('[aria-label="Toggle menu"]').click();

    // Sidebar should be closed
    cy.get("aside").should("not.exist");
  });

  it("closes sidebar via overlay click on mobile", () => {
    // Set mobile viewport
    cy.viewport(375, 667);

    // Open sidebar
    cy.get('[aria-label="Toggle menu"]').click();
    cy.get("aside").should("be.visible");

    // Click overlay to close
    cy.get('[aria-label="Close sidebar"]').click({ force: true });

    // Sidebar should be closed
    cy.get("aside").should("not.exist");
  });

  it("closes sidebar via close button on mobile", () => {
    // Set mobile viewport
    cy.viewport(375, 667);

    // Open sidebar
    cy.get('[aria-label="Toggle menu"]').click();
    cy.get("aside").should("be.visible");

    // Click close button
    cy.contains("Close Filters").click();

    // Sidebar should be closed
    cy.get("aside").should("not.exist");
  });

  it("handles keyboard navigation (ESC key)", () => {
    // Open sidebar
    cy.get('[aria-label="Toggle menu"]').click();
    cy.get("aside").should("be.visible");

    // Press ESC key
    cy.get("body").type("{esc}");

    // Sidebar should be closed
    cy.get("aside").should("not.exist");
  });

  it("has proper responsive behavior across viewports", () => {
    // Test desktop behavior
    cy.viewport(1280, 720);
    cy.reload(); // Ensure clean state
    cy.get('[aria-label="Toggle menu"]').click();
    cy.get("aside").should("be.visible");

    // Close sidebar for next test
    cy.get('[aria-label="Toggle menu"]').click();
    cy.get("aside").should("not.exist");

    // Test tablet behavior
    cy.viewport(768, 1024);
    cy.reload(); // Ensure clean state
    cy.get('[aria-label="Toggle menu"]').click();
    cy.get("aside").should("be.visible");
    cy.get('[aria-label="Close sidebar"]').should("be.visible");

    // Close sidebar for next test
    cy.get('[aria-label="Close sidebar"]').click({ force: true });
    cy.get("aside").should("not.exist");

    // Test mobile behavior
    cy.viewport(375, 667);
    cy.reload(); // Ensure clean state
    cy.get('[aria-label="Toggle menu"]').click();
    cy.get("aside").should("be.visible");
    cy.contains("Close Filters").should("be.visible");

    // Close sidebar
    cy.contains("Close Filters").click();
    cy.get("aside").should("not.exist");
  });

  it("prevents body scroll when sidebar is open on mobile", () => {
    // Set mobile viewport
    cy.viewport(375, 667);

    // Open sidebar
    cy.get('[aria-label="Toggle menu"]').click();
    cy.get("aside").should("be.visible");

    // Body scroll should be prevented
    cy.get("body").should("have.css", "overflow", "hidden");

    // Close sidebar
    cy.contains("Close Filters").click();
    cy.get("aside").should("not.exist");

    // Body scroll should be restored (check for either visible or unset)
    cy.get("body").then(($body) => {
      const overflow = $body.css("overflow");
      expect(["visible", "unset", "auto"]).to.include(overflow);
    });
  });

  it("displays responsive demo cards correctly", () => {
    // Check that all responsive demo cards are visible
    cy.contains("📱 Mobile").should("be.visible");
    cy.contains("📟 Tablet").should("be.visible");
    cy.contains("💻 Desktop").should("be.visible");

    cy.contains("Overlay sidebar").should("be.visible");
    cy.contains("Wider sidebar").should("be.visible");
    cy.contains("Static sidebar").should("be.visible");
  });

  it("maintains accessibility standards", () => {
    // Check that all interactive elements have proper labels
    cy.get('[aria-label="Toggle menu"]').should("exist");

    // Open sidebar and check accessibility
    cy.get('[aria-label="Toggle menu"]').click();

    // Check that sidebar content is accessible
    cy.get("aside").should("be.visible");
    cy.get("h2").contains("Filters").should("be.visible");
  });

  it("uses custom theme colors correctly", () => {
    // Check that the logo uses the primary color
    cy.contains("MTG Index").should("have.css", "color", "rgb(71, 85, 105)"); // --color-primary-600

    // Check header background
    cy.get("header").should(
      "have.css",
      "background-color",
      "rgb(255, 255, 255)"
    );
  });
});
