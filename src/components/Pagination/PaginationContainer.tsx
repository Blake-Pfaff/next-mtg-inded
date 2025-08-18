"use client";

import { PageSizeSelector } from "./PageSizeSelector";
import { PaginationCore } from "./PaginationCore";
import { PaginationInfo } from "./PaginationInfo";
import { PaginationContainerProps } from "./types";

export const PaginationContainer = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  maxVisiblePages = 5,
  paginationSize = "md",
  paginationDisabled = false,
  totalItems,
  itemsPerPage,
  showItemCount = true,
  showPageSizeSelector = false,
  pageSizeOptions = [10, 20, 50, 100],
  onPageSizeChange,
  pageSizeSelectorDisabled = false,
  layout = "horizontal",
  className = "",
}: PaginationContainerProps) => {
  // Don't render if there are no pages
  if (totalPages <= 0) return null;

  const paginationElement = (
    <PaginationCore
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      showFirstLast={showFirstLast}
      showPrevNext={showPrevNext}
      maxVisiblePages={maxVisiblePages}
      size={paginationSize}
      disabled={paginationDisabled}
    />
  );

  const infoElement = (
    <PaginationInfo
      currentPage={currentPage}
      totalPages={totalPages}
      totalItems={totalItems}
      itemsPerPage={itemsPerPage}
      showItemCount={showItemCount}
    />
  );

  const pageSizeElement = showPageSizeSelector &&
    onPageSizeChange &&
    itemsPerPage && (
      <PageSizeSelector
        currentPageSize={itemsPerPage}
        pageSizeOptions={pageSizeOptions}
        onPageSizeChange={onPageSizeChange}
        disabled={pageSizeSelectorDisabled}
        size={paginationSize}
      />
    );

  if (layout === "vertical") {
    return (
      <div className={`flex flex-col items-center gap-4 ${className}`}>
        {infoElement}
        {paginationElement}
        {pageSizeElement}
      </div>
    );
  }

  if (layout === "split") {
    return (
      <div
        data-cy="pagination-container"
        className={`flex flex-col gap-4 ${className}`}
      >
        <div className="flex items-center justify-start sm:justify-between">
          {infoElement}
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="sm:flex-1 flex justify-start">{pageSizeElement}</div>
          <div className="flex justify-center">{paginationElement}</div>
          <div className="sm:flex-1"></div>
        </div>
      </div>
    );
  }
  // Default horizontal layout
  return (
    <div
      data-cy="pagination-container"
      className={`flex flex-col gap-4 ${className}`}
    >
      {/* Info row - always separate */}
      {infoElement}

      {/* Page size selector and pagination controls on same row for desktop, stacked on mobile */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {pageSizeElement}
        {paginationElement}
      </div>
    </div>
  );
};
