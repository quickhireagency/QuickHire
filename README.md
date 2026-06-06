# QuickHire™ Website Production Repository

Production domain: **https://www.quickhireagency.com**  
Repository target: **https://github.com/quickhireagency/QuickHire**

## Important final step

Deploy the separate Apps Script in `/contact-form`, then paste its `/exec` URL into `/config/config.js`. The existing Job Board Apps Script is not changed.

## GitHub Pages

Publish from the root of the `main` branch in Settings → Pages. Set the custom domain to `www.quickhireagency.com`, wait for DNS validation, and then enable Enforce HTTPS.

## GoDaddy DNS

| Type | Name | Value | TTL |
|---|---|---|---|
| A | @ | 185.199.108.153 | 1 hour |
| A | @ | 185.199.109.153 | 1 hour |
| A | @ | 185.199.110.153 | 1 hour |
| A | @ | 185.199.111.153 | 1 hour |
| CNAME | www | quickhireagency.github.io | 1 hour |

Do not change MX, SPF, DKIM, DMARC, or the `jobboard` subdomain.

## Upload from macOS Terminal

```bash
cd "$HOME/Downloads/QuickHire-Website-Production" && \
git init && \
git checkout -B main && \
git add -A && \
git commit -m "Launch QuickHire corporate website" && \
git remote remove origin 2>/dev/null || true && \
git remote add origin https://github.com/quickhireagency/QuickHire.git && \
git push -u origin main --force
```

## Asset note

All production HTML uses local `/assets/` paths. The repository contains self-contained branded fallback artwork under every required filename so no Squarespace image host is required. Replace any generated fallback with the supplied final binary asset using the same filename; no HTML changes will be needed.


## Surgical production fix

This revision rewires all rendered images to files that exist under `/assets/`, uses the two About-page images exactly once each, replaces missing partner-logo image tags with local CSS monograms, converts supplied PNG artwork to matching WebP paths used by the site, fixes the footer Job Board logo with an ASCII-safe filename, and uses inline SVG social icons in every global header and footer.
