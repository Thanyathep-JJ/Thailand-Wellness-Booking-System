/* Wellness Pass: Treatment detail (detail.html?id=<treatment id>).
   Gallery, options, length + date + start time + guests pickers, what's included, before you book, about, reviews,
   and a sticky summary with the estimated total and the Book button. */
(function () {
  "use strict";
  var D = window.WPData, UI = window.UI, WP = window.WP, esc = UI.esc, icon = UI.icon;

  var TEXT = {
    th: {
      back: "ทรีตเมนต์ทั้งหมด", photo: "ภาพตัวอย่าง", sample: "ตัวอย่าง · Sample", requestBadge: "รอสถานที่ยืนยัน",
      tabsAria: "หัวข้อในหน้านี้", tabOptions: "ตัวเลือก", tabTimes: "วันและเวลา", tabIncluded: "สิ่งที่รวม / ไม่รวม", tabBefore: "ก่อนจอง", tabAbout: "เกี่ยวกับ", tabReviews: "รีวิว",
      perPerson: "ท่าน", estimate: "ราคาโดยประมาณ ระบบจะคำนวณราคาจริงอีกครั้งตอนชำระเงิน",
      dateLabel: "วันที่", lengthLabel: "ความยาว", startTime: "เวลาเริ่ม", prevMonth: "เดือนก่อนหน้า", nextMonth: "เดือนถัดไป", quickAria: "ตัวเลือกด่วน", qToday: "วันนี้", qTomorrow: "พรุ่งนี้", qWeekend: "สุดสัปดาห์นี้", qNextWeek: "สัปดาห์หน้า", calNote: "จองล่วงหน้าได้ 30 วัน · จุดใต้วันที่คือวันนี้", noTimes: "วันนี้ไม่มีเวลาว่างแล้ว ลองเลือกวันอื่น", today: "วันนี้", fullSuffix: " เต็มแล้ว",
      slotNote: "การเลือกเวลายังไม่ใช่การจอง เวลาจะถูกกันไว้ให้หลังเริ่มชำระเงินเท่านั้น เวลาในเขตเวลาประเทศไทย",
      guests: "ผู้เข้าร่วม", inc: "รวมในราคา", exc: "ไม่รวมในราคา",
      healthTitle: "สุขภาพและความปลอดภัย", healthBody: "ถ้าคุณตั้งครรภ์ มีอาการบาดเจ็บ หรือมีโรคประจำตัว คุณจะแจ้งได้ในขั้นตอนกรอกรายละเอียด หากไม่แน่ใจว่าทรีตเมนต์นี้เหมาะกับคุณหรือไม่ โปรดปรึกษาแพทย์ของคุณ",
      b1: "มาถึงก่อนเวลาประมาณ 15 นาที", b2: "หลีกเลี่ยงอาหารมื้อหนักก่อนนวดประมาณ 1 ชั่วโมง", b3: "บอกนักบำบัดได้ตลอดถ้าแรงนวดมากหรือน้อยเกินไป",
      venueNote: "ชื่อสถานที่ ที่อยู่ และรีวิวเป็นข้อมูลตัวอย่างสำหรับเดโม", hours: "เวลาเปิด", daily: "ทุกวัน", openMap: "เปิดใน Google Maps", mapTitle: "แผนที่",
      reviewsOf: function (n) { return "จาก " + n + " รีวิวตัวอย่าง"; }, reviewsNote: "รีวิวในเดโมนี้เป็นตัวอย่าง ในเว็บไซต์จริงจะแสดงเฉพาะรีวิวจากผู้ที่ใช้บริการแล้ว", daysAgo: function (n) { return n + " วันที่แล้ว"; },
      viewPhotos: "ดูรูปทั้งหมด", photoOf: function (i, n) { return "รูปที่ " + i + " จาก " + n; }, prevPhoto: "รูปก่อนหน้า", nextPhoto: "รูปถัดไป", openPhoto: "เปิดรูปขนาดใหญ่",
      panelAria: "สรุปการจอง", estTotal: "ราคารวมโดยประมาณ", sLength: "ความยาว", sDate: "วันที่", sTime: "เวลาเริ่ม", sGuests: "ผู้เข้าร่วม", sFee: "ค่าเดินทางถึงโรงแรม",
      pickTime: "ยังไม่ได้เลือก", needSlot: "เลือกเวลาเริ่มก่อนดำเนินการต่อ", book: "จองทรีตเมนต์นี้", request: "ส่งคำขอจอง",
      noHold: "ยังไม่มีการตัดเงินในขั้นตอนนี้", requestTitle: "คำขอจอง", requestBody: "สถานที่จะยืนยันการจองภายใน 12 ชั่วโมง ถ้าไม่ได้รับการยืนยัน คุณจะไม่ถูกเรียกเก็บเงิน",
      intensity: "ความเข้มข้น: ", photoN: function (n) { return " · ภาพที่ " + n; }
    },
    en: {
      back: "All treatments", photo: "Sample photo", sample: "Sample · ตัวอย่าง", requestBadge: "Venue confirms",
      tabsAria: "On this page", tabOptions: "Options", tabTimes: "Date and time", tabIncluded: "Included / not included", tabBefore: "Before you book", tabAbout: "About", tabReviews: "Reviews",
      perPerson: "person", estimate: "Estimated prices. Checkout re-prices on the server.",
      dateLabel: "Date", lengthLabel: "Length", startTime: "Start time", prevMonth: "Previous month", nextMonth: "Next month", quickAria: "Quick picks", qToday: "Today", qTomorrow: "Tomorrow", qWeekend: "This weekend", qNextWeek: "Next week", calNote: "Bookable up to 30 days ahead · the dot marks today", noTimes: "No times left on this day. Please pick another date.", today: "Today", fullSuffix: ", fully booked",
      slotNote: "Picking a time does not reserve it. It is held only once checkout starts. Times are Thailand time.",
      guests: "Guests", inc: "Included", exc: "Not included",
      healthTitle: "Health and safety", healthBody: "If you are pregnant, injured or have a health condition, you can tell us in the details step. If you are unsure whether this treatment suits you, please check with your doctor.",
      b1: "Arrive about 15 minutes early", b2: "Avoid a heavy meal for about an hour before a massage", b3: "Tell your therapist any time the pressure is too much or too little",
      venueNote: "Venue names, addresses and reviews are sample content for this demo.", hours: "Opening hours", daily: "daily", openMap: "Open in Google Maps", mapTitle: "Map",
      reviewsOf: function (n) { return "from " + n + " sample reviews"; }, reviewsNote: "Reviews in this demo are samples. On a live site only guests who completed a visit could review.", daysAgo: function (n) { return n + " days ago"; },
      viewPhotos: "View photos", photoOf: function (i, n) { return "Photo " + i + " of " + n; }, prevPhoto: "Previous photo", nextPhoto: "Next photo", openPhoto: "Open larger photo",
      panelAria: "Booking summary", estTotal: "Estimated total", sLength: "Length", sDate: "Date", sTime: "Start time", sGuests: "Guests", sFee: "In-hotel travel fee",
      pickTime: "Not chosen yet", needSlot: "Pick a start time to continue.", book: "Book this treatment", request: "Send booking request",
      noHold: "Nothing is charged at this step.", requestTitle: "Request to book", requestBody: "The venue confirms within 12 hours. If it is not confirmed, you are not charged.",
      intensity: "Intensity: ", photoN: function (n) { return " · photo " + n; }
    }
  };

  var tr = D.get(WP.param("id") || WP.get("treatmentId", "thai-traditional"));
  WP.set({ treatmentId: tr.id });
  var mins = tr.options.map(function (o) { return o.min; });
  var startDate = Math.min(D.WINDOW - 1, Math.max(0, WP.get("startDate", 0)));
  /* First day from `idx` onwards that still has a free start time (e.g. skips today after the last slot). */
  function firstOpenDay(idx) {
    for (var i = idx; i < D.WINDOW; i++) if (D.slotList(i, tr).some(function (x) { return x.state !== "full"; })) return i;
    return idx;
  }
  /* Calendar month (0 = this month) that contains the date `idx` days from today. */
  function monthOffFor(idx) {
    var n = new Date(), d = new Date(n.getFullYear(), n.getMonth(), n.getDate() + idx);
    return (d.getFullYear() - n.getFullYear()) * 12 + d.getMonth() - n.getMonth();
  }

  /* If the user comes back from the booking page for the same treatment, restore their choices. */
  var prev = WP.get("booking", null);
  var same = prev && prev.id === tr.id;
  var state = {
    dur: same && mins.indexOf(prev.dur) >= 0 ? prev.dur : mins[0],
    dateIdx: same ? prev.dateIdx : firstOpenDay(startDate),
    slot: same ? prev.slot : null,
    party: D.partyNorm(same && prev.party ? prev.party : (WP.get("startParty", null) || { a: Math.min(6, Math.max(1, WP.get("startGuests", 1))) })),
    err: false
  };

  /* All photos of this treatment, in gallery order (null where a photo is missing). */
  function photoList(lang, t) {
    var P = D.photos, gl = (P.galleryById && P.galleryById[tr.id]) || P.gallery || [], name = D.L(tr.title, lang);
    return [P.byId[tr.id], gl[0], gl[1]].map(function (src, i) { return src ? { src: src, alt: i ? name + t.photoN(i + 1) : name } : null; });
  }
  function gallery(lang, t) {
    var list = photoList(lang, t);
    var cell = function (p, i, fallback) {
      if (!p) return fallback;
      return '<button type="button" class="s-gallery-btn" data-action="openPhoto" data-arg="' + i + '" aria-label="' + esc(t.openPhoto + ": " + p.alt) + '">' +
        '<img class="s-cover" src="' + esc(p.src) + '" alt="' + esc(p.alt) + '"' + (i ? ' loading="lazy"' : "") + "></button>" +
        (i === 0 ? '<span class="s-gallery-more">' + icon("search") + esc(t.viewPhotos) + "</span>" : "");
    };
    return '<div class="s-gallery">' +
      "<div>" + cell(list[0], 0, '<span class="s-frost" aria-hidden="true">' + icon(tr.icon) + '</span><span class="s-photo-label">' + esc(t.photo) + "</span>") + "</div>" +
      '<div class="s-sand">' + cell(list[1], 1, icon("leaf", { label: t.photo })) + "</div>" +
      '<div class="s-sand">' + cell(list[2], 2, icon("lotus", { label: t.photo })) + "</div>" +
      "</div>";
  }

  /* Photo viewer: a dialog with previous / next buttons (arrow keys work too). */
  function openLightbox(start) {
    var lang = WP.getLang(), t = TEXT[lang], list = photoList(lang, t).filter(Boolean), i = Math.min(start, list.length - 1);
    if (!list.length) return;
    var paint = function (dlg) {
      var p = list[i], img = dlg.querySelector(".s-lb-stage img");
      img.src = p.src; img.alt = p.alt;
      dlg.querySelector(".s-lb-count").textContent = t.photoOf(i + 1, list.length);
      dlg.querySelector(".s-lb-alt").textContent = p.alt;
    };
    WP.dialog({
      title: D.L(tr.title, lang), wide: true, cls: "wp-lightbox",
      html: '<div class="s-lb-stage"><img src="" alt="">' +
        (list.length > 1 ? '<button type="button" class="s-lb-nav s-lb-prev" aria-label="' + esc(t.prevPhoto) + '">' + icon("left") + "</button>" +
          '<button type="button" class="s-lb-nav s-lb-next" aria-label="' + esc(t.nextPhoto) + '">' + icon("right") + "</button>" : "") +
        '</div><div class="s-lb-cap"><span class="s-lb-alt"></span><span class="s-lb-count" aria-live="polite"></span></div>',
      onOpen: function (dlg) {
        var step = function (d) { i = (i + d + list.length) % list.length; paint(dlg); };
        paint(dlg);
        dlg.addEventListener("click", function (e) {
          if (e.target.closest(".s-lb-prev")) step(-1);
          if (e.target.closest(".s-lb-next")) step(1);
        });
        dlg.addEventListener("keydown", function (e) {
          if (e.key === "ArrowLeft") step(-1);
          if (e.key === "ArrowRight") step(1);
        });
      }
    });
  }

  /* Stars + average under the title, linking to the reviews section. */
  function ratingRow(lang, t) {
    var r = D.rating(tr);
    return '<div class="s-rating-row">' + UI.stars(r.avg, r.avg.toFixed(1) + " / 5") + "<strong>" + r.avg.toFixed(1) + "</strong>" +
      '<a href="#reviews">' + esc(t.reviewsOf(r.count)) + "</a></div>";
  }

  function reviewsSection(lang, t) {
    var r = D.rating(tr), list = D.reviews(tr);
    return '<section id="reviews" class="s-block" aria-labelledby="h-rev"><h2 id="h-rev" class="s-h3">' + esc(t.tabReviews) + "</h2>" +
      '<div class="s-rev-top"><span class="s-rev-avg">' + r.avg.toFixed(1) + "</span>" + UI.stars(r.avg, r.avg.toFixed(1) + " / 5") +
        '<span class="s-small">' + esc(t.reviewsOf(r.count)) + "</span>" + UI.badge(t.sample, "notice") + "</div>" +
      '<div class="s-rev-list">' + list.map(function (x) {
        return '<article class="s-rev"><span class="s-avatar" aria-hidden="true">' + esc(x.name.charAt(0)) + "</span><div>" +
          '<div class="s-rev-head"><span><span class="s-rev-name">' + esc(x.name) + '</span> <span class="s-rev-meta">· ' + esc(D.L(x.from, lang)) + "</span></span>" +
            UI.stars(x.stars, x.stars + " / 5") + "</div>" +
          '<span class="s-rev-meta">' + esc(t.daysAgo(x.daysAgo)) + "</span>" +
          "<p>" + esc(x[lang] || x.en) + "</p></div></article>";
      }).join("") + "</div>" +
      '<p class="s-small" style="margin: 14px 0 0;">' + esc(t.reviewsNote) + "</p></section>";
  }

  /* Venue name, address, opening hours and an embedded Google map (needs an internet connection). */
  function venueBlock(lang, t) {
    var v = D.venues[tr.id];
    if (!v) return "";
    var q = encodeURIComponent(v.map);
    return '<div class="s-venue"><div class="s-venue-info"><strong>' + esc(v.name) + "</strong>" +
        '<span class="s-venue-row">' + icon("pin") + "<span>" + esc(D.L(v.addr, lang)) + "</span></span>" +
        '<span class="s-venue-row">' + icon("clock") + "<span>" + esc(t.hours + ": " + v.hours + " " + t.daily) + "</span></span>" +
        '<a class="wp-link" href="https://www.google.com/maps/search/?api=1&amp;query=' + q + '" target="_blank" rel="noopener">' + esc(t.openMap) + " " + icon("arrow") + "</a>" +
      "</div>" +
      '<div class="s-map"><iframe title="' + esc(t.mapTitle + ": " + v.name) + '" src="https://www.google.com/maps?q=' + q + '&amp;z=15&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>' +
      "</div>";
  }

  function timesSection(lang, t) {
    var dates = D.dates(lang);
    if (state.monthOff === undefined) state.monthOff = monthOffFor(state.dateIdx);
    var wk = D.weekendIdx(), nextWk = Math.min(D.WINDOW - 1, 7);
    var quick = [[t.qToday, 0], [t.qTomorrow, 1], [t.qWeekend, wk], [t.qNextWeek, nextWk]].map(function (q) {
      var d = dates[q[1]];
      return '<button type="button" class="s-qbtn" aria-pressed="' + (state.dateIdx === q[1]) + '" data-action="pickDate" data-arg="' + q[1] + '"><span>' + esc(q[0]) + '</span><span class="s-sub">' + esc(d.dow + " " + d.day) + "</span></button>";
    }).join("");
    var groups = D.slotGroups(state.dateIdx, lang, tr).filter(function (g) { return g.slots.length; });
    return '<section id="times" class="s-block" aria-labelledby="h-times"><h2 id="h-times" class="s-h3">' + esc(t.tabTimes) + "</h2>" +
      '<div class="s-slot-wrap">' +
        '<p class="wp-label" style="margin: 0 0 10px;">' + esc(t.lengthLabel) + "</p>" +
        '<div class="s-chips" role="group" aria-label="' + esc(t.lengthLabel) + '" style="margin-bottom: 24px;">' + mins.map(function (m) {
          return UI.chip({ label: D.minLabel(m, lang) + " · " + D.baht(D.priceFor(tr, m)), icon: "clock", selected: m === state.dur, action: "pickDur", arg: m });
        }).join("") + "</div>" +
        '<p class="wp-label" style="margin: 0 0 10px;">' + esc(t.dateLabel) + "</p>" +
        '<div class="s-datebox"><div class="s-datepane">' +
          '<div class="s-quick" role="group" aria-label="' + esc(t.quickAria) + '">' + quick + "</div>" +
          "<div>" + WP.calendarHtml(state.monthOff, state.dateIdx, lang, { prev: t.prevMonth, next: t.nextMonth }) +
            '<p class="s-cal-note">' + esc(t.calNote) + "</p></div>" +
        "</div></div>" +
        '<p class="wp-label" style="margin: 24px 0 0;">' + esc(t.startTime) + " · " + esc(dates[state.dateIdx].long) + "</p>" +
        (groups.every(function (g) { return !g.open; }) ? '<p class="s-err-text" style="margin-top: 12px;">' + icon("info") + esc(t.noTimes) + "</p>" : "") +
        groups.map(function (g) {
          return '<div class="s-slot-group" role="group" aria-label="' + esc(g.label) + '"><p class="s-slot-head">' + icon(g.icon) + esc(g.label) + '<span class="s-slot-count">· ' + esc(g.count) + "</span></p>" +
            '<div class="wp-slots-grid">' + g.slots.map(function (x) {
              var full = x.state === "full";
              return '<button type="button" class="wp-slot" aria-pressed="' + (state.slot === x.time) + '"' + (full ? ' aria-disabled="true"' : "") +
                ' aria-label="' + esc(x.time + (full ? t.fullSuffix : "")) + '" data-action="pickSlot" data-arg="' + x.time + '">' + x.time + "</button>";
            }).join("") + "</div></div>";
        }).join("") +
        '<p class="wp-slots-note">' + esc(t.slotNote) + "</p>" +
      "</div>" +
      '<div style="max-width: 560px; margin-top: 28px;"><p class="wp-label" style="margin: 0 0 4px;">' + esc(t.guests) + "</p>" +
        WP.partyHtml(state.party, lang) + '<p class="s-party-note">' + esc(D.partyNote(state.party, lang)) + "</p></div>" +
      "</section>";
  }

  function infoSections(lang, t) {
    var list = function (items, ico, cls) {
      return '<ul class="s-list' + (cls ? " " + cls : "") + '">' + items.map(function (i) { return "<li>" + icon(ico) + "<span>" + esc(i) + "</span></li>"; }).join("") + "</ul>";
    };
    return '<section id="included" class="s-block" aria-labelledby="h-inc"><h2 id="h-inc" class="s-h3">' + esc(t.tabIncluded) + "</h2>" +
        '<div class="s-two"><div><p class="wp-label" style="margin: 0 0 10px;">' + esc(t.inc) + "</p>" + list(D.included[lang], "check") + "</div>" +
        '<div><p class="wp-label" style="margin: 0 0 10px;">' + esc(t.exc) + "</p>" + list(D.excluded[lang], "plus", "is-no") + "</div></div></section>" +
      '<section id="before" class="s-block" aria-labelledby="h-before"><h2 id="h-before" class="s-h3">' + esc(t.tabBefore) + "</h2>" +
        UI.notice({ tone: "notice", title: t.healthTitle }, esc(t.healthBody)) +
        list([t.b1, t.b2, t.b3], "info").replace('class="s-list"', 'class="s-list" style="margin-top: 16px;"') + "</section>" +
      '<section id="about" class="s-block" aria-labelledby="h-about"><h2 id="h-about" class="s-h3">' + esc(t.tabAbout) + "</h2>" +
        '<p style="margin: 0; max-width: 680px; line-height: 1.85; color: var(--ink-2);">' + esc(D.L(tr.about, lang)) + "</p>" +
        venueBlock(lang, t) +
        '<p class="s-small" style="margin: 12px 0 0;">' + esc(t.venueNote) + "</p></section>" +
      reviewsSection(lang, t);
  }

  function summary(lang, t) {
    var dates = D.dates(lang), guests = D.partyTotal(state.party), fee = tr.travelFee || 0;
    var total = D.priceFor(tr, state.dur) * guests + fee;
    var bookLabel = tr.request ? t.request : t.book;
    return {
      total: total, bookLabel: bookLabel,
      html: '<aside class="s-sticky" aria-label="' + esc(t.panelAria) + '"><div class="s-card s-sum">' +
        '<div><p class="s-small" style="margin: 0;">' + esc(t.estTotal) + "</p>" + UI.money(total) + "</div>" +
        WP.sumRows([
          [t.sLength, D.minLabel(state.dur, lang) + " · " + D.baht(D.priceFor(tr, state.dur)) + " / " + t.perPerson],
          [t.sDate, dates[state.dateIdx].label],
          [t.sTime, state.slot || t.pickTime],
          [t.sGuests, D.partyLabel(state.party, lang)],
          fee > 0 && [t.sFee, D.baht(fee)]
        ]) +
        (state.err ? '<p class="s-err-text" role="alert">' + icon("alert") + esc(t.needSlot) + "</p>" : "") +
        '<div class="s-wide">' + UI.button({ label: bookLabel, variant: "cta", arrow: true, action: "book" }) + "</div>" +
        '<p class="s-small" style="margin: 0;">' + esc(t.noHold) + "</p>" +
        (tr.request ? UI.notice({ tone: "info", title: t.requestTitle }, esc(t.requestBody)) : "") +
        "</div></aside>"
    };
  }

  WP.page({
    active: "treatments",
    view: function (lang) {
      var t = TEXT[lang], th = lang === "th", sum = summary(lang, t);
      document.title = D.L(tr.title, lang) + " · Wellness Pass";
      var tabs = [["options", t.tabOptions], ["times", t.tabTimes], ["included", t.tabIncluded], ["before", t.tabBefore], ["about", t.tabAbout], ["reviews", t.tabReviews]];
      return '<main id="main-content" class="s-shell" style="padding: 20px 0 72px;">' +
        WP.backButton(t.back, "goBack") + gallery(lang, t) +
        '<div class="s-split"><div style="min-width: 0;">' +
          '<div class="s-chips" style="margin-bottom: 12px;">' + UI.badge(D.L(D.cat(tr.cat), lang), "jade", tr.icon) + UI.badge(t.sample, "notice") +
            (tr.request ? UI.badge(t.requestBadge, "neutral", "clock") : "") + "</div>" +
          '<h1 class="s-h1">' + esc(D.L(tr.title, lang)) + "</h1>" + ratingRow(lang, t) +
          '<div class="s-meta-row" style="margin-top: 12px;">' +
            "<span>" + icon("pin") + esc(D.venues[tr.id].name + " · " + D.L(D.cities[tr.city], lang)) + "</span>" +
            "<span>" + icon("clock") + esc(D.durLabel(tr, lang)) + "</span>" +
            "<span>" + icon("flame") + esc(t.intensity + D.L(D.intensity[tr.intensity], lang)) + "</span>" +
            "<span>" + icon("leaf") + esc(D.L(D.settings[tr.setting], lang)) + "</span></div>" +
          '<p style="margin: 16px 0 0; max-width: 680px; color: var(--ink-2);">' + esc(D.L(tr.summary, lang)) + "</p>" +
          '<nav class="s-tabs" aria-label="' + esc(t.tabsAria) + '">' + tabs.map(function (x) { return '<a href="#' + x[0] + '">' + esc(x[1]) + "</a>"; }).join("") + "</nav>" +
          '<section id="options" class="s-block" aria-labelledby="h-options"><h2 id="h-options" class="s-h3">' + esc(t.tabOptions) + "</h2>" +
            '<div class="s-opt-list">' + tr.options.map(function (o) {
              return '<div class="s-opt"><span style="display: flex; gap: 10px; align-items: center;">' + icon("clock") + "<strong>" + esc(D.minLabel(o.min, lang)) + "</strong></span>" +
                '<span><span class="s-price">' + esc(D.baht(o.price)) + '</span> <span class="s-small">/ ' + esc(t.perPerson) + "</span></span></div>";
            }).join("") + "</div>" +
            '<p class="s-small" style="margin: 12px 0 0;">' + esc(t.estimate) + "</p></section>" +
          timesSection(lang, t) + infoSections(lang, t) +
        "</div>" + sum.html + "</div></main>" +
        '<div class="s-mbar"><span><span class="s-small" style="display: block; line-height: 1.3;">' + esc(t.estTotal) + '</span><strong class="s-price">' + esc(D.baht(sum.total)) + "</strong></span>" +
          UI.button({ label: sum.bookLabel, variant: "cta", action: "book" }) + "</div>";
    },
    after: function () { document.querySelector(".s-page").classList.add("s-has-mbar"); },
    actions: {
      goBack: function () { WP.go("treatments", { filterCat: "all" }); return false; },
      pickDur: function (m) { state.dur = Number(m); },
      openPhoto: function (i) { openLightbox(Number(i)); return false; },
      prevMonth: function () { state.monthOff = Math.max(0, state.monthOff - 1); },
      nextMonth: function () { state.monthOff = Math.min(WP.maxMonthOff(), state.monthOff + 1); },
      pickDate: function (i) {
        var idx = Number(i);
        if (idx !== state.dateIdx) state.slot = null;   // times differ per day
        state.dateIdx = idx; state.monthOff = monthOffFor(idx);
      },
      pickSlot: function (time) { state.slot = time; state.err = false; },
      partyLess: function (i) { state.party = WP.partyChange(state.party, Number(i), "less"); },
      partyMore: function (i) { state.party = WP.partyChange(state.party, Number(i), "more"); },
      book: function () {
        if (!state.slot) { state.err = true; return; }
        WP.go("booking", { booking: { id: tr.id, dur: state.dur, dateIdx: state.dateIdx, slot: state.slot, guests: D.partyTotal(state.party), party: state.party } });
        return false;
      }
    }
  });
})();
