# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start Vite dev server
npm run build        # Type-check + build for production
npm run build-only   # Build without type-checking
npm run preview      # Preview production build
npm run lint         # Run oxlint + eslint with auto-fix
npm run format       # Format with Prettier
```

Node version: `^20.19.0 || >=22.12.0`

## Architecture

**Stack:** Vue 3 + TypeScript + Vite + Pinia + Vue Router 5 + Tailwind CSS 4

### Data Flow

All data is stored entirely in **localStorage** — there is no backend API. Pinia stores initialize from seeders on first load and persist state changes via watchers in `src/PiniaConfig.ts`.

Stores: `authstore`, `userstore`, `videogamestore`, `studiostore`, `reviewstore`

Services in `src/services/` contain business logic and interact with stores; views call services rather than stores directly.

### Routing & Auth

Routes are defined in `src/router/index.ts`. Navigation guards check:
- `requiresAuth` meta: redirect to `/login` if not authenticated
- `requiresAdmin` meta: redirect to `/home` if not admin

Roles are defined in `src/types/UserRole.ts` (`User` / `Admin`).

### Key Directories

- `src/views/` — Page-level components mapped to routes
- `src/components/` — Reusable UI components (charts, form inputs, modals)
- `src/stores/` — Pinia stores + seeders (initial data)
- `src/services/` — Business logic layer
- `src/interfaces/` — TypeScript interfaces for domain entities
- `src/dtos/` — Data Transfer Objects for create operations
- `src/types/` — Enums and type aliases

### Styling

Tailwind CSS 4 configured via Vite plugin (`@tailwindcss/vite`). Global styles in `src/assets/css/input.css`. Path alias `@/` maps to `src/`.

### Linting

Two linters run together: ESLint (flat config, `eslint.config.ts`) + Oxlint (`.oxlintrc.json`). Prettier handles formatting separately and is excluded from ESLint.
