import type { DropdownSize, DropdownSizeClasses } from "../types";

export const getDropdownSizeClasses = (
  size: DropdownSize
): DropdownSizeClasses => {
  const sizeClasses = {
    sm: {
      container: "text-xs",
      button: "h-8 px-2 text-xs",
      icon: "w-3 h-3",
      option: "px-2 py-1 text-xs",
    },
    md: {
      container: "text-sm",
      button: "h-10 px-3 text-sm",
      icon: "w-4 h-4",
      option: "px-3 py-2 text-sm",
    },
    lg: {
      container: "text-base",
      button: "h-12 px-4 text-base",
      icon: "w-5 h-5",
      option: "px-4 py-3 text-base",
    },
  };

  return sizeClasses[size];
};

export const getIconSize = (size: DropdownSize): "xs" | "sm" | "md" => {
  return size === "sm" ? "xs" : size === "lg" ? "md" : "sm";
};
