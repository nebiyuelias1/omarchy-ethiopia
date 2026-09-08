# Omarchy Ethiopia (`omarchy.org.et`)

Official landing page and meetup hub for **Omarchy Ethiopia**, the Ethiopian chapter of the [Omarchy Linux distribution](https://omarchy.org).

## Purpose
1. **Introduce Omarchy Ethiopia**: Lightweight, zero-bloat showcase featuring upstream ASCII art and official messaging (*"Beautiful, fun & agentic Linux"*).
2. **Partners Showcase**: Dedicated spotlight for official event partner **Tefer** and open community sponsorship.
3. **Event Hub for Meetup 2026**: Embedded Luma registration widget and partner showcase.

## Design Highlights
- **Zero-Bloat**: Pure semantic HTML, Tailwind utility styling, zero runtime animation overhead, and instant load time.
- **Ethiopian Flag Accent**: Clean 3-color line in Green (`#10b981`), Gold (`#fbbf24`), and Red (`#ef4444`) framing the page.
- **Full Page Landing**: Single full-viewport presentation with official upstream copy, no scroll needed.
- **Upstream Branding**: Official Omarchy vector logo + ETHIOPIA, with the official rectangular blocks mark as the vector favicon (`/favicon.svg`).
- **Luma Integration**: Live interactive registration widget embedded on `/meetup` alongside official partners.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run lint checks
npm run lint
```

## Deployment (GitHub Pages)

The project is configured for automated deployment to GitHub Pages using GitHub Actions:

1. In your GitHub repository, navigate to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Pushes to `main` (or manual triggers via `workflow_dispatch` in the Actions tab) will run [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), building the static export (`out/`) and publishing it to Pages.
4. The configuration dynamically handles both custom domains (such as `omarchy.org.et`) and repository subpaths (such as `/omarchy-ethiopia`).

