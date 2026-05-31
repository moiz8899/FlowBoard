# FlowBoard

FlowBoard is a Next.js storefront for selling premium downloadable dashboard templates. It includes a public catalog, protected admin dashboard, Supabase-backed product storage, private file uploads, Paddle checkout, and basic order reporting.

## Features

- Public storefront for dashboard templates
- Category and product detail pages
- Clerk-protected admin dashboard
- Admin product creation and deletion
- Supabase database for products, orders, order items, and events
- Supabase Storage for private dashboard ZIP files and public screenshots
- Paddle checkout integration
- Paddle webhook route for syncing completed orders to Supabase
- Review-ready pages: Contact, Delivery, Refund Policy, Privacy Policy, and Terms
- Dynamic sitemap and robots configuration

## Tech Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Clerk authentication
- Supabase Postgres and Storage
- Paddle Checkout
- Vercel deployment

## Local Setup

Install dependencies:

```bash
npm install
```

Create `.env` from `.env.example` and fill in the required values:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
ADMIN_EMAILS=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=
NEXT_PUBLIC_PADDLE_ENVIRONMENT=sandbox
PADDLE_WEBHOOK_SECRET=
NEXT_PUBLIC_SITE_URL=
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Admin:

```text
http://localhost:3000/admin/
```

Only Clerk users whose email is listed in `ADMIN_EMAILS` can access the admin dashboard.

## Supabase Setup

1. Create a Supabase project.
2. Open the Supabase SQL Editor.
3. Run `supabase/schema.sql`.
4. Copy the project URL, anon key, and service role key into `.env` and Vercel.

The schema creates:

- `products`
- `orders`
- `order_items`
- `product_events`
- `admin_daily_sales`
- `admin_top_products`
- `dashboard-screenshots` storage bucket
- `dashboard-files` storage bucket

Screenshots are public so the storefront can display them. Dashboard ZIP files are private.

## Paddle Setup

Create products and one-time prices in Paddle. For each FlowBoard dashboard, paste the Paddle Price ID into the admin form.

Webhook endpoint:

```text
https://your-vercel-url.vercel.app/api/paddle/webhook
```

Recommended webhook events:

```text
transaction.completed
transaction.paid
```

Set the webhook signing secret in:

```env
PADDLE_WEBHOOK_SECRET=
```

Use `NEXT_PUBLIC_PADDLE_ENVIRONMENT=sandbox` while testing and `production` after switching to live Paddle credentials.

## Vercel Deployment

Import the GitHub repository into Vercel and use the default Next.js settings:

```text
Install Command: npm install
Build Command: npm run build
Output Directory: .next
```

Add all environment variables in Vercel Project Settings.

For the first deployment, `NEXT_PUBLIC_SITE_URL` can be blank. The app falls back to Vercel's automatic `VERCEL_URL`. After deployment, set `NEXT_PUBLIC_SITE_URL` to your Vercel URL and redeploy.

## Security Notes

- Do not commit `.env`.
- Keep `CLERK_SECRET_KEY` private.
- Keep `SUPABASE_SERVICE_ROLE_KEY` private.
- Keep `PADDLE_WEBHOOK_SECRET` private.
- `/admin/` and `/api/admin/*` are protected by Clerk middleware.
- Admin access is additionally restricted by `ADMIN_EMAILS`.
- `/api/paddle/webhook` verifies Paddle signatures before writing orders.

## Useful Scripts

```bash
npm run dev
npm run build
npm run start
```

## Support

For store support, product issues, or payment questions:

```text
dialyn360@gmail.com
```
