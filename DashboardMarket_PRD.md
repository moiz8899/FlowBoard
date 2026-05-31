# FlowBoard — Product Requirements Document (PRD)
**Version:** 1.0  
**Author:** Moiz Ch  
**Status:** Ready for Build  
**Target Builder:** OpenAI Codex / AI-assisted development  

---

## 1. Product Overview

**Product Name:** FlowBoard
**Tagline:** "Premium HTML Dashboard Templates. One-time payment. Yours forever."  
**Type:** Static marketing + e-commerce website  
**Purpose:** Sell downloadable HTML/CSS/JS dashboard templates to freelancers, developers, and small business owners. No backend needed by the buyer — templates are local-first.

### Core Value Proposition
- One-time price, no subscription
- Privacy-first (buyer data stays in their browser)
- Production-ready templates, not toy demos
- Categories for every builder type

---

## 2. Goals & Success Metrics

| Goal | Metric |
|------|--------|
| Sell templates online | # of completed 2Checkout purchases |
| Reduce bounce rate | Time on page > 2 min |
| Build trust | Star ratings + buyer count displayed |
| Grow catalog | Easy CMS-style product addition via JSON |

---

## 3. Target Users

**Primary:** Freelancers, indie developers, solo founders, small agencies  
**Secondary:** Students building portfolio projects  
**Geography:** Global (English-first)  
**Tech level:** Intermediate — they know HTML/CSS but don't want to build from scratch

---

## 4. Site Architecture & Pages

```
/                          → Homepage (hero + categories + featured products)
/category/[slug]           → Category page (filtered product grid)
/product/[slug]            → Product detail page
/checkout/success          → Post-purchase success page
/checkout/cancel           → Checkout cancelled page
/about                     → About the creator (optional, trust-building)
```

### 4.1 Navigation (Header)
- Logo left (text or SVG logo)
- Nav links: Home | Templates | Categories | Pricing
- CTA button top-right: "Browse Templates" (accent color)
- Sticky on scroll, subtle shadow on scroll

### 4.2 Footer
- Logo + tagline
- Links: Home | Templates | About | Contact | Refund Policy
- Social: TikTok, GitHub (optional)
- Copyright: © 2026 FlowBoard. All rights reserved.
- Payment badge: "Secured by 2Checkout"

---

## 5. Page Designs

### 5.1 Homepage

#### Hero Section
- **Headline (H1):** "Premium Dashboard Templates Built for Real Work"
- **Subheadline:** "One-time payment. No subscriptions. Download, open in browser, done."
- **CTA Buttons:**
  - Primary: "Browse Templates" → scrolls to product grid
  - Secondary: "See Demo" → opens demo in new tab
- **Background:** Dark with animated grid or subtle gradient mesh
- **Visual:** Floating mockup of a dashboard screenshot (CSS shadow, slight tilt)

#### Category Pills Row
Horizontal scrollable row of category filter chips:
- All Templates
- AI Dashboard
- CRM Dashboard
- Finance Dashboard
- Agency Dashboard
- Education Dashboard

Clicking a category filters the product grid below (JS filter, no page reload).

#### Product Grid
- 3 columns on desktop, 2 on tablet, 1 on mobile
- Each product card contains:
  - Preview image/screenshot (16:10 ratio)
  - Category badge (color-coded pill)
  - Product name (bold)
  - Short description (1 line, truncated)
  - Star rating (static or from JSON)
  - Price (e.g. "$29")
  - "View Details" button → product page
  - "Buy Now" button → triggers 2Checkout

#### Trust Bar (below grid)
Row of 4 trust stats:
- 🧩 12+ Templates
- ⬇️ 500+ Downloads
- ⭐ 4.9 Average Rating
- 🔒 Secure 2Checkout Payments

#### Features Section
3-column grid with icons:
1. **One-Time Purchase** — No recurring fees, ever.
2. **Local-First** — Your data stays in your browser.
3. **Instant Download** — Get your files immediately after payment.

---

### 5.2 Category Page (`/category/[slug]`)

- Heading: "CRM Dashboard Templates" (dynamic)
- Description: 1–2 sentence category description
- Same product grid as homepage, pre-filtered
- Breadcrumb: Home > Templates > CRM Dashboard

---

### 5.3 Product Detail Page (`/product/[slug]`)

#### Left Column (60%)
- Product title (H1)
- Category badge
- Screenshot carousel (3–5 screenshots, JS slider, keyboard navigable)
- Tabbed content:
  - **Overview** — what the product does
  - **Features** — bullet list of capabilities
  - **Tech Stack** — HTML, CSS, JS, localStorage, etc.
  - **Changelog** — version history (optional)

