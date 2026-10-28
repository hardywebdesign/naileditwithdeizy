# Nailed It With Deizy — website

Site for Nailed It With Deizy (hand-painted custom press-on nails), built by
Hardy Web Design with Next.js 16 (App Router), TypeScript and Tailwind CSS v4.

Three systems work together:

| What | Where Deizy changes it |
| --- | --- |
| Colors, seasonal theme, photos, page text, reviews, links | **Admin** at `/admin` (Keystatic) |
| Sets for sale (photos, names, descriptions, prices) | **Gallery** in the editor at `/admin` |
| Consultation bookings | **Calendly** (shown on the Book page) |

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

### 3. Orders (no online checkout)
The Gallery is the shop. Each set has a **Request this set** button that opens the Book
page with the set's name, and the name is passed to Calendly as `a1` (the first
question on her booking form). After the consultation Deizy sends a Square payment
link herself. Old `/shop`, `/bag` and `/thank-you` links redirect to `/gallery`
(`next.config.ts`). Square is only used for her tip link.

### 4. Calendly (consultations)
Deizy books consultations through Calendly: one 15-minute event, every day 9am–9pm, with
Zoom and phone call as location options (Calendly creates a Zoom link for each booking).
Paste the event link in the editor under **Business info and links > Booking link (Calendly)**.
In Calendly, make the event's **first question** "Which set are you interested in?" so the
set someone requested is filled in for them.
The Book page shows it as a calendar right on the page. Any non-Calendly link shows a
"Book now" button instead.


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
| `RESEND_API_KEY` | Contact form email |
| `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Optional contact form overrides |
| `NEXT_PUBLIC_SITE_URL` | Sitemap and SEO once the domain is live |

## Before launch

- [ ] Deizy answers the open questions in `CONTENT-TODO.md`
- [ ] Keystatic Cloud connected and Deizy invited
- [ ] Test "Request this set": the set name appears on the Calendly form
- [ ] Calendly booking link added in the editor
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
