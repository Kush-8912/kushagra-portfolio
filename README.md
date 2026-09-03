# Kushagra Aggarwal — Portfolio

Personal portfolio site, built with Next.js and a dark/light theme that switches with a circular wipe transition.

**Live:** [kushagra-aggarwal.vercel.app](https://kushagra-aggarwal.vercel.app/)

## Features

- **Hero** — typewriter name reveal over an animated particle field (Three.js / react-three-fiber)
- **Projects, Journey, Skills** sections with scroll-triggered Framer Motion animations
- **Dark / light theme toggle** using the View Transitions API for a circle-wipe effect, resolved server-side from a cookie so there's no flash on load
- **Contact form** — submissions are stored in Supabase and trigger a thank-you email to the sender plus a notification email (via Gmail SMTP)
- **Fully responsive** — mobile nav menu, adaptive layouts down to 320px
- Smooth scrolling via Lenis, section transitions, custom cursor

## Tech stack

Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion · Three.js / React Three Fiber · Supabase · Nodemailer

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

The contact form needs Supabase and Gmail credentials to work. Copy `.env.example` to `.env.local` and fill in:

```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
GMAIL_USER=
GMAIL_APP_PASSWORD=
```

See `supabase/contact_messages.sql` for the table schema — run it in your Supabase project's SQL editor before testing the form.

## Deployment

Deployed on [Vercel](https://vercel.com), auto-deploying from the `main` branch. The same four environment variables above need to be set in the Vercel project settings for the contact form to work in production.
