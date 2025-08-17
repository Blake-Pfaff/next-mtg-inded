1. Overview
   Next MTG Index is a public-facing Magic: The Gathering card index that allows users to browse, search, and filter cards using the MTG API. The app will be built with modern React tooling, styled with Tailwind CSS (custom theme), and tested with Cypress.
2. Goals & Non-Goals
   Goals:

Display Magic: The Gathering cards in a responsive grid.
Provide filtering and sorting (rarity, color, set, etc.).
Provide pagination and search.
Allow users to click a card for expanded details and larger images.
Ensure reusable, modular components with strong test coverage.
Use custom theme variables consistently from the global CSS file.
Store all Framer Motion variants in a single animations.ts for reusability.
Provide reusable query functions for fetching/posting data with React Query.
Provide a reusable form input component with React Hook Form.
Maintain good .gitignore hygiene to avoid exposing sensitive files.

Non-Goals:

No user authentication.
No deck-building or collection management features (MVP scope is card indexing only).

3. Tech Requirements

Framework: Next.js (TypeScript, App Router).
Styling: Tailwind CSS with custom theme defined in globals.css.
Animations: Framer Motion, centralized in animations.ts.
Data Layer: React Query with reusable query functions (queries/mtg.ts).
Forms: React Hook Form with reusable input component.
Testing: Cypress for e2e and unit testing.
State: Primarily local state with React Query; minimal global state.

4. Design System
   Theme Colors: Use values defined in globals.css:

Primary color: medium gray / gold tones (--color-primary-500: #d4af37).
Semantic text colors (headings, body, captions, etc.).
Typography and spacing scale as defined.
Border radii for consistent UI components (buttons, cards, inputs).

Typography:

Hero headings (--font-size-hero) for landing page.
Heading (--font-size-heading) for section titles.
Subheading and body text for content and descriptions.

5. Core Features
   5.1 Card Grid

Responsive grid layout for displaying cards.
Each card displays: name, image, set, rarity, and color.
Cards are clickable → modal or dedicated view with larger image and details.

5.2 Filters & Sorting

Filters: rarity, color, set, type.
Sorting: alphabetical, rarity, release date.
Pagination support for large result sets.

5.3 Shared Layout

Header (site name/logo + filter/search bar).
Footer (API attribution, links).

5.4 Animations

Smooth transitions when cards load, filter, or expand.
Variants stored in animations.ts for reusability.

5.5 Reusable Components

Input: built with React Hook Form, styled with Tailwind.
Card: modular component for displaying card data.
Modal: reusable for showing card details.
Grid: container for card collections.
Header & Footer: shared across pages.

6. Testing Strategy

Unit tests: Cypress component testing (inputs, card component).
Integration tests: card grid rendering, API query correctness.
e2e tests: user flows (search, filter, sort, click → view details).

7. Project Structure & Component Organization

If components are too large and can be broken down, please use a features directory in the same directory as the page they are located at.
Keep global reusable components in the main components/ directory.
Page-specific feature components should be organized in features/ subdirectories for better maintainability.

8. Project Hygiene

.gitignore should exclude environment files, build artifacts, test outputs, and node_modules.
Ensure modular, testable components (review for possible refactors).
Keep API interactions centralized in queries/.

9. Future Considerations

Add deck-building or collection bookmarking.
Offline caching with service workers.
Advanced search (e.g., oracle text search, multi-filter combos).
