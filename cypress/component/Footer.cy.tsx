import React from "react";
import Footer from "../../src/components/Footer/Footer";

describe("Footer Component", () => {
  it("renders developer name", () => {
    cy.mount(<Footer />);

    cy.contains("Blake Pfaff").should("be.visible");
  });

  it("displays LinkedIn link with correct href", () => {
    cy.mount(<Footer />);

    cy.get('a[aria-label="Blake Pfaff on LinkedIn"]')
      .should("be.visible")
      .should("have.attr", "href", "https://www.linkedin.com/in/blake-a-pfaff/")
      .should("have.attr", "target", "_blank")
      .should("have.attr", "rel", "noopener noreferrer");

    cy.contains("LinkedIn").should("be.visible");
  });

  it("displays GitHub link with correct href", () => {
    cy.mount(<Footer />);

    cy.get('a[aria-label="Blake Pfaff on GitHub"]')
      .should("be.visible")
      .should("have.attr", "href", "https://github.com/Blake-Pfaff")
      .should("have.attr", "target", "_blank")
      .should("have.attr", "rel", "noopener noreferrer");

    cy.contains("GitHub").should("be.visible");
  });

  it("displays MTG API attribution", () => {
    cy.mount(<Footer />);

    cy.contains("Powered by").should("be.visible");
    cy.get('a[href="https://docs.magicthegathering.io/"]')
      .should("be.visible")
      .should("contain.text", "Magic: The Gathering API");
  });

  it("shows current year in copyright", () => {
    cy.mount(<Footer />);

    const currentYear = new Date().getFullYear();
    cy.contains(`© ${currentYear} Blake Pfaff. All rights reserved.`).should(
      "be.visible"
    );
  });

  it("has proper styling and layout", () => {
    cy.mount(<Footer />);

    cy.get("footer")
      .should("have.class", "bg-white")
      .should("have.class", "border-t")
      .should("have.class", "border-gray-200");
  });

  it("social links have hover effects", () => {
    cy.mount(<Footer />);

    cy.get('a[aria-label="Blake Pfaff on LinkedIn"]').should(
      "have.class",
      "hover:text-primary-600"
    );

    cy.get('a[aria-label="Blake Pfaff on GitHub"]').should(
      "have.class",
      "hover:text-primary-600"
    );
  });

  it("displays social icons", () => {
    cy.mount(<Footer />);

    // Check for FontAwesome icons (they render as SVGs)
    cy.get('a[aria-label="Blake Pfaff on LinkedIn"] svg').should("exist");
    cy.get('a[aria-label="Blake Pfaff on GitHub"] svg').should("exist");
  });

  it("uses custom theme colors", () => {
    cy.mount(<Footer />);

    // Check that API link uses primary color
    cy.get('a[href="https://docs.magicthegathering.io/"]').should(
      "have.class",
      "text-primary-600"
    );
  });
});
