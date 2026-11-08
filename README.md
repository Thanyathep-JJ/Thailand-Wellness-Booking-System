# Wellness Pass: Thailand Wellness Booking (prototype)

A bilingual (Thai / English) demo website for booking wellness experiences in Thailand: Thai massage, spa, yoga, Muay Thai fitness, herbal steam and retreats in Bangkok, Chiang Mai and Phuket.

Visitors can answer a 3-question quiz to get matched treatments, browse by category or city, read reviews, save treatments to a wishlist, pick a length, date, time slot and guests, fill in their details (with optional, consent-based health notes), pay by card or PromptPay, and then manage or cancel the booking. A venue dashboard shows the venue side: confirming or declining booking requests.

> Demo only: every venue, price, review, time slot and policy is sample content, and no payment is taken. Bookings are saved in the visitor's own browser.

## Run it

Open `index.html` in a browser. No install or build step is needed. (The venue maps and the font need an internet connection.)

## Pages

| Page | File | Script |
|---|---|---|
| Home: hero search, categories, cities, quiz, FAQ | `index.html` | `js/pages/home.js` |
| All treatments: filters, sort (`?cat=` / `?city=`) | `pages/treatments.html` | `js/pages/treatments.js` |
| Treatment detail: photos, reviews, venue map, date and time | `pages/detail.html?id=<treatment id>` | `js/pages/detail.js` |
| Booking details: contact and health form | `pages/booking.html` | `js/pages/booking.js` |
| Payment: card form or PromptPay QR | `pages/checkout.html` | `js/pages/checkout.js` |
| Booking result: reference, print, email preview | `pages/success.html` | `js/pages/success.js` |
| Wishlist | `pages/wishlist.html` | `js/pages/wishlist.js` |
| My bookings: find, view, cancel | `pages/mybookings.html` | `js/pages/mybookings.js` |
| Venue dashboard (demo): confirm / decline requests | `pages/venue.html` | `js/pages/venue.js` |
| FAQ, Cancellation policy, Terms, Privacy, Contact | `pages/faq.html`, `policy.html`, `terms.html`, `privacy.html`, `contact.html` | `js/pages/info.js` |

## Trying the demo

- **Test cards:** `4242 4242 4242 4242` pays successfully; `4000 0000 0000 0002` is declined. Use any future expiry date and any 3-digit CVC.
- **PromptPay:** the QR code is a sample with a 10-minute timer; press "I've paid" to continue.
- **Request bookings:** in-hotel aromatherapy and the two retreats wait for the venue. Open the venue dashboard (footer link) to confirm or decline, then check My bookings.
- **Sample data:** the venue dashboard can add 5 sample bookings or reset all demo data.

## Project structure

```
index.html                home page (stays at the top level so the site opens at its main address)
pages/*.html              all other pages
css/style.css             colours, spacing and page layouts
css/components.css        buttons, cards, quiz, badges, form fields
css/extras.css            wishlist, reviews, payment, bookings, dashboard, info pages, dialogs, toasts, print
js/core/data.js           treatments, venues, reviews, prices, time slots, booking rules, photos, helper functions
js/core/ui.js             reusable HTML pieces (icons, buttons, cards, stars, form fields)
js/core/common.js         header, footer, language, saved state, toasts, dialogs, booking store
js/pages/<page>.js        one script per page
images/                   photos: hero/, cities/, treatments/<id>/ and site/ (see images/README.md)
favicon.svg               site icon
original/prototype.html   the original single-file prototype, kept for reference
```

Every page except `index.html` lives in `pages/` and sets `<body data-root="../">`. Links shared by several pages (header, footer, photos) go through `WPData.url()` / `WP.url()` in `js/core/data.js`, which adds the right folder for the page that is open. Links between pages inside `pages/` are plain file names.

Booking-in-progress choices are passed between pages with `sessionStorage`. The language, wishlist and finished demo bookings are kept with `localStorage`. Health details are never saved with a booking.

## Editing

- **Treatments, prices, durations, start times:** the `T` list at the top of `js/core/data.js`.
- **Venues, reviews, booking rules (cancellation hours, max guests…):** `venues`, `reviewPool` and `policy` in `js/core/data.js`.
- **Photos:** each treatment has a folder in `images/treatments/<treatment id>/` with `1.webp` (card and main photo), `2.webp` and `3.webp` (WebP format). To swap a photo, replace the file and keep its name. Home page photos are in `images/hero/` and `images/cities/`; the icon and link-preview image are in `images/site/`.
- **Page text (Thai and English):** the `TEXT` object at the top of each page script.

## Deploy

The site is static, so any static host works. On Vercel: import this repository, set **Framework Preset** to **Other**, leave the build settings empty and deploy.

After deploying, change `og:image` in each HTML file to the full address (for example `https://your-site.vercel.app/images/site/og-cover.jpg`) so link previews show the image on LINE and Facebook.
