# NIG Admin — native review app

A small Expo (React Native) Android app to review the news pipeline's drafts
and **publish/reject with one tap**, plus push notifications when new drafts
are ready.

It talks to the live backend at `https://newindiagovernment.com` (Payload
auth + the `/api/admin/news-review` and `/api/admin/register-push` endpoints).

## What it does
- **Login** with your admin email/password (the same `/admin` credentials).
- **Review Queue**: all `drafted` news items, colour-coded by verdict.
- **Draft detail**: title, excerpt, verdict, source, confidence.
- **Publish** (goes live on the site) or **Reject** — one tap.
- Registers an **Expo push token** so the daily pipeline can notify you.

## Run it in 5 minutes (Expo Go — no build needed)
```bash
cd admin-app
npm install
npx expo start
```
Then open **Expo Go** on your Android phone and scan the QR code. Log in. Done.
(Push notifications need a real build — see below — but everything else works
in Expo Go immediately.)

## Build an installable .apk
You need a free **Expo account** (this is your credential — I can't create it
for you).
```bash
cd admin-app
npm install -g eas-cli
eas login                     # sign in / sign up (free)
eas build:configure           # creates the project + projectId
eas build -p android --profile preview
```
EAS builds in the cloud and gives you a **download link for the .apk**.
Sideload it on your phone, or distribute via the link. (A Play Store listing
is optional and costs a one-time $25.)

> After `eas build:configure`, copy the generated `projectId` into
> `app.json → expo.extra.eas.projectId` so push tokens resolve correctly.

## Assets
Add an `assets/icon.png` (1024×1024) before building, or remove the `icon`/
`adaptiveIcon` lines from `app.json` to use Expo defaults.

## Config
The API base is in `app.json → expo.extra.apiBase`. Point it elsewhere for a
staging backend if needed.
