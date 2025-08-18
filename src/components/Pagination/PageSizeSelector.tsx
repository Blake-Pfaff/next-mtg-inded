"use client";

import { Dropdown, DropdownOption } from "@/components/Dropdown";
import { PageSizeSelectorProps } from "./types";

export const PageSizeSelector = ({
  currentPageSize,
  pageSizeOptions = [10, 20, 50, 100],
  onPageSizeChange,
  disabled = false,
  className = "",
  label = "Items per page:",
  size = "md",
}: PageSizeSelectorProps) => {
  // Convert page size options to dropdown options
  const dropdownOptions: DropdownOption[] = pageSizeOptions.map((size) => ({
    value: size,
    label: size.toString(),
  }));

  const handleChange = (value: string | number) => {
    onPageSizeChange(Number(value));
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Dropdown
        id="page-size-selector"
        label={label}
        options={dropdownOptions}
        value={currentPageSize}
        onChange={handleChange}
        disabled={disabled}
        size={size}
        className="min-w-[5rem]"
      />
    </div>
  );
};
