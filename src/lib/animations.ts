import { Variants } from "framer-motion";

// Sidebar animations
export const sidebarVariants: Variants = {
  closed: {
    x: "-100%",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

// Overlay animations
export const overlayVariants: Variants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};

// Card grid animations (for future use)
export const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

// Modal animations (for future use)
export const modalVariants: Variants = {
  closed: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2,
    },
  },
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};
