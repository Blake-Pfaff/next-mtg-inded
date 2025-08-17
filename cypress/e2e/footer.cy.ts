describe("Footer E2E", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays footer at bottom of page", () => {
    cy.get("footer").should("be.visible");
    cy.contains("Blake Pfaff").should("be.visible");
  });

  it("opens LinkedIn profile in new tab", () => {
    cy.get('a[aria-label="Blake Pfaff on LinkedIn"]')
      .should("have.attr", "href", "https://www.linkedin.com/in/blake-a-pfaff/")
      .should("have.attr", "target", "_blank");
  });

  it("opens GitHub profile in new tab", () => {
    cy.get('a[aria-label="Blake Pfaff on GitHub"]')
      .should("have.attr", "href", "https://github.com/Blake-Pfaff")
      .should("have.attr", "target", "_blank");
  });

  it("shows API attribution link", () => {
    cy.get('a[href="https://docs.magicthegathering.io/"]')
      .should("be.visible")
      .should("contain.text", "Magic: The Gathering API")
      .should("have.attr", "target", "_blank");
  });

  it("displays current year in copyright", () => {
    const currentYear = new Date().getFullYear();
    cy.contains(`© ${currentYear} Blake Pfaff`).should("be.visible");
  });

  it("footer remains at bottom when sidebar is toggled", () => {
    // Check footer is visible initially
    cy.get("footer").should("be.visible");

    // Open sidebar
    cy.get('[aria-label="Toggle menu"]').click();

    // Footer should still be visible
    cy.get("footer").should("be.visible");

    // Close sidebar
    cy.get("body").type("{esc}");

    // Footer should still be visible
    cy.get("footer").should("be.visible");
  });

  it("footer layout is responsive", () => {
    // Test on different screen sizes
    const viewports = [
      [375, 667], // Mobile
      [768, 1024], // Tablet
      [1280, 720], // Desktop
    ];

    viewports.forEach(([width, height]) => {
      cy.viewport(width, height);

      cy.get("footer").should("be.visible");
      cy.contains("Blake Pfaff").should("be.visible");
      cy.get('a[aria-label="Blake Pfaff on LinkedIn"]').should("be.visible");
      cy.get('a[aria-label="Blake Pfaff on GitHub"]').should("be.visible");
    });
  });

  it("social links are accessible", () => {
    // Check aria-labels
    cy.get('a[aria-label="Blake Pfaff on LinkedIn"]').should("exist");
    cy.get('a[aria-label="Blake Pfaff on GitHub"]').should("exist");

    // Check keyboard navigation
    cy.get('a[aria-label="Blake Pfaff on LinkedIn"]').focus();
    cy.focused().should("have.attr", "aria-label", "Blake Pfaff on LinkedIn");

    cy.get('a[aria-label="Blake Pfaff on GitHub"]').focus();
    cy.focused().should("have.attr", "aria-label", "Blake Pfaff on GitHub");
  });
});
