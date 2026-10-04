# Nailed It With Deizy — website

Site for Nailed It With Deizy (hand-painted custom press-on nails), built by
Hardy Web Design with Next.js 16 (App Router), TypeScript and Tailwind CSS v4.

Three systems work together:

| What | Where Deizy changes it |
| --- | --- |
| Colors, seasonal theme, photos, page text, reviews, links | **Admin** at `/admin` (Keystatic) |
| Products, prices, product photos | **Square Dashboard** (Items) |
| Consultation bookings | **Square Appointments** |

Deizy never needs to touch code. `DEIZY-EDITING-GUIDE.md` is the guide to send her.
`CONTENT-TODO.md` lists open questions from her answers.

## Run it

```bash
npm install
cp .env.example .env.local   # fill in what you have
npm run dev                  # site: http://localhost:3000, admin: /admin
npm run build
```

In local development the editor saves straight to the files in `content/` and
`public/images/`, so you can test edits before committing.

## Where things live

| What | Where |
| --- | --- |
| Admin setup (fields Deizy sees) | `keystatic.config.ts` |
| Admin page at `/admin` | `src/app/admin/`, `patches/@keystatic+core+0.6.9.patch` |
| Seasonal drawings (leaf, bat, snowflake...) | `src/components/Motif.tsx`, `motifs` in `src/lib/palettes.ts` |
| Content Deizy edits | `content/*.yaml` |
| Photos | `public/images/{hero,gallery,about,sizing}/` |
| Sizing guide PDF | `public/downloads/sizing-guide.pdf` |
| Seasonal palettes | `src/lib/palettes.ts` |
| Theme math (readable text on any color) | `src/lib/theme.ts` |
| Square catalog + checkout | `src/lib/square.ts`, `src/app/(site)/shop/actions.ts` |
| Contact form email | `src/app/(site)/contact/actions.ts` |
| Pages | `src/app/(site)/<page>/page.tsx` |

## How the theme works

Deizy picks a palette (Fall, Spooky season, Winter, Valentine's, Spring, Summer,
Classic) or sets four custom colors. `src/lib/theme.ts` derives every other shade
and nudges colors until text meets WCAG AA contrast, so a pale custom color can't
make the site unreadable. Spooky season is a dark theme. To add a palette, add it to
`src/lib/palettes.ts` and to the `palette` options in `keystatic.config.ts`.

## Setup checklist (one time)

### 1. GitHub + Vercel
1. Push this repo to GitHub.
2. Vercel (your web design account, Pro plan) > Add New > Project > import the repo.
3. Add the environment variables below, then deploy.

### 2. Keystatic Cloud (so Deizy can edit on the live site)
1. Sign up at [keystatic.cloud](https://keystatic.cloud) and create a team.
2. Create a project and connect it to this GitHub repo.
3. In Vercel, set `NEXT_PUBLIC_KEYSTATIC_PROJECT` to `your-team/your-project`, then redeploy.
4. Invite Deizy's email to the team (the free plan covers 3 people). She signs in
   with email; no GitHub account needed.

Each save in the editor commits to GitHub and Vercel redeploys in about a minute.
Photos she uploads are committed to the repo, so Keystatic's paid image hosting isn't needed.

### 3. Square (products, prices, checkout)
Deizy already has a Square account.
1. With Deizy signed in, go to [developer.squareup.com](https://developer.squareup.com) > Applications > create an app.
2. Open the app > **Production** > copy the **Access token**.
3. In Vercel, set `SQUARE_ACCESS_TOKEN` (keep it secret; never commit it). Redeploy.
4. In the Square Dashboard, add each set as an Item with a photo and price. Add sizes,
   shapes or lengths as **variations** if prices differ; the shop shows a dropdown.
   Use **categories** to get sections on the Shop page.

Until the token is set, the Shop page shows her gallery with "Request this set" links,
so the site works for review without Square.

"Buy now" creates a Square checkout for that item (cards, Cash App Pay, Apple Pay,
Google Pay, tipping on), asks for a shipping address, and asks two questions: shipping
or pickup, and her sizes/shape/length. Afterward Square sends the buyer to `/thank-you`.
The catalog refreshes on the site every 5 minutes.

### 4. Square Appointments (consultations)
In Square Appointments, create a 15-minute "Consultation" service and set her hours
(every day 9am–9pm), then paste the booking site link into the editor under
**Business info and links > Square booking link**. Appointment services also appear
on the Pricing page.

### 5. Contact form (Resend)
1. Create a free [Resend](https://resend.com) account and API key; set `RESEND_API_KEY`.
2. Until a domain is verified in Resend, its test sender only delivers to the Resend
   account's own email. Create the account with Deizy's email, or verify her domain
   and set `CONTACT_FROM_EMAIL`.

### 6. Domain
Deizy buys `naileditwithdeizy.com` in her own name. Add it in Vercel > Settings >
Domains, then set `NEXT_PUBLIC_SITE_URL=https://naileditwithdeizy.com`.

## Environment variables

| Name | Needed for |
| --- | --- |
| `NEXT_PUBLIC_KEYSTATIC_PROJECT` | Editing on the live site |
| `SQUARE_ACCESS_TOKEN` | Shop, price list and checkout |
| `SQUARE_LOCATION_ID` | Optional; the first active location is used |
| `SQUARE_ENVIRONMENT` | Optional; `sandbox` for testing |
| `RESEND_API_KEY` | Contact form email |
| `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Optional contact form overrides |
| `NEXT_PUBLIC_SITE_URL` | Sitemap, SEO and checkout return URL once the domain is live |

## Before launch

- [ ] Deizy answers the open questions in `CONTENT-TODO.md`
- [ ] Keystatic Cloud connected and Deizy invited
- [ ] Square token set; items show in the Shop
- [ ] Test purchase with a real card, then refund it in Square
- [ ] Square booking link added in the editor
- [ ] Contact form test message received
- [ ] Domain connected and `NEXT_PUBLIC_SITE_URL` set
- [ ] Analytics (`npm i @vercel/analytics`, add `<Analytics />` to `src/app/layout.tsx`)
- [ ] Footer "Website by Hardy Web Design" linked to your site

## Notes

- **Why /admin needs a patch:** Keystatic hard-codes `/keystatic` as its page address.
  `patches/@keystatic+core+0.6.9.patch` moves its pages to `/admin`, and `npm install`
  reapplies it automatically (the `postinstall` script runs patch-package). The API stays at
  `/api/keystatic`. Old `/keystatic` links redirect to `/admin` (`next.config.ts`), which also
  covers the Keystatic Cloud sign-in callback. If you upgrade `@keystatic/core`, re-create the
  patch: in `node_modules/@keystatic/core/dist`, change the page paths from `/keystatic` to
  `/admin` again, then run `npx patch-package @keystatic/core`.

- `npm audit` reports a `braces` advisory in dev-only tooling (Keystatic's local file
  watcher and ESLint). It doesn't run on the live site.
- Fonts (Bodoni Moda, Figtree) are self-hosted from `@fontsource-variable`.
