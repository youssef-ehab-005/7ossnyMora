const admin = require("firebase-admin");

function getAdminApp() {
  if (admin.apps.length) return admin.app();

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Missing Firebase Admin environment variables.");
  }

  return admin.initializeApp({
    credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Same-origin browser requests only. This is not an authentication boundary;
  // order existence + one-time claim below prevents repeat notifications.
  const origin = req.headers.origin;
  const allowedOrigin = process.env.PUBLIC_SITE_ORIGIN;
  if (allowedOrigin && origin && origin !== allowedOrigin) {
    return res.status(403).json({ error: "Origin not allowed" });
  }

  try {
    const { orderId } = req.body || {};
    if (typeof orderId !== "string" || orderId.length < 1 || orderId.length > 128) {
      return res.status(400).json({ error: "Valid orderId is required" });
    }

    const app = getAdminApp();
    const db = admin.firestore();
    const orderRef = db.collection("orders").doc(orderId);
    const orderSnap = await orderRef.get();

    if (!orderSnap.exists) return res.status(404).json({ error: "Order not found" });

    const order = orderSnap.data() || {};
    if (order.notificationSentAt || order.notificationClaimedAt) {
      return res.status(200).json({ ok: true, skipped: true });
    }

    // Claim this order once, so retries or repeated calls don't create duplicate pushes.
    const claimed = await db.runTransaction(async (tx) => {
      const fresh = await tx.get(orderRef);
      if (!fresh.exists) return false;
      const data = fresh.data() || {};
      if (data.notificationSentAt || data.notificationClaimedAt) return false;
      tx.update(orderRef, { notificationClaimedAt: admin.firestore.FieldValue.serverTimestamp() });
      return true;
    });
    if (!claimed) return res.status(200).json({ ok: true, skipped: true });

    const tokenDocs = await db.collection("adminDevices").where("enabled", "==", true).get();
    const tokens = [...new Set(tokenDocs.docs.map(d => d.get("token")).filter(t => typeof t === "string" && t.length > 20))];

    if (!tokens.length) {
      await orderRef.update({ notificationClaimedAt: admin.firestore.FieldValue.delete() });
      return res.status(409).json({ error: "No admin devices registered for push notifications yet." });
    }

    const customerName = order.customer?.name || order.customerName || "New customer";
    const total = Number(order.total || 0);
    const message = {
      notification: {
        title: "New Hossny order",
        body: `${customerName} placed an order — EGP ${total.toFixed(2)}`,
      },
      data: { type: "new_order", orderId },
      webpush: {
        notification: {
          title: "New Hossny order",
          body: `${customerName} placed an order — EGP ${total.toFixed(2)}`,
          icon: "/assets/favicon.png",
          badge: "/assets/favicon.png",
          tag: `hossny-order-${orderId}`,
          renotify: false,
        },
        fcmOptions: { link: `${process.env.PUBLIC_SITE_ORIGIN || ""}/admin.html?order=${encodeURIComponent(orderId)}` },
      },
    };

    const result = await admin.messaging().sendEachForMulticast({ ...message, tokens });
    await orderRef.update({
      notificationSentAt: admin.firestore.FieldValue.serverTimestamp(),
      notificationSuccessCount: result.successCount,
      notificationFailureCount: result.failureCount,
    });

    // Remove expired tokens so they aren't retried forever.
    const invalidCodes = new Set(["messaging/registration-token-not-registered", "messaging/invalid-registration-token"]);
    const batch = db.batch();
    result.responses.forEach((r, i) => {
      if (!r.success && invalidCodes.has(r.error?.code)) {
        const matching = tokenDocs.docs.find(d => d.get("token") === tokens[i]);
        if (matching) batch.delete(matching.ref);
      }
    });
    await batch.commit();

    return res.status(200).json({ ok: true, successCount: result.successCount, failureCount: result.failureCount });
  } catch (error) {
    console.error("send-order-notification failed", error);
    return res.status(500).json({ error: "Unable to send order notification" });
  }
};
