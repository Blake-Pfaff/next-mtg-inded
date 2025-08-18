"use client";

import {
  ChevronDoubleLeft,
  ChevronDoubleRight,
  ChevronLeft,
  ChevronRight,
} from "@/components/Icons";
import { PaginationButton } from "./features/PaginationButton";

interface PaginationNavigationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

export const PaginationNavigation = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  disabled = false,
  size = "md",
}: PaginationNavigationProps) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const showFirstButton = showFirstLast && currentPage > 2;
  const showLastButton = showFirstLast && currentPage < totalPages - 1;

  const iconSize = size === "sm" ? "xs" : size === "lg" ? "md" : "sm";

  return (
    <>
      {/* First Page */}
      {showFirstButton && (
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

      {/* This is where page numbers will be inserted */}

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
      {showLastButton && (
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
    </>
  );
};
