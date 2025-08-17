import React from "react";
import Header from "../../src/components/Header/Header";

describe("Header Component", () => {
  it("renders the logo text", () => {
    const mockToggle = cy.stub();

    cy.mount(<Header onMenuToggle={mockToggle} />);

    cy.contains("MTG Index").should("be.visible");
  });

  it("displays the hamburger menu button", () => {
    const mockToggle = cy.stub();

    cy.mount(<Header onMenuToggle={mockToggle} />);

    cy.get('[aria-label="Toggle menu"]')
      .should("be.visible")
      .should("have.attr", "aria-label", "Toggle menu");
  });

  it("calls onMenuToggle when hamburger button is clicked", () => {
    const mockToggle = cy.stub();

    cy.mount(<Header onMenuToggle={mockToggle} />);

    cy.get('[aria-label="Toggle menu"]').click();
    cy.wrap(mockToggle).should("have.been.called");
  });

  it("has proper responsive styling", () => {
    const mockToggle = cy.stub();

    cy.mount(<Header onMenuToggle={mockToggle} />);

    // Check that header uses our custom CSS variables
    cy.get("header")
      .should("have.css", "background-color", "rgb(255, 255, 255)")
      .should("have.css", "border-bottom-width", "1px");
  });

  it("hamburger button has hover effects", () => {
    const mockToggle = cy.stub();

    cy.mount(<Header onMenuToggle={mockToggle} />);

    cy.get('[aria-label="Toggle menu"]')
      .trigger("mouseover")
      .should("have.css", "transition-property");
  });

  it("logo uses primary color from custom theme", () => {
    const mockToggle = cy.stub();

    cy.mount(<Header onMenuToggle={mockToggle} />);

    cy.contains("MTG Index").should("have.css", "color", "rgb(71, 85, 105)"); // --color-primary-600
  });
});
