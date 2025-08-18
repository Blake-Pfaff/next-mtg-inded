# Dropdown Component

A fully accessible, custom dropdown component that follows the design system.

## Features

- 🎨 **Design System Compliant** - Uses all design tokens from globals.css
- ♿ **Fully Accessible** - ARIA attributes, keyboard navigation, screen reader support
- 🎭 **Smooth Animations** - Framer Motion powered open/close animations
- 📱 **Responsive Sizes** - Small, medium, and large variants
- ⌨️ **Keyboard Navigation** - Full keyboard support with arrow keys
- 🎯 **Click Outside** - Automatically closes when clicking outside
- 🚫 **Disabled Support** - Individual options and entire dropdown can be disabled

## Usage

### Basic Example

```tsx
import { Dropdown, DropdownOption } from "@/components/Dropdown";

const options: DropdownOption[] = [
  { value: 10, label: "10 items" },
  { value: 20, label: "20 items" },
  { value: 50, label: "50 items" },
];

<Dropdown
  options={options}
  value={selectedValue}
  onChange={handleChange}
  label="Items per page"
/>;
```

### With Disabled Options

```tsx
const options: DropdownOption[] = [
  { value: 1, label: "Option 1" },
  { value: 2, label: "Option 2", disabled: true },
  { value: 3, label: "Option 3" },
];
```

### Different Sizes

```tsx
// Small dropdown
<Dropdown size="sm" options={options} value={value} onChange={onChange} />

// Large dropdown
<Dropdown size="lg" options={options} value={value} onChange={onChange} />
```

## Props

| Prop          | Type                                | Default            | Description                       |
| ------------- | ----------------------------------- | ------------------ | --------------------------------- |
| `options`     | `DropdownOption[]`                  | -                  | Array of dropdown options         |
| `value`       | `string \| number`                  | -                  | Currently selected value          |
| `onChange`    | `(value: string \| number) => void` | -                  | Callback when selection changes   |
| `placeholder` | `string`                            | "Select an option" | Text shown when no value selected |
| `disabled`    | `boolean`                           | `false`            | Disable the entire dropdown       |
| `size`        | `"sm" \| "md" \| "lg"`              | "md"               | Size variant                      |
| `className`   | `string`                            | ""                 | Additional CSS classes            |
| `label`       | `string`                            | -                  | Label text for the dropdown       |
| `id`          | `string`                            | -                  | HTML id attribute                 |

## DropdownOption Interface

```tsx
interface DropdownOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}
```

## Keyboard Navigation

- **Enter/Space** - Open/close dropdown
- **Arrow Down** - Navigate to next option (opens dropdown if closed)
- **Arrow Up** - Navigate to previous option (opens dropdown if closed)
- **Enter/Space** (on option) - Select option and close
- **Escape** - Close dropdown and return focus to button

## Accessibility Features

- Full ARIA support (`role="listbox"`, `aria-expanded`, etc.)
- Keyboard navigation
- Screen reader announcements
- Focus management
- High contrast support
- Proper labeling

## Styling

Uses design tokens from `globals.css`:

- **Colors**: `--color-primary-*`, `--color-text-*`
- **Borders**: `--radius-input`, `--radius-small`
- **Spacing**: Standard spacing scale
- **Typography**: `--font-size-*` scale

## Examples in Use

### Page Size Selector

```tsx
// Used in pagination component
<PageSizeSelector
  currentPageSize={20}
  pageSizeOptions={[10, 20, 50, 100]}
  onPageSizeChange={setPageSize}
  size="md"
/>
```

### Filter Dropdown

```tsx
// For filtering content
<Dropdown
  label="Filter by status"
  options={[
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ]}
  value={statusFilter}
  onChange={setStatusFilter}
/>
```
