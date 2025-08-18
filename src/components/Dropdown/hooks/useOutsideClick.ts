import { useEffect } from "react";

interface UseOutsideClickProps {
  ref: React.RefObject<HTMLElement | null>;
  onOutsideClick: () => void;
  isActive: boolean;
}

export const useOutsideClick = ({
  ref,
  onOutsideClick,
  isActive,
}: UseOutsideClickProps) => {
  useEffect(() => {
    if (!isActive) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onOutsideClick, isActive]);
};