#### Right Column (40%) — Sticky Sidebar
- Price (large, bold): **$29**
- Original/crossed price (optional): ~~$49~~
- "Buy Now" button (full width, accent color) → 2Checkout
- "View Live Demo" link → opens demo in new tab
- Divider
- Includes:
  - ✅ Full source code (HTML/CSS/JS)
  - ✅ Lifetime access
  - ✅ Free future updates
  - ✅ Documentation included
- Divider
- Tags: `#crm` `#freelancer` `#dashboard`
- Refund policy note: "30-day money-back guarantee"

#### Below the fold
- Related products (3 cards, same category)
- Reviews section (static JSON, 3–5 reviews)

---

### 5.4 Checkout Success Page

- ✅ Big green checkmark icon
- **Heading:** "Your purchase is confirmed!"
- **Subtext:** "Check your email for the download link. If you don't see it, check spam."
- Button: "Back to Templates"
- Note: 2Checkout handles email delivery of download link via their digital delivery system

---

### 5.5 Checkout Cancel Page

- ❌ Icon
- **Heading:** "Payment cancelled."
- **Subtext:** "No charges were made. You can try again anytime."
- Button: "Try Again" → back to product page

---

## 6. Product Data Model

All products are stored in a single `products.json` file. This makes adding new products as simple as editing one file — no database needed.

```json
[
  {
    "id": "freelance-crm-v1",
    "slug": "freelance-crm-dashboard",
    "name": "FreelanceCRM Dashboard",
    "category": "crm",
    "categoryLabel": "CRM Dashboard",
    "price": 29,
    "originalPrice": 49,
    "description": "A complete local-first CRM for solo freelancers. Track leads, clients, invoices, projects and more.",
    "longDescription": "FreelanceCRM is a premium HTML/CSS/JS dashboard template built specifically for solo freelancers...",
    "features": [
      "10 CRM modules: Leads, Clients, Projects, Tasks, Revenue, Invoices, Calendar, Proposals, Contracts, Settings",
      "Drag-and-drop sales pipeline",
      "Dark/light mode toggle",
      "JSON backup and restore",
      "PDF proposal generation",
      "Local-first — no backend required"
    ],
    "techStack": ["HTML5", "CSS3", "Vanilla JS", "localStorage"],
    "screenshots": [
      "/assets/products/freelance-crm/screen-1.png",
      "/assets/products/freelance-crm/screen-2.png",
      "/assets/products/freelance-crm/screen-3.png"
    ],
    "demoUrl": "https://demo.flowboard.dev/freelance-crm",
    "rating": 4.9,
    "reviewCount": 24,
    "downloadCount": 143,
    "tags": ["crm", "freelance", "invoicing", "pipeline"],
    "twoCheckoutProductId": "PRODUCT_ID_FROM_2CHECKOUT",
    "createdAt": "2025-05-01",
    "version": "1.0.0"
  }
]
```

### Categories
```json
[
  { "slug": "ai", "label": "AI Dashboard", "color": "#7C3AED", "description": "AI-powered dashboard templates for analytics, predictions, and model monitoring." },
  { "slug": "crm", "label": "CRM Dashboard", "color": "#2563EB", "description": "Client relationship management tools for freelancers and agencies." },
  { "slug": "finance", "label": "Finance Dashboard", "color": "#059669", "description": "Track revenue, expenses, invoices, and financial KPIs." },
  { "slug": "agency", "label": "Agency Dashboard", "color": "#D97706", "description": "Project and team management dashboards for creative agencies." },
  { "slug": "education", "label": "Education Dashboard", "color": "#DC2626", "description": "LMS-style tracking for students, tutors, and online educators." }
]
```

---

## 7. Payment Integration — 2Checkout

### How 2Checkout Digital Delivery Works
2Checkout (now Verifone) supports selling digital products with automatic email delivery of download links.

### Setup Steps (for developer)
1. Create a 2Checkout merchant account at `merchant.2checkout.com`
2. Add each template as a "Digital Product" in the 2Checkout dashboard
3. Upload the ZIP file of each template to 2Checkout's file delivery system
4. Get the `merchant_code` and per-product `product_id` from 2Checkout dashboard
5. Use 2Checkout's **Buy Link** or **Inline Cart** method

### Buy Link Method (Simplest)
Each "Buy Now" button is a direct link to 2Checkout's hosted checkout:
```
https://secure.2checkout.com/order/checkout.php?PRODS={PRODUCT_ID}&QTY=1&AFFILIATE=108875&CART=1&CARD=2
```

Replace `{PRODUCT_ID}` with the product ID from your 2Checkout dashboard.

### Return URLs (set in 2Checkout dashboard)
- **Success URL:** `https://yourdomain.com/checkout/success`
- **Cancel URL:** `https://yourdomain.com/checkout/cancel`

### What 2Checkout Handles Automatically
- Payment processing (cards, PayPal, etc.)
- VAT/tax calculation
- Fraud detection
- Email receipt + download link to buyer
- Refunds (via dashboard)

