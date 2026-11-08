/* Wellness Pass: SAMPLE catalogue and helper functions. Venues, prices, slots, reviews and policies are demo content.
   Exposes window.WPData. Loaded before ui.js / common.js / page scripts. */
(function () {
  var cats = [
    { id: "thai", icon: "hand", th: "นวดไทย", en: "Thai massage" },
    { id: "spa", icon: "drop", th: "สปาและอโรมาเทอราพี", en: "Spa & aromatherapy" },
    { id: "yoga", icon: "lotus", th: "โยคะและสมาธิ", en: "Yoga & meditation" },
    { id: "retreat", icon: "moon", th: "รีทรีตเพื่อสุขภาพ", en: "Wellness retreats" },
    { id: "muaythai", icon: "flame", th: "มวยไทยฟิตเนส", en: "Muay Thai fitness" },
    { id: "steam", icon: "leaf", th: "อบสมุนไพรและน้ำแร่", en: "Herbal steam & hot springs" },
    { id: "inhotel", icon: "pin", th: "บริการถึงโรงแรม", en: "In-hotel treatments" }
  ];
  var cities = { bkk: { th: "กรุงเทพฯ", en: "Bangkok" }, cnx: { th: "เชียงใหม่", en: "Chiang Mai" }, hkt: { th: "ภูเก็ต", en: "Phuket" } };
  var intensity = { gentle: { th: "เบา", en: "Gentle" }, medium: { th: "ปานกลาง", en: "Medium" }, deep: { th: "เข้มข้น", en: "Deep / active" } };
  var settings = { spa: { th: "ห้องสปาเงียบสงบ", en: "Quiet spa room" }, nature: { th: "กลางแจ้ง ใกล้ธรรมชาติ", en: "Outdoors, nature" }, home: { th: "ที่ห้องพักของคุณ", en: "At your hotel" } };

  var T = [
    { id: "thai-traditional", cat: "thai", city: "bkk", intensity: "medium", setting: "spa", goals: ["recover", "relax"], icon: "hand",
      title: { th: "นวดไทยแผนโบราณ", en: "Traditional Thai massage" },
      summary: { th: "กดจุดและยืดเหยียดบนเบาะ ปรับแรงนวดตามที่คุณต้องการ", en: "Acupressure and assisted stretching on a floor mat, pressure adjusted to you." },
      about: { th: "นวดไทยแบบดั้งเดิมในชุดผ้าฝ้ายหลวม ๆ นักบำบัดใช้มือ ศอก และเข่า กดจุดตามแนวเส้นและช่วยยืดเหยียด ช่วยให้รู้สึกผ่อนคลายและคลายความตึงของกล้ามเนื้อ", en: "A traditional Thai massage in loose cotton clothes. The therapist uses palms, elbows and knees along the body's lines and guides you through gentle stretches. It helps you relax and eases muscle tension." },
      options: [{ min: 60, price: 900 }, { min: 90, price: 1250 }, { min: 120, price: 1600 }] },
    { id: "herbal-compress", cat: "spa", city: "cnx", intensity: "gentle", setting: "spa", goals: ["relax"], icon: "drop",
      title: { th: "ประคบสมุนไพรและน้ำมันหอมระเหย", en: "Herbal compress & aroma oil" },
      summary: { th: "ลูกประคบสมุนไพรอุ่น ๆ ตามด้วยนวดน้ำมันหอมระเหยอย่างช้า ๆ", en: "Warm luk pra kob herbal compress followed by a slow aromatherapy oil massage." },
      about: { th: "เริ่มด้วยลูกประคบสมุนไพรอุ่น ๆ บนบ่า หลัง และขา แล้วต่อด้วยนวดน้ำมันหอมระเหยจังหวะช้า เหมาะกับวันที่อยากพักจริง ๆ", en: "Warm herbal compresses on shoulders, back and legs, then a slow-rhythm aromatherapy oil massage. Made for days when you want to switch off." },
      options: [{ min: 90, price: 1850 }, { min: 120, price: 2350 }] },
    { id: "foot-reflexology", cat: "thai", city: "bkk", intensity: "gentle", setting: "spa", goals: ["relax"], icon: "leaf",
      title: { th: "นวดฝ่าเท้า", en: "Foot reflexology" },
      summary: { th: "นวดเท้าและน่องด้วยไม้กดจุดและครีมสมุนไพร หลังวันเดินเที่ยวทั้งวัน", en: "Feet and calves with a wooden stick and herbal balm, after a long day on your feet." },
      about: { th: "นั่งเอนบนเก้าอี้นวม นักบำบัดนวดเท้าและน่องด้วยไม้กดจุดและครีมสมุนไพร ใช้เวลาไม่นาน เหมาะเป็นช่วงพักระหว่างวัน", en: "Relax in a reclining chair while the therapist works on feet and calves with a wooden stick and herbal balm. Short and easy to fit into a day." },
      options: [{ min: 45, price: 500 }, { min: 60, price: 600 }] },
    { id: "sunrise-yoga", slots: ["06:30", "07:30", "09:00"], cat: "yoga", city: "hkt", intensity: "gentle", setting: "nature", goals: ["energize", "relax"], icon: "sun",
      title: { th: "โยคะยามเช้าริมทะเล", en: "Sunrise yoga by the sea" },
      summary: { th: "คลาสโยคะกลุ่มเล็กบนลานไม้ริมหาด เริ่มต้นวันแบบสดชื่น", en: "Small-group yoga on a wooden deck by the beach to start your day fresh." },
      about: { th: "คลาสหฐะโยคะสำหรับทุกระดับ เน้นการหายใจและการยืดเหยียด จัดบนลานไม้ใกล้ชายหาด มีเสื่อและน้ำดื่มให้", en: "An all-levels hatha class focused on breathing and stretching, held on a wooden deck near the beach. Mats and water are provided." },
      options: [{ min: 60, price: 700 }, { min: 90, price: 950 }] },
    { id: "muay-thai", slots: ["07:00", "09:00", "15:00", "17:00", "18:30"], cat: "muaythai", city: "hkt", intensity: "deep", setting: "nature", goals: ["energize"], icon: "flame",
      title: { th: "มวยไทยเพื่อสุขภาพ", en: "Muay Thai fitness session" },
      summary: { th: "เรียนท่าพื้นฐาน ชกเป้า และคาร์ดิโอ กับครูมวยแบบตัวต่อตัวหรือกลุ่มเล็ก", en: "Basic technique, pad work and cardio with a trainer, one-to-one or in a small group." },
      about: { th: "เรียนท่าพื้นฐานของมวยไทย ฝึกชกเป้ากับครู และจบด้วยการยืดเหยียด ไม่ต้องมีประสบการณ์มาก่อน มีนวมและผ้าพันมือให้", en: "Learn Muay Thai basics, work the pads with a trainer and finish with a stretch. No experience needed; gloves and hand wraps provided." },
      options: [{ min: 60, price: 1200 }, { min: 90, price: 1600 }] },
    { id: "in-hotel-aroma", cat: "inhotel", city: "bkk", intensity: "gentle", setting: "home", goals: ["relax"], icon: "pin", travelFee: 300, request: true,
      title: { th: "อโรมาเทอราพีถึงห้องพัก", en: "In-hotel aromatherapy" },
      summary: { th: "นักบำบัดนำเตียงพับและน้ำมันหอมระเหยมาที่ห้องพักของคุณ", en: "A therapist brings a folding table and aroma oils to your hotel room." },
      about: { th: "นวดน้ำมันหอมระเหยในห้องพักของคุณ นักบำบัดนำอุปกรณ์มาเอง สถานที่จะยืนยันการจองภายใน 12 ชั่วโมง", en: "An aromatherapy oil massage in your own room. The therapist brings everything. The venue confirms your request within 12 hours." },
      options: [{ min: 60, price: 1900 }, { min: 90, price: 2200 }, { min: 120, price: 2800 }] },
    { id: "herbal-steam", cat: "steam", city: "cnx", intensity: "gentle", setting: "nature", goals: ["relax", "recover"], icon: "leaf",
      title: { th: "อบสมุนไพรและแช่น้ำแร่", en: "Herbal steam & hot spring soak" },
      summary: { th: "อบไอน้ำสมุนไพรไทย แล้วแช่บ่อน้ำแร่กลางสวน", en: "Thai herbal steam, then a soak in a garden mineral pool." },
      about: { th: "อบไอน้ำที่ต้มด้วยตะไคร้ ไพล และขมิ้น สลับกับพักดื่มชาสมุนไพร แล้วแช่บ่อน้ำแร่กลางสวน", en: "Steam infused with lemongrass, plai and turmeric, breaks with herbal tea, then a soak in a mineral pool in the garden." },
      options: [{ min: 60, price: 950 }, { min: 90, price: 1300 }] },
    { id: "deep-stretch", cat: "thai", city: "hkt", intensity: "deep", setting: "spa", goals: ["recover"], icon: "hand",
      title: { th: "นวดกดจุดลึกและยืดเหยียด", en: "Deep tissue & stretch" },
      summary: { th: "แรงนวดเข้มข้นเน้นบ่า หลัง และขา ตามด้วยการยืดเหยียด", en: "Firm pressure on shoulders, back and legs, followed by assisted stretching." },
      about: { th: "เหมาะกับคนที่ชอบแรงนวดหนัก นักบำบัดจะถามระดับแรงก่อนเริ่มและระหว่างนวด บอกได้ตลอดถ้าแรงเกินไป", en: "For people who like firm pressure. The therapist checks the pressure before and during the session; say so any time it is too much." },
      options: [{ min: 60, price: 1400 }, { min: 90, price: 1900 }] },
    { id: "mindful-retreat", slots: ["09:00"], cat: "retreat", city: "cnx", intensity: "gentle", setting: "nature", goals: ["relax"], icon: "moon", request: true,
      title: { th: "รีทรีตฝึกสติ 1 วัน", en: "One-day mindful retreat" },
      summary: { th: "สมาธิ เดินในสวน อาหารกลางวันมังสวิรัติ และนวดไทย 60 นาที", en: "Meditation, a garden walk, a vegetarian lunch and a 60-minute Thai massage." },
      about: { th: "หนึ่งวันช้า ๆ ในสวน เริ่มด้วยสมาธิ เดินในสวน อาหารกลางวันมังสวิรัติ และปิดท้ายด้วยนวดไทย สถานที่ยืนยันการจองภายใน 12 ชั่วโมง", en: "A slow day in a garden: meditation, a mindful walk, a vegetarian lunch and a Thai massage to close. The venue confirms your request within 12 hours." },
      options: [{ min: 360, price: 3900 }] },
    { id: "temple-massage", cat: "thai", city: "bkk", intensity: "medium", setting: "spa", goals: ["recover", "relax"], icon: "hand",
      title: { th: "นวดไทยย่านเมืองเก่า", en: "Old-town Thai massage" },
      summary: { th: "นวดไทยตำรับวัดในย่านท่าเตียน หลังเดินชมวัดและพระราชวัง", en: "Temple-style Thai massage in the Tha Tien old town, after a day of temples and palaces." },
      about: { th: "นวดไทยตามตำรับดั้งเดิมที่สอนกันในย่านวัดเก่าของกรุงเทพฯ เน้นกดจุดตามเส้นและยืดเหยียดอย่างเป็นจังหวะ ห้องนวดเรียบง่าย อยู่ใกล้ท่าเรือ เดินทางสะดวก", en: "A classic Thai massage in the style taught around Bangkok's old temples, with rhythmic pressure along the body's lines and deep stretches. Simple, calm rooms close to the river pier." },
      options: [{ min: 60, price: 650 }, { min: 90, price: 900 }, { min: 120, price: 1150 }] },
    { id: "park-yoga", slots: ["06:30", "07:30", "17:30"], cat: "yoga", city: "bkk", intensity: "gentle", setting: "nature", goals: ["energize", "relax"], icon: "sun",
      title: { th: "โยคะยามเช้าในสวนสาธารณะ", en: "Morning yoga in the park" },
      summary: { th: "โยคะกลางแจ้งริมทะเลสาบกลางเมือง ก่อนอากาศจะร้อน", en: "Outdoor yoga by a city-centre lake, before the heat of the day." },
      about: { th: "คลาสวินยาสะแบบเบา ๆ บนสนามหญ้าริมทะเลสาบ เหมาะกับทุกระดับ ครูช่วยปรับท่าให้ มีเสื่อให้ยืม และจบด้วยการผ่อนคลายสั้น ๆ", en: "A gentle vinyasa class on the grass by the lake, suitable for every level. The teacher helps with alignment, mats are available, and the class ends with a short relaxation." },
      options: [{ min: 60, price: 450 }, { min: 90, price: 650 }] },
    { id: "street-foot-massage", cat: "thai", city: "cnx", intensity: "gentle", setting: "nature", goals: ["relax"], icon: "leaf",
      title: { th: "นวดเท้าย่านเมืองเก่าเชียงใหม่", en: "Old City foot massage" },
      summary: { th: "นวดเท้าบนเก้าอี้เอนริมถนนคนเดิน บรรยากาศเชียงใหม่แท้ ๆ", en: "Foot massage in reclining chairs beside the walking street, a true Chiang Mai classic." },
      about: { th: "นั่งเอนสบาย ๆ ริมถนนในเมืองเก่า นักบำบัดนวดเท้าและน่องด้วยครีมสมุนไพร เหมาะหลังเดินตลาดหรือชมวัดทั้งวัน", en: "Sit back in a reclining chair on an Old City street while your therapist works on your feet and calves with herbal balm. Perfect after a day of markets and temples." },
      options: [{ min: 30, price: 250 }, { min: 60, price: 400 }] },
    { id: "sunset-stretch", slots: ["16:30", "17:30"], cat: "yoga", city: "hkt", intensity: "gentle", setting: "nature", goals: ["relax"], icon: "moon",
      title: { th: "ยืดเหยียดและฝึกหายใจยามเย็นริมหาด", en: "Sunset stretch & breathwork" },
      summary: { th: "ยืดเหยียดช้า ๆ และฝึกลมหายใจบนเนินชมวิวอ่าวกะตะ", en: "Slow stretching and breathing practice on a hill overlooking Kata bay." },
      about: { th: "คลาสหยินโยคะและการฝึกหายใจในช่วงพระอาทิตย์ตก ไม่ต้องมีพื้นฐาน เหมาะสำหรับคลายตัวหลังวันเที่ยวทะเล", en: "A yin yoga and breathwork class as the sun goes down. No experience needed; a calm way to unwind after a beach day." },
      options: [{ min: 60, price: 600 }, { min: 90, price: 800 }] },
    { id: "couples-spa", cat: "spa", city: "bkk", intensity: "gentle", setting: "spa", goals: ["relax"], icon: "drop",
      title: { th: "แพ็กเกจสปาสำหรับคู่", en: "Couples spa package" },
      summary: { th: "ห้องสปาส่วนตัวสำหรับสองคน แช่เท้า ขัดผิว และนวดน้ำมันพร้อมกัน", en: "A private room for two: foot soak, body scrub and side-by-side oil massage." },
      about: { th: "เริ่มด้วยแช่เท้าในน้ำดอกไม้ ขัดผิวด้วยสครับมะพร้าว แล้วนวดน้ำมันหอมระเหยพร้อมกันในห้องส่วนตัว ราคาเป็นต่อท่าน", en: "Start with a flower foot soak and a coconut body scrub, then enjoy side-by-side aromatherapy oil massages in a private room. Prices are per person." },
      options: [{ min: 120, price: 2600 }, { min: 180, price: 3500 }] },
    { id: "beach-thai-massage", cat: "thai", city: "hkt", intensity: "medium", setting: "nature", goals: ["recover", "relax"], icon: "hand",
      title: { th: "นวดไทยในศาลาริมหาด", en: "Beachside Thai massage" },
      summary: { th: "นวดไทยบนเบาะในศาลาเปิดโล่ง ฟังเสียงคลื่นและลมทะเล", en: "Thai massage on a mat in an open-air sala, with the sound of the waves." },
      about: { th: "นวดไทยแผนโบราณในศาลาไม้ริมหาดกมลา ลมทะเลเย็นสบาย ปรับแรงนวดได้ตามต้องการ แนะนำช่วงบ่ายแก่ ๆ", en: "A traditional Thai massage in a wooden sala on Kamala Beach with a cool sea breeze. Pressure is adjusted to you; late afternoon is the nicest time." },
      options: [{ min: 60, price: 500 }, { min: 90, price: 750 }] },
    { id: "doi-nature-retreat", slots: ["07:00", "08:00"], cat: "retreat", city: "cnx", intensity: "medium", setting: "nature", goals: ["energize", "relax"], icon: "sun", request: true,
      title: { th: "รีทรีตธรรมชาติดอยอินทนนท์ 1 วัน", en: "Doi Inthanon nature day retreat" },
      summary: { th: "เดินป่าเบา ๆ ริมลำธาร อาหารกลางวันพื้นเมือง และแช่น้ำพุร้อน", en: "An easy forest walk by mountain streams, a local lunch and a hot spring soak." },
      about: { th: "รถรับส่งจากตัวเมืองเชียงใหม่ เดินป่าระยะสั้นกับไกด์ท้องถิ่น ทานอาหารกลางวันกับชุมชน และปิดท้ายด้วยแช่น้ำพุร้อน สถานที่ยืนยันการจองภายใน 12 ชั่วโมง", en: "Hotel pickup in Chiang Mai, a short guided forest walk, lunch with a local community and a hot spring soak to finish. The venue confirms your request within 12 hours." },
      options: [{ min: 480, price: 3200 }] }
  ];

  /* Sample venues (fictional names). map = the search used for the embedded map. */
  var venues = {
    "thai-traditional": { name: "Baan Nuad Sukhumvit", addr: { th: "สุขุมวิท ซอย 33 แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพฯ", en: "Sukhumvit Soi 33, Khlong Toei Nuea, Watthana, Bangkok" }, hours: "10:00–22:00", map: "Sukhumvit Soi 33, Bangkok" },
    "herbal-compress": { name: "Suan Samunprai Spa", addr: { th: "นิมมานเหมินท์ ซอย 9 ตำบลสุเทพ อำเภอเมืองเชียงใหม่", en: "Nimmanhaemin Soi 9, Su Thep, Mueang Chiang Mai" }, hours: "10:00–21:00", map: "Nimmanhaemin Soi 9, Chiang Mai" },
    "foot-reflexology": { name: "Thong Lo Foot House", addr: { th: "ทองหล่อ ซอย 10 เขตวัฒนา กรุงเทพฯ", en: "Thong Lo Soi 10, Watthana, Bangkok" }, hours: "11:00–23:00", map: "Thong Lo Soi 10, Bangkok" },
    "sunrise-yoga": { name: "Kata Deck Yoga", addr: { th: "หาดกะตะ ตำบลกะรน อำเภอเมืองภูเก็ต", en: "Kata Beach, Karon, Mueang Phuket" }, hours: "06:30–20:00", map: "Kata Beach, Phuket" },
    "muay-thai": { name: "Chalong Fight Fitness", addr: { th: "ซอยตาเอียด ตำบลฉลอง อำเภอเมืองภูเก็ต", en: "Soi Ta-iad, Chalong, Mueang Phuket" }, hours: "07:00–21:00", map: "Soi Ta-iad, Chalong, Phuket" },
    "in-hotel-aroma": { name: "Aroma On Call", addr: { th: "บริการถึงโรงแรมในใจกลางกรุงเทพฯ (สุขุมวิท สีลม สาทร)", en: "Comes to hotels in central Bangkok (Sukhumvit, Silom, Sathorn)" }, hours: "09:00–22:00", map: "Sukhumvit, Bangkok" },
    "herbal-steam": { name: "Mae Rim Herbal Springs", addr: { th: "อำเภอแม่ริม จังหวัดเชียงใหม่", en: "Mae Rim District, Chiang Mai" }, hours: "09:00–19:00", map: "Mae Rim, Chiang Mai" },
    "deep-stretch": { name: "Patong Body Works", addr: { th: "ถนนราษฎร์อุทิศ 200 ปี ตำบลป่าตอง อำเภอกะทู้ ภูเก็ต", en: "Rat-U-Thit 200 Pi Road, Patong, Kathu, Phuket" }, hours: "11:00–23:00", map: "Rat-U-Thit 200 Pi Road, Patong" },
    "mindful-retreat": { name: "Garden Mind Retreat", addr: { th: "อำเภอแม่แตง จังหวัดเชียงใหม่", en: "Mae Taeng District, Chiang Mai" }, hours: "09:00–16:00", map: "Mae Taeng, Chiang Mai" },
    "temple-massage": { name: "Tha Tien Massage House", addr: { th: "ถนนมหาราช แขวงพระบรมมหาราชวัง เขตพระนคร กรุงเทพฯ", en: "Maha Rat Road, Phra Borom Maha Ratchawang, Phra Nakhon, Bangkok" }, hours: "09:00–18:00", map: "Maha Rat Road, Phra Nakhon, Bangkok" },
    "park-yoga": { name: "Lake Park Yoga Club", addr: { th: "สวนเบญจกิติ เขตคลองเตย กรุงเทพฯ", en: "Benjakitti Park, Khlong Toei, Bangkok" }, hours: "06:00–20:00", map: "Benjakitti Park, Bangkok" },
    "street-foot-massage": { name: "Old City Foot Corner", addr: { th: "ถนนราชดำเนิน ตำบลศรีภูมิ อำเภอเมืองเชียงใหม่", en: "Ratchadamnoen Road, Si Phum, Mueang Chiang Mai" }, hours: "10:00–23:00", map: "Ratchadamnoen Road, Chiang Mai" },
    "sunset-stretch": { name: "Kata Sunset Breath", addr: { th: "หาดกะตะน้อย ตำบลกะรน อำเภอเมืองภูเก็ต", en: "Kata Noi, Karon, Mueang Phuket" }, hours: "15:00–20:00", map: "Kata Noi Beach, Phuket" },
    "couples-spa": { name: "Silom Lotus Spa", addr: { th: "สีลม ซอย 4 แขวงสุริยวงศ์ เขตบางรัก กรุงเทพฯ", en: "Silom Soi 4, Suriyawong, Bang Rak, Bangkok" }, hours: "11:00–23:00", map: "Silom Soi 4, Bangkok" },
    "beach-thai-massage": { name: "Kamala Beach Massage Sala", addr: { th: "หาดกมลา ตำบลกมลา อำเภอกะทู้ ภูเก็ต", en: "Kamala Beach, Kamala, Kathu, Phuket" }, hours: "09:00–20:00", map: "Kamala Beach, Phuket" },
    "doi-nature-retreat": { name: "Doi Nature Day", addr: { th: "อำเภอจอมทอง จังหวัดเชียงใหม่ (มีรถรับจากตัวเมือง)", en: "Chom Thong District, Chiang Mai (pickup from the city)" }, hours: "07:00–18:00", map: "Doi Inthanon National Park" }
  };

  /* Sample reviews, grouped by category. Each treatment shows 3 of its category's reviews. */
  var R = function (name, from, stars, daysAgo, en, th) { return { name: name, from: from, stars: stars, daysAgo: daysAgo, en: en, th: th }; };
  var reviewPool = {
    thai: [
      R("Emma", { en: "United Kingdom", th: "สหราชอาณาจักร" }, 5, 4, "The therapist asked about pressure before starting and checked in halfway. I felt loose for the rest of the trip.", "นักบำบัดถามเรื่องแรงนวดก่อนเริ่มและถามอีกครั้งระหว่างนวด รู้สึกตัวเบาไปตลอดทริป"),
      R("นิชา", { en: "Bangkok", th: "กรุงเทพฯ" }, 5, 9, "Clean, quiet and on time. Exactly the kind of Thai massage I grew up with.", "สะอาด เงียบ ตรงเวลา เป็นนวดไทยแบบที่คุ้นเคยจริง ๆ"),
      R("Lucas", { en: "Germany", th: "เยอรมนี" }, 4, 15, "A little firm at first, but they adjusted straight away when I said so. Great value.", "ตอนแรกแรงไปนิด แต่พอบอกก็ปรับให้ทันที คุ้มราคามาก"),
      R("Aiko", { en: "Japan", th: "ญี่ปุ่น" }, 5, 21, "Booking was easy and the staff spoke good English. The herbal tea afterwards was lovely.", "จองง่าย พนักงานสื่อสารภาษาอังกฤษได้ดี ชาสมุนไพรหลังนวดอร่อยมาก"),
      R("Daniel", { en: "Australia", th: "ออสเตรเลีย" }, 4, 30, "Good massage after a long day of walking. Arrive a bit early, it gets busy in the evening.", "นวดดีมากหลังเดินทั้งวัน แนะนำให้มาก่อนเวลาเล็กน้อย ช่วงเย็นคนเยอะ"),
      R("ปกรณ์", { en: "Chiang Mai", th: "เชียงใหม่" }, 5, 38, "Professional and friendly. I booked again for my parents.", "มืออาชีพและเป็นกันเอง จองให้พ่อแม่มาอีกรอบ")
    ],
    spa: [
      R("Sophie", { en: "France", th: "ฝรั่งเศส" }, 5, 6, "The warm compress smelled of lemongrass and the room was beautiful. Pure relaxation.", "ลูกประคบหอมตะไคร้ ห้องสวยมาก ผ่อนคลายสุด ๆ"),
      R("Mei", { en: "Singapore", th: "สิงคโปร์" }, 5, 12, "Slow, careful and calm. I nearly fell asleep. Worth every baht.", "นวดช้า ๆ ละเอียด เกือบหลับไปเลย คุ้มทุกบาท"),
      R("James", { en: "USA", th: "สหรัฐอเมริกา" }, 4, 19, "Lovely treatment. Parking was a little hard to find, so give yourself time.", "ทรีตเมนต์ดีมาก แต่หาที่จอดรถยากนิดหน่อย เผื่อเวลาไว้ด้วย"),
      R("พิมพ์", { en: "Bangkok", th: "กรุงเทพฯ" }, 5, 27, "Booked for my anniversary. The staff made it feel really special.", "จองฉลองวันครบรอบ พนักงานใส่ใจทำให้รู้สึกพิเศษมาก")
    ],
    yoga: [
      R("Olivia", { en: "Canada", th: "แคนาดา" }, 5, 3, "Small group, kind teacher and an amazing view. The best start to my day in Thailand.", "กลุ่มเล็ก ครูใจดี วิวสวยมาก เป็นการเริ่มวันที่ดีที่สุดในเมืองไทย"),
      R("Tom", { en: "Netherlands", th: "เนเธอร์แลนด์" }, 4, 10, "Total beginner and never felt lost. Bring water, it warms up quickly.", "มือใหม่มากแต่ตามทันตลอด พกน้ำไปด้วยเพราะอากาศร้อนเร็ว"),
      R("ณัฐ", { en: "Phuket", th: "ภูเก็ต" }, 5, 16, "Calm and well paced, with clear instructions in Thai and English.", "จังหวะสบาย ๆ ครูอธิบายชัดทั้งไทยและอังกฤษ"),
      R("Hannah", { en: "Ireland", th: "ไอร์แลนด์" }, 5, 24, "The breathing part at the end was my favourite. Mats were clean.", "ช่วงฝึกหายใจตอนท้ายชอบที่สุด เสื่อสะอาด"),
      R("Kenji", { en: "Japan", th: "ญี่ปุ่น" }, 4, 33, "Nice class. It started five minutes late, but the teacher made up the time.", "คลาสดี เริ่มช้าไปห้านาที แต่ครูชดเชยเวลาให้")
    ],
    retreat: [
      R("Grace", { en: "New Zealand", th: "นิวซีแลนด์" }, 5, 8, "A whole day to slow down. The lunch was delicious and the guide was wonderful.", "ได้ช้าลงทั้งวัน อาหารกลางวันอร่อย ไกด์ดีมาก"),
      R("Marco", { en: "Italy", th: "อิตาลี" }, 5, 14, "Confirmed within a few hours of booking. Everything was well organised.", "ได้รับการยืนยันภายในไม่กี่ชั่วโมง ทุกอย่างจัดการดีมาก"),
      R("ศิริ", { en: "Bangkok", th: "กรุงเทพฯ" }, 4, 22, "Peaceful and well paced. Bring a light jacket for the morning.", "สงบและไม่เร่งรีบ พกเสื้อแจ็กเก็ตบาง ๆ ไปด้วยสำหรับช่วงเช้า"),
      R("Anna", { en: "Sweden", th: "สวีเดน" }, 5, 35, "The highlight of our Chiang Mai trip. I would happily do it again.", "ไฮไลต์ของทริปเชียงใหม่ อยากไปอีก")
    ],
    muaythai: [
      R("Ben", { en: "United Kingdom", th: "สหราชอาณาจักร" }, 5, 5, "Tough but fun. The trainer was patient with a total beginner.", "เหนื่อยแต่สนุก ครูใจเย็นกับมือใหม่มาก"),
      R("Chloe", { en: "Australia", th: "ออสเตรเลีย" }, 5, 13, "Great workout and gloves were provided. My arms were sore the next day, in a good way.", "ออกกำลังกายได้เต็มที่ มีนวมให้ วันรุ่งขึ้นแขนปวดแบบดี ๆ"),
      R("ธนา", { en: "Phuket", th: "ภูเก็ต" }, 4, 26, "Good technique coaching. It gets hot in the afternoon, so morning is better.", "สอนเทคนิคดี ช่วงบ่ายร้อนมาก แนะนำรอบเช้า")
    ],
    steam: [
      R("Laura", { en: "Spain", th: "สเปน" }, 5, 7, "The herbal steam smelled amazing and the mineral pool was the perfect temperature.", "ไอน้ำสมุนไพรหอมมาก บ่อน้ำแร่อุณหภูมิกำลังดี"),
      R("วิภา", { en: "Chiang Mai", th: "เชียงใหม่" }, 5, 18, "Very relaxing. Staff explained each herb and brought tea between rounds.", "ผ่อนคลายมาก พนักงานอธิบายสมุนไพรแต่ละอย่างและเสิร์ฟชาระหว่างรอบ"),
      R("Noah", { en: "USA", th: "สหรัฐอเมริกา" }, 4, 29, "Lovely garden setting. Bring flip-flops and a change of clothes.", "สวนสวย ควรพกรองเท้าแตะและเสื้อผ้าสำรองไปด้วย")
    ],
    inhotel: [
      R("Isabella", { en: "Brazil", th: "บราซิล" }, 5, 4, "So convenient after a long flight. The therapist set everything up in minutes.", "สะดวกมากหลังบินมาไกล นักบำบัดจัดเตรียมทุกอย่างเสร็จในไม่กี่นาที"),
      R("Ryan", { en: "Singapore", th: "สิงคโปร์" }, 4, 11, "Confirmed within an hour and arrived on time. A great massage, worth the travel fee.", "ยืนยันภายในชั่วโมงเดียวและมาตรงเวลา นวดดี คุ้มค่าเดินทาง"),
      R("ชนิดา", { en: "Bangkok", th: "กรุงเทพฯ" }, 5, 20, "Booked for my mother at her hotel. Polite and very professional.", "จองให้คุณแม่ที่โรงแรม สุภาพและเป็นมืออาชีพมาก")
    ]
  };

  /* Sample booking rules shown across the site. */
  var policy = { windowDays: 30, maxGuests: 6, freeHours: 24, partialHours: 6, partialPct: 50, confirmHours: 12, retentionDays: 90 };
  /* Refund % for a cancellation made `hoursBefore` hours before the appointment. */
  function refundPct(hoursBefore) {
    if (hoursBefore >= policy.freeHours) return 100;
    if (hoursBefore >= policy.partialHours) return policy.partialPct;
    return 0;
  }

  /* City cards on the home page. */
  var cityCards = [
    { id: "bkk", photo: "city-bangkok-1", blurb: { th: "นวดไทยตำรับวัด สปาใจกลางเมือง และโยคะในสวน", en: "Temple-style massage, city spas and yoga in the park" } },
    { id: "cnx", photo: "city-chiangmai-1", blurb: { th: "สมุนไพรล้านนา น้ำพุร้อน และรีทรีตบนดอย", en: "Lanna herbs, hot springs and mountain retreats" } },
    { id: "hkt", photo: "city-phuket-1", blurb: { th: "โยคะริมหาด มวยไทย และนวดในศาลาริมทะเล", en: "Beach yoga, Muay Thai and seaside massage" } }
  ];

  var included = {
    th: ["นักบำบัดหรือครูที่ผ่านการอบรมและมีใบรับรอง", "ผ้าเช็ดตัว ชุดเปลี่ยน และน้ำดื่ม", "ชาสมุนไพรหลังทรีตเมนต์"],
    en: ["A trained, certified therapist or teacher", "Towels, a change of clothes and drinking water", "Herbal tea after your session"]
  };
  var excluded = {
    th: ["ค่าเดินทางไปสถานที่", "ทิปนักบำบัด (ไม่บังคับ)", "ผลิตภัณฑ์ที่ซื้อเพิ่ม"],
    en: ["Travel to the venue", "Tips for your therapist (optional)", "Products bought on site"]
  };

  /* Photo slots. Files live in images/ (see images/README.md):
       images/hero/hero-1..3.webp                    home page slideshow
       images/treatments/<treatment id>/1.webp       card photo + main detail photo   e.g. treatments/muay-thai/1.webp
       images/treatments/<treatment id>/2.webp, 3.webp  the two smaller detail photos
       images/cities/city-<city>-N.webp              home page city cards
       images/categories/<category id>.webp          home page category cards (round illustrations)
     img() takes a path inside images/ without ".webp".
     To swap a photo, replace the file and keep its name. Set a slot to null to show the illustrated fallback. */
  /* index.html sits at the site root; every other page lives in pages/ and sets <body data-root="../">.
     url("detail.html?id=x") gives the right link to a page from whichever page is open. */
  var ROOT = (document.body && document.body.getAttribute("data-root")) || "";
  function url(page) { return page.indexOf("index.html") === 0 ? ROOT + page : (ROOT ? "" : "pages/") + page; }
  function img(path) { return ROOT + "images/" + path + ".webp"; }
  function treatmentImg(id, n) { return img("treatments/" + id + "/" + n); }
  var photos = {
    hero: img("hero/hero-1"),
    heroes: [{ src: img("hero/hero-1") }, { src: img("hero/hero-2"), city: "hkt" }, { src: img("hero/hero-3") }],
    spot: treatmentImg("herbal-compress", 3),          // home page spotlight (the herbal compress treatment)
    treatments: treatmentImg("sunrise-yoga", 2),       // treatments page banner
    gallery: [img("hero/hero-2"), img("hero/hero-3")], // fallback detail photos if a treatment has none
    byId: {},
    galleryById: {}
  };
  T.forEach(function (t) {
    photos.byId[t.id] = treatmentImg(t.id, 1);
    photos.galleryById[t.id] = [treatmentImg(t.id, 2), treatmentImg(t.id, 3)];
  });
  cityCards.forEach(function (c) { c.image = img("cities/" + c.photo); });
  cats.forEach(function (c) { c.image = img("categories/" + c.id); });

  /* Reviews + average rating for a treatment (3 sample reviews picked from its category's pool). */
  function reviews(t) {
    var pool = reviewPool[t.cat] || reviewPool.thai, start = 0;
    for (var i = 0; i < T.length; i++) if (T[i].cat === t.cat) { if (T[i].id === t.id) break; start++; }
    var out = [];
    for (var k = 0; k < Math.min(3, pool.length); k++) out.push(pool[(start + k) % pool.length]);
    return out;
  }
  function rating(t) {
    var r = reviews(t), sum = 0;
    r.forEach(function (x) { sum += x.stars; });
    return { avg: Math.round(sum / r.length * 10) / 10, count: r.length };
  }

  /* Absolute dates ("YYYY-MM-DD") for saved bookings, so they stay correct on later days. */
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function isoFromIdx(i) { var t0 = today0(), d = new Date(t0.getFullYear(), t0.getMonth(), t0.getDate() + (i || 0)); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function dateFromIso(iso) { var p = String(iso).split("-"); return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2])); }
  function isoLabel(iso, lang, long) {
    var d = dateFromIso(iso);
    return d.toLocaleDateString(loc(lang), long ? { weekday: "long", day: "numeric", month: "long", year: "numeric" } : { weekday: "short", day: "numeric", month: "short", year: "numeric" });
  }
  /* Hours from now until a booking's start time. */
  function hoursUntil(iso, time) {
    var d = dateFromIso(iso), hm = String(time || "00:00").split(":");
    d.setHours(Number(hm[0]), Number(hm[1]), 0, 0);
    return (d - new Date()) / 3600000;
  }

  function L(o, lang) { return o ? (o[lang] || o.en) : ""; }
  function baht(n) { return "฿" + Number(n).toLocaleString("en-US"); }
  function get(id) { for (var i = 0; i < T.length; i++) if (T[i].id === id) return T[i]; return T[0]; }
  function cat(id) { for (var i = 0; i < cats.length; i++) if (cats[i].id === id) return cats[i]; return null; }
  function priceFor(t, min) { for (var i = 0; i < t.options.length; i++) if (t.options[i].min === min) return t.options[i].price; return t.options[0].price; }
  function minLabel(m, lang) {
    if (m >= 300) return lang === "th" ? (m / 60) + " ชั่วโมง" : (m / 60) + " hours";
    return m + (lang === "th" ? " นาที" : " min");
  }
  function durLabel(t, lang) {
    var a = t.options[0].min, b = t.options[t.options.length - 1].min;
    if (a === b) return minLabel(a, lang);
    return a + "–" + b + (lang === "th" ? " นาที" : " min");
  }
  function card(t, lang) {
    return { id: t.id, title: L(t.title, lang), category: L(cat(t.cat), lang), duration: durLabel(t, lang) + " · " + L(cities[t.city], lang),
      summary: L(t.summary, lang), price: t.options[0].price, icon: t.icon, unit: lang === "th" ? "ท่าน" : "person", rating: rating(t),
      image: photos.byId[t.id] || undefined, imageAlt: L(t.title, lang) };
  }
  /* Dates: everything is counted in days from today (idx 0 = today). Bookable up to 30 days ahead. */
  var WINDOW = 30;
  function today0() { var d = new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
  function loc(lang) { return lang === "th" ? "th-TH" : "en-GB"; }
  function dayInfo(i, lang) {
    var t0 = today0(), x = new Date(t0.getFullYear(), t0.getMonth(), t0.getDate() + i), l = loc(lang);
    var lab = x.toLocaleDateString(l, { weekday: "short", day: "numeric", month: "short" });
    if (i === 0) lab = (lang === "th" ? "วันนี้ · " : "Today · ") + lab;
    return { idx: i, label: lab, dow: x.toLocaleDateString(l, { weekday: "short" }), day: x.getDate(),
      mon: x.toLocaleDateString(l, { month: "short" }), monthYear: x.toLocaleDateString(l, { month: "long", year: "numeric" }),
      long: x.toLocaleDateString(l, { weekday: "long", day: "numeric", month: "long" }), weekend: x.getDay() === 0 || x.getDay() === 6 };
  }
  function dates(lang, n) { var out = []; for (var i = 0; i < (n || WINDOW); i++) out.push(dayInfo(i, lang)); return out; }
  function dows(lang) { return lang === "th" ? ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"] : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]; }
  function weekendIdx() { var dw = today0().getDay(); return (dw === 6 || dw === 0) ? 0 : 6 - dw; }
  function monthGrid(off, lang) {
    var t0 = today0(), first = new Date(t0.getFullYear(), t0.getMonth() + off, 1);
    var days = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate(), cells = [];
    for (var b = 0; b < first.getDay(); b++) cells.push({ blank: true });
    for (var d = 1; d <= days; d++) {
      var x = new Date(first.getFullYear(), first.getMonth(), d), idx = Math.round((x - t0) / 86400000);
      cells.push({ n: d, idx: idx, ok: idx >= 0 && idx < WINDOW, isToday: idx === 0, weekend: x.getDay() === 0 || x.getDay() === 6,
        aria: x.toLocaleDateString(loc(lang), { weekday: "long", day: "numeric", month: "long", year: "numeric" }) });
    }
    var last = new Date(t0.getFullYear(), t0.getMonth(), t0.getDate() + WINDOW - 1);
    var maxOff = (last.getFullYear() - t0.getFullYear()) * 12 + last.getMonth() - t0.getMonth();
    return { title: first.toLocaleDateString(loc(lang), { month: "long", year: "numeric" }), cells: cells, maxOff: maxOff };
  }
  /* Party: adults (a), seniors (s), children (c). Up to 6 guests per booking. */
  var PARTY_MAX = 6;
  function partyNorm(p) { p = p || {}; return { a: p.a === undefined ? 1 : p.a, s: p.s || 0, c: p.c || 0 }; }
  function partyTotal(p) { p = partyNorm(p); return p.a + p.s + p.c; }
  function partyLabel(p, lang) {
    p = partyNorm(p); var th = lang === "th", out = [];
    if (p.c) out.push(p.c + (th ? " เด็ก" : (p.c > 1 ? " children" : " child")));
    if (p.a) out.push(p.a + (th ? " ผู้ใหญ่" : (p.a > 1 ? " adults" : " adult")));
    if (p.s) out.push(p.s + (th ? " ผู้สูงอายุ" : (p.s > 1 ? " seniors" : " senior")));
    return out.join(", ");
  }
  function partyRows(p, lang, set) {
    p = partyNorm(p); var th = lang === "th", tot = partyTotal(p), grown = p.a + p.s;
    var defs = [
      { k: "c", label: th ? "เด็ก" : "Children", sub: th ? "อายุต่ำกว่า 18 ปี · มากับผู้ใหญ่" : "Under 18 · with an adult" },
      { k: "a", label: th ? "ผู้ใหญ่" : "Adults", sub: th ? "อายุ 18–59 ปี" : "Age 18–59" },
      { k: "s", label: th ? "ผู้สูงอายุ" : "Seniors", sub: th ? "อายุ 60 ปีขึ้นไป" : "Age 60 and over" }
    ];
    return defs.map(function (d) {
      var n = p[d.k], lessOk = d.k === "c" ? n > 0 : (n > 0 && grown > 1), moreOk = tot < PARTY_MAX;
      return { label: d.label, sub: d.sub, n: n, noLess: !lessOk, noMore: !moreOk,
        ariaLess: (th ? "ลดจำนวน" : "Fewer ") + d.label.toLowerCase(), ariaMore: (th ? "เพิ่มจำนวน" : "More ") + d.label.toLowerCase(),
        less: function () { if (!lessOk) return; var q = partyNorm(p); q[d.k] = n - 1; set(q); },
        more: function () { if (!moreOk) return; var q = partyNorm(p); q[d.k] = n + 1; set(q); } };
    });
  }
  function partyNote(p, lang) {
    p = partyNorm(p); var th = lang === "th";
    var n = th ? "สูงสุด " + PARTY_MAX + " ท่านต่อการจอง" : "Up to " + PARTY_MAX + " guests per booking";
    if (p.c) n += th ? " · เด็กอายุต่ำกว่า 12 ปีจองได้เฉพาะโยคะและอบสมุนไพร และต้องมีผู้ปกครองอยู่ด้วย" : " · children under 12 can join yoga and herbal steam only, with a parent or guardian on site";
    if (p.s) n += th ? " · แจ้งข้อมูลสุขภาพที่นักบำบัดควรรู้ได้ในขั้นตอนกรอกรายละเอียด" : " · you can share health details the therapist should know in the details step";
    return n;
  }
  var slots = ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00", "19:30"];
  /* Start times for one day. Treatments can set their own `slots` (classes, day retreats); otherwise the standard list.
     Some times show as fully booked so the demo looks realistic. */
  function slotList(dateIdx, t) {
    var i = dateIdx || 0, list = (t && t.slots) || slots;
    var full = t && t.slots ? (list.length > 1 && i % 3 === 2 ? [list[list.length - 1]] : []) : (i % 2 ? ["10:30", "16:30"] : ["12:00", "18:00"]);
    var now = new Date(), nowMin = now.getHours() * 60 + now.getMinutes();
    return list.map(function (s) {
      var hm = s.split(":"), past = i === 0 && Number(hm[0]) * 60 + Number(hm[1]) <= nowMin + 60;   // today: needs at least 1 hour's notice
      return full.indexOf(s) >= 0 || past ? { time: s, state: "full" } : { time: s };
    });
  }
  function slotGroups(dateIdx, lang, t) {
    var th = lang === "th";
    var g = [
      { id: "morning", icon: "sun", label: th ? "ช่วงเช้า" : "Morning", test: function (h) { return h < 12; } },
      { id: "afternoon", icon: "leaf", label: th ? "ช่วงบ่าย" : "Afternoon", test: function (h) { return h >= 12 && h < 17; } },
      { id: "evening", icon: "moon", label: th ? "ช่วงเย็น" : "Evening", test: function (h) { return h >= 17; } }
    ];
    var list = slotList(dateIdx, t);
    return g.map(function (grp) {
      var items = list.filter(function (s) { return grp.test(parseInt(s.time, 10)); });
      var open = items.filter(function (s) { return s.state !== "full"; }).length;
      return { id: grp.id, icon: grp.icon, label: grp.label, slots: items, open: open,
        count: th ? "ว่าง " + open + " จาก " + items.length + " เวลา" : open + " of " + items.length + " open" };
    });
  }
  function quiz(lang) {
    var th = lang === "th";
    return [
      { id: "goal", question: th ? "วันนี้คุณต้องการอะไรมากที่สุด" : "What do you need most today?", options: [
        { value: "relax", label: th ? "พักผ่อน คลายเครียด" : "Relax and unwind", icon: "moon" },
        { value: "recover", label: th ? "คลายความตึงของกล้ามเนื้อ" : "Ease tension", icon: "hand" },
        { value: "energize", label: th ? "เพิ่มความสดชื่น" : "Feel energized", icon: "sun" }] },
      { id: "intensity", question: th ? "ความเข้มข้นที่ชอบ" : "How intense?", options: [
        { value: "gentle", label: th ? "เบา ๆ" : "Gentle", icon: "drop" },
        { value: "medium", label: th ? "ปานกลาง" : "Medium", icon: "leaf" },
        { value: "deep", label: th ? "เข้มข้น / ได้ขยับ" : "Deep / active", icon: "flame" }] },
      { id: "setting", question: th ? "อยากได้บรรยากาศแบบไหน" : "Where?", options: [
        { value: "spa", label: th ? "ห้องสปาเงียบสงบ" : "Quiet spa room", icon: "lotus" },
        { value: "nature", label: th ? "กลางแจ้ง ธรรมชาติ" : "Outdoors, nature", icon: "leaf" },
        { value: "home", label: th ? "ที่โรงแรมของฉัน" : "At my hotel", icon: "pin" }] }
    ];
  }
  var goalReason = {
    relax: { th: "ตรงกับสิ่งที่คุณต้องการ: พักผ่อน คลายเครียด", en: "Fits what you need: relax and unwind" },
    recover: { th: "ตรงกับสิ่งที่คุณต้องการ: คลายความตึงของกล้ามเนื้อ", en: "Fits what you need: ease tension" },
    energize: { th: "ตรงกับสิ่งที่คุณต้องการ: เพิ่มความสดชื่น", en: "Fits what you need: feel energized" }
  };
  function match(ans, lang) {
    if (!ans || !ans.goal || !ans.intensity || !ans.setting) return [];
    var scored = T.map(function (t, i) {
      var r = [], sc = 0;
      if (t.goals.indexOf(ans.goal) >= 0) { sc += 3; r.push(L(goalReason[ans.goal], lang)); }
      if (t.intensity === ans.intensity) { sc += 2; r.push(lang === "th" ? "ความเข้มข้นระดับ" + intensity[t.intensity].th + " ตามที่คุณเลือก" : intensity[t.intensity].en + " intensity, as you chose"); }
      if (t.setting === ans.setting) { sc += 2; r.push(lang === "th" ? "บรรยากาศ: " + settings[t.setting].th : "Setting: " + settings[t.setting].en); }
      return { t: t, sc: sc, r: r, i: i };
    }).filter(function (x) { return x.sc > 0; });
    scored.sort(function (a, b) { return b.sc - a.sc || a.i - b.i; });
    return scored.slice(0, 3).map(function (x) { var c = card(x.t, lang); c.reasons = x.r; return c; });
  }

  window.WPData = { url: url, photos: photos, treatments: T, cats: cats, cities: cities, intensity: intensity, settings: settings, included: included, excluded: excluded,
    L: L, baht: baht, get: get, cat: cat, priceFor: priceFor, minLabel: minLabel, durLabel: durLabel, card: card, dates: dates, dayInfo: dayInfo, dows: dows, weekendIdx: weekendIdx, monthGrid: monthGrid, WINDOW: WINDOW, slotList: slotList, slotGroups: slotGroups, partyNorm: partyNorm, partyTotal: partyTotal, partyLabel: partyLabel, partyRows: partyRows, partyNote: partyNote, quiz: quiz, match: match,
    venues: venues, reviews: reviews, rating: rating, policy: policy, refundPct: refundPct, cityCards: cityCards,
    isoFromIdx: isoFromIdx, isoLabel: isoLabel, hoursUntil: hoursUntil };
})();
