/* Wellness Pass: Home page (index.html).
   Sections: hero + guided search (treatment -> date -> guests), categories, 3-question quiz with picks,
   spotlight, "before you book" checklist, FAQ, call to action. */
(function () {
  "use strict";
  var D = window.WPData, UI = window.UI, WP = window.WP, esc = UI.esc, icon = UI.icon;

  /* ---------- Text (Thai / English) ---------- */
  var TEXT = {
    th: {
      heroEyebrow: "WELLNESS · ประเทศไทย", heroTitle: "ดูแลตัวเองในแบบที่ใช่",
      heroSub: "บอกเราว่าวันนี้ร่างกายรู้สึกอย่างไร แล้วเลือกนวดไทย สปา โยคะ หรือรีทรีตที่เหมาะกับคุณ ในกรุงเทพฯ เชียงใหม่ และภูเก็ต",
      fTreat: "ทรีตเมนต์", fDate: "วันที่", fGuests: "ผู้เข้าร่วม", anyTreat: "นวดไทย สปา โยคะ…", anyDate: "วันไหนก็ได้",
      search: "ค้นหา", searchAria: "ค้นหาทรีตเมนต์", panelTreat: "เลือกประเภททรีตเมนต์", panelDate: "เลือกวัน", panelGuests: "จำนวนผู้เข้าร่วม",
      all: "ทุกประเภท", close: "ปิด", quickAria: "ตัวเลือกด่วน", prevMonth: "เดือนก่อนหน้า", nextMonth: "เดือนถัดไป",
      calNote: "จองล่วงหน้าได้ 30 วัน · จุดใต้วันที่คือวันนี้",
      clear: "ล้างทั้งหมด", back: "ย้อนกลับ", next: "ถัดไป", show: "ดูทรีตเมนต์", step: function (n) { return "ขั้นตอน " + n + " จาก 3"; },
      qToday: "วันนี้", qTomorrow: "พรุ่งนี้", qWeekend: "สุดสัปดาห์นี้", qAny: "วันไหนก็ได้", qAnySub: "ดูทุกวัน",
      sampleBadge: "ตัวอย่าง · Sample", sampleNote: "เดโม: ชื่อสถานที่ ราคา และเวลาว่างทั้งหมดเป็นข้อมูลตัวอย่าง",
      catEyebrow: "CATEGORIES · ประเภท", catTitle: "เลือกตามสิ่งที่อยากทำ", allLink: "ดูทรีตเมนต์ทั้งหมด",
      quizEyebrow: "PICKED FOR YOU · แนะนำสำหรับคุณ", quizTitle: "ตอบ 3 คำถาม แล้วดูทรีตเมนต์ที่เหมาะกับคุณ",
      quizLead: "เราใช้เฉพาะคำตอบของคุณตอนนี้ ไม่ถามข้อมูลสุขภาพ และไม่ใช่การประเมินทางการแพทย์ จะข้ามไปดูทั้งหมดก็ได้",
      quizDone: "เรียบร้อย เราเลือกทรีตเมนต์ที่ตรงกับคำตอบของคุณแล้ว", seeMatches: "ดูทรีตเมนต์ที่แนะนำ", reset: "เริ่มใหม่",
      qBody: "คำตอบช่วยให้เราแนะนำทรีตเมนต์ ไม่ใช่การประเมินทางการแพทย์ และไม่มีการบันทึกคำตอบของคุณ",
      qBodyDone: "ดูทรีตเมนต์ที่แนะนำด้านล่าง พร้อมเหตุผลว่าทำไมถึงเหมาะกับคุณ", picksTitle: "ทรีตเมนต์ที่ตรงกับคำตอบของคุณ",
      picksEmpty: "ตอบให้ครบ 3 ข้อเพื่อดูทรีตเมนต์ที่แนะนำ หรือดูทั้งหมดได้เลย",
      photo: "ภาพตัวอย่าง", spotEyebrow: "SPOTLIGHT · สถานที่ตัวอย่าง", spotTitle: "บ่ายช้า ๆ ในสวนสมุนไพร เชียงใหม่",
      spotBody: "ลูกประคบสมุนไพรอุ่น ๆ ต่อด้วยนวดน้ำมันหอมระเหยจังหวะช้า ในห้องที่มองเห็นสวน เหมาะกับวันที่อยากพักจริง ๆ",
      spotAlt: "ลูกประคบสมุนไพรและผ้าลินินในห้องสปา", spotMin: "นาที", spotOpts: "ตัวเลือกเวลา", spotPrice: "เริ่มต้น / ท่าน", spotBtn: "ดูทรีตเมนต์นี้",
      checkEyebrow: "BEFORE YOU BOOK · ก่อนจอง", checkTitle: "3 เรื่องที่ควรดูก่อนเลือก",
      checkLead: "เช็ก 3 เรื่องนี้ก่อนจอง จะได้ทรีตเมนต์ที่พอดีกับเวลา คนที่ไปด้วย และงบของคุณ",
      checkM1: "ราคาเป็นราคาโดยประมาณ ยืนยันอีกครั้งตอนชำระเงิน", checkM2: "ข้อมูลสุขภาพแจ้งได้ในขั้นตอนกรอกรายละเอียด",
      s1: "ระยะเวลาและแรงนวด", s1b: "เลือกความยาวที่พอดีกับวันของคุณ แล้วบอกแรงนวดที่ชอบตอนกรอกรายละเอียดการจอง",
      s2: "ใครไปด้วย", s2b: "ทรีตเมนต์คู่ใช้นักบำบัดสองคน ผู้ที่อายุต่ำกว่า 18 ปีต้องมีผู้ปกครองอยู่ด้วย จองได้สูงสุด 6 ท่านต่อครั้ง",
      s3: "แพ็กเกจมีอะไรบ้าง", s3b: "ดูสิ่งที่รวมและไม่รวม เช่น ค่าเดินทางถึงโรงแรม ก่อนชำระเงินทุกครั้ง",
      faqEyebrow: "FAQ · คำถามที่พบบ่อย", faqTitle: "คำถามที่พบบ่อย", faqLead: "ถ้ามีคำถามเรื่องสุขภาพ โปรดปรึกษาแพทย์ของคุณก่อนจอง",
      q1: "ต้องทำแบบสอบถามก่อนจองไหม", a1: "ไม่ต้อง คุณดูและจองทรีตเมนต์ทั้งหมดได้เลย แบบสอบถามเป็นแค่ตัวช่วยแนะนำ",
      q2: "ข้อมูลสุขภาพของฉันจะถูกส่งให้ใคร", a2: "เราขอข้อมูลสุขภาพเฉพาะในขั้นตอนกรอกรายละเอียด หลังคุณให้ความยินยอม และส่งให้เฉพาะสถานที่ที่ดูแลการจองนั้น ไม่นำไปใช้แนะนำสินค้าหรือการตลาด",
      q3: "เปลี่ยนเวลาหรือยกเลิกได้ไหม", a3: "ได้ ยกเลิกฟรีก่อนเวลานัด 24 ชั่วโมง คืนเงิน 50% เมื่อยกเลิกก่อน 6–24 ชั่วโมง ยกเลิกหรือเปลี่ยนเวลาได้ที่หน้า “การจองของฉัน”",
      cityEyebrow: "DESTINATIONS · เมือง", cityTitle: "เลือกตามเมืองที่คุณอยู่", cityCount: function (n) { return n + " ทรีตเมนต์"; }, faqAll: "ดูคำถามทั้งหมด",
      ctaTitle: "หาทรีตเมนต์ที่ใช่สำหรับวันนี้", ctaSub: "ดูทั้งหมดได้เลย หรือให้เราช่วยแนะนำจากคำตอบ 3 ข้อ", ctaBrowse: "ดูทรีตเมนต์ทั้งหมด", ctaQuiz: "ทำแบบสอบถาม"
    },
    en: {
      heroEyebrow: "WELLNESS · THAILAND", heroTitle: "Care that fits you",
      heroSub: "Tell us how you feel today, then pick a Thai massage, spa, yoga class or retreat that suits you in Bangkok, Chiang Mai and Phuket.",
      fTreat: "Treatment", fDate: "Date", fGuests: "Guests", anyTreat: "Thai massage, spa, yoga…", anyDate: "Any date",
      search: "Search", searchAria: "Search treatments", panelTreat: "Choose a treatment type", panelDate: "Choose a date", panelGuests: "Number of guests",
      all: "Any treatment", close: "Close", quickAria: "Quick picks", prevMonth: "Previous month", nextMonth: "Next month",
      calNote: "Bookable up to 30 days ahead · the dot marks today",
      clear: "Clear all", back: "Back", next: "Next", show: "Show treatments", step: function (n) { return "Step " + n + " of 3"; },
      qToday: "Today", qTomorrow: "Tomorrow", qWeekend: "This weekend", qAny: "Any date", qAnySub: "See every day",
      sampleBadge: "Sample · ตัวอย่าง", sampleNote: "Demo: every venue, price and time shown is sample content.",
      catEyebrow: "CATEGORIES", catTitle: "Browse by what you want to do", allLink: "All treatments",
      quizEyebrow: "PICKED FOR YOU", quizTitle: "Answer three questions, see what fits",
      quizLead: "We only use your answers from right now. No health questions, and this is not a medical assessment. You can skip it any time.",
      quizDone: "Ready. We picked treatments that match your answers.", seeMatches: "See my matches", reset: "Start over",
      qBody: "Your answers help us suggest treatments. This is not a medical assessment and your answers are not saved.",
      qBodyDone: "See the picks below, each with the reasons it fits you.", picksTitle: "Treatments that match your answers",
      picksEmpty: "Answer all three questions to see picks, or browse everything.",
      photo: "Sample photo", spotEyebrow: "SPOTLIGHT · SAMPLE VENUE", spotTitle: "A slow afternoon in a Chiang Mai herb garden",
      spotBody: "Warm herbal compresses, then a slow-rhythm aromatherapy oil massage in a room that looks onto the garden. Made for days when you want to switch off.",
      spotAlt: "Herbal compresses and linen in a spa room", spotMin: "minutes", spotOpts: "length options", spotPrice: "from / person", spotBtn: "See this treatment",
      checkEyebrow: "BEFORE YOU BOOK", checkTitle: "Three things to check before you choose",
      checkLead: "A quick check before you book, so the treatment fits your time, your group and your budget.",
      checkM1: "Prices are estimates, confirmed at checkout", checkM2: "Share health details in the booking details step",
      s1: "Duration and pressure", s1b: "Pick a length that fits your day, then tell us the pressure you like when you fill in your details.",
      s2: "Who is joining", s2b: "Couples treatments use two therapists. Guests under 18 need a parent or guardian on site. Up to 6 guests per booking.",
      s3: "What is included", s3b: "Check what is and is not included, such as in-hotel travel fees, before you pay.",
      faqEyebrow: "FAQ", faqTitle: "Common questions", faqLead: "For questions about your health, please check with your doctor before booking.",
      q1: "Do I have to take the quiz?", a1: "No. You can browse and book every treatment without it; the quiz only helps you choose.",
      q2: "Who sees my health details?", a2: "We ask for health details only in the booking details step, after you consent, and share them only with the venue handling that booking. They are never used for recommendations or marketing.",
      q3: "Can I change my time or cancel?", a3: "Yes. Cancel for free up to 24 hours before, or get 50% back between 6 and 24 hours before. Manage it from My bookings.",
      cityEyebrow: "DESTINATIONS", cityTitle: "Browse by city", cityCount: function (n) { return n + " treatments"; }, faqAll: "See all questions",
      ctaTitle: "Find a treatment that fits today", ctaSub: "Browse everything, or let three quick answers narrow it down.", ctaBrowse: "Browse all treatments", ctaQuiz: "Take the quiz"
    }
  };

  /* ---------- Page state (hero search panel is local to this page) ---------- */
  var state = {
    panel: null,      // which search step is open: 0 treatment, 1 date, 2 guests, null closed
    cat: "all",       // chosen treatment category
    dateIdx: -1,      // days from today, -1 = any date
    party: null,      // { a: adults, s: seniors, c: children }
    monthOff: 0       // calendar month offset from this month
  };
  function answers() { return WP.get("answers", {}); }
  function setAnswers(a) { WP.set({ answers: a }); }

  /* ---------- Decorative SVGs (unchanged from the original) ---------- */
  var HERO_ART = '<svg class="s-hero-art" viewBox="0 0 1440 170" preserveAspectRatio="xMidYMax slice" aria-hidden="true">' +
    '<path d="M0 118 C200 76 360 106 540 86 C720 66 860 102 1040 84 C1200 68 1330 94 1440 78 L1440 170 L0 170 Z" fill="#9fcdb3" fill-opacity="0.07"></path>' +
    '<g fill="#9fcdb3" fill-opacity="0.12"><path d="M1050 124 L1120 86 L1190 124 Z"></path><path d="M1072 94 L1120 66 L1168 94 Z"></path><path d="M1094 70 L1120 50 L1146 70 Z"></path>' +
    '<rect x="1072" y="122" width="96" height="30"></rect><rect x="1118" y="26" width="4" height="26"></rect><path d="M300 136 L352 108 L404 136 Z"></path>' +
    '<rect x="312" y="136" width="5" height="22"></rect><rect x="387" y="136" width="5" height="22"></rect></g>' +
    '<path d="M0 146 C240 126 480 154 720 138 C960 122 1200 150 1440 134 L1440 170 L0 170 Z" fill="#0b241c" fill-opacity="0.5"></path></svg>';
  /* Full-width landscape behind the quiz result: low hills across the whole box (so the text stays readable),
     palm tree and pagoda on the right. Anchored bottom-right, so narrow screens crop from the left. */
  var QUIZ_ART = '<svg class="s-qresult-art" viewBox="0 0 1440 160" preserveAspectRatio="xMaxYMax slice" aria-hidden="true">' +
    '<path d="M0 128 C260 116 520 132 780 118 C1020 104 1240 84 1440 76 L1440 160 L0 160 Z" fill="#e1f0e7"></path>' +
    '<g class="s-qa-deco" transform="translate(1040 8) scale(1.2)">' +
      '<g fill="#1b4637"><rect x="250" y="76" width="48" height="20"></rect><path d="M240 78 L274 56 L308 78 Z"></path><path d="M252 60 L274 44 L296 60 Z"></path><rect x="272" y="26" width="4" height="20"></rect></g>' +
      '<path d="M120 122 C124 98 120 86 128 70" stroke="#12352b" stroke-width="5" fill="none" stroke-linecap="round"></path>' +
      '<g fill="#2f7d62"><path d="M128 70 C114 60 98 62 86 70 C102 68 114 70 128 74 Z"></path><path d="M128 70 C142 58 160 58 172 66 C156 66 142 68 128 76 Z"></path><path d="M128 70 C122 54 108 46 96 48 C110 54 120 62 126 74 Z"></path><path d="M128 70 C136 54 150 48 162 50 C148 56 138 64 130 74 Z"></path></g>' +
    "</g>" +
    '<path d="M0 142 C320 132 640 148 960 136 C1160 128 1320 118 1440 116 L1440 160 L0 160 Z" fill="#9fcdb3"></path>' +
    '<path d="M0 154 C360 148 720 158 1080 150 C1260 146 1380 148 1440 146 L1440 160 L0 160 Z" fill="#12352b"></path></svg>';

  /* ---------- Sections ---------- */
  function heroSection(lang, t) {
    var party = D.partyNorm(state.party);
    var catName = state.cat === "all" ? t.anyTreat : D.L(D.cat(state.cat), lang);
    var fields = [
      { icon: "lotus", label: t.fTreat, value: catName },
      { icon: "calendar", label: t.fDate, value: state.dateIdx >= 0 ? D.dayInfo(state.dateIdx, lang).label : t.anyDate },
      { icon: "users", label: t.fGuests, value: D.partyLabel(party, lang) }
    ];
    var photos = D.photos.heroes || [];
    var bg = D.photos.hero
      ? '<div class="s-hero-slides" aria-hidden="true">' + photos.map(function (h, i) {
          return '<div class="s-hero-slide s-slide-' + (i + 1) + '"><img class="s-hero-img" src="' + esc(h.src) + '" alt=""></div>';
        }).join("") + '</div><div class="s-hero-shade"></div>'
      : HERO_ART;
    return '<section class="s-band s-hero s-dark" aria-labelledby="hero-title">' + bg +
      '<div class="s-shell">' +
        '<p class="s-eyebrow">' + esc(t.heroEyebrow) + "</p>" +
        '<h1 id="hero-title" class="s-display" style="max-width: 760px; text-shadow: 0 4px 24px rgba(0,0,0,.18);">' + esc(t.heroTitle) + "</h1>" +
        '<p class="s-hero-sub">' + esc(t.heroSub) + "</p>" +
        UI.searchBar({ fields: fields, buttonLabel: t.search, ariaLabel: t.searchAria, openIndex: state.panel }) +
        (state.panel !== null ? searchPanel(lang, t, party) : "") +
        '<p style="margin: 20px 0 0; display: flex; flex-wrap: wrap; gap: 10px; align-items: center; font-size: 14px; color: var(--on-forest-muted);">' +
          UI.badge(t.sampleBadge, "notice") + "<span>" + esc(t.sampleNote) + "</span></p>" +
      "</div></section>";
  }

  function searchPanel(lang, t, party) {
    var p = state.panel, titles = [t.panelTreat, t.panelDate, t.panelGuests], body = "";
    if (p === 0) {
      var tiles = [{ id: "all", icon: "sparkle", label: t.all }].concat(D.cats.map(function (c) { return { id: c.id, icon: c.icon, label: D.L(c, lang) }; }));
      body = '<div class="s-tiles" role="group" aria-label="' + esc(t.panelTreat) + '">' + tiles.map(function (c) {
        return '<button type="button" class="s-tile" aria-pressed="' + (state.cat === c.id) + '" data-action="pickCat" data-arg="' + esc(c.id) + '">' +
          '<span class="s-tile-ico" aria-hidden="true">' + icon(c.icon) + "</span><span>" + esc(c.label) + "</span></button>";
      }).join("") + "</div>";
    }
    if (p === 1) {
      var wk = D.weekendIdx(), d0 = D.dayInfo(0, lang), d1 = D.dayInfo(1, lang), dw = D.dayInfo(wk, lang);
      var quick = [
        { label: t.qToday, sub: d0.dow + " " + d0.day, i: 0 },
        { label: t.qTomorrow, sub: d1.dow + " " + d1.day, i: 1 },
        { label: t.qWeekend, sub: dw.dow + " " + dw.day, i: wk },
        { label: t.qAny, sub: t.qAnySub, i: -1 }
      ];
      body = '<div class="s-datepane">' +
        '<div class="s-quick" role="group" aria-label="' + esc(t.quickAria) + '">' + quick.map(function (q) {
          return '<button type="button" class="s-qbtn" aria-pressed="' + (state.dateIdx === q.i) + '" data-action="pickDate" data-arg="' + q.i + '"><span>' + esc(q.label) + '</span><span class="s-sub">' + esc(q.sub) + "</span></button>";
        }).join("") + "</div>" +
        "<div>" + WP.calendarHtml(state.monthOff, state.dateIdx, lang, { prev: t.prevMonth, next: t.nextMonth }) +
          '<p class="s-cal-note">' + esc(t.calNote) + "</p></div></div>";
    }
    if (p === 2) {
      body = WP.partyHtml(party, lang) + '<p class="s-party-note">' + esc(D.partyNote(party, lang)) + "</p>";
    }
    return '<div class="s-panel" role="group" aria-label="' + esc(titles[p]) + '">' +
      '<div class="s-panel-head"><div><p class="s-panel-step">' + esc(t.step(p + 1)) + '</p><strong class="s-panel-title">' + esc(titles[p]) + "</strong></div>" +
        '<button type="button" class="wp-icon-btn" aria-label="' + esc(t.close) + '" data-action="closePanel">' + icon("close") + "</button></div>" +
      body +
      '<div class="s-panel-foot">' +
        '<button type="button" class="s-textbtn" data-action="clearAll">' + esc(t.clear) + "</button>" +
        '<div class="s-btn-row">' +
          (p > 0 ? UI.button({ label: t.back, variant: "ghost", size: "sm", action: "stepBack" }) : "") +
          (p !== 2 ? UI.button({ label: t.next, size: "sm", arrow: true, action: "stepNext" }) : "") +
          (p === 2 ? UI.button({ label: t.show, size: "sm", arrow: true, action: "submitSearch" }) : "") +
        "</div></div></div>";
  }

  function categoriesSection(lang, t) {
    return '<section class="s-section" aria-labelledby="cat-title"><div class="s-shell">' +
      '<div class="s-head-row"><div><p class="s-eyebrow">' + esc(t.catEyebrow) + '</p><h2 id="cat-title" class="s-h2">' + esc(t.catTitle) + "</h2></div>" +
        '<button type="button" class="s-textbtn" data-action="wp:all">' + esc(t.allLink) + " →</button></div>" +
      '<div class="s-grid-cats">' + D.cats.map(function (c) {
        var label = D.L(c, lang).replace("สปาและอโรมาเทอราพี", "สปาและ\nอโรมาเทอราพี");
        return '<div class="s-cardwrap">' + UI.categoryCard({ label: label, icon: c.icon, href: WP.url("treatments.html?cat=" + c.id), style: "height: 100%;" }) + "</div>";
      }).join("") + "</div></div></section>";
  }

  function citySection(lang, t) {
    return '<section class="s-section" style="padding-top: 0;" aria-labelledby="city-title"><div class="s-shell">' +
      '<div class="s-head-row"><div><p class="s-eyebrow">' + esc(t.cityEyebrow) + '</p><h2 id="city-title" class="s-h2">' + esc(t.cityTitle) + "</h2></div></div>" +
      '<div class="s-city-grid">' + D.cityCards.map(function (c) {
        var n = D.treatments.filter(function (tr) { return tr.city === c.id; }).length;
        return '<a class="s-city-card" href="' + WP.url("treatments.html?city=" + c.id) + '"><img src="' + esc(c.image) + '" alt="" loading="lazy">' +
          '<span class="s-city-body"><span class="s-city-name">' + esc(D.L(D.cities[c.id], lang)) + icon("arrow") + "</span>" +
          '<span class="s-city-blurb">' + esc(D.L(c.blurb, lang)) + '</span><span class="s-city-count">' + esc(t.cityCount(n)) + "</span></span></a>";
      }).join("") + "</div></div></section>";
  }

  function quizSection(lang, t) {
    var ans = answers(), th = lang === "th";
    var qs = D.quiz(lang);
    var done = qs.filter(function (q) { return ans[q.id]; }).length, complete = done === qs.length;
    var picks = D.match(ans, lang);
    var groups = qs.map(function (q, i) {
      return '<fieldset class="s-qgroup"><legend><span class="s-qnum">0' + (i + 1) + "</span><span>" + esc(q.question) + "</span></legend>" +
        '<div class="s-qopts">' + q.options.map(function (o) {
          return '<button type="button" class="s-qopt" aria-pressed="' + (ans[q.id] === o.value) + '" data-action="answer" data-arg="' + esc(q.id + ":" + o.value) + '">' +
            icon(o.icon) + '<span class="s-qopt-label">' + esc(o.label) + '</span><span class="s-qradio" aria-hidden="true"></span></button>';
        }).join("") + "</div></fieldset>";
    }).join("");
    var resultTitle = complete ? t.quizDone : (th ? "ตอบให้ครบ 3 ข้อ · ตอบแล้ว " + done + " ข้อ" : "Answer all 3 questions · " + done + " answered");
    var picksHtml = picks.length
      ? '<h3 class="s-h3" style="margin-bottom: 20px; font-size: 24px; text-align: center;">' + esc(t.picksTitle) + "</h3>" +
        '<div class="s-grid-3">' + picks.map(function (p) {
          return '<div class="s-cardwrap">' + UI.treatmentCard(Object.assign({}, p, { lang: lang, href: WP.url("detail.html?id=" + p.id), saved: WP.isSaved(p.id) })) + "</div>";
        }).join("") + "</div>"
      : '<div class="s-empty"><span class="s-icon-tile">' + icon("sparkle") + '</span><p style="margin: 0; max-width: 460px;">' + esc(t.picksEmpty) + "</p>" +
        UI.button({ label: t.allLink, variant: "ghost", size: "sm", action: "wp:all" }) + "</div>";

    return '<section id="quiz" class="s-section s-alt" aria-labelledby="quiz-title"><div class="s-shell">' +
      '<div class="s-head-row s-center"><div><p class="s-eyebrow">' + esc(t.quizEyebrow) + '</p><h2 id="quiz-title" class="s-h2">' + esc(t.quizTitle) + '</h2><p class="s-lead">' + esc(t.quizLead) + "</p></div></div>" +
      '<div class="s-qprogress" role="progressbar" aria-valuemin="0" aria-valuemax="3" aria-valuenow="' + done + '" aria-label="' + esc(th ? "ตอบแล้ว " + done + " จาก 3 ข้อ" : done + " of 3 answered") + '"><span style="width: ' + Math.round(done / qs.length * 100) + '%;"></span></div>' +
      '<div class="s-qgrid">' + groups + "</div>" +
      '<div class="s-qresult' + (complete ? " is-done" : "") + '" aria-live="polite"><div class="s-qresult-text">' +
        '<p class="s-qresult-title">' + (complete ? icon("check") : "") + esc(resultTitle) + "</p>" +
        '<p class="s-qresult-body">' + esc(complete ? t.qBodyDone : t.qBody) + "</p>" +
        '<div class="s-btn-row" style="margin-top: 14px;">' +
          (complete ? UI.button({ label: t.seeMatches, size: "sm", arrow: true, href: "#picked" }) : "") +
          UI.button({ label: t.allLink, variant: "ghost", size: "sm", action: "wp:all" }) +
          (done ? '<button type="button" class="s-textbtn" data-action="quizReset">' + esc(t.reset) + "</button>" : "") +
        "</div></div>" + QUIZ_ART + "</div>" +
      '<div id="picked" style="margin-top: 48px;">' + picksHtml + "</div>" +
      "</div></section>";
  }

  function spotlightSection(lang, t) {
    var sp = D.get("herbal-compress");
    var media = D.photos.spot
      ? '<img class="s-cover" src="' + esc(D.photos.spot) + '" alt="' + esc(t.spotAlt) + '">'
      : '<span class="s-frost" aria-hidden="true">' + icon("drop") + '</span><span class="s-photo-label">' + esc(t.photo) + "</span>";
    return '<section class="s-section" aria-labelledby="spot-title"><div class="s-shell"><article class="s-spot">' +
      '<div class="s-spot-media">' + media + "</div>" +
      '<div class="s-spot-body">' +
        '<p class="s-eyebrow" style="margin: 0;">' + esc(t.spotEyebrow) + "</p>" +
        '<h2 id="spot-title" class="s-h2" style="font-weight: 400;">' + esc(t.spotTitle) + "</h2>" +
        '<p style="margin: 0; line-height: 1.85; color: var(--ink-2);">' + esc(t.spotBody) + "</p>" +
        '<div class="s-facts">' +
          '<div class="s-fact"><strong>' + sp.options[0].min + "</strong><span>" + esc(t.spotMin) + "</span></div>" +
          '<div class="s-fact"><strong>' + sp.options.length + "</strong><span>" + esc(t.spotOpts) + "</span></div>" +
          '<div class="s-fact"><strong>' + esc(D.baht(sp.options[0].price)) + "</strong><span>" + esc(t.spotPrice) + "</span></div>" +
        "</div>" +
        '<div class="s-btn-row">' + UI.button({ label: t.spotBtn, arrow: true, href: WP.url("detail.html?id=herbal-compress") }) + UI.badge(t.sampleBadge, "notice") + "</div>" +
      "</div></article></div></section>";
  }

  function checklistSection(lang, t) {
    var steps = [{ n: 1, title: t.s1, body: t.s1b, icon: "clock" }, { n: 2, title: t.s2, body: t.s2b, icon: "users" }, { n: 3, title: t.s3, body: t.s3b, icon: "check" }];
    return '<section class="s-section s-alt" aria-labelledby="check-title"><div class="s-shell"><div class="s-check">' +
      '<div class="s-check-intro">' +
        '<p class="s-eyebrow">' + esc(t.checkEyebrow) + '</p><h2 id="check-title" class="s-h2">' + esc(t.checkTitle) + '</h2><p class="s-lead">' + esc(t.checkLead) + "</p>" +
        '<div class="s-check-meta"><span>' + icon("shield") + esc(t.checkM1) + "</span><span>" + icon("info") + esc(t.checkM2) + "</span></div>" +
        '<div class="s-btn-row" style="margin-top: 8px;">' + UI.button({ label: t.allLink, arrow: true, action: "wp:all" }) + "</div>" +
      "</div>" +
      '<ol class="s-check-list">' + steps.map(function (st) {
        return '<li class="s-check-item"><span class="s-num-tile">' + st.n + '</span><div class="s-check-body"><h3 class="s-h3">' + esc(st.title) + '</h3><p class="s-small" style="margin: 4px 0 0;">' + esc(st.body) + "</p></div>" +
          '<span class="s-check-ico" aria-hidden="true">' + icon(st.icon) + "</span></li>";
      }).join("") + "</ol></div></div></section>";
  }

  function faqSection(lang, t) {
    return '<section class="s-section" aria-labelledby="faq-title"><div class="s-shell" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px 64px; align-items: start;">' +
      '<div><p class="s-eyebrow">' + esc(t.faqEyebrow) + '</p><h2 id="faq-title" class="s-h2">' + esc(t.faqTitle) + '</h2><p class="s-lead">' + esc(t.faqLead) + "</p></div>" +
      "<div>" + UI.faqItem(t.q1, t.a1) + UI.faqItem(t.q2, t.a2) + UI.faqItem(t.q3, t.a3) +
        '<p style="margin: 16px 0 0;"><a class="wp-link" href="' + WP.url("faq.html") + '">' + esc(t.faqAll) + " " + icon("arrow") + "</a></p></div>" +
      "</div></section>";
  }

  function ctaSection(lang, t) {
    return '<section class="s-section" style="padding-top: 0;" aria-labelledby="cta-title"><div class="s-shell"><div class="s-band s-cta s-dark wp-on-dark">' +
      '<div style="max-width: 620px;"><h2 id="cta-title" class="s-h2">' + esc(t.ctaTitle) + '</h2><p class="s-lead">' + esc(t.ctaSub) + "</p></div>" +
      '<div class="s-btn-row">' + UI.button({ label: t.ctaBrowse, arrow: true, action: "wp:all" }) + UI.button({ label: t.ctaQuiz, variant: "ghost", href: "#quiz" }) + "</div>" +
      "</div></div></section>";
  }

  /* ---------- Actions ---------- */
  function submitSearch() {
    var party = D.partyNorm(state.party);
    WP.go("treatments", { filterCat: state.cat, startDate: state.dateIdx >= 0 ? state.dateIdx : 0, startGuests: D.partyTotal(party), startParty: party });
    return false;
  }

  WP.page({
    active: "home",
    view: function (lang) {
      var t = TEXT[lang];
      return '<main id="main-content">' + heroSection(lang, t) + categoriesSection(lang, t) + citySection(lang, t) + quizSection(lang, t) +
        spotlightSection(lang, t) + checklistSection(lang, t) + faqSection(lang, t) + ctaSection(lang, t) + "</main>";
    },
    actions: {
      openPanel: function (i) { i = Number(i); state.panel = state.panel === i ? null : i; },
      closePanel: function () { state.panel = null; },
      stepBack: function () { state.panel = Math.max(0, state.panel - 1); },
      stepNext: function () { state.panel = Math.min(2, state.panel + 1); },
      clearAll: function () { state.cat = "all"; state.dateIdx = -1; state.party = null; state.monthOff = 0; state.panel = 0; },
      pickCat: function (id) { state.cat = id; state.panel = 1; },
      pickDate: function (i) { state.dateIdx = Number(i); state.panel = 2; },
      prevMonth: function () { state.monthOff = Math.max(0, state.monthOff - 1); },
      nextMonth: function () { state.monthOff = Math.min(WP.maxMonthOff(), state.monthOff + 1); },
      partyLess: function (i) { state.party = WP.partyChange(D.partyNorm(state.party), Number(i), "less"); },
      partyMore: function (i) { state.party = WP.partyChange(D.partyNorm(state.party), Number(i), "more"); },
      submitSearch: submitSearch,
      answer: function (arg) {
        var parts = arg.split(":"), next = Object.assign({}, answers());
        next[parts[0]] = parts[1];
        setAnswers(next);
      },
      quizReset: function () { setAnswers({}); }
    },
    submits: { submitSearch: submitSearch }
  });
})();
