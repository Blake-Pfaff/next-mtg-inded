"use client";

import { ChevronRight } from "@/components/Icons";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { getDropdownSizeClasses, getIconSize } from "./features";
import {
  useDropdownKeyboard,
  useDropdownSelection,
  useOutsideClick,
} from "./hooks";
import type { DropdownProps } from "./types";

export type { DropdownOption, DropdownProps, DropdownSize } from "./types";

export const Dropdown = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  size = "md",
  className = "",
  label,
  id,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Use extracted hooks
  const { selectedOption, handleSelect, handleToggle } = useDropdownSelection({
    options,
    value,
    onChange,
    setIsOpen,
    disabled,
  });

  const { handleButtonKeyDown, handleOptionKeyDown } = useDropdownKeyboard({
    isOpen,
    setIsOpen,
    onSelect: handleSelect,
    dropdownRef,
    buttonRef,
  });

  useOutsideClick({
    ref: dropdownRef,
    onOutsideClick: () => setIsOpen(false),
    isActive: isOpen,
  });

  // Get size-based styling
  const currentSize = getDropdownSizeClasses(size);
  const iconSize = getIconSize(size);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label htmlFor={id} className="block text-caption text-text-muted mb-1">
          {label}
        </label>
      )}

      <button
        ref={buttonRef}
        id={id}
        type="button"
        onClick={handleToggle}
        onKeyDown={handleButtonKeyDown}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={label}
        className={`
          ${currentSize.button}
          flex items-center justify-between w-full
          rounded-small border transition-all duration-200
          ${
            disabled
              ? "bg-primary-50 text-text-subtle cursor-not-allowed"
              : isOpen
                ? "border-primary-500 ring-2 ring-primary-500 ring-opacity-20"
                : "hover:border-primary-300 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20"
          }
        `}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className={`${currentSize.icon} flex-shrink-0 ml-2`}
        >
          <ChevronRight size={iconSize} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            role="listbox"
            aria-labelledby={id}
            className="absolute z-50 mt-1 w-full bg-white border border-primary-200 rounded-small shadow-lg max-h-60 overflow-auto"
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                role="option"
                tabIndex={-1}
                aria-selected={option.value === value}
                aria-disabled={option.disabled}
                onClick={() => !option.disabled && handleSelect(option.value)}
                onKeyDown={(e) =>
                  !option.disabled && handleOptionKeyDown(e, option, index)
                }
                className={`
                  ${currentSize.option}
                  cursor-pointer transition-colors duration-150
                  ${
                    option.disabled
                      ? "text-text-subtle cursor-not-allowed"
                      : option.value === value
                        ? "bg-primary-50 text-primary-700"
                        : "text-text-secondary hover:bg-primary-50 focus:bg-primary-50 focus:outline-none"
                  }
                `}
              >
                {option.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
