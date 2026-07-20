# AsiaCryptoFin 2026 Website

A responsive, dependency-free static website for **The First ASIACRYPT Industry Forum on Cryptography and Finance (AsiaCryptoFin 2026)**.

## Preview locally

Open `index.html` directly in a browser, or run a local server from this folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish

The folder can be uploaded directly to a standard web host, GitHub Pages, Netlify, Cloudflare Pages, or an institutional web server. No build step is required.

## Items to update when confirmed

Search `index.html` for **To be announced** and update:

1. Talk proposal deadline
2. Speaker notification date
3. Final talk information date
4. Exact affiliated-event date and venue

The parent ASIACRYPT dates are shown as 7-11 December 2026 in Hong Kong. The forum's exact one-day date remains clearly marked as unconfirmed.

## Submission workflow

The submission button opens an email addressed to:

- joseph.liu@monash.edu
- cc: John.TszHonYuen@monash.edu

The site also provides a copyable and downloadable plain-text talk-proposal template.

## Main files

- `index.html` - page content and metadata
- `assets/styles.css` - responsive visual design
- `assets/script.js` - mobile navigation, reveal effects and proposal-template helpers
- `assets/favicon.svg` - browser icon
- `assets/social-card.svg` - social-sharing image
- `assets/talk-proposal-template.txt` - submission template
