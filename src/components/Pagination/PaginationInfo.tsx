import { getItemRange } from "./features/paginationLogic";

export interface PaginationInfoProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  itemsPerPage?: number;
  showItemCount?: boolean;
  className?: string;
}

export const PaginationInfo = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  showItemCount = true,
  className = "",
}: PaginationInfoProps) => {
  // Calculate item range if we have the data
  const itemRange =
    totalItems && itemsPerPage
      ? getItemRange(currentPage, itemsPerPage, totalItems)
      : null;

  return (
    <div
      data-cy="pagination-info"
      className={`text-body text-text-muted ${className}`}
    >
      {showItemCount && itemRange && totalItems ? (
        <span>
          Showing {itemRange.startItem}-{itemRange.endItem} of{" "}
          {totalItems.toLocaleString()} results
        </span>
      ) : (
        <span>
          Page {currentPage} of {totalPages}
        </span>
      )}
    </div>
  );
};
