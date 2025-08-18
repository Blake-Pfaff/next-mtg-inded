"use client";

import { Card, MTGCard } from "@/components/Card";
import { motion } from "framer-motion";

interface CardGridProps {
  cards: MTGCard[];
  isLoading?: boolean;
  onCardClick: (cardId: string) => void;
}

export const CardGrid = ({ cards, isLoading, onCardClick }: CardGridProps) => {
  if (isLoading) {
    return (
      <div
        data-cy="loading"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-primary-50 border border-primary-200 rounded-card overflow-hidden animate-pulse"
          >
            <div className="p-3 border-b border-primary-100">
              <div className="h-5 bg-primary-200 rounded"></div>
            </div>
            <div className="aspect-[488/680] bg-primary-200"></div>
          </div>
        ))}
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
          <span className="text-primary-600 text-4xl">🔍</span>
        </div>
        <h3 className="text-heading font-semibold text-text-primary mb-2">
          No cards found
        </h3>
        <p className="text-body text-text-muted">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      data-cy="card-grid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {cards.map((card) => (
        <Card key={card.id} card={card} onClick={onCardClick} />
      ))}
    </motion.div>
  );
};
