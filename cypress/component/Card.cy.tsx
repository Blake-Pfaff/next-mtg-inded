import { Card, MTGCard } from "../../src/components/Card";

describe("Card Component", () => {
  const mockCard: MTGCard = {
    id: "test-card-123",
    name: "Lightning Bolt",
    imageUrl:
      "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=397722&type=card",
    manaCost: "{R}",
    type: "Instant",
    rarity: "Common",
    set: "M15",
    setName: "Magic 2015 Core Set",
  };

  const mockCardWithoutImage: MTGCard = {
    id: "test-card-456",
    name: "Black Lotus",
    type: "Artifact",
    rarity: "Rare",
  };

  it("renders card with image correctly", () => {
    const onClickSpy = cy.stub();

    cy.mount(<Card card={mockCard} onClick={onClickSpy} />);

    // Check if card name is displayed
    cy.contains("Lightning Bolt").should("be.visible");

    // Check if image is present
    cy.get("img").should("have.attr", "alt", "Lightning Bolt");

    // Check if card is clickable
    cy.get('[data-cy="card"]').should("have.class", "cursor-pointer");
  });

  it("renders card without image correctly", () => {
    const onClickSpy = cy.stub();

    cy.mount(<Card card={mockCardWithoutImage} onClick={onClickSpy} />);

    // Check if card name is displayed
    cy.contains("Black Lotus").should("be.visible");

    // Check if fallback content is shown
    cy.contains("No image available").should("be.visible");
    cy.get('[data-cy="fallback-icon"]').should("contain", "🃏");
  });

  it("calls onClick handler when clicked", () => {
    const onClickSpy = cy.stub();

    cy.mount(<Card card={mockCard} onClick={onClickSpy} />);

    cy.get('[data-cy="card"]')
      .click({ force: true })
      .then(() => {
        expect(onClickSpy).to.have.been.calledWith("test-card-123");
      });
  });

  it("shows hover effects", () => {
    const onClickSpy = cy.stub();

    cy.mount(<Card card={mockCard} onClick={onClickSpy} />);

    // Test hover state
    cy.get('[data-cy="card"]').trigger("mouseover", { force: true });
    cy.get('[data-cy="card-title"]').should(
      "have.class",
      "group-hover:text-primary-600"
    );
  });
});