### What You Do NOT Need to Build
- No payment form on your site
- No server-side webhook (unless you want order tracking)
- No file hosting/download system — 2Checkout delivers the file

---

## 8. Tech Stack for the Website

| Layer | Technology | Reason |
|-------|-----------|--------|
| Framework | **Next.js 14 (App Router)** | SSG for fast pages, SEO-friendly |
| Styling | **Tailwind CSS** | Rapid utility-class styling |
| Data | **products.json** | No database needed; static |
| Payments | **2Checkout Buy Links** | No backend, direct redirect |
| Hosting | **Vercel** | Free tier, auto-deploy from GitHub |
| Images | Local `/public/assets/` | No CDN needed for MVP |
| Analytics | **Vercel Analytics** or **Plausible** | Track visits and conversions |

> **Alternative (if Codex prefers):** Plain HTML/CSS/JS with no framework. In that case, use `fetch('products.json')` to load products dynamically. This is even simpler but has worse SEO.

---

## 9. UI Design System

### Color Palette
```css
--color-bg:          #0A0A0F;   /* Near-black background */
--color-surface:     #13131A;   /* Card backgrounds */
--color-border:      #1F1F2E;   /* Subtle borders */
--color-text:        #F0F0F5;   /* Primary text */
--color-muted:       #6B6B80;   /* Secondary text */
--color-accent:      #6366F1;   /* Indigo accent (CTAs, links) */
--color-accent-hover:#4F52D9;   /* Darker on hover */
--color-success:     #22C55E;   /* Success green */
--color-warning:     #F59E0B;   /* Warning yellow */
--color-danger:      #EF4444;   /* Error red */
```

### Typography
```css
--font-display: 'Syne', sans-serif;      /* Headlines — geometric, modern */
--font-body:    'DM Sans', sans-serif;   /* Body text — clean and readable */
```
Import from Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```

### Type Scale
| Token | Size | Usage |
|-------|------|-------|
| `text-hero` | 56–72px | Hero headline |
| `text-h1` | 36–48px | Page titles |
| `text-h2` | 28–32px | Section headers |
| `text-h3` | 20–24px | Card titles |
| `text-body` | 16px | Body copy |
| `text-small` | 14px | Labels, captions |
| `text-xs` | 12px | Badges, tags |

### Spacing
Base unit: `4px`. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px

### Border Radius
```css
--radius-sm:  6px;
--radius-md:  12px;
--radius-lg:  20px;
--radius-xl:  32px;
--radius-full: 9999px;  /* pills/badges */
```

### Shadows
```css
--shadow-card:    0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px var(--color-border);
--shadow-hover:   0 8px 32px rgba(99,102,241,0.15);
--shadow-glow:    0 0 40px rgba(99,102,241,0.2);
```

### Component Specs

#### Product Card
- Background: `--color-surface`
- Border: `1px solid --color-border`
- Border radius: `--radius-lg`
- Padding: `0` (image flush top, content padded 16px)
- On hover: border color shifts to accent, `--shadow-hover` applied
- Transition: `all 0.2s ease`

#### Buttons
```css
/* Primary */
.btn-primary {
  background: var(--color-accent);
  color: white;
  padding: 12px 24px;
  border-radius: var(--radius-full);
  font-weight: 600;
  transition: background 0.2s, transform 0.1s;
}
.btn-primary:hover { background: var(--color-accent-hover); transform: translateY(-1px); }

/* Secondary / Ghost */
.btn-ghost {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  padding: 11px 23px;
  border-radius: var(--radius-full);
}
.btn-ghost:hover { border-color: var(--color-accent); color: var(--color-accent); }
```

#### Category Badge
```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 600;
  background: rgba(99,102,241,0.15);
  color: var(--color-accent);
}
```
Each category has its own color (see categories JSON above).

---

## 10. Animations & Interactions

| Element | Animation |
|---------|-----------|
| Page load | Fade-in + translateY(20px → 0) staggered per section |
| Product card hover | Scale(1.02) + shadow glow |
| Category filter | Grid fades out → filters → fades in |
| Hero mockup | Slow float (CSS keyframes, infinite) |
| Buy Now button | Pulse animation on page load (3 times, then stops) |
| Screenshot carousel | CSS slide transition, no heavy libraries |

---

## 11. SEO Requirements

- Each page has unique `<title>` and `<meta name="description">`
- Product pages have Open Graph tags for social sharing
- `sitemap.xml` auto-generated (if Next.js, use `next-sitemap`)
- `robots.txt` allowing all crawlers
- Product schema markup (JSON-LD) on product pages:
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "FreelanceCRM Dashboard",
  "description": "...",
  "offers": {
    "@type": "Offer",
    "price": "29",
    "priceCurrency": "USD"
  }
}
```

---

