import {
  Pagination,
  PaginationContainer,
  PaginationCore,
} from "../../src/components/Pagination";

describe("Pagination Component", () => {
  describe("Basic Pagination", () => {
    it("renders pagination with correct page numbers", () => {
      const onPageChangeSpy = cy.stub();

      cy.mount(
        <Pagination
          currentPage={3}
          totalPages={10}
          onPageChange={onPageChangeSpy}
        />
      );

      // Should show current page and surrounding pages
      cy.contains("3").should("have.attr", "aria-current", "page");
      cy.contains("2").should("be.visible");
      cy.contains("4").should("be.visible");
    });

    it("handles page navigation correctly", () => {
      const onPageChangeSpy = cy.stub();

      cy.mount(
        <Pagination
          currentPage={3}
          totalPages={10}
          onPageChange={onPageChangeSpy}
        />
      );

      // Click next page
      cy.get('[aria-label="Go to next page"]')
        .click()
        .then(() => {
          expect(onPageChangeSpy).to.have.been.calledWith(4);
        });

      // Click previous page
      cy.get('[aria-label="Go to previous page"]')
        .click()
        .then(() => {
          expect(onPageChangeSpy).to.have.been.calledWith(2);
        });
    });

    it("disables navigation at boundaries", () => {
      const onPageChangeSpy = cy.stub();

      cy.mount(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={onPageChangeSpy}
        />
      );

      // Previous button should be disabled on first page
      cy.get('[aria-label="Go to previous page"]').should("be.disabled");
      cy.get('[aria-label="Go to first page"]').should("not.exist");
    });

    it("shows first/last buttons when needed", () => {
      const onPageChangeSpy = cy.stub();

      cy.mount(
        <Pagination
          currentPage={8}
          totalPages={10}
          onPageChange={onPageChangeSpy}
        />
      );

      // Should show first page button
      cy.get('[aria-label="Go to first page"]').should("be.visible");
      cy.get('[aria-label="Go to last page"]').should("be.visible");
    });

    it("does not render for single page", () => {
      const onPageChangeSpy = cy.stub();

      cy.mount(
        <Pagination
          currentPage={1}
          totalPages={1}
          onPageChange={onPageChangeSpy}
        />
      );

      // Should not render anything
      cy.get("nav").should("not.exist");
    });
  });

  describe("PaginationCore", () => {
    it("renders pagination with correct page numbers", () => {
      const onPageChangeSpy = cy.stub();

      cy.mount(
        <PaginationCore
          currentPage={3}
          totalPages={10}
          onPageChange={onPageChangeSpy}
        />
      );

      // Should show current page and surrounding pages
      cy.contains("3").should("have.attr", "aria-current", "page");
      cy.contains("2").should("be.visible");
      cy.contains("4").should("be.visible");
    });

    it("works with different sizes", () => {
      const onPageChangeSpy = cy.stub();

      cy.mount(
        <PaginationCore
          currentPage={1}
          totalPages={5}
          onPageChange={onPageChangeSpy}
          size="sm"
        />
      );

      // Check button size classes
      cy.get("button").first().should("have.class", "h-8");
    });
  });

  describe("PaginationContainer", () => {
    it("renders complete pagination with info and page size selector", () => {
      const onPageChangeSpy = cy.stub();
      const onPageSizeChangeSpy = cy.stub();

      cy.mount(
        <PaginationContainer
          currentPage={2}
          totalPages={10}
          onPageChange={onPageChangeSpy}
          totalItems={200}
          itemsPerPage={20}
          showPageSizeSelector={true}
          onPageSizeChange={onPageSizeChangeSpy}
          pageSizeOptions={[10, 20, 50]}
        />
      );

      // Should show pagination info
      cy.contains("Showing 21-40 of 200 results").should("be.visible");

      // Should show page size selector (now a custom dropdown)
      cy.get("button").contains("20").should("be.visible");
      cy.contains("Items per page:").should("be.visible");

      // Should show pagination buttons - find the active page button
      cy.get('button[aria-current="page"]').should("contain", "2");
    });

    it("handles page size changes correctly", () => {
      const onPageChangeSpy = cy.stub();
      const onPageSizeChangeSpy = cy.stub();

      cy.mount(
        <PaginationContainer
          currentPage={2}
          totalPages={10}
          onPageChange={onPageChangeSpy}
          totalItems={200}
          itemsPerPage={20}
          showPageSizeSelector={true}
          onPageSizeChange={onPageSizeChangeSpy}
          pageSizeOptions={[10, 20, 50]}
        />
      );

      // Change page size - click dropdown button then select option
      cy.get("button").contains("20").click();
      cy.contains("50")
        .click()
        .then(() => {
          expect(onPageSizeChangeSpy).to.have.been.calledWith(50);
        });
    });

    it("renders in different layouts", () => {
      const onPageChangeSpy = cy.stub();

      // Test vertical layout
      cy.mount(
        <PaginationContainer
          currentPage={1}
          totalPages={5}
          onPageChange={onPageChangeSpy}
          layout="vertical"
        />
      );

      // Check that the pagination container has the vertical layout class
      cy.get("div").should("contain.class", "flex-col");
    });

    it("shows correct accessibility attributes", () => {
      const onPageChangeSpy = cy.stub();

      cy.mount(
        <PaginationContainer
          currentPage={3}
          totalPages={10}
          onPageChange={onPageChangeSpy}
        />
      );

      // Check aria labels
      cy.get('[aria-label="Pagination"]').should("exist");
      cy.get('[aria-current="page"]').should("contain", "3");
      cy.get('[aria-label="Go to previous page"]').should("exist");
      cy.get('[aria-label="Go to next page"]').should("exist");
    });
  });

  describe("Different sizes", () => {
    it("renders small size pagination", () => {
      const onPageChangeSpy = cy.stub();

      cy.mount(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={onPageChangeSpy}
          size="sm"
        />
      );

      // Check button size classes
      cy.get("button").first().should("have.class", "h-8");
    });

    it("renders large size pagination", () => {
      const onPageChangeSpy = cy.stub();

      cy.mount(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={onPageChangeSpy}
          size="lg"
        />
      );

      // Check button size classes
      cy.get("button").first().should("have.class", "h-12");
    });
  });
});
