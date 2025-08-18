import { Dropdown, DropdownOption } from "../../src/components/Dropdown";

describe("Dropdown Component", () => {
  const mockOptions: DropdownOption[] = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ];

  it("renders dropdown with correct initial value", () => {
    const onChangeSpy = cy.stub();

    cy.mount(
      <Dropdown
        options={mockOptions}
        value={20}
        onChange={onChangeSpy}
        label="Items per page"
      />
    );

    // Check if label is displayed
    cy.contains("Items per page").should("be.visible");

    // Check if selected value is shown
    cy.get("button").should("contain", "20");
  });

  it("opens dropdown when clicked", () => {
    const onChangeSpy = cy.stub();

    cy.mount(
      <Dropdown options={mockOptions} value={20} onChange={onChangeSpy} />
    );

    // Click to open dropdown
    cy.get("button").click();

    // Check if options are visible
    cy.get('[role="listbox"]').should("be.visible");
    cy.contains("10").should("be.visible");
    cy.contains("50").should("be.visible");
    cy.contains("100").should("be.visible");
  });

  it("selects option when clicked", () => {
    const onChangeSpy = cy.stub();

    cy.mount(
      <Dropdown options={mockOptions} value={20} onChange={onChangeSpy} />
    );

    // Open dropdown
    cy.get("button").click();

    // Click on option
    cy.contains("50")
      .click()
      .then(() => {
        expect(onChangeSpy).to.have.been.calledWith(50);
      });
  });

  it("closes dropdown when clicking outside", () => {
    const onChangeSpy = cy.stub();

    cy.mount(
      <div style={{ height: "200px", padding: "20px" }}>
        <Dropdown options={mockOptions} value={20} onChange={onChangeSpy} />
        <div
          data-cy="outside"
          style={{
            marginTop: "100px",
            height: "50px",
            background: "lightblue",
          }}
        >
          Outside element
        </div>
      </div>
    );

    // Open dropdown
    cy.get("button").click();
    cy.get('[role="listbox"]').should("be.visible");

    // Click outside with force to bypass coverage check
    cy.get('[data-cy="outside"]').click({ force: true });
    cy.get('[role="listbox"]').should("not.exist");
  });

  it("handles keyboard navigation", () => {
    const onChangeSpy = cy.stub();

    cy.mount(
      <Dropdown options={mockOptions} value={20} onChange={onChangeSpy} />
    );

    // Focus button and press Enter to open
    cy.get("button").focus().type("{enter}");
    cy.get('[role="listbox"]').should("be.visible");

    // Navigate with arrow keys
    cy.get("button").type("{downArrow}");
    cy.get('[role="option"]').first().should("have.focus");

    // Select with Enter
    cy.get('[role="option"]')
      .first()
      .type("{enter}")
      .then(() => {
        expect(onChangeSpy).to.have.been.calledWith(10);
      });
  });

  it("closes dropdown with Escape key", () => {
    const onChangeSpy = cy.stub();

    cy.mount(
      <Dropdown options={mockOptions} value={20} onChange={onChangeSpy} />
    );

    // Open dropdown
    cy.get("button").click();
    cy.get('[role="listbox"]').should("be.visible");

    // Press Escape
    cy.get("button").type("{esc}");
    cy.get('[role="listbox"]').should("not.exist");
  });

  it("handles disabled state", () => {
    const onChangeSpy = cy.stub();

    cy.mount(
      <Dropdown
        options={mockOptions}
        value={20}
        onChange={onChangeSpy}
        disabled={true}
      />
    );

    // Button should be disabled
    cy.get("button").should("be.disabled");

    // Should not open when clicked
    cy.get("button").click({ force: true });
    cy.get('[role="listbox"]').should("not.exist");
  });

  it("works with different sizes", () => {
    const onChangeSpy = cy.stub();

    cy.mount(
      <div className="space-y-4">
        <Dropdown
          options={mockOptions}
          value={20}
          onChange={onChangeSpy}
          size="sm"
          label="Small"
        />
        <Dropdown
          options={mockOptions}
          value={20}
          onChange={onChangeSpy}
          size="lg"
          label="Large"
        />
      </div>
    );

    // Check different button heights
    cy.contains("Small").next("button").should("have.class", "h-8");
    cy.contains("Large").next("button").should("have.class", "h-12");
  });

  it("shows placeholder when no value selected", () => {
    const onChangeSpy = cy.stub();

    cy.mount(
      <Dropdown
        options={mockOptions}
        value=""
        onChange={onChangeSpy}
        placeholder="Choose an option"
      />
    );

    cy.get("button").should("contain", "Choose an option");
  });

  it("handles disabled options", () => {
    const optionsWithDisabled: DropdownOption[] = [
      { value: 10, label: "10" },
      { value: 20, label: "20", disabled: true },
      { value: 50, label: "50" },
    ];

    const onChangeSpy = cy.stub();

    cy.mount(
      <Dropdown
        options={optionsWithDisabled}
        value={10}
        onChange={onChangeSpy}
      />
    );

    // Open dropdown
    cy.get("button").click();

    // Disabled option should have disabled styling
    cy.contains("20").should("have.class", "text-text-subtle");

    // Should not be selectable
    cy.contains("20").click();
    expect(onChangeSpy).to.not.have.been.called;
  });
});
