"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { overlayVariants, sidebarVariants } from "../../lib/animations";
import Footer from "../Footer";
import Header from "../Header";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeSidebar();
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when sidebar is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onMenuToggle={toggleSidebar} />

      <div className="relative flex flex-1">
        {/* Overlay - Desktop hidden, Mobile/Tablet visible */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              className="fixed inset-0 bg-black/20 z-40 lg:hidden"
              onClick={closeSidebar}
              aria-label="Close sidebar"
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              className="fixed lg:static top-14 left-0 w-64 sm:w-80 lg:w-64 bg-white border-r border-gray-200 h-[calc(100vh-3.5rem)] lg:h-auto z-50 overflow-y-auto"
            >
              <div className="p-4">
                <h2 className="text-lg font-semibold text-text-primary mb-4">
                  Filters
                </h2>
                <p className="text-sm text-text-muted">
                  Sidebar content coming soon...
                </p>

                {/* Close button for mobile */}
                <button
                  onClick={closeSidebar}
                  className="lg:hidden mt-4 w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm text-text-secondary"
                >
                  Close Filters
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 transition-all duration-300 px-6 py-8">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
