import { useCallback } from "react";
import type { DropdownOption } from "../types";

interface UseDropdownSelectionProps {
  options: DropdownOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  setIsOpen: (open: boolean) => void;
  disabled?: boolean;
}

export const useDropdownSelection = ({
  options,
  value,
  onChange,
  setIsOpen,
  disabled = false,
}: UseDropdownSelectionProps) => {
  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = useCallback(
    (optionValue: string | number) => {
      if (!disabled) {
        onChange(optionValue);
        setIsOpen(false);
      }
    },
    [onChange, setIsOpen, disabled]
  );

  const handleToggle = useCallback(() => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  }, [setIsOpen, disabled]);

  return {
    selectedOption,
    handleSelect,
    handleToggle,
  };
};
