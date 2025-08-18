"use client";

import { PageSizeSelector } from "./PageSizeSelector";
import { PaginationCore, PaginationCoreProps } from "./PaginationCore";
import { PaginationInfo } from "./PaginationInfo";

export interface PaginationContainerProps {
  // Pagination props
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;

  // Optional pagination customization
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisiblePages?: number;
  paginationSize?: PaginationCoreProps["size"];
  paginationDisabled?: boolean;

  // Page info props
  totalItems?: number;
  itemsPerPage?: number;
  showItemCount?: boolean;

  // Page size selector props
  showPageSizeSelector?: boolean;
  pageSizeOptions?: number[];
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeSelectorDisabled?: boolean;

  // Layout options
  layout?: "horizontal" | "vertical" | "split";
  className?: string;
}

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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {infoElement}
            {pageSizeElement}
          </div>
        </div>
        <div className="flex justify-center">{paginationElement}</div>
      </div>
    );
  }

  // Default horizontal layout
  return (
    <div
      data-cy="pagination-container"
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}
    >
      <div className="flex items-center gap-4">
        {infoElement}
        {pageSizeElement}
      </div>
      {paginationElement}
    </div>
  );
};