## 12. Mobile Responsiveness

| Breakpoint | Behavior |
|------------|----------|
| `< 640px` (mobile) | 1 column grid, hamburger nav, full-width cards |
| `640–1024px` (tablet) | 2 column grid, simplified nav |
| `> 1024px` (desktop) | 3 column grid, full nav |

All touch targets minimum 44px. No horizontal scroll. Images lazy-loaded.

---

## 13. File & Folder Structure

```
/
├── public/
│   ├── assets/
│   │   └── products/
│   │       └── freelance-crm/
│   │           ├── screen-1.png
│   │           ├── screen-2.png
│   │           └── screen-3.png
│   ├── favicon.ico
│   └── robots.txt
├── data/
│   ├── products.json
│   └── categories.json
├── app/ (Next.js App Router)
│   ├── layout.tsx         → Root layout (nav + footer)
│   ├── page.tsx           → Homepage
│   ├── category/
│   │   └── [slug]/
│   │       └── page.tsx   → Category page
│   ├── product/
│   │   └── [slug]/
│   │       └── page.tsx   → Product detail page
│   ├── checkout/
│   │   ├── success/page.tsx
│   │   └── cancel/page.tsx
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   ├── CategoryFilter.tsx
│   ├── ScreenshotCarousel.tsx
│   ├── TrustBar.tsx
│   └── BuyButton.tsx
├── lib/
│   └── products.ts        → Helper functions to query products.json
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## 14. BuyButton Component Logic

```typescript
// components/BuyButton.tsx
interface BuyButtonProps {
  twoCheckoutProductId: string;
  merchantCode: string;
  label?: string;
}

export function BuyButton({ twoCheckoutProductId, merchantCode, label = "Buy Now" }: BuyButtonProps) {
  const checkoutUrl = `https://secure.2checkout.com/order/checkout.php?PRODS=${twoCheckoutProductId}&QTY=1&MERCHANT=${merchantCode}&CART=1&CARD=2`;
  
  return (
    <a
      href={checkoutUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-primary w-full text-center block"
    >
      {label}
    </a>
  );
}
```

Store `MERCHANT_CODE` in `.env.local`:
```
NEXT_PUBLIC_2CO_MERCHANT_CODE=your_merchant_code_here
```

---

## 15. Environment Variables

```env
# .env.local
NEXT_PUBLIC_2CO_MERCHANT_CODE=your_merchant_code
NEXT_PUBLIC_SITE_URL=https://flowboard.dev
NEXT_PUBLIC_DEMO_BASE_URL=https://demo.flowboard.dev
```

---

## 16. MVP Scope vs. Future Features

### MVP (Build Now)
- [x] Homepage with hero, category filter, product grid
- [x] Product detail page with screenshots + buy button
- [x] 2Checkout buy link integration
- [x] Success + cancel pages
- [x] Mobile responsive
- [x] products.json data system
- [x] SEO basics

### Phase 2 (After First Sales)
- [ ] Search bar on product grid
- [ ] Newsletter signup (ConvertKit or Mailchimp)
- [ ] Affiliate program
- [ ] Coupon code support (via 2Checkout)
- [ ] Reviews collected via Tally form, stored in JSON
- [ ] Blog for SEO (Next.js MDX)

### Phase 3 (Scale)
- [ ] Multi-currency pricing
- [ ] User accounts + purchase history (requires backend)
- [ ] Template bundles (e.g., "All 5 templates — $79")
- [ ] Template preview in iframe (sandboxed)

---

## 17. Launch Checklist

Before going live:

- [ ] All products in `products.json` with correct 2Checkout product IDs
- [ ] All product screenshots added to `/public/assets/products/`
- [ ] Demo URLs working and linked
- [ ] 2Checkout merchant account verified and active
- [ ] Return URLs set in 2Checkout dashboard
- [ ] `.env.local` variables set in Vercel
- [ ] Custom domain connected to Vercel
- [ ] Test purchase completed end-to-end (use 2Checkout sandbox mode first)
- [ ] Mobile tested on real device
- [ ] Google Search Console setup
- [ ] `sitemap.xml` submitted

---

## 18. Notes for Codex

- Use **TypeScript** throughout.
- Use **Tailwind CSS** for all styling — no CSS modules.
- Use **Next.js App Router** (not Pages Router).
- All product data comes from `data/products.json` — no API calls, no database.
- The `BuyButton` component must open 2Checkout in the same tab (not `target="_blank"`) for better conversion.
- Keep components small and single-responsibility.
- No authentication, no user accounts, no server-side logic in MVP.
- Prioritize **performance** — all pages should be statically generated (`generateStaticParams`).
- Use `next/image` for all images with proper `width` and `height`.
- Dark theme only for MVP. Light mode toggle is Phase 2.

---

*PRD Version 1.0 — Ready for Codex build.*
