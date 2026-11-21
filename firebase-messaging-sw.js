// Firebase Cloud Messaging service worker placeholder.
// It will be activated after Firebase config + VAPID key + server-side sender are configured.
// Do not add service-account secrets to this file.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", event => event.waitUntil(self.clients.claim()));
