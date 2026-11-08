# Images

Web-sized copies of the photos in `data/pictures` (JPEG, max 1600 px wide).
The site builds each photo's path from its folder and number, so to swap a photo, replace the file and keep its name.

| Folder | What's in it |
|---|---|
| `hero/` | Home page slideshow (`hero-N.jpg`) |
| `cities/` | Home page city cards (`city-<city>-N.jpg`) |
| `treatments/<treatment id>/` | One folder per treatment: `1.jpg` is the card and main detail photo, `2.jpg` and `3.jpg` are the two smaller detail photos |
| `site/` | Link preview image and iPhone home-screen icon |

Every treatment has its own three photos. Some treatments that were added later started with copies of another treatment's photos (marked "copy of" below). Replacing a copy changes only that treatment.
A new treatment needs a folder named after its `id` in `js/core/data.js`, with `1.jpg`, `2.jpg` and `3.jpg`.

| File | Used for | Original file in `data/pictures` |
|---|---|---|
| hero/hero-1.jpg | Home slideshow 1 | home_page1.png |
| hero/hero-2.jpg | Home slideshow 2 | home_page2.png |
| hero/hero-3.jpg | Home slideshow 3 | home_page3.png |
| treatments/thai-traditional/1.jpg | Traditional Thai massage: card + main photo | thai_massage_main.png |
| treatments/thai-traditional/2.jpg | Traditional Thai massage: detail photo | thai_massage_main3.png |
| treatments/thai-traditional/3.jpg | Traditional Thai massage: detail photo | Thai_massage_(2362463368).jpg |
| treatments/herbal-compress/1.jpg | Herbal compress & aroma oil: card + main photo | herbal_compress_ball_main.jpg |
| treatments/herbal-compress/2.jpg | Herbal compress & aroma oil: detail photo | herbal_compress_ball2.png |
| treatments/herbal-compress/3.jpg | Herbal compress & aroma oil: detail photo + Home spotlight | herbal_compress_ball3.png |
| treatments/foot-reflexology/1.jpg | Foot reflexology: card + main photo | foot_massage3.png |
| treatments/foot-reflexology/2.jpg | Foot reflexology: detail photo | Foot-Massage-2.png |
| treatments/foot-reflexology/3.jpg | Foot reflexology: detail photo | feet_massage2.png |
| treatments/sunrise-yoga/1.jpg | Sunrise yoga by the sea: card + main photo | yoga3.png |
| treatments/sunrise-yoga/2.jpg | Sunrise yoga by the sea: detail photo + Treatments page banner | treatment_pic.png |
| treatments/sunrise-yoga/3.jpg | Sunrise yoga by the sea: detail photo | yoga.jpg |
| treatments/muay-thai/1.jpg | Muay Thai fitness session: card + main photo | muay_thai_main.webp |
| treatments/muay-thai/2.jpg | Muay Thai fitness session: detail photo | muay_thai2.png |
| treatments/muay-thai/3.jpg | Muay Thai fitness session: detail photo | The-Complete-Muay-Thai-Beginners-Guide.png |
| treatments/in-hotel-aroma/1.jpg | In-hotel aromatherapy: card + main photo | aroma_mas_main.png |
| treatments/in-hotel-aroma/2.jpg | In-hotel aromatherapy: detail photo | aroma_mas3.png |
| treatments/in-hotel-aroma/3.jpg | In-hotel aromatherapy: detail photo | aroma_mas2.png |
| treatments/herbal-steam/1.jpg | Herbal steam & hot spring soak: card + main photo | water_main.png |
| treatments/herbal-steam/2.jpg | Herbal steam & hot spring soak: detail photo | water3.png |
| treatments/herbal-steam/3.jpg | Herbal steam & hot spring soak: detail photo | water2.png |
| treatments/deep-stretch/1.jpg | Deep tissue & stretch: card + main photo | massage_point3.png |
| treatments/deep-stretch/2.jpg | Deep tissue & stretch: detail photo | relaxation-woman-back-massage-with-masseur-in-cosmetology-spa-centre.png |
| treatments/deep-stretch/3.jpg | Deep tissue & stretch: detail photo | thai_massage2.png |
| treatments/mindful-retreat/1.jpg | One-day mindful retreat: card + main photo | Panviman_Spa_Resort_(12659454673).jpg |
| treatments/mindful-retreat/2.jpg | One-day mindful retreat: detail photo | Panviman_Spa_Resort_(12659522433).jpg |
| treatments/mindful-retreat/3.jpg | One-day mindful retreat: detail photo | Doi_Inthanon,_Stream_in_the_mountains,_Thailand.jpg |
| treatments/temple-massage/1.jpg | Old-town Thai massage: card + main photo | Wat_Pho_Bangkok_Thailand.jpg |
| treatments/temple-massage/2.jpg | Old-town Thai massage: detail photo | copy of `treatments/thai-traditional/2.jpg` |
| treatments/temple-massage/3.jpg | Old-town Thai massage: detail photo | copy of `treatments/deep-stretch/3.jpg` |
| treatments/park-yoga/1.jpg | Morning yoga in the park: card + main photo | bangkok_view2.png |
| treatments/park-yoga/2.jpg | Morning yoga in the park: detail photo | copy of `treatments/sunrise-yoga/3.jpg` |
| treatments/park-yoga/3.jpg | Morning yoga in the park: detail photo | copy of `treatments/sunrise-yoga/1.jpg` |
| treatments/street-foot-massage/1.jpg | Old City foot massage: card + main photo | Chiangmai_foot_massage.JPG |
| treatments/street-foot-massage/2.jpg | Old City foot massage: detail photo | copy of `treatments/foot-reflexology/2.jpg` |
| treatments/street-foot-massage/3.jpg | Old City foot massage: detail photo | copy of `treatments/foot-reflexology/3.jpg` |
| treatments/sunset-stretch/1.jpg | Sunset stretch & breathwork: card + main photo | kata_beach.jpg |
| treatments/sunset-stretch/2.jpg | Sunset stretch & breathwork: detail photo | copy of `treatments/sunrise-yoga/2.jpg` |
| treatments/sunset-stretch/3.jpg | Sunset stretch & breathwork: detail photo | copy of `treatments/sunrise-yoga/3.jpg` |
| treatments/couples-spa/1.jpg | Couples spa package: card + main photo | copy of `treatments/in-hotel-aroma/2.jpg` |
| treatments/couples-spa/2.jpg | Couples spa package: detail photo | copy of `treatments/herbal-compress/2.jpg` |
| treatments/couples-spa/3.jpg | Couples spa package: detail photo | copy of `treatments/in-hotel-aroma/3.jpg` |
| treatments/beach-thai-massage/1.jpg | Beachside Thai massage: card + main photo | copy of `treatments/thai-traditional/3.jpg` |
| treatments/beach-thai-massage/2.jpg | Beachside Thai massage: detail photo | copy of `treatments/deep-stretch/3.jpg` |
| treatments/beach-thai-massage/3.jpg | Beachside Thai massage: detail photo | copy of `treatments/thai-traditional/1.jpg` |
| treatments/doi-nature-retreat/1.jpg | Doi Inthanon nature day retreat: card + main photo | copy of `treatments/mindful-retreat/3.jpg` |
| treatments/doi-nature-retreat/2.jpg | Doi Inthanon nature day retreat: detail photo | copy of `cities/city-chiangmai-1.jpg` |
| treatments/doi-nature-retreat/3.jpg | Doi Inthanon nature day retreat: detail photo | copy of `treatments/herbal-steam/2.jpg` |
| cities/city-bangkok-1.jpg | Home: Bangkok city card | bangkok_view.png |
| cities/city-chiangmai-1.jpg | Home: Chiang Mai city card | Chiangmai_view.jpg |
| cities/city-phuket-1.jpg | Home: Phuket city card | phuket_view.webp |
| site/og-cover.jpg | Link preview image (LINE, Facebook) | made from hero-1.jpg |
| site/apple-touch-icon.png | iPhone home-screen icon | made for the site |
