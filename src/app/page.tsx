"use client";

import { PaginationContainer } from "@/components/Pagination";
import { usePaginationURL } from "@/components/Pagination/hooks/usePaginationURL";
import { useCards } from "@/lib/queries/mtg";
import { CardGrid } from "./features/CardGrid";

export default function Home() {
  // URL-based pagination state management
  const { currentPage, pageSize, setPage, setPageSize } = usePaginationURL({
    defaultPage: 1,
    defaultPageSize: 20,
  });

  // Fetch cards from MTG API - starting with a popular recent set
  const {
    data: cards = [],
    isLoading,
    error,
  } = useCards({
    set: "dmu", // Dominaria United - recent set with good images
    page: currentPage,
    pageSize: pageSize,
  });

  const handleCardClick = (cardId: string) => {
    // TODO: Open modal with card details
    console.log("Card clicked:", cardId);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
  };

  // Calculate total pages (MTG API doesn't provide total count, so we estimate)
  // For now, we'll show a reasonable number of pages based on the set
  const estimatedTotalPages = Math.ceil(300 / pageSize); // Estimate ~300 cards in a typical set

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-hero font-bold text-text-primary mb-2">
          Magic: The Gathering Card Index
        </h1>
        <p className="text-body text-text-muted">
          Browse and search through Magic: The Gathering cards with advanced
          filtering options.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-card p-4">
          <p className="text-body text-red-600">
            Error loading cards: {error.message}
          </p>
        </div>
      )}

      <div className="bg-white border border-primary-200 rounded-card p-6">
        <div className="mb-6">
          <h2 className="text-heading font-semibold text-text-primary mb-2">
            Dominaria United Cards
          </h2>
          <p className="text-body text-text-muted">
            Exploring cards from the Dominaria United set. Click any card to
            view details.
          </p>
        </div>

        <CardGrid
          cards={cards}
          isLoading={isLoading}
          onCardClick={handleCardClick}
        />

        {/* Pagination */}
        {!isLoading && cards.length > 0 && (
          <div className="mt-8">
            <PaginationContainer
              currentPage={currentPage}
              totalPages={estimatedTotalPages}
              onPageChange={handlePageChange}
              totalItems={300} // Estimated total items
              itemsPerPage={pageSize}
              showPageSizeSelector={true}
              onPageSizeChange={handlePageSizeChange}
              pageSizeOptions={[10, 20, 30, 50]}
              layout="split"
              className="border-t border-primary-200 pt-6"
            />
          </div>
        )}
      </div>
    </div>
  );
}
