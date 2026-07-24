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

Apps still awaiting review show a "Coming soon" badge instead of a download
button. When one goes live, replace that badge in `/apps/<app>/index.html`
with a country-agnostic App Store link:
`https://apps.apple.com/app/<slug>/id<numeric-id>`

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
