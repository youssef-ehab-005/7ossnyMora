# HOSSNY® Streetwear — GitHub Pages

Organized static storefront built from the original HOSSNY HTML design.

## Project structure

```text
HOSSNY/
├── index.html
├── admin.html
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   └── admin.css
│   └── js/
│       ├── app.js
│       └── admin.js
├── .nojekyll
└── README.md
```

## Run locally
Open `index.html` in a browser. No build tools, npm packages, or backend are required.

## Deploy to GitHub Pages
1. Upload the complete folder contents to the root of a GitHub repository.
2. Open **Settings → Pages**.
3. Select **Deploy from a branch**.
4. Choose branch `main` and folder `/ (root)`, then Save.
5. Open the published Pages URL after deployment completes.

## Current demo behavior
- Storefront, categories, product detail modal, sizes, cart, wishlist.
- Demo admin can add/delete products.
- Product changes are saved to the current browser's LocalStorage.
- Checkout is a front-end demo only; it does not save real orders or process payments.

## Firebase phase
Firebase integration will be added later in a separate configuration/module structure, while keeping the storefront design unchanged.

## Admin page
Open `admin.html` or click **ADMIN** in the storefront footer. It supports adding, editing, searching and deleting products using the same `hossnyProducts` LocalStorage key as the storefront. This is a demo only; there is no secure login or cross-device sync until Firebase is connected.

## Customer details (demo)
The checkout demo now collects customer name, phone, optional email, and delivery address. Submitted demo orders are stored in the same browser's LocalStorage. The Admin page shows customer records, order counts, total spend, and order history. This data is local to the browser and is not a real shared customer database until Firebase is connected.

## Appearance and language
The shared top-right controls switch between light/dark themes and English/Arabic. The selected settings are saved in LocalStorage and apply to both storefront and admin pages. Brand name HOSSNY remains unchanged.

## Category and homepage editor
- Admin can add, rename, and delete product categories; categories become available in the product editor and storefront filters.
- Categories cannot be deleted while products still use them; reassign those products first.
- Admin can edit hero headline, description, button, background image, collection heading, and promotional banner text/image.
- Admin can add multiple custom homepage sections with a title, description, image URL, and optional button.
- These settings are currently stored in this browser's LocalStorage demo store. For changes to appear across devices and customers, connect Firebase in the next phase.

## Admin dashboard layout and order images
The admin page now uses a sidebar navigation (Dashboard, Products, Categories, Orders, Customers, Homepage). The sidebar follows page direction: left in English and right in Arabic. Orders display customer details, product thumbnails, sizes, quantities, totals, and editable fulfillment status. New checkout orders save each product image URL with the order item. Existing older orders attempt to retrieve the image from the current product catalogue.

## Customer order confirmation and tracking
- After checkout, the storefront displays an Order Confirmed view with the new order number and a Track Order action.
- Customers can open My Orders and look up orders using the checkout phone number, or track one order using its order ID plus phone number.
- Tracking reflects the same order status values edited by the admin: Pending, Processing, Shipped, Delivered, and Cancelled.
- Product thumbnails, size, quantity, price, and order total are shown in the customer order views.
- IMPORTANT: this GitHub Pages build stores orders in browser LocalStorage for demo/testing only. Customers on different devices cannot see shared orders until Firebase/Firestore and secure customer verification are connected.

## Delete orders
The Orders admin view includes a DELETE ORDER action on each order. It asks for confirmation, then removes the selected order from the browser's `hossnyOrders` LocalStorage collection and refreshes the order list, customer summary, dashboard recent orders, and order count. This is local-demo deletion; when Firebase is connected, the same action must be implemented with authenticated Firestore delete permissions.

## Hossny brand identity
Visible storefront and admin branding now uses the mixed-case “Hossny” wordmark. The admin sidebar uses an orange square H monogram, white Hossny wordmark, orange registered mark, and CONTROL CENTER subtitle based on the supplied visual reference.

## Footer wordmark visibility fix
The footer Hossny logo now has an explicit high-specificity style so generic footer-link typography and theme color overrides cannot shrink or hide the wordmark. It stays warm white with an orange registered mark in both themes.


## Contact Us + WhatsApp order confirmation
- Admin → Contact Us lets the store owner edit WhatsApp, phone numbers, email, address, working hours, Maps, and social links.
- Storefront footer links to a Contact Us section populated from the saved contact settings.
- After a checkout order is saved, the storefront opens WhatsApp with a pre-filled order confirmation message addressed to the configured WhatsApp number. The customer must press Send.
- Contact settings currently use LocalStorage and are shared only within the same browser profile/origin.

## Live order updates and notifications (pre-Firebase stage)
- Admin listens for LocalStorage changes from other tabs on the same browser/origin and refreshes order lists without manual reload.
- Admin can request browser notification permission and receives a notification for new orders created in another same-browser tab while the admin page is open.
- This is NOT cross-device or background push yet. Firestore real-time listeners and Firebase Cloud Messaging will be connected in the next phase after the Firebase project config and security rules are ready.

## Firebase scaffold
- `firebase/firebase-config.example.js` and `firebase/firebase-client.js` are starter files for the next Firebase phase.
- `firebase-messaging-sw.js` is a placeholder and does not send push notifications yet.

## Hossny browser tab icon
Added a branded Hossny favicon: orange square with a dark H monogram, matching the supplied logo reference. Both storefront and admin pages use SVG favicon with PNG and Apple touch icon fallbacks. The favicon URL includes a version query to help bypass stale browser cache.
