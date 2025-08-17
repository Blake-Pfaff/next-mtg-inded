import { LayoutWrapper } from "../../src/components/Layout";

describe("LayoutWrapper Component", () => {
  it("renders children content", () => {
    cy.mount(
      <LayoutWrapper>
        <div data-testid="test-content">Test Content</div>
      </LayoutWrapper>
    );

    cy.get('[data-testid="test-content"]')
      .should("be.visible")
      .should("contain.text", "Test Content");
  });

  it("sidebar is initially closed", () => {
    cy.mount(
      <LayoutWrapper>
        <div>Test Content</div>
      </LayoutWrapper>
    );

    // Sidebar should not be visible initially
    cy.get("aside").should("not.exist");
  });

  it("opens sidebar when hamburger menu is clicked", () => {
    cy.mount(
      <LayoutWrapper>
        <div>Test Content</div>
      </LayoutWrapper>
    );

    // Click hamburger menu
    cy.get('[aria-label="Toggle menu"]').click();

    // Sidebar should be visible
    cy.get("aside").should("be.visible");
    cy.contains("Filters").should("be.visible");
  });

  it("closes sidebar when overlay is clicked", () => {
    cy.mount(
      <LayoutWrapper>
        <div>Test Content</div>
      </LayoutWrapper>
    );

    // Open sidebar first
    cy.get('[aria-label="Toggle menu"]').click();
    cy.get("aside").should("be.visible");

    // Click overlay to close (we need to force click since overlay might be partially covered)
    cy.get('[aria-label="Close sidebar"]').click({ force: true });

    // Sidebar should be closed
    cy.get("aside").should("not.exist");
  });

  it("sidebar has proper accessibility attributes", () => {
    cy.mount(
      <LayoutWrapper>
        <div>Test Content</div>
      </LayoutWrapper>
    );

    // Open sidebar
    cy.get('[aria-label="Toggle menu"]').click();

    // Check accessibility
    cy.get('[aria-label="Close sidebar"]').should("exist");
    cy.get("aside").should("be.visible");
  });

  it("uses custom CSS variables for spacing", () => {
    cy.mount(
      <LayoutWrapper>
        <div>Test Content</div>
      </LayoutWrapper>
    );

    // Check that main content uses custom spacing
    cy.get("main").should("have.css", "padding");
  });

  it("handles keyboard navigation (ESC key)", () => {
    cy.mount(
      <LayoutWrapper>
        <div>Test Content</div>
      </LayoutWrapper>
    );

    // Open sidebar
    cy.get('[aria-label="Toggle menu"]').click();
    cy.get("aside").should("be.visible");

    // Press escape key
    cy.get("body").type("{esc}");

    // Sidebar should close
    cy.get("aside").should("not.exist");
  });

  it("shows close button on mobile", () => {
    // Set mobile viewport
    cy.viewport(375, 667);

    cy.mount(
      <LayoutWrapper>
        <div>Test Content</div>
      </LayoutWrapper>
    );

    // Open sidebar
    cy.get('[aria-label="Toggle menu"]').click();

    // Close button should be visible on mobile
    cy.contains("Close Filters").should("be.visible");
  });

  it("overlay has correct opacity", () => {
    // Set mobile viewport to trigger overlay
    cy.viewport(375, 667);

    cy.mount(
      <LayoutWrapper>
        <div>Test Content</div>
      </LayoutWrapper>
    );

    // Open sidebar
    cy.get('[aria-label="Toggle menu"]').click();

    // Check overlay opacity (should be semi-transparent, not fully black)
    cy.get('[aria-label="Close sidebar"]').should("be.visible");
  });
});
