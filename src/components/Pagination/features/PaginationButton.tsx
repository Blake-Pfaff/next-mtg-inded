"use client";

import { motion } from "framer-motion";
import { PaginationButtonProps } from "../types";

export const PaginationButton = ({
  page,
  isActive = false,
  children,
  onClick,
  disabled = false,
  ariaLabel,
  size = "md",
}: PaginationButtonProps) => {
  // Size-based styling
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || (page ? `Go to page ${page}` : undefined)}
      aria-current={isActive ? "page" : undefined}
      className={`
        ${sizeClasses[size]}
        flex items-center justify-center
        rounded-small border transition-all duration-200
        hover:cursor-pointer
        ${
          isActive
            ? "bg-primary-600 text-white border-primary-600 shadow-sm"
            : disabled
              ? "bg-primary-50 text-text-subtle border-primary-200 cursor-not-allowed"
              : "bg-white text-text-secondary border-primary-200 hover:bg-primary-50 hover:border-primary-300"
        }
      `}
    >
      {children}
    </motion.button>
  );
};
