export type DropdownSize = "sm" | "md" | "lg";

export interface DropdownOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps {
  options: DropdownOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: DropdownSize;
  className?: string;
  label?: string;
  id?: string;
}

export interface DropdownSizeClasses {
  container: string;
  button: string;
  icon: string;
  option: string;
}
