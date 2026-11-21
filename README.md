# HOSSNY® Streetwear — GitHub Pages

Organized static storefront built from the original HOSSNY HTML design.

## Project structure

```text
HOSSNY/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
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
