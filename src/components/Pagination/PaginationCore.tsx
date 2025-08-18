"use client";

import {
  ChevronDoubleLeft,
  ChevronDoubleRight,
  ChevronLeft,
  ChevronRight,
} from "@/components/Icons";
import { PaginationButton } from "./features/PaginationButton";
import {
  getPaginationState,
  getVisiblePages,
} from "./features/paginationLogic";

export interface PaginationCoreProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisiblePages?: number;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

export const PaginationCore = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  maxVisiblePages = 5,
  disabled = false,
  size = "md",
}: PaginationCoreProps) => {
  // Don't render if there's only one page or no pages
  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages(
    currentPage,
    totalPages,
    maxVisiblePages
  );
  const { isFirstPage, isLastPage, showFirstButton, showLastButton } =
    getPaginationState(currentPage, totalPages);

  // Size-based styling
  const sizeClasses = {
    sm: { gap: "gap-1" },
    md: { gap: "gap-2" },
    lg: { gap: "gap-3" },
  };

  const currentSize = sizeClasses[size];
  const iconSize = size === "sm" ? "xs" : size === "lg" ? "md" : "sm";

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center">
      <div className={`flex items-center ${currentSize.gap}`}>
        {/* First Page */}
        {showFirstLast && showFirstButton && (
          <PaginationButton
            page={1}
            onClick={() => onPageChange(1)}
            disabled={disabled}
            ariaLabel="Go to first page"
            size={size}
          >
            <ChevronDoubleLeft size={iconSize} />
          </PaginationButton>
        )}

        {/* Previous Page */}
        {showPrevNext && (
          <PaginationButton
            onClick={() => onPageChange(currentPage - 1)}
            disabled={disabled || isFirstPage}
            ariaLabel="Go to previous page"
            size={size}
          >
            <ChevronLeft size={iconSize} />
          </PaginationButton>
        )}

        {/* Page Numbers */}
        {visiblePages.map((page) => (
          <PaginationButton
            key={page}
            page={page}
            isActive={page === currentPage}
            onClick={() => onPageChange(page)}
            disabled={disabled}
            size={size}
          >
            {page}
          </PaginationButton>
        ))}

        {/* Next Page */}
        {showPrevNext && (
          <PaginationButton
            onClick={() => onPageChange(currentPage + 1)}
            disabled={disabled || isLastPage}
            ariaLabel="Go to next page"
            size={size}
          >
            <ChevronRight size={iconSize} />
          </PaginationButton>
        )}

        {/* Last Page */}
        {showFirstLast && showLastButton && (
          <PaginationButton
            page={totalPages}
            onClick={() => onPageChange(totalPages)}
            disabled={disabled}
            ariaLabel="Go to last page"
            size={size}
          >
            <ChevronDoubleRight size={iconSize} />
          </PaginationButton>
        )}
      </div>
    </nav>
  );
};
