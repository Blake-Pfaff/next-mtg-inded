"use client";

import { cardVariants } from "@/lib/animations";
import { motion } from "framer-motion";
import Image from "next/image";

export interface MTGCard {
  id: string;
  name: string;
  imageUrl?: string;
  manaCost?: string;
  type?: string;
  rarity?: string;
  set?: string;
  setName?: string;
}

interface CardProps {
  card: MTGCard;
  onClick: (cardId: string) => void;
}

export const Card = ({ card, onClick }: CardProps) => {
  const handleClick = () => {
    onClick(card.id);
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className="cursor-pointer group"
      data-cy="card"
    >
      <div className="bg-white border border-primary-200 rounded-card overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
        {/* Card Header */}
        <div className="p-3 border-b border-primary-100">
          <h3
            className="text-body font-semibold text-text-primary truncate group-hover:text-primary-600 transition-colors"
            data-cy="card-title"
          >
            {card.name}
          </h3>
        </div>

        {/* Card Image */}
        <div className="relative aspect-[488/680] bg-primary-50">
          {card.imageUrl ? (
            <Image
              src={card.imageUrl}
              alt={card.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-4">
                <div className="w-16 h-16 mx-auto mb-2 bg-primary-200 rounded-full flex items-center justify-center">
                  <span
                    className="text-primary-600 text-2xl"
                    data-cy="fallback-icon"
                  >
                    🃏
                  </span>
                </div>
                <p className="text-caption text-text-muted">
                  No image available
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
