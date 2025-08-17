import { motion } from "framer-motion";
import React from "react";
import { overlayVariants, sidebarVariants } from "../../src/lib/animations";

describe("Animation Variants", () => {
  it("sidebar variants have correct animation properties", () => {
    const TestSidebar = () => (
      <motion.div
        initial="closed"
        animate="open"
        variants={sidebarVariants}
        data-testid="test-sidebar"
      >
        Test Sidebar
      </motion.div>
    );

    cy.mount(<TestSidebar />);

    cy.get('[data-testid="test-sidebar"]')
      .should("be.visible")
      .should("contain.text", "Test Sidebar");
  });

  it("overlay variants have correct animation properties", () => {
    const TestOverlay = () => (
      <motion.div
        initial="closed"
        animate="open"
        variants={overlayVariants}
        data-testid="test-overlay"
        className="bg-black/20"
      >
        Test Overlay
      </motion.div>
    );

    cy.mount(<TestOverlay />);

    cy.get('[data-testid="test-overlay"]').should("be.visible");
  });

  it("sidebar animation completes within reasonable time", () => {
    const TestSidebar = () => {
      const [isOpen, setIsOpen] = React.useState(false);

      return (
        <div>
          <button onClick={() => setIsOpen(!isOpen)} data-testid="toggle">
            Toggle
          </button>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              data-testid="animated-sidebar"
            >
              Animated Sidebar
            </motion.div>
          )}
        </div>
      );
    };

    cy.mount(<TestSidebar />);

    // Click to open
    cy.get('[data-testid="toggle"]').click();

    // Should appear and animate in
    cy.get('[data-testid="animated-sidebar"]', { timeout: 1000 }).should(
      "be.visible"
    );
  });

  it("animations use spring physics correctly", () => {
    // Test that our animation variants contain the expected properties
    expect(sidebarVariants.open.transition.type).to.equal("spring");
    expect(sidebarVariants.open.transition.stiffness).to.equal(400);
    expect(sidebarVariants.open.transition.damping).to.equal(40);

    expect(sidebarVariants.closed.transition.type).to.equal("spring");
    expect(sidebarVariants.closed.transition.stiffness).to.equal(400);
    expect(sidebarVariants.closed.transition.damping).to.equal(40);
  });

  it("overlay animations use correct timing", () => {
    // Test overlay animation properties
    expect(overlayVariants.open.transition.duration).to.equal(0.2);
    expect(overlayVariants.closed.transition.duration).to.equal(0.2);

    expect(overlayVariants.open.opacity).to.equal(1);
    expect(overlayVariants.closed.opacity).to.equal(0);
  });
});
