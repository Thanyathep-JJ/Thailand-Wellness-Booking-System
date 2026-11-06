# Wellness Pass: Thailand Wellness Booking (prototype)

A bilingual (Thai / English) demo website for booking wellness experiences in Thailand: Thai massage, spa, yoga, Muay Thai fitness, herbal steam and retreats in Bangkok, Chiang Mai and Phuket.

Visitors can answer a 3-question quiz to get matched treatments, filter and sort the catalogue, pick a length, date, time slot and guests, fill in their details (with optional, consent-based health notes), and go through a simulated checkout with card or PromptPay.

> Demo only: every venue, price, time slot and policy is sample content, and no payment is taken.

## Run it

Open `index.html` in a browser. No install or build step is needed.

## Pages

| Page | File | Script |
|---|---|---|
| Home: hero search, categories, quiz, FAQ | `index.html` | `js/home.js` |
| All treatments: filters, sort | `treatments.html` | `js/treatments.js` |
| Treatment detail: date, time, guests | `detail.html?id=<treatment id>` | `js/detail.js` |
| Booking details: contact and health form | `booking.html` | `js/booking.js` |
| Payment | `checkout.html` | `js/checkout.js` |
| Booking result | `success.html` | `js/success.js` |

## Project structure

```
css/style.css        colours, spacing and page layouts
css/components.css   buttons, cards, quiz, badges, form fields
js/data.js           treatment catalogue, prices, time slots, photos, helper functions
js/ui.js             reusable HTML pieces (icons, buttons, cards, form fields)
js/common.js         header, footer, language switch, saving booking state between pages
js/<page>.js         one script per page
images/              photos (see images/README.md for what each file is)
original/            the original single-file prototype, kept for reference
```

Booking choices are passed between pages with `sessionStorage`, so they are cleared when the browser tab is closed. The language choice is remembered with `localStorage`.

## Editing

- **Treatments, prices, durations:** the `T` list at the top of `js/data.js`.
- **Photos:** replace a file in `images/` and keep its name, e.g. `muay-thai-1.jpg` is the Muay Thai card photo.
- **Page text (Thai and English):** the `TEXT` object at the top of each page script.

## Deploy

The site is static, so any static host works. On Vercel: import this repository, set **Framework Preset** to **Other**, leave the build settings empty and deploy.
