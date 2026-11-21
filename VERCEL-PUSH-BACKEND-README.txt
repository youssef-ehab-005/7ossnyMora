HOSSNY VERCEL PUSH BACKEND — STARTER

This adds /api/send-order-notification.js and firebase-admin dependency.

Important current status:
- This is the server-side sending endpoint scaffold.
- It expects orders to exist in Firestore at orders/{orderId}.
- It expects admin FCM device tokens in collection adminDevices with fields:
    token: string
    enabled: true
- The current storefront still needs its order-create flow wired to call this endpoint.
- Admin device-token registration and the service worker also still need to be implemented.
- Therefore, push notifications are NOT active just by deploying this starter.

Vercel Environment Variables (Production, Preview, Development as needed):
FIREBASE_PROJECT_ID
FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY
PUBLIC_SITE_ORIGIN

Never commit .env files or service-account JSON to GitHub. Keep FIREBASE_PRIVATE_KEY only in Vercel.
The private key value should be the full PEM key; Vercel stores it as a multiline secret. The endpoint normalizes escaped \\n as well.

Deploy:
1. Upload project files to GitHub, preserving folder structure.
2. Ensure package.json is at the repository root (same level as index.html).
3. Deploy to Vercel.
4. Add the four environment variables in Vercel and redeploy.
5. Do not test the endpoint until order writes and device registration are implemented.
