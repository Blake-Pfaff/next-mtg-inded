# Pagination Components

A comprehensive set of reusable pagination components for the MTG Index application.

## 🚀 Features

- **URL State Management** - Pagination state synced with URL parameters for shareable links
- **Modular Architecture** - Small, focused components that can be composed together
- **Reusable Icons** - Extracted chevron icons for use throughout the app
- **Smart Logic** - Extracted pagination calculations into reusable functions
- **Full Accessibility** - ARIA labels, keyboard navigation, screen reader support
- **Design System Compliance** - Uses all design tokens from globals.css

## Components

### 1. `Pagination`

The core pagination component with navigation buttons.

```tsx
import { Pagination } from "@/components/Pagination";

<Pagination
  currentPage={3}
  totalPages={10}
  onPageChange={(page) => setCurrentPage(page)}
  showFirstLast={true}
  showPrevNext={true}
  maxVisiblePages={5}
  size="md"
  disabled={false}
/>;
```

**Props:**

- `currentPage` - Current active page (1-based)
- `totalPages` - Total number of pages
- `onPageChange` - Callback when page changes
- `showFirstLast` - Show first/last page buttons (default: true)
- `showPrevNext` - Show previous/next buttons (default: true)
- `maxVisiblePages` - Maximum page numbers to show (default: 5)
- `size` - Button size: "sm" | "md" | "lg" (default: "md")
- `disabled` - Disable all pagination buttons

### 2. `PaginationInfo`

Displays current page information and item counts.

```tsx
import { PaginationInfo } from "@/components/Pagination";

<PaginationInfo
  currentPage={2}
  totalPages={10}
  totalItems={200}
  itemsPerPage={20}
  showItemCount={true}
/>;
```

**Props:**

- `currentPage` - Current page number
- `totalPages` - Total number of pages
- `totalItems` - Total number of items (optional)
- `itemsPerPage` - Items per page (optional)
- `showItemCount` - Show detailed item count (default: true)

### 3. `PageSizeSelector`

Dropdown to change the number of items per page.

```tsx
import { PageSizeSelector } from "@/components/Pagination";

<PageSizeSelector
  currentPageSize={20}
  pageSizeOptions={[10, 20, 50, 100]}
  onPageSizeChange={(size) => setPageSize(size)}
  disabled={false}
  label="Items per page:"
/>;
```

**Props:**

- `currentPageSize` - Currently selected page size
- `pageSizeOptions` - Available page size options (default: [10, 20, 50, 100])
- `onPageSizeChange` - Callback when page size changes
- `disabled` - Disable the selector
- `label` - Label text (default: "Items per page:")

### 4. `PaginationContainer`

A complete pagination solution that combines all components.

```tsx
import { PaginationContainer } from "@/components/Pagination";

<PaginationContainer
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
  totalItems={300}
  itemsPerPage={pageSize}
  showPageSizeSelector={true}
  onPageSizeChange={handlePageSizeChange}
  pageSizeOptions={[10, 20, 30, 50]}
  layout="split"
  className="border-t pt-4"
/>;
```

**Props:**
All props from individual components plus:

- `layout` - Layout style: "horizontal" | "vertical" | "split"
- `showPageSizeSelector` - Show page size selector
- `className` - Additional CSS classes

## Layout Options

### Horizontal (default)

```
[Info] [Page Size]                    [Pagination Buttons]
```

### Vertical

```
                [Info]
            [Pagination Buttons]
             [Page Size]
```

### Split

```
[Info] [Page Size]

    [Pagination Buttons]
```

## Styling

Components use design tokens from `globals.css`:

- Colors: `--color-primary-*`, `--color-text-*`
- Border radius: `--radius-small`, `--radius-input`
- Typography: `--font-size-body`
- Spacing: Standard Tailwind classes

## Accessibility

- Full keyboard navigation support
- ARIA labels and roles
- Screen reader friendly
- Focus management
- Semantic HTML structure

## 🎯 New URL-Based Pagination Hook

### `usePaginationURL`

Manages pagination state in URL parameters for shareable links.

```tsx
import { usePaginationURL } from "@/components/Pagination/features/usePaginationURL";

const { currentPage, pageSize, setPage, setPageSize } = usePaginationURL({
  defaultPage: 1,
  defaultPageSize: 20,
});

// URLs will automatically update to: ?page=2&pageSize=50
```

## 🧩 Component Architecture

### Core Components

- `PaginationCore` - New streamlined pagination component
- `PaginationButton` - Reusable button with animations
- `PaginationInfo` - Page information display
- `PageSizeSelector` - Items per page dropdown

### Reusable Parts

- `ChevronIcons` - Extracted to `/components/Icons/`
- `paginationLogic.ts` - Pure functions for pagination calculations
- `usePaginationURL.ts` - URL state management hook

### Features Directory

Located at `/components/Pagination/features/`:

- **paginationLogic.ts** - Calculation functions
- **usePaginationURL.ts** - URL state hook

## Examples

### Basic Pagination

```tsx
const [currentPage, setCurrentPage] = useState(1);

<Pagination
  currentPage={currentPage}
  totalPages={10}
  onPageChange={setCurrentPage}
/>;
```

### Complete Pagination with All Features

```tsx
const [currentPage, setCurrentPage] = useState(1);
const [pageSize, setPageSize] = useState(20);

<PaginationContainer
  currentPage={currentPage}
  totalPages={Math.ceil(totalItems / pageSize)}
  onPageChange={setCurrentPage}
  totalItems={totalItems}
  itemsPerPage={pageSize}
  showPageSizeSelector={true}
  onPageSizeChange={(newSize) => {
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page
  }}
  layout="split"
/>;
```

### Small Pagination for Compact Spaces

```tsx
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  size="sm"
  maxVisiblePages={3}
  showFirstLast={false}
/>
```

## Testing

Components include comprehensive Cypress tests covering:

- Page navigation
- Boundary conditions
- Accessibility
- Different sizes and layouts
- Page size changes
- Error states
