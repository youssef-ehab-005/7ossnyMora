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
