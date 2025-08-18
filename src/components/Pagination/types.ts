import { ReactNode } from "react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisiblePages?: number;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

export interface PaginationButtonProps {
  page?: number;
  isActive?: boolean;
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  size?: "sm" | "md" | "lg";
}

export interface UsePaginationURLProps {
  defaultPage?: number;
  defaultPageSize?: number;
  paramNames?: {
    page?: string;
    pageSize?: string;
  };
}

export interface UsePaginationURLReturn {
  currentPage: number;
  pageSize: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setPageAndSize: (page: number, size: number) => void;
}

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
export interface PageSizeSelectorProps {
  currentPageSize: number;
  pageSizeOptions?: number[];
  onPageSizeChange: (pageSize: number) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
}
