"use client";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 flex items-center justify-between relative z-30 h-14 px-6">
      {/* Hamburger Menu - Left Side */}
      <button
        onClick={onMenuToggle}
        className="hover:cursor-pointer flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        aria-label="Toggle menu"
      >
        <FontAwesomeIcon icon={faBars} className="w-5 h-5 text-text-muted" />
      </button>

      {/* Logo Placeholder - Right Side */}
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-primary-600">MTG Index</h1>
      </div>
    </header>
  );
}
