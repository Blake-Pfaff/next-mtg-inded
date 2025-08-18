"use client";

import { useCards } from "@/lib/queries/mtg";
import { CardGrid } from "./features/CardGrid";

export default function Home() {
  // Fetch cards from MTG API - starting with a popular recent set
  const {
    data: cards = [],
    isLoading,
    error,
  } = useCards({
    set: "dmu", // Dominaria United - recent set with good images
    pageSize: 20,
  });

  const handleCardClick = (cardId: string) => {
    // TODO: Open modal with card details
    console.log("Card clicked:", cardId);
  };

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
      </div>
    </div>
  );
}
