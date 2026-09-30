# Walumo website (Next.js 16)

Walumo's website rebuilt on the Nova template layout (centered serif headings with an italic accent, rounded cards, dark stats band, logo marquee, dark footer), with Walumo's brand, content and assets.

Content sources:

- **Walumo Website Content Blueprint** (all page copy)
- **Walumo Website Brand & Positioning Audit — Developer Handoff** (refined sitemap, replacement copy and corrections)
- The current Walumo repository (`ITM-walumo-website`): logo, Candara font, Hacklab and office photos, ITM entity logos and Kazi Pro / Talent Pro screenshots from the `release/walumo-website-v5` branch, strategic pillars and "How we work" steps from the `main` branch.

## Run

```bash
bun install
bun run dev
```

## Sitemap

| Section | Routes |
| --- | --- |
| Home | `/` |
| Products | `/products`, `/products/kazi-pro`, `/products/talent-pro`, `/products/sales-tracker` |
| Solutions | `/solutions`, `/solutions/hr`, `/solutions/talent-acquisition`, `/solutions/commercial-operations`, `/solutions/digital-transformation` |
| What we do | `/what-we-do` (vision & mission, pillars, services, method, why Walumo, ITM backing) |
| Resources | `/insights`, `/insights/[article]`, `/insights/reports/[report]`, `/insights/events/walumo-hacklab`, `/insights/case-studies` |
| Trust | `/security`, `/support`, `/privacy-policy`, `/terms`, `/cookie-policy` |
| Contact | `/contact` (demo form, WhatsApp, Nairobi office) |

## Where to edit

| What | Where |
| --- | --- |
| Brand, email, address, CTAs, WhatsApp number, navigation, footer | `lib/site.ts` |
| Products, solutions, services, pillars, method, proof figures, ITM entities, articles, reports, events | `lib/content.ts` |
| Colours and fonts | `app/globals.css` (`@theme`) and `app/layout.tsx` |
| Logo | `components/ui/logo.tsx` (paths from `logo-walumo.svg`) |
| Product UI illustrations | `components/ui/product-mocks.tsx` |

## Before going live — checklist

These items come from the audit's final QA checklist and still need input from Walumo / ITM:

1. **WhatsApp number** — set `WHATSAPP_NUMBER` in `lib/site.ts`. Until then, WhatsApp buttons open the contact page.
2. **Forms** — the demo form, report/lead forms and newsletter do not send anything yet. Connect them to your email or CRM (see the `TODO` comments in `components/pages/forms/` and `components/layout/newsletter-form.tsx`).
3. **Figures and claims** — "20+ countries", "3 platforms" and "23+ companies running Kazi Pro" come from the blueprint; confirm them with leadership.
4. **Testimonials** — none are published (the blueprint's draft quote was not verified). Replace the "Customer stories coming soon" blocks once quotes are approved.
5. **Logos** — the logo wall shows ITM Holding group entities only, as recommended by the blueprint.
6. **Screenshots** — personal data (names, email, phone) was blurred on the Kazi Pro and Talent Pro screenshots. Sales Tracker has no pipeline screenshot yet, so a coded UI illustration is shown; replace it with a real screenshot when available.
7. **Articles** — the four Insights articles are drafts based on the audit's recommended topics; have them reviewed by the Walumo team.
8. **Reports** — both reports are marked "Coming soon"; the form collects emails to send them on publication.
9. **Hacklab** — add the event date, location and results to `lib/content.ts` (`events`) if you want them shown.
10. **Security & legal pages** — marked "Draft for review". Only add technical claims (hosting, encryption, backups, uptime) once confirmed by IT; fill the [brackets] in the legal pages and have them approved by counsel, then set `draft={false}`.
11. **Domain** — `site.url` is set to `https://walumoafrica.com`; update it if the site is deployed elsewhere.
