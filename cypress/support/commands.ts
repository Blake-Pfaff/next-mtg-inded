/// <reference types="cypress" />

// Custom commands for MTG Index app testing
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      openSidebar(): Chainable<void>;
      closeSidebar(): Chainable<void>;
      checkSidebarOpen(): Chainable<void>;
      checkSidebarClosed(): Chainable<void>;
      testResponsiveBreakpoint(width: number, height: number): Chainable<void>;
    }
  }
}

// Command to open the sidebar
Cypress.Commands.add("openSidebar", () => {
  cy.get('[aria-label="Toggle menu"]').click();
});

// Command to close the sidebar (works for all methods)
Cypress.Commands.add("closeSidebar", () => {
  // Try ESC key first
  cy.get("body").type("{esc}");

  // If still open, try clicking overlay (mobile/tablet)
  cy.get("body").then(($body) => {
    if ($body.find('[aria-label="Close sidebar"]').length > 0) {
      cy.get('[aria-label="Close sidebar"]').click({ force: true });
    }
  });

  // If still open, try close button (mobile)
  cy.get("body").then(($body) => {
    if ($body.find('button:contains("Close Filters")').length > 0) {
      cy.contains("Close Filters").click();
    }
  });
});

// Command to verify sidebar is open
Cypress.Commands.add("checkSidebarOpen", () => {
  cy.get("aside").should("be.visible");
  cy.contains("Filters").should("be.visible");
});

// Command to verify sidebar is closed
Cypress.Commands.add("checkSidebarClosed", () => {
  cy.get("aside").should("not.exist");
});

// Command to test at specific responsive breakpoint
Cypress.Commands.add(
  "testResponsiveBreakpoint",
  (width: number, height: number) => {
    cy.viewport(width, height);
    cy.wait(100); // Small wait for viewport change
  }
);

export {};
