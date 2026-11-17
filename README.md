# Restaurant Ordering App

A small restaurant ordering app built as a study project. It lets you browse a sample menu, add dishes to an order, remove them, see the total, and enter details to complete the demo checkout.

This is a front-end learning project: it does not process payments or send orders to a restaurant.

## Features

- Renders menu items from a JavaScript data array.
- Adds selected dishes to an order and updates the total.
- Removes dishes from the order.
- Shows a checkout form and a personalized order confirmation.

## Run locally

You’ll need [Node.js](https://nodejs.org/) and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal. You can also use `npm start` to start the development server.

To create and preview a production build:

```sh
npm run build
npm run preview
```

## Project files

- `index.html` — page structure and checkout form.
- `index.js` — menu rendering and order interactions.
- `data.js` — sample menu items.
- `index.css` — page styling.
- `vite.config.js` — Vite configuration.
