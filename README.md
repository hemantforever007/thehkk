# thehkk.com

Personal portfolio + app pages (privacy policy & support) for my iOS apps,
hosted on GitHub Pages at [thehkk.com](https://thehkk.com).

## Structure

```
/                        Portfolio (about, skills, contact)
/apps/                   All apps
/apps/<app>/             App page
/apps/<app>/privacy/     Privacy policy  → use in App Store Connect
/apps/<app>/support/     Support page    → use in App Store Connect
```

URLs for App Store Connect (don't change these once submitted):

| App | Privacy policy URL | Support URL |
|---|---|---|
| Panchang | `https://thehkk.com/apps/panchang/privacy/` | `https://thehkk.com/apps/panchang/support/` |
| FastRing | `https://thehkk.com/apps/fastring/privacy/` | `https://thehkk.com/apps/fastring/support/` |
| Worth    | `https://thehkk.com/apps/worth/privacy/`    | `https://thehkk.com/apps/worth/support/`    |
| GymLoop  | `https://thehkk.com/apps/gymloop/privacy/`  | `https://thehkk.com/apps/gymloop/support/`  |
| Vastu    | `https://thehkk.com/apps/vastu/privacy/`    | `https://thehkk.com/apps/vastu/support/`    |
| Lagna    | `https://thehkk.com/apps/lagna/privacy/`    | `https://thehkk.com/apps/lagna/support/`    |
| Nakshatra | `https://thehkk.com/apps/nakshatra/privacy/` | `https://thehkk.com/apps/nakshatra/support/` |
| Staff Book | `https://thehkk.com/apps/staffbook/privacy/` | `https://thehkk.com/apps/staffbook/support/` |

## Design system

All styling lives in `assets/site.css`, ported from the Claude Design project
"theHKK Apps". The whole palette derives from `--ink` and `--paper`; dark mode
only swaps those (and their `-rgb` companions), so every border and muted tone
follows automatically. Per-app accents are set inline on `<body>`:

```html
<body style="--accent-l:oklch(.6 .15 55);--accent-d:oklch(.78 .13 65);
             --tint-l:oklch(.95 .03 65);--tint-d:oklch(.3 .04 65);">
```

`-l` is used in light mode, `-d` in dark. App cards carry the same pair as
`--ca-l` / `--ca-d`. Scripts: `theme.js` (toggle, all pages), `apps.js` (nav
switcher, `/apps/` pages), `home.js` (stat count-up + terminal, home only),
`consent.js` (cookie banner + GA4, home/apps-hub/app pages only).

### Analytics

`consent.js` shows a cookie banner and loads Google Analytics (GA4) only
after the visitor clicks Accept; Decline (or ignoring the banner) means no
script ever loads. The Measurement ID lives in a constant at the top of the
file — swap `GA_MEASUREMENT_ID` in `assets/consent.js` for the real one from
analytics.google.com.

It's included on the homepage, the apps hub, and each app's own page, but
deliberately **not** on any `/privacy/` or `/support/` page — those pages
promise "zero analytics, zero tracking" and should stay that way.

### Marking an app as live

Apps awaiting review show `<span class="status-pill">Coming soon</span>` and a
"Tell me when it ships" mailto. When one goes live, in `/apps/<app>/index.html`:

1. Add `is-live` to the status pill and change its text to "On the App Store".
2. Swap the primary button's `href` for a country-agnostic App Store link:
   `https://apps.apple.com/app/<slug>/id<numeric-id>`.
3. Do the same for that app's card in `apps/index.html` and `index.html`, and
   add `is-live` to its `.sw-dot` in every switcher (each `/apps/` page has one).

### Dropping in real screenshots

The phone frames are typographic placeholders. Each one has a comment showing
the swap — replace the `.phone-caption` div with an `<img>` and the frame will
crop it correctly.

## Preview locally

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

(Opening the files directly with `file://` won't work because the site uses
root-relative paths like `/assets/style.css`.)

## Deploy (one-time setup)

1. Create a **public** repo on GitHub (e.g. `thehkk`) and push this folder to it.
2. In the repo: **Settings → Pages** → Source: *Deploy from a branch* →
   Branch: `main`, folder `/ (root)`.
3. Still in Pages settings, set **Custom domain** to `thehkk.com`
   (the `CNAME` file in this repo keeps it set across deploys).
4. At your DNS provider for `thehkk.com`:
   - Apex `thehkk.com` → **A records**: `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - `www` → **CNAME**: `hemantforever007.github.io`
5. Once DNS propagates, tick **Enforce HTTPS** in the Pages settings.

After setup, every push to `main` deploys automatically.

## Before submitting URLs to Apple

- [ ] Search the site for `TODO` comments and fill in real content.
- [ ] Verify each privacy policy matches what the app *actually* does
      (location, notifications, HealthKit, analytics, etc.) and matches the
      App Store privacy questionnaire answers.
- [ ] Add real App Store links to the app pages once the apps are live.
