# Firebase integration (next phase)

This repository is prepared for Firebase but does not connect to a Firebase project yet.

- Copy `firebase-config.example.js` to `firebase-config.js` and fill it from Firebase Console → Project settings → Your apps → Web app.
- Enable Cloud Firestore and Firebase Authentication.
- Configure Firestore Security Rules so customers can only read their own orders and only authenticated admins can update/delete orders or edit store settings.
- For cross-device live order updates, use Firestore `onSnapshot`.
- For push notifications when the admin page is closed, add Firebase Cloud Messaging, a VAPID key, and a service worker. Push delivery requires a trusted server/Cloud Function to send messages after an order is created.
- Never commit Firebase Admin SDK service-account private keys to GitHub.
