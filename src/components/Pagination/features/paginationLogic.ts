/**
 * Calculate which page numbers should be visible in pagination
 */
export const getVisiblePages = (
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number = 5
): number[] => {
  const pages: number[] = [];
  const halfVisible = Math.floor(maxVisiblePages / 2);

  let startPage = Math.max(1, currentPage - halfVisible);
  let endPage = Math.min(totalPages, currentPage + halfVisible);

  // Adjust if we're near the beginning or end
  if (endPage - startPage + 1 < maxVisiblePages) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    } else if (endPage === totalPages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
};

/**
 * Get pagination boundaries and states
 */
export const getPaginationState = (currentPage: number, totalPages: number) => {
  return {
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
    hasPreviousPage: currentPage > 1,
    hasNextPage: currentPage < totalPages,
    showFirstButton: currentPage > 2,
    showLastButton: currentPage < totalPages - 1,
  };
};

/**
 * Validate and sanitize page numbers
 */
export const sanitizePage = (page: number, totalPages: number): number => {
  if (page < 1) return 1;
  if (page > totalPages) return totalPages;
  return Math.floor(page);
};

/**
 * Calculate item range for current page
 */
export const getItemRange = (
  currentPage: number,
  itemsPerPage: number,
  totalItems: number
) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return { startItem, endItem };
};
