# GEMINI.md - Project Instruction Context

This project is a high-end storefront and content management system built with Next.js 16 and Payload CMS 3.x. This document serves as the primary instructional context for AI interactions.

## Project Overview

- **Name:** redeemed-creations (Consumer-facing: **bkglamm**)
- **Purpose:** A premium e-commerce storefront for products and a content-rich blog/website.
- **Framework:** Next.js 16 (App Router)
- **CMS:** Payload CMS 3.x (Integrated into Next.js)
- **Database:** SQLite (local development)
- **Styling:** Tailwind CSS 4, shadcn/ui, Framer Motion
- **Storage:** Vercel Blob (Media uploads)
- **Testing:** Vitest (Integration), Playwright (E2E)

## Architecture

The project co-locates the frontend and the backend within the `src` directory.

### Directory Structure
- `src/app/(frontend)`: Public website pages (Home, Shop, About, etc.).
- `src/app/(payload)`: Payload CMS admin interface and API routes.
- `src/collections`: Data models for Products, Pages, Posts, Media, Categories, and Users.
- `src/globals`: Global configuration and data (Navigation, Site Settings, Footer, etc.).
- `src/blocks`: Modular UI components used by the Payload Layout Builder to construct page content.
- `src/components`: Shared React components (`ui`, `layout`, `sections`).
- `src/utilities`: Shared helper functions and API clients.

## Key Technical Features

- **Products Collection:** Central to the shop. Includes fields for price (BWP), stock levels, multi-image support, and featured status.
- **Layout Builder:** Pages and Posts use a block-based layout system. Supported blocks include Content, Media, CTA, Form, and Archive.
- **SEO & Search:** Integrated via official Payload plugins (`@payloadcms/plugin-seo`, `@payloadcms/plugin-search`).
- **Live Preview:** Supported for Pages and Posts within the Payload admin panel.
- **Dynamic Revalidation:** Uses Next.js on-demand revalidation (e.g., `revalidate = 60` in shop and home pages).

## Commands & Scripts

- `pnpm dev`: Start the development server (Next.js + Payload).
- `pnpm build`: Create a production-ready bundle.
- `pnpm start`: Run the production server.
- `pnpm payload <command>`: Execute Payload CLI commands (e.g., `pnpm payload generate:types`).
- `pnpm run test:int`: Execute integration tests with Vitest.
- `pnpm run test:e2e`: Execute end-to-end tests with Playwright.
- `pnpm lint`: Run ESLint checks.

## Development Conventions

- **TypeScript:** Strict type safety is prioritized. Always run `pnpm generate:types` after modifying Payload collections.
- **Styling:** Use Tailwind CSS 4 utility classes. Theme colors and variables are managed in `src/app/globals.css`.
- **Component Pattern:** Prefer server components by default. Use client components (`'use client'`) only when interactive or using browser APIs.
- **Content Access:** Use Payload's local API (`getPayload`) for server-side data fetching to bypass network overhead.
- **File Naming:** Use PascalCase for React components and camelCase for utilities, hooks, and config files.

## Environment Configuration

Key variables required in `.env`:
- `DATABASE_URL`: Path to the SQLite database.
- `PAYLOAD_SECRET`: Secret key for Payload authentication.
- `BLOB_READ_WRITE_TOKEN`: Token for Vercel Blob storage.
- `NEXT_PUBLIC_SERVER_URL`: Base URL of the application.

---
*Note: This file is intended for AI context and should be updated whenever significant architectural changes occur.*
