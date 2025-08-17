# Development Setup

This document outlines the development setup for consistent code formatting and linting.

## Code Formatting & Linting

### Prettier Configuration

- **File**: `.prettierrc`
- **Settings**: 2-space indentation, double quotes, semicolons, trailing commas
- **Format on save**: Enabled in VS Code settings

### ESLint Configuration

- **File**: `eslint.config.mjs`
- **Rules**: TypeScript strict rules, Next.js recommended rules
- **Integration**: Works with Prettier (no conflicts)

### VS Code Settings

- **Format on save**: Enabled
- **ESLint auto-fix**: Enabled on save
- **Recommended extensions**: Prettier, ESLint, Tailwind CSS

## Available Scripts

### Formatting

```bash
npm run format          # Format all files
npm run format:check    # Check if files are formatted
```

### Linting

```bash
npm run lint           # Check for linting errors
npm run lint:fix       # Auto-fix linting errors
npm run typecheck      # Run TypeScript type checking
```

### Testing

```bash
npm run test                 # Run all tests
npm run test:component       # Run component tests
npm run test:e2e            # Run e2e tests
npm run test:component:dev   # Open component test UI
npm run test:e2e:dev        # Open e2e test UI
```

## Git Hooks

### Pre-commit Hook

- **Tool**: Husky + lint-staged
- **Actions**:
  - Format TypeScript/JavaScript files with Prettier
  - Fix ESLint errors automatically
  - Format JSON, Markdown, CSS files
- **Location**: `.husky/pre-commit`

### Manual Hook Test

```bash
npx lint-staged  # Test the pre-commit hook manually
```

## Editor Configuration

### .editorconfig

- Consistent indentation across all editors
- UTF-8 encoding, LF line endings
- Trim trailing whitespace

### VS Code Extensions (Recommended)

- Prettier - Code formatter
- ESLint
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features
- Auto Rename Tag
- Path Intellisense

## File Structure

```
.vscode/
├── settings.json       # VS Code workspace settings
└── extensions.json     # Recommended extensions

.husky/
└── pre-commit         # Git pre-commit hook

.prettierrc            # Prettier configuration
.prettierignore        # Files to ignore for formatting
.editorconfig          # Editor configuration
eslint.config.mjs      # ESLint configuration
```

## Best Practices

1. **Always commit formatted code** - The pre-commit hook ensures this
2. **Use VS Code settings** - Enable format on save for instant feedback
3. **Run tests before pushing** - Use `npm test` to ensure everything works
4. **Check types regularly** - Use `npm run typecheck` for TypeScript validation
5. **Follow the style guide** - Prettier handles most formatting automatically

## Troubleshooting

### Format on save not working

1. Install the Prettier VS Code extension
2. Check that VS Code is using the workspace settings
3. Verify `.prettierrc` exists in the project root

### ESLint errors

1. Run `npm run lint:fix` to auto-fix issues
2. Check the `eslint.config.mjs` for rule configuration
3. Use `npm run typecheck` for TypeScript-specific issues

### Pre-commit hook failing

1. Test manually with `npx lint-staged`
2. Fix any formatting or linting errors
3. Ensure all files are staged before committing
