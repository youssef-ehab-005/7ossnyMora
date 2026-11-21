# HOSSNY® Streetwear — GitHub Pages Demo

This is the standalone, no-build version of the HOSSNY storefront.
It is designed to run directly on GitHub Pages without Firebase or a backend.

## Included features
- Responsive storefront and product categories
- Product details and size selection
- Shopping cart and wishlist
- Demo checkout form
- Demo admin panel for adding and deleting products

## Publish on GitHub Pages
1. Create a new GitHub repository, for example `hossny-store`.
2. Upload `index.html`, `.nojekyll`, and this `README.md` to the repository root.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then click **Save**.
6. Wait for the Pages deployment, then open the URL shown in Settings → Pages.

No npm, build command, environment variables, or Firebase setup is required for this first demo.

## Important demo limitations
- The admin panel is a front-end demo, not a secure administrator system.
- Added/deleted products are stored in the current browser's LocalStorage only.
- Products and cart data are not shared between visitors or devices.
- Checkout does not submit or save a real customer order.
- Do not collect real customer details or accept real payments in this demo.

## Next phase: Firebase
After confirming the GitHub Pages site works, connect:
- Firebase Authentication for admin login
- Cloud Firestore for products and customer orders
- Firebase Storage for product images
- Firestore and Storage Security Rules to protect admin operations and customer orders

The site is plain HTML/CSS/JavaScript, so Firebase can be added without introducing a framework or changing the visual design.
