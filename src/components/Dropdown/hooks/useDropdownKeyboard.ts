import { useCallback } from "react";
import type { DropdownOption } from "../types";

interface UseDropdownKeyboardProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSelect: (value: string | number) => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

export const useDropdownKeyboard = ({
  isOpen,
  setIsOpen,
  onSelect,
  dropdownRef,
  buttonRef,
}: UseDropdownKeyboardProps) => {
  const handleButtonKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      switch (event.key) {
        case "ArrowDown":
        case "ArrowUp":
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            // Focus first option
            const firstOption = dropdownRef.current?.querySelector(
              '[role="option"]'
            ) as HTMLElement;
            firstOption?.focus();
          }
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          setIsOpen(!isOpen);
          break;
        case "Escape":
          if (isOpen) {
            event.preventDefault();
            setIsOpen(false);
            buttonRef.current?.focus();
          }
          break;
        case "Home":
          if (isOpen) {
            event.preventDefault();
            const firstOption = dropdownRef.current?.querySelector(
              '[role="option"]'
            ) as HTMLElement;
            firstOption?.focus();
          }
          break;
        case "End":
          if (isOpen) {
            event.preventDefault();
            const options =
              dropdownRef.current?.querySelectorAll('[role="option"]');
            const lastOption = options?.[options.length - 1] as HTMLElement;
            lastOption?.focus();
          }
          break;
      }
    },
    [isOpen, setIsOpen, dropdownRef, buttonRef]
  );

  const handleOptionKeyDown = useCallback(
    (event: React.KeyboardEvent, option: DropdownOption, index: number) => {
      switch (event.key) {
        case "Enter":
        case " ":
          event.preventDefault();
          onSelect(option.value);
          setIsOpen(false);
          buttonRef.current?.focus();
          break;
        case "Escape":
          event.preventDefault();
          setIsOpen(false);
          buttonRef.current?.focus();
          break;
        case "ArrowDown":
          event.preventDefault();
          const nextOption = dropdownRef.current?.querySelectorAll(
            '[role="option"]'
          )[index + 1] as HTMLElement;
          if (nextOption) {
            nextOption.focus();
          } else {
            // Wrap to first option
            const firstOption = dropdownRef.current?.querySelector(
              '[role="option"]'
            ) as HTMLElement;
            firstOption?.focus();
          }
          break;
        case "ArrowUp":
          event.preventDefault();
          const prevOption = dropdownRef.current?.querySelectorAll(
            '[role="option"]'
          )[index - 1] as HTMLElement;
          if (prevOption) {
            prevOption.focus();
          } else {
            // Wrap to last option
            const options =
              dropdownRef.current?.querySelectorAll('[role="option"]');
            const lastOption = options?.[options.length - 1] as HTMLElement;
            lastOption?.focus();
          }
          break;
        case "Home":
          event.preventDefault();
          const firstOption = dropdownRef.current?.querySelector(
            '[role="option"]'
          ) as HTMLElement;
          firstOption?.focus();
          break;
        case "End":
          event.preventDefault();
          const optionsAll =
            dropdownRef.current?.querySelectorAll('[role="option"]');
          const lastOptionAll = optionsAll?.[
            optionsAll.length - 1
          ] as HTMLElement;
          lastOptionAll?.focus();
          break;
      }
    },
    [onSelect, setIsOpen, dropdownRef, buttonRef]
  );

  return {
    handleButtonKeyDown,
    handleOptionKeyDown,
  };
};
