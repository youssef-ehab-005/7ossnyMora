# Hossny Firebase setup

## Config
`firebase-config.js` contains the Firebase Web App client configuration for project `hossny-fea31`.
It is normal for these web-app values to be present in a browser project. Never add a Firebase Admin SDK service-account private key here.

## Admin authentication (implemented)
- `admin.html` loads `admin-auth.js`.
- Only `omarhossny@gmail.com` and `youssefehab@gmail.com` are allowed through the admin sign-in gate.
- Both accounts must exist in Firebase Authentication with Email/Password enabled.
- Firestore Security Rules must also enforce the same allowlist; client-side checks are not a substitute for server-side rules.

## Current limitation
The admin authentication gate is connected, but catalogue, homepage settings, customers and orders still use browser LocalStorage. They are not yet synchronized through Firestore across devices. The next development phase is to migrate those collections to Firestore and use `onSnapshot` for live updates.

## Hosting
Deploy the full repository to GitHub Pages over HTTPS. Firebase Authentication authorized domains must include the exact GitHub Pages host (for example `username.github.io`) in Firebase Console → Authentication → Settings → Authorized domains.
