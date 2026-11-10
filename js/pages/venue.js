/* Wellness Pass: Shop dashboard (venue.html), the venue side of the platform.
   One example shop: Baan Nuad Sukhumvit (traditional Thai massage). Log in as shop@demo.com / shop1234;
   the admin (admin@demo.com) can open it too. A shop only sees its own bookings.
   Tabs: Overview (today, requests, next 7 days, history chart), Bookings (search, confirm, cancel, mark done),
   Schedule (week grid, close times or whole days), Menu & hours (prices per length, opening hours, pause bookings)
   and Reviews (rating breakdown, reply to guests; replies show on the public treatment page).
   Demo: everything is saved in this browser. The first visit adds sample bookings for the shop. */
(function () {
  "use strict";
  var D = window.WPData, UI = window.UI, WP = window.WP, esc = UI.esc, icon = UI.icon, A = WP.auth;

  var TEXT = {
    th: {
      eyebrow: "SHOP DASHBOARD · แดชบอร์ดร้าน", lead: "จัดการคิววันนี้ การจอง ตารางเวลา ราคา และรีวิวของร้านคุณในที่เดียว",
      demoTitle: "ร้านตัวอย่างสำหรับเดโม", demoBody: "ในระบบจริงแต่ละร้านจะมีบัญชีของตัวเองและเห็นเฉพาะการจองของร้าน หน้านี้ใช้ร้านตัวอย่างหนึ่งร้าน ข้อมูลทั้งหมดอยู่ในเบราว์เซอร์นี้",
      asAdmin: "คุณกำลังดูในฐานะผู้ดูแลระบบ", tabsAria: "ส่วนของแดชบอร์ดร้าน",
      tOverview: "ภาพรวม", tBookings: "การจอง", tSchedule: "ตารางเวลา", tMenu: "เมนูและเวลาเปิด", tReviews: "รีวิว",
      viewPublic: "ดูหน้าร้านบนเว็บ", open: "เปิดรับจอง", paused: "หยุดรับจองชั่วคราว", daily: "ทุกวัน",
      sToday: "นัดหมายวันนี้", sWaiting: function (n) { return n + " คำขอรอยืนยัน"; }, sMonth: "รายได้เดือนนี้", sMonthNote: function (m) { return "นัดหมายใน" + m; },
      sWeek: "ผู้ใช้บริการ 7 วันข้างหน้า", sWeekNote: function (n) { return "จาก " + n + " การจอง"; }, sRating: "คะแนนรีวิว", sRatingNote: function (n) { return "จาก " + n + " รีวิว"; },
      todayTitle: "คิววันนี้", todayLead: function (d) { return d; }, slotOpen: "ว่าง", slotClosed: "ปิดเวลานี้", slotElse: "จองผ่านช่องทางอื่น", slotDone: "ผ่านไปแล้ว",
      reqTitle: "คำขอรอยืนยัน", reqLead: "ยืนยันภายใน 12 ชั่วโมง ไม่เช่นนั้นคำขอจะหมดอายุ", reqNone: "ไม่มีคำขอรอยืนยัน", reqNoneLead: "คำขอใหม่จะแสดงที่นี่",
      weekTitle: "7 วันข้างหน้า", weekLead: "จำนวนการจองต่อวัน (ไม่รวมที่ยกเลิก)", today: "วันนี้",
      confirm: "ยืนยัน", decline: "ปฏิเสธ", cancelBk: "ยกเลิกการจอง", markDone: "ใช้บริการแล้ว",
      confirmed: "ยืนยันการจองแล้ว ผู้จองจะเห็นสถานะใหม่", declined: "ปฏิเสธคำขอแล้ว", cancelled: "ยกเลิกการจองแล้ว ผู้จองได้รับเงินคืนเต็มจำนวน", completedMsg: "บันทึกว่าใช้บริการแล้ว",
      dDecTitle: "ปฏิเสธคำขอนี้?", dDecBody: "ผู้จองจะได้รับแจ้งและไม่ถูกเรียกเก็บเงิน", dDecYes: "ปฏิเสธคำขอ",
      dCanTitle: "ยกเลิกการจองนี้?", dCanBody: "เมื่อร้านเป็นฝ่ายยกเลิก ผู้จองจะได้รับเงินคืนเต็มจำนวน และได้รับแจ้งทางอีเมล", dCanYes: "ยกเลิกการจอง", keep: "ไม่ใช่ตอนนี้",
      search: "ค้นหาชื่อ อีเมล หรือเลขอ้างอิง", fAll: "ทั้งหมด", fUp: "กำลังจะมาถึง", fPending: "รอยืนยัน", fPast: "ผ่านไปแล้ว", fClosed: "ยกเลิก / ปฏิเสธ", filterAria: "กรองตามสถานะ",
      thGuest: "ผู้จอง", thWhen: "วันและเวลา", thLength: "ระยะเวลา · ผู้ใช้บริการ", thTotal: "ยอดรวม", thStatus: "สถานะ", thAction: "จัดการ",
      shown: function (n, m) { return "แสดง " + n + " จาก " + m + " รายการ"; }, noMatch: "ไม่มีการจองที่ตรงกับตัวกรอง", member: "สมาชิก", booked: "จองเมื่อ",
      addSample: "เพิ่มการจองตัวอย่าง", added: "เพิ่มการจองตัวอย่างแล้ว",
      schTitle: "ตารางเวลา", schLead: "กดช่องที่ว่างเพื่อปิดเวลานั้น กดอีกครั้งเพื่อเปิด ลูกค้าจะเห็นเวลาที่ปิดเป็น “เต็ม”",
      prevWeek: "สัปดาห์ก่อน", nextWeek: "สัปดาห์ถัดไป", thisWeek: "สัปดาห์นี้", closeDay: "ปิดทั้งวัน", openDay: "เปิดทั้งวัน", dayClosed: "ปิดทั้งวัน",
      lgBooked: "มีการจอง", lgOpen: "ว่าง (กดเพื่อปิด)", lgClosed: "ปิดโดยร้าน", lgElse: "จองผ่านช่องทางอื่น",
      slotClosedMsg: function (d, s) { return "ปิด " + d + " " + s + " แล้ว"; }, slotOpenedMsg: function (d, s) { return "เปิด " + d + " " + s + " แล้ว"; },
      dayClosedMsg: function (d) { return "ปิดรับจองวันที่ " + d + " แล้ว"; }, dayOpenedMsg: function (d) { return "เปิดรับจองวันที่ " + d + " แล้ว"; },
      cellAria: function (d, s, st) { return d + " " + s + ": " + st; },
      prTitle: "ราคา", prLead: "ราคาต่อท่านสำหรับแต่ละระยะเวลา มีผลกับการจองใหม่ทันที", prWas: "เดิม", prSaved: function (m, p) { return m + ": " + p; }, prBad: "ใส่ราคาระหว่าง ฿100 ถึง ฿50,000", prReset: "คืนค่าราคาเดิม", prResetDone: "คืนค่าราคาเดิมแล้ว",
      hrTitle: "เวลาเปิดทำการ", hrLead: "แสดงบนหน้าร้าน ทุกวัน", hrOpen: "เปิด", hrClose: "ปิด", hrSave: "บันทึกเวลา", hrSaved: function (h) { return "บันทึกเวลาเปิดเป็น " + h; }, hrBad: "เวลาปิดต้องหลังเวลาเปิด",
      psTitle: "รับจองออนไลน์", psLead: "ปิดไว้เมื่อร้านปิดปรับปรุงหรือคิวเต็มยาว ร้านจะหายจากผลการค้นหาจนกว่าจะเปิดอีกครั้ง การจองเดิมยังอยู่",
      psOn: "เปิดรับจองแล้ว ร้านแสดงบนเว็บ", psOff: "หยุดรับจองแล้ว ร้านถูกซ่อนจากเว็บ", psLabel: "รับจองบน Wellness Pass",
      pvTitle: "หน้าร้านที่ลูกค้าเห็น", pvFrom: "เริ่มต้น",
      rvTitle: "รีวิวจากลูกค้า", rvLead: "ตอบกลับรีวิวได้ คำตอบจะแสดงใต้รีวิวบนหน้าร้าน", rvStars: function (n) { return n + " ดาว"; }, rvCount: function (n) { return n + " รีวิว"; },
      reply: "ตอบกลับ", replyLabel: "คำตอบจากร้าน", replyPh: "ขอบคุณที่มาใช้บริการ…", post: "โพสต์คำตอบ", edit: "แก้ไข", del: "ลบ", cancel: "ยกเลิก",
      posted: "โพสต์คำตอบแล้ว แสดงบนหน้าร้าน", deleted: "ลบคำตอบแล้ว", replyEmpty: "พิมพ์คำตอบก่อนโพสต์", daysAgo: function (n) { return n + " วันที่แล้ว"; }, repliedOn: "ตอบเมื่อ",
      noReply: "ยังไม่ได้ตอบ", replied: "ตอบแล้ว"
    },
    en: {
      eyebrow: "SHOP DASHBOARD", lead: "Run today's appointments, bookings, opening times, prices and reviews for your shop in one place.",
      demoTitle: "An example shop for this demo", demoBody: "On a live system every shop has its own login and sees only its own bookings. This demo uses one example shop, and all data stays in this browser.",
      asAdmin: "You're viewing this as the admin", tabsAria: "Shop dashboard sections",
      tOverview: "Overview", tBookings: "Bookings", tSchedule: "Schedule", tMenu: "Menu & hours", tReviews: "Reviews",
      viewPublic: "View public page", open: "Taking bookings", paused: "Bookings paused", daily: "daily",
      sToday: "Appointments today", sWaiting: function (n) { return n + (n === 1 ? " request waiting" : " requests waiting"); }, sMonth: "Revenue this month", sMonthNote: function (m) { return "Appointments in " + m; },
      sWeek: "Guests in the next 7 days", sWeekNote: function (n) { return "across " + n + (n === 1 ? " booking" : " bookings"); }, sRating: "Review score", sRatingNote: function (n) { return "from " + n + " reviews"; },
      todayTitle: "Today's appointments", todayLead: function (d) { return d; }, slotOpen: "Open", slotClosed: "Closed", slotElse: "Booked elsewhere", slotDone: "Passed",
      reqTitle: "Requests waiting", reqLead: "Reply within 12 hours or the request runs out", reqNone: "No requests waiting", reqNoneLead: "New requests show up here.",
      weekTitle: "Next 7 days", weekLead: "Bookings per day, cancelled ones left out", today: "Today",
      confirm: "Confirm", decline: "Decline", cancelBk: "Cancel booking", markDone: "Mark as done",
      confirmed: "Booking confirmed. The guest now sees the new status.", declined: "Request declined", cancelled: "Booking cancelled. The guest gets a full refund.", completedMsg: "Marked as done",
      dDecTitle: "Decline this request?", dDecBody: "The guest will be told and won't be charged.", dDecYes: "Decline request",
      dCanTitle: "Cancel this booking?", dCanBody: "When the shop cancels, the guest gets a full refund and an email.", dCanYes: "Cancel booking", keep: "Not now",
      search: "Search name, email or reference", fAll: "All", fUp: "Upcoming", fPending: "Waiting", fPast: "Past", fClosed: "Cancelled / declined", filterAria: "Filter by status",
      thGuest: "Guest", thWhen: "Date and time", thLength: "Length · guests", thTotal: "Total", thStatus: "Status", thAction: "Actions",
      shown: function (n, m) { return "Showing " + n + " of " + m; }, noMatch: "No bookings match these filters", member: "Member", booked: "Booked",
      addSample: "Add sample bookings", added: "Sample bookings added",
      schTitle: "Schedule", schLead: "Tap an open time to close it; tap again to reopen. Guests see closed times as full.",
      prevWeek: "Previous week", nextWeek: "Next week", thisWeek: "This week", closeDay: "Close day", openDay: "Reopen day", dayClosed: "Closed all day",
      lgBooked: "Booked", lgOpen: "Open (tap to close)", lgClosed: "Closed by you", lgElse: "Booked elsewhere",
      slotClosedMsg: function (d, s) { return d + " " + s + " closed"; }, slotOpenedMsg: function (d, s) { return d + " " + s + " reopened"; },
      dayClosedMsg: function (d) { return d + " closed for bookings"; }, dayOpenedMsg: function (d) { return d + " open for bookings again"; },
      cellAria: function (d, s, st) { return d + " " + s + ": " + st; },
      prTitle: "Prices", prLead: "Price per person for each length. New bookings use it straight away.", prWas: "was", prSaved: function (m, p) { return m + ": " + p; }, prBad: "Enter a price between ฿100 and ฿50,000", prReset: "Back to original prices", prResetDone: "Original prices back",
      hrTitle: "Opening hours", hrLead: "Shown on your public page, every day", hrOpen: "Opens", hrClose: "Closes", hrSave: "Save hours", hrSaved: function (h) { return "Opening hours saved: " + h; }, hrBad: "Closing time must be after opening time",
      psTitle: "Online bookings", psLead: "Turn off while the shop is closed for repairs or fully booked for a while. Your shop is hidden from search until you turn it back on; existing bookings stay.",
      psOn: "Taking bookings. Your shop shows on the site.", psOff: "Bookings paused. Your shop is hidden from the site.", psLabel: "Take bookings on Wellness Pass",
      pvTitle: "What guests see", pvFrom: "From",
      rvTitle: "Guest reviews", rvLead: "Reply to reviews. Your reply shows under the review on your public page.", rvStars: function (n) { return n + (n === 1 ? " star" : " stars"); }, rvCount: function (n) { return n + (n === 1 ? " review" : " reviews"); },
      reply: "Reply", replyLabel: "Reply from the shop", replyPh: "Thank you for visiting…", post: "Post reply", edit: "Edit", del: "Delete", cancel: "Cancel",
      posted: "Reply posted on your public page", deleted: "Reply deleted", replyEmpty: "Write a reply first", daysAgo: function (n) { return n + (n === 1 ? " day ago" : " days ago"); }, repliedOn: "Replied",
      noReply: "Not replied", replied: "Replied"
    }
  };

  var me = A.current();
  var SHOP = A.shopOf(me) || "thai-traditional";
  var tr = D.get(SHOP), V = D.venues[SHOP];
  var state = { tab: WP.get("shopTab", "overview"), q: "", filter: "all", week: 0, replyOpen: null, drafts: {} };

  /* ---------- Data helpers ---------- */
  var live = function (b) { return b.status !== "cancelled" && b.status !== "declined"; };
  var earned = function (b) { return b.status === "confirmed" || b.status === "completed"; };
  function mine() { return WP.bookings.all().filter(function (b) { return b.id === SHOP; }); }
  function isUp(b) { return D.hoursUntil(b.date, b.slot) > 0; }
  function loc(lang) { return lang === "th" ? "th-TH" : "en-GB"; }
  function overrides() { return WP.lsGet("overrides", {}); }
  function saveOverride(patch) {
    var ovr = overrides(), o = Object.assign(ovr[SHOP] || {}, patch);
    Object.keys(o).forEach(function (k) { if (o[k] === undefined || o[k] === null || o[k] === false || o[k] === 0) delete o[k]; });
    if (Object.keys(o).length) ovr[SHOP] = o; else delete ovr[SHOP];
    WP.lsSet("overrides", ovr);
    D.applyOverride(tr, ovr[SHOP]);
  }
  function blocksSave(day, list) {
    var all = D.blocks(), b = all[SHOP] || {};
    if (list && list.length) b[day] = list; else delete b[day];
    if (Object.keys(b).length) all[SHOP] = b; else delete all[SHOP];
    WP.lsSet("blocks", all);
  }
  function replies() { return (WP.lsGet("replies", {}) || {})[SHOP] || {}; }
  function saveReply(i, text) {
    var all = WP.lsGet("replies", {}) || {}, r = all[SHOP] || {};
    if (text) r[i] = { text: text, at: new Date().toISOString() }; else delete r[i];
    all[SHOP] = r; WP.lsSet("replies", all);
  }

  /* ---------- Sample bookings for the example shop (first visit) ---------- */
  function seeded(n) { return function () { n = (n * 9301 + 49297) % 233280; return n / 233280; }; }
  function sampleBookings() {
    var rnd = seeded(Date.now() % 233280), pick = function (a) { return a[Math.floor(rnd() * a.length)]; };
    var names = [["Emma", "Clarke"], ["Kenji", "Sato"], ["Nicha", "Prasert"], ["Lucas", "Weber"], ["Sophie", "Martin"], ["Arthit", "Wongsa"], ["Mia", "Jensen"],
      ["Ploy", "Charoen"], ["Daniel", "Kim"], ["Ananya", "Rao"], ["Tom", "Becker"], ["Krit", "Boonmee"], ["Chloe", "Dubois"], ["Hiro", "Tanaka"]];
    // [day from today, slot, status]; today gets three so "Today's appointments" has something to show
    var plan = [[0, "12:00", "confirmed"], [0, "15:00", "confirmed"], [0, "19:30", "confirmed"], [1, "10:30", "pending"], [2, "13:30", "pending"],
      [1, "18:00", "confirmed"], [2, "09:00", "confirmed"], [3, "16:30", "confirmed"], [4, "12:00", "confirmed"], [5, "19:30", "confirmed"], [6, "15:00", "cancelled"],
      [-1, "13:30", "completed"], [-2, "18:00", "completed"], [-3, "10:30", "completed"], [-5, "15:00", "cancelled"], [-6, "19:30", "completed"], [-9, "12:00", "completed"], [-12, "16:30", "completed"]];
    return plan.map(function (p, i) {
      var n = names[i % names.length], opt = pick(tr.options), guests = p[2] === "pending" ? 4 : 1 + Math.floor(rnd() * 2);
      var date = D.isoFromIdx(p[0]);
      var created = p[0] > 0 ? Date.now() - (2 + rnd() * 70) * 3600000 : D.dateFromIso(date).getTime() - (1 + rnd() * 6) * 86400000;
      return { ref: WP.bookings.newRef(), createdAt: new Date(created).toISOString(), sample: true, status: p[2], request: p[2] === "pending",
        id: SHOP, dur: opt.min, date: date, slot: p[1], guests: guests, party: { a: guests, s: 0, c: 0 }, method: rnd() < 0.5 ? "card" : "promptpay",
        total: opt.price * guests, fee: 0, first: n[0], last: n[1], email: (n[0] + "." + n[1]).toLowerCase() + "@example.com",
        phone: "+66 8" + Math.floor(10000000 + rnd() * 89999999), refundPct: p[2] === "cancelled" ? 100 : undefined,
        note: p[2] === "pending" ? "group" : undefined };
    });
  }
  if (!WP.lsGet("shopSeeded", false) && !mine().length) {
    WP.bookings.save(sampleBookings().concat(WP.bookings.all()));
    WP.lsSet("shopSeeded", true);
  }

  /* ---------- Small pieces ---------- */
  function guestCell(b, t) {
    var created = new Date(b.createdAt).toLocaleString(loc(WP.getLang()), { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
    return '<strong>' + esc((b.first + " " + b.last).trim() || "-") + (b.account ? " " + UI.badge(t.member, "success", "user") : "") + "</strong>" +
      '<span class="s-sub">' + esc(b.email || "") + '</span><span class="s-sub s-tnum">' + esc(b.ref + " · " + t.booked + " " + created) + "</span>";
  }
  function actionsFor(b, t, compact) {
    var sz = "sm", out = [];
    if (b.status === "pending") {
      out.push(UI.button({ label: t.confirm, size: sz, action: "confirm", arg: b.ref }));
      out.push(UI.button({ label: t.decline, variant: "ghost", size: sz, action: "decline", arg: b.ref }));
    } else if (b.status === "confirmed" && isUp(b)) {
      if (!compact) out.push(UI.button({ label: t.cancelBk, variant: "ghost", size: sz, action: "cancelBk", arg: b.ref }));
    } else if (b.status === "confirmed") {
      out.push(UI.button({ label: t.markDone, variant: "ghost", size: sz, action: "done", arg: b.ref, html: icon("check") + esc(t.markDone) }));
    }
    return out.length ? '<div class="s-btn-row">' + out.join("") + "</div>" : '<span class="s-sub">–</span>';
  }

  /* ---------- Overview ---------- */
  function overview(lang, t, all) {
    var todayIso = D.isoFromIdx(0), now = new Date(), month = todayIso.slice(0, 7), r = D.rating(tr);
    var todays = all.filter(function (b) { return live(b) && b.date === todayIso; });
    var waiting = all.filter(function (b) { return b.status === "pending" && isUp(b); }).sort(function (a, b) { return D.hoursUntil(a.date, a.slot) - D.hoursUntil(b.date, b.slot); });
    var revenue = all.filter(function (b) { return earned(b) && b.date.slice(0, 7) === month; }).reduce(function (a, b) { return a + b.total; }, 0);
    var week = all.filter(function (b) { return live(b) && b.date >= todayIso && b.date <= D.isoFromIdx(6); });
    var guests = week.reduce(function (a, b) { return a + (b.guests || 1); }, 0);
    var monthName = now.toLocaleDateString(loc(lang), { month: "long" });

    var stats = '<div class="s-stats">' +
      '<div class="s-stat"><strong>' + todays.length + "</strong><span>" + esc(t.sToday) + "</span>" + (waiting.length ? '<em class="s-stat-note is-alert">' + esc(t.sWaiting(waiting.length)) + "</em>" : "") + "</div>" +
      '<div class="s-stat"><strong>' + esc(D.baht(revenue)) + "</strong><span>" + esc(t.sMonth) + '</span><em class="s-stat-note">' + esc(t.sMonthNote(monthName)) + "</em></div>" +
      '<div class="s-stat"><strong>' + guests + "</strong><span>" + esc(t.sWeek) + '</span><em class="s-stat-note">' + esc(t.sWeekNote(week.length)) + "</em></div>" +
      '<div class="s-stat"><strong class="s-stat-star">' + r.avg.toFixed(1) + icon("star") + "</strong><span>" + esc(t.sRating) + '</span><em class="s-stat-note">' + esc(t.sRatingNote(r.count)) + "</em></div>" +
    "</div>";

    // Today's timeline: every start time of the day, with what is in it
    var dayLabel = D.isoLabel(todayIso, lang, true), elsewhere = D.slotList(0, { slots: tr.slots });
    var nowMin = now.getHours() * 60 + now.getMinutes();
    var line = D.slotsOf(tr).map(function (s) {
      var bk = todays.filter(function (b) { return b.slot === s; }), hm = s.split(":"), past = Number(hm[0]) * 60 + Number(hm[1]) < nowMin;
      var closed = D.blockedAt(SHOP, todayIso, s), other = !bk.length && !closed && elsewhere.some(function (x) { return x.time === s && x.state === "full"; }) && !past;
      var body = bk.length ? bk.map(function (b) {
          var sm = WP.bookingSummary(b, lang);
          return '<div class="s-tl-bk"><span><strong>' + esc(b.first + " " + b.last) + '</strong><span class="s-sub">' + esc(sm.length + " · " + sm.guestsLabel) + "</span></span>" + WP.statusBadge(b.status, lang) + "</div>";
        }).join("")
        : '<span class="s-tl-empty">' + esc(closed ? t.slotClosed : other ? t.slotElse : past ? t.slotDone : t.slotOpen) + "</span>";
      return '<li class="s-tl-row' + (bk.length ? " is-booked" : closed ? " is-closed" : past ? " is-past" : "") + '"><span class="s-tl-time s-tnum">' + esc(s) + '</span><div class="s-tl-body">' + body + "</div></li>";
    }).join("");
    var today = '<section class="s-card s-adm-card" aria-labelledby="c-today"><div><h2 id="c-today" class="s-adm-h">' + icon("clock") + esc(t.todayTitle) + '</h2><p class="s-small" style="margin: 0;">' + esc(dayLabel) + "</p></div>" +
      '<ol class="s-timeline">' + line + "</ol></section>";

    // Requests waiting
    var req = '<section class="s-card s-adm-card" aria-labelledby="c-req"><div><h2 id="c-req" class="s-adm-h">' + icon("alert") + esc(t.reqTitle) +
        (waiting.length ? ' <span class="s-count">' + waiting.length + "</span>" : "") + '</h2><p class="s-small" style="margin: 0;">' + esc(t.reqLead) + "</p></div>" +
      (waiting.length ? '<ul class="s-req-list">' + waiting.map(function (b) {
          var sm = WP.bookingSummary(b, lang);
          return '<li class="s-req"><div><strong>' + esc(b.first + " " + b.last) + '</strong><span class="s-sub">' + esc(sm.date + " · " + sm.time) + '</span><span class="s-sub">' +
            esc(sm.length + " · " + sm.guestsLabel + " · " + D.baht(b.total)) + "</span></div>" + actionsFor(b, t, true) + "</li>";
        }).join("") + "</ul>"
        : '<div class="s-empty s-empty-sm"><span class="s-icon-tile">' + icon("check") + '</span><strong>' + esc(t.reqNone) + '</strong><span class="s-small">' + esc(t.reqNoneLead) + "</span></div>") +
    "</section>";

    // Next 7 days
    var days = [];
    for (var d = 0; d < 7; d++) {
      var iso = D.isoFromIdx(d), dt = D.dateFromIso(iso);
      days.push({ d: d, n: all.filter(function (b) { return live(b) && b.date === iso; }).length, day: dt.getDate(), closed: D.blockedAt(SHOP, iso),
        dow: dt.toLocaleDateString(loc(lang), { weekday: "short" }), long: dt.toLocaleDateString(loc(lang), { weekday: "long", day: "numeric", month: "long" }) });
    }
    var maxDay = Math.max.apply(null, days.map(function (x) { return x.n; }).concat([1]));
    var weekChart = '<div class="s-vbars s-vbars-7" role="list">' + days.map(function (x) {
      return '<div class="s-vbar' + (x.d === 0 ? " is-today" : " is-future") + '" role="listitem" aria-label="' + esc(x.long + ": " + x.n + (x.closed ? " · " + t.dayClosed : "")) + '">' +
        '<span class="s-vbar-n" aria-hidden="true">' + (x.closed ? icon("lock2") : x.n || "") + '</span><span class="s-vbar-col" aria-hidden="true"><span style="height: ' + (x.n ? Math.max(4, Math.round(x.n / maxDay * 100)) : 0) + '%;"></span></span>' +
        '<span class="s-vbar-x" aria-hidden="true"><strong>' + x.day + "</strong>" + esc(x.d === 0 ? t.today : x.dow) + "</span></div>";
    }).join("") + "</div>";
    var wk = '<section class="s-card s-adm-card s-adm-wide" aria-labelledby="c-week"><div class="s-card-head"><div><h2 id="c-week" class="s-adm-h">' + icon("calendar") + esc(t.weekTitle) + '</h2><p class="s-small" style="margin: 0;">' + esc(t.weekLead) + "</p></div>" +
      UI.button({ label: t.tSchedule, variant: "ghost", size: "sm", arrow: true, action: "tab", arg: "schedule" }) + "</div>" + weekChart + "</section>";

    return stats + '<div class="s-adm-grid">' + today + req + wk + WP.history.card(lang, all, { key: "shop", shop: SHOP }) + "</div>";
  }

  /* ---------- Bookings ---------- */
  function matches(b) {
    if (state.filter === "up" && !(live(b) && isUp(b))) return false;
    if (state.filter === "pending" && b.status !== "pending") return false;
    if (state.filter === "past" && !(live(b) && !isUp(b))) return false;
    if (state.filter === "closed" && live(b)) return false;
    var q = state.q.trim().toLowerCase();
    return !q || (b.ref + " " + b.first + " " + b.last + " " + b.email).toLowerCase().indexOf(q) >= 0;
  }
  function resultsHtml(lang, t, all) {
    var list = all.filter(matches).sort(function (a, b) {
      var ka = a.date + " " + a.slot, kb = b.date + " " + b.slot;
      return state.filter === "up" || state.filter === "pending" ? (ka < kb ? -1 : 1) : (ka < kb ? 1 : -1);
    });
    var rows = list.map(function (b) {
      var s = WP.bookingSummary(b, lang);
      return "<tr>" +
        '<td class="s-td-main" data-label="' + esc(t.thGuest) + '">' + guestCell(b, t) + "</td>" +
        '<td data-label="' + esc(t.thWhen) + '">' + esc(s.date) + '<span class="s-sub">' + esc(s.time) + "</span></td>" +
        '<td data-label="' + esc(t.thLength) + '">' + esc(s.length) + '<span class="s-sub">' + esc(s.guestsLabel) + "</span></td>" +
        '<td class="s-num" data-label="' + esc(t.thTotal) + '">' + esc(D.baht(b.total)) + "</td>" +
        '<td data-label="' + esc(t.thStatus) + '">' + WP.statusBadge(b.status, lang) + "</td>" +
        '<td data-label="' + esc(t.thAction) + '">' + actionsFor(b, t) + "</td></tr>";
    }).join("");
    return '<p class="s-small" aria-live="polite" style="margin: 0 0 10px;">' + esc(t.shown(list.length, all.length)) + "</p>" +
      (list.length ? '<div class="s-table-wrap"><table class="s-table"><thead><tr><th scope="col">' + esc(t.thGuest) + '</th><th scope="col">' + esc(t.thWhen) + '</th><th scope="col">' + esc(t.thLength) +
          '</th><th scope="col" class="s-num">' + esc(t.thTotal) + '</th><th scope="col">' + esc(t.thStatus) + '</th><th scope="col"><span class="wp-sr">' + esc(t.thAction) + "</span></th></tr></thead><tbody>" + rows + "</tbody></table></div>"
        : '<div class="s-empty"><span class="s-icon-tile">' + icon("search") + '</span><p style="margin: 0;">' + esc(t.noMatch) + "</p></div>");
  }
  function bookingsTab(lang, t, all) {
    var count = function (f) { var keep = state.filter; state.filter = f; var q = state.q; state.q = ""; var n = all.filter(matches).length; state.filter = keep; state.q = q; return n; };
    var filters = [["all", t.fAll], ["up", t.fUp], ["pending", t.fPending], ["past", t.fPast], ["closed", t.fClosed]];
    return '<div class="s-adm-filters">' +
        '<div class="wp-field s-adm-search"><label class="wp-sr" for="shop-q">' + esc(t.search) + "</label>" + icon("search") +
          '<input id="shop-q" class="wp-input" type="search" data-input="q" value="' + esc(state.q) + '" placeholder="' + esc(t.search) + '" autocomplete="off"></div>' +
        UI.button({ label: t.addSample, variant: "ghost", size: "sm", action: "addSample", html: icon("plus") + esc(t.addSample) }) +
      "</div>" +
      '<div class="s-chips" role="group" aria-label="' + esc(t.filterAria) + '" style="margin-bottom: 16px;">' + filters.map(function (f) {
        return UI.chip({ label: f[1] + " (" + count(f[0]) + ")", selected: state.filter === f[0], action: "filter", arg: f[0] });
      }).join("") + "</div>" +
      '<div id="shop-results">' + resultsHtml(lang, t, all) + "</div>";
  }

  /* ---------- Schedule (week grid) ---------- */
  function scheduleTab(lang, t, all) {
    var start = state.week * 7, times = D.slotsOf(tr), now = new Date(), nowMin = now.getHours() * 60 + now.getMinutes();
    var cols = [];
    for (var i = start; i < start + 7; i++) {
      var iso = D.isoFromIdx(i), dt = D.dateFromIso(iso);
      cols.push({ i: i, iso: iso, closed: D.blockedAt(SHOP, iso), elsewhere: D.slotList(i, { slots: tr.slots }),
        dow: dt.toLocaleDateString(loc(lang), { weekday: "short" }), day: dt.toLocaleDateString(loc(lang), { day: "numeric", month: "short" }),
        long: dt.toLocaleDateString(loc(lang), { weekday: "long", day: "numeric", month: "long" }) });
    }
    var first = D.dateFromIso(cols[0].iso), last = D.dateFromIso(cols[6].iso);
    var range = first.toLocaleDateString(loc(lang), { day: "numeric", month: "short" }) + " – " + last.toLocaleDateString(loc(lang), { day: "numeric", month: "short", year: "numeric" });
    var head = '<div class="s-sch-corner" aria-hidden="true"></div>' + cols.map(function (c) {
      return '<div class="s-sch-day' + (c.i === 0 ? " is-today" : "") + (c.closed ? " is-closed" : "") + '"><span>' + esc(c.i === 0 ? t.today : c.dow) + "</span><strong>" + esc(c.day) + "</strong>" +
        '<button type="button" class="s-linkbtn s-sch-dayact" data-action="toggleDay" data-arg="' + c.iso + '" aria-label="' + esc((c.closed ? t.openDay : t.closeDay) + ": " + c.long) + '">' + esc(c.closed ? t.openDay : t.closeDay) + "</button></div>";
    }).join("");
    var body = times.map(function (s) {
      var hm = s.split(":"), min = Number(hm[0]) * 60 + Number(hm[1]);
      return '<div class="s-sch-time s-tnum">' + esc(s) + "</div>" + cols.map(function (c) {
        var bk = all.filter(function (b) { return live(b) && b.date === c.iso && b.slot === s; });
        var past = c.i < 0 || (c.i === 0 && min <= nowMin);
        var closed = !bk.length && D.blockedAt(SHOP, c.iso, s);
        var other = !bk.length && !closed && !past && c.elsewhere.some(function (x) { return x.time === s && x.state === "full"; });
        if (bk.length) {
          var b = bk[0];
          return '<div class="s-sch-cell is-booked' + (b.status === "pending" ? " is-pending" : "") + (past ? " is-past" : "") + '" aria-label="' + esc(t.cellAria(c.long, s, b.first + " " + b.last)) + '">' +
            "<strong>" + esc(b.first + " " + b.last.charAt(0) + ".") + '</strong><span>' + esc(D.minLabel(b.dur, lang) + " · " + b.guests) + icon("users") + "</span></div>";
        }
        if (past) return '<div class="s-sch-cell is-past" aria-hidden="true"></div>';
        if (other) return '<div class="s-sch-cell is-else" aria-label="' + esc(t.cellAria(c.long, s, t.lgElse)) + '"><span>' + esc(t.slotElse) + "</span></div>";
        if (c.closed && !closed) closed = true;
        return '<button type="button" class="s-sch-cell ' + (closed ? "is-closed" : "is-open") + '" data-action="toggleSlot" data-arg="' + c.iso + "|" + s + '"' + (c.closed ? " disabled" : "") +
          ' aria-pressed="' + closed + '" aria-label="' + esc(t.cellAria(c.long, s, closed ? t.lgClosed : t.lgOpen)) + '">' +
          (closed ? icon("lock2") + "<span>" + esc(t.slotClosed) + "</span>" : "<span>" + esc(t.slotOpen) + "</span>") + "</button>";
      }).join("");
    }).join("");
    return '<section class="s-card s-adm-card" aria-labelledby="c-sch"><div class="s-card-head"><div><h2 id="c-sch" class="s-adm-h">' + icon("calendar") + esc(t.schTitle) + '</h2><p class="s-small" style="margin: 0;">' + esc(t.schLead) + "</p></div>" +
        '<div class="s-sch-nav">' + UI.iconButton({ label: t.prevWeek, action: "week", arg: "-1", icon: "left" }) + '<span class="s-sch-range" aria-live="polite">' + esc(range) + "</span>" +
          UI.iconButton({ label: t.nextWeek, action: "week", arg: "1", icon: "right" }) + (state.week ? UI.button({ label: t.thisWeek, variant: "ghost", size: "sm", action: "week", arg: "0" }) : "") + "</div></div>" +
      '<div class="s-sch-legend" aria-hidden="true"><span><i class="is-booked"></i>' + esc(t.lgBooked) + '</span><span><i class="is-open"></i>' + esc(t.lgOpen) + '</span><span><i class="is-closed"></i>' + esc(t.lgClosed) +
        '</span><span><i class="is-else"></i>' + esc(t.lgElse) + "</span></div>" +
      '<div class="s-sch-wrap"><div class="s-sch">' + head + body + "</div></div></section>";
  }

  /* ---------- Menu & hours ---------- */
  function hourOptions(sel) {
    var out = "";
    for (var m = 5 * 60; m <= 24 * 60; m += 30) {
      var v = ("0" + Math.floor(m / 60) % 24).slice(-2) + ":" + ("0" + (m % 60)).slice(-2);
      if (m === 24 * 60) v = "24:00";
      out += '<option value="' + v + '"' + (v === sel ? " selected" : "") + ">" + v + "</option>";
    }
    return out;
  }
  function menuTab(lang, t) {
    var ovr = overrides()[SHOP] || {}, hours = (V.hours || "").split("–"), img = D.photos.byId[SHOP], r = D.rating(tr);
    var prices = '<section class="s-card s-adm-card" aria-labelledby="c-pr"><div class="s-card-head"><div><h2 id="c-pr" class="s-adm-h">' + icon("cart") + esc(t.prTitle) + '</h2><p class="s-small" style="margin: 0;">' + esc(t.prLead) + "</p></div>" +
        (ovr.prices || ovr.from ? UI.button({ label: t.prReset, variant: "ghost", size: "sm", action: "resetPrices" }) : "") + "</div>" +
      '<div class="s-price-list">' + tr.options.map(function (op, i) {
        var changed = op.price !== tr.basePrices[i];
        return '<label class="s-price-row"><span><strong>' + esc(D.minLabel(op.min, lang)) + "</strong>" + (changed ? '<span class="s-sub">' + esc(t.prWas + " " + D.baht(tr.basePrices[i])) + "</span>" : "") + "</span>" +
          '<span class="s-price-edit"><span class="s-price-cur" aria-hidden="true">฿</span><input class="wp-input" type="number" min="100" max="50000" step="10" inputmode="numeric" value="' + op.price + '" data-input="price" data-i="' + i + '" aria-label="' + esc(t.prTitle + ": " + D.minLabel(op.min, lang)) + '"></span></label>';
      }).join("") + "</div></section>";
    var hrs = '<section class="s-card s-adm-card" aria-labelledby="c-hr"><div><h2 id="c-hr" class="s-adm-h">' + icon("clock") + esc(t.hrTitle) + '</h2><p class="s-small" style="margin: 0;">' + esc(t.hrLead) + "</p></div>" +
      '<form class="s-hours" data-submit="hours" novalidate><label class="wp-field"><span class="wp-label">' + esc(t.hrOpen) + '</span><select class="wp-input" id="hr-open">' + hourOptions(hours[0]) + "</select></label>" +
        '<label class="wp-field"><span class="wp-label">' + esc(t.hrClose) + '</span><select class="wp-input" id="hr-close">' + hourOptions(hours[1]) + "</select></label>" +
        UI.button({ label: t.hrSave, type: "submit", size: "sm", cls: "s-hours-btn" }) + "</form></section>";
    var pause = '<section class="s-card s-adm-card" aria-labelledby="c-ps"><div><h2 id="c-ps" class="s-adm-h">' + icon("store") + esc(t.psTitle) + '</h2><p class="s-small" style="margin: 0;">' + esc(t.psLead) + "</p></div>" +
      '<label class="s-switch-row"><span class="s-switch"><input type="checkbox"' + (tr.hidden ? "" : " checked") + ' data-input="pause"><span aria-hidden="true"></span></span><span><strong>' + esc(t.psLabel) + '</strong><span class="s-sub">' + esc(tr.hidden ? t.psOff : t.psOn) + "</span></span></label></section>";
    var preview = '<section class="s-card s-adm-card" aria-labelledby="c-pv"><h2 id="c-pv" class="s-adm-h">' + icon("globe") + esc(t.pvTitle) + "</h2>" +
      '<a class="s-shop-preview' + (tr.hidden ? " is-paused" : "") + '" href="detail.html?id=' + esc(SHOP) + '">' + (img ? '<img src="' + esc(img) + '" alt="" loading="lazy">' : "") +
        '<span class="s-shop-preview-in"><span class="s-sub">' + esc(V.name + " · " + D.L(D.cities[tr.city], lang)) + "</span><strong>" + esc(D.L(tr.title, lang)) + "</strong>" +
        '<span class="s-rating-row">' + UI.stars(r.avg, r.avg.toFixed(1) + " / 5") + "<strong>" + r.avg.toFixed(1) + "</strong></span>" +
        '<span class="s-shop-preview-price">' + esc(t.pvFrom) + " <strong>" + esc(D.baht(tr.options[0].price)) + "</strong></span>" +
        (tr.hidden ? UI.badge(t.paused, "notice", "info") : "") + "</span></a></section>";
    return '<div class="s-adm-grid s-menu-grid"><div class="s-col">' + prices + hrs + '</div><div class="s-col">' + preview + pause + "</div></div>";
  }

  /* ---------- Reviews ---------- */
  function reviewsTab(lang, t) {
    var list = D.reviews(tr), r = D.rating(tr), rep = replies(), dist = [5, 4, 3, 2, 1].map(function (s) { return { s: s, n: list.filter(function (x) { return x.stars === s; }).length }; });
    var summary = '<section class="s-card s-adm-card s-rv-sum" aria-labelledby="c-rv"><div><h2 id="c-rv" class="s-adm-h">' + icon("star") + esc(t.rvTitle) + '</h2><p class="s-small" style="margin: 0;">' + esc(t.rvLead) + "</p></div>" +
      '<div class="s-rv-score"><span class="s-rev-avg">' + r.avg.toFixed(1) + "</span><span>" + UI.stars(r.avg, r.avg.toFixed(1) + " / 5") + '<span class="s-small">' + esc(t.rvCount(r.count)) + "</span></span></div>" +
      '<div class="s-hbars">' + dist.map(function (d) {
        var pct = r.count ? Math.round(d.n / r.count * 100) : 0;
        return '<div class="s-hbar' + (d.n ? "" : " is-zero") + '"><span class="s-hbar-label">' + esc(t.rvStars(d.s)) + '</span><span class="s-hbar-track"><span style="width: ' + (d.n ? Math.max(4, pct) : 0) + '%;"></span></span><span class="s-hbar-val">' + d.n + "</span></div>";
      }).join("") + "</div></section>";
    var items = list.map(function (x, i) {
      var rp = rep[i], editing = state.replyOpen === i, draft = state.drafts[i] !== undefined ? state.drafts[i] : rp ? rp.text : "";
      var replyBox = editing
        ? '<form class="s-reply-form" data-submit="reply" data-i="' + i + '" novalidate><label class="wp-label" for="rp-' + i + '">' + esc(t.replyLabel) + "</label>" +
            '<textarea id="rp-' + i + '" class="wp-input s-reply-ta" rows="3" maxlength="600" data-input="draft" data-i="' + i + '" placeholder="' + esc(t.replyPh) + '">' + esc(draft) + "</textarea>" +
            '<div class="s-btn-row">' + UI.button({ label: t.post, type: "submit", size: "sm" }) + UI.button({ label: t.cancel, variant: "ghost", size: "sm", action: "replyCancel" }) + "</div></form>"
        : rp ? '<div class="s-reply"><span class="s-reply-head">' + icon("reply") + "<strong>" + esc(t.replyLabel) + '</strong><span class="s-sub">· ' + esc(V.name) + "</span></span>" +
            "<p>" + esc(rp.text) + "</p>" +
            '<div class="s-reply-acts"><button type="button" class="s-linkbtn" data-action="replyOpen" data-arg="' + i + '">' + esc(t.edit) + '</button><button type="button" class="s-linkbtn is-danger" data-action="replyDel" data-arg="' + i + '">' + esc(t.del) + "</button></div></div>"
        : '<div class="s-btn-row">' + UI.button({ label: t.reply, variant: "ghost", size: "sm", action: "replyOpen", arg: String(i), html: icon("reply") + esc(t.reply) }) + "</div>";
      return '<article class="s-rev"><span class="s-rev-avatar" aria-hidden="true">' + esc(x.name.charAt(0)) + "</span><div>" +
        '<div class="s-rev-head"><span><span class="s-rev-name">' + esc(x.name) + '</span> <span class="s-rev-meta">· ' + esc(D.L(x.from, lang)) + "</span></span>" +
          '<span class="s-rev-right">' + (rp ? UI.badge(t.replied, "success", "check") : UI.badge(t.noReply, "neutral", false)) + UI.stars(x.stars, x.stars + " / 5") + "</span></div>" +
        '<span class="s-rev-meta">' + esc(t.daysAgo(x.daysAgo)) + "</span><p>" + esc(x[lang] || x.en) + "</p>" + replyBox + "</div></article>";
    }).join("");
    return '<div class="s-rv-layout">' + summary + '<div class="s-rev-list">' + items + "</div></div>";
  }

  /* ---------- Page ---------- */
  var page = WP.page({
    active: "venue",
    require: "venue",
    view: function (lang) {
      var t = TEXT[lang], all = mine(), r = D.rating(tr), img = D.photos.byId[SHOP];
      var waiting = all.filter(function (b) { return b.status === "pending" && isUp(b); }).length;
      var tabs = [["overview", "chart", t.tOverview], ["bookings", "calendar", t.tBookings, waiting], ["schedule", "clock", t.tSchedule], ["menu", "store", t.tMenu], ["reviews", "star", t.tReviews]];
      var body = state.tab === "bookings" ? bookingsTab(lang, t, all) : state.tab === "schedule" ? scheduleTab(lang, t, all)
        : state.tab === "menu" ? menuTab(lang, t) : state.tab === "reviews" ? reviewsTab(lang, t) : overview(lang, t, all);
      var shopCard = '<div class="s-shop-head s-card">' + (img ? '<img class="s-shop-photo" src="' + esc(img) + '" alt="" width="120" height="120">' : "") +
        '<div class="s-shop-id"><span class="s-sub">' + esc(D.L(D.cat(tr.cat), lang) + " · " + D.L(D.cities[tr.city], lang)) + "</span>" +
          '<strong class="s-shop-name">' + esc(V.name) + "</strong>" +
          '<span class="s-shop-meta"><span class="s-rating-row">' + UI.stars(r.avg, r.avg.toFixed(1) + " / 5") + "<strong>" + r.avg.toFixed(1) + "</strong></span>" +
            '<span class="s-venue-row">' + icon("clock") + "<span>" + esc(V.hours + " " + t.daily) + "</span></span>" +
            '<span class="s-venue-row">' + icon("pin") + "<span>" + esc(D.L(V.addr, lang)) + "</span></span></span></div>" +
        '<div class="s-shop-side">' + UI.badge(tr.hidden ? t.paused : t.open, tr.hidden ? "notice" : "success", tr.hidden ? "info" : "check") +
          UI.button({ label: t.viewPublic, variant: "ghost", size: "sm", href: "detail.html?id=" + SHOP, arrow: true }) + "</div></div>";
      return '<main id="main-content">' + WP.pageHero(t.eyebrow, V.name, t.lead) + '<div class="s-shell s-page-main">' +
        UI.notice({ tone: "info", title: t.demoTitle, cls: "s-wide-notice" }, esc(t.demoBody) + (me && me.role === "admin" ? " <strong>" + esc(t.asAdmin) + ".</strong>" : "")) +
        shopCard +
        '<div class="s-adm-bar"><div class="s-adm-tabs" role="tablist" aria-label="' + esc(t.tabsAria) + '">' + tabs.map(function (x) {
          return '<button type="button" role="tab" id="stab-' + x[0] + '" aria-selected="' + (state.tab === x[0]) + '" aria-controls="shop-panel" data-action="tab" data-arg="' + x[0] + '">' + icon(x[1]) +
            "<span>" + esc(x[2]) + "</span>" + (x[3] ? '<span class="s-count" aria-label="' + esc(t.sWaiting(x[3])) + '">' + x[3] + "</span>" : "") + "</button>";
        }).join("") + "</div></div>" +
        '<div id="shop-panel" role="tabpanel" aria-labelledby="stab-' + esc(state.tab) + '">' + body + "</div>" +
        "</div></main>";
    },
    actions: {
      tab: function (tab) { state.tab = tab; state.replyOpen = null; WP.set({ shopTab: tab }); },
      filter: function (f) { state.filter = f; },
      week: function (n) { n = Number(n); state.week = n === 0 ? 0 : Math.max(0, Math.min(3, state.week + n)); },
      hRange: WP.history.setRange,
      hMetric: WP.history.setMetric,
      addSample: function () { WP.bookings.save(sampleBookings().concat(WP.bookings.all())); WP.toast(TEXT[WP.getLang()].added); },
      confirm: function (ref) { WP.bookings.update(ref, { status: "confirmed" }); WP.toast(TEXT[WP.getLang()].confirmed); },
      done: function (ref) { WP.bookings.update(ref, { status: "completed" }); WP.toast(TEXT[WP.getLang()].completedMsg); },
      decline: function (ref) {
        var t = TEXT[WP.getLang()];
        WP.dialog({ title: t.dDecTitle, html: "<p>" + esc(t.dDecBody) + "</p>", actions: [{ label: t.keep, variant: "ghost" }, { label: t.dDecYes, variant: "danger", value: "yes" }],
          onClose: function (v) { if (v === "yes") { WP.bookings.update(ref, { status: "declined" }); page.render(); WP.toast(t.declined); } } });
        return false;
      },
      cancelBk: function (ref) {
        var t = TEXT[WP.getLang()];
        WP.dialog({ title: t.dCanTitle, html: "<p>" + esc(t.dCanBody) + "</p>", actions: [{ label: t.keep, variant: "ghost" }, { label: t.dCanYes, variant: "danger", value: "yes" }],
          onClose: function (v) { if (v === "yes") { WP.bookings.update(ref, { status: "cancelled", refundPct: 100, cancelledBy: "venue" }); page.render(); WP.toast(t.cancelled); } } });
        return false;
      },
      toggleSlot: function (arg) {
        var p = arg.split("|"), t = TEXT[WP.getLang()], list = ((D.blocks()[SHOP] || {})[p[0]] || []).slice(), at = list.indexOf(p[1]);
        var label = D.isoLabel(p[0], WP.getLang());
        if (at >= 0) { list.splice(at, 1); WP.toast(t.slotOpenedMsg(label, p[1])); } else { list.push(p[1]); WP.toast(t.slotClosedMsg(label, p[1])); }
        blocksSave(p[0], list);
        setTimeout(function () { var el = document.querySelector('[data-action="toggleSlot"][data-arg="' + arg + '"]'); if (el) el.focus(); }, 0);
      },
      toggleDay: function (iso) {
        var t = TEXT[WP.getLang()], label = D.isoLabel(iso, WP.getLang());
        if (D.blockedAt(SHOP, iso)) { blocksSave(iso, null); WP.toast(t.dayOpenedMsg(label)); } else { blocksSave(iso, ["all"]); WP.toast(t.dayClosedMsg(label)); }
        setTimeout(function () { var el = document.querySelector('[data-action="toggleDay"][data-arg="' + iso + '"]'); if (el) el.focus(); }, 0);
      },
      resetPrices: function () { saveOverride({ prices: null, from: null }); WP.toast(TEXT[WP.getLang()].prResetDone); },
      replyOpen: function (i) { state.replyOpen = Number(i); setTimeout(function () { var el = document.getElementById("rp-" + i); if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); } }, 0); },
      replyCancel: function () { delete state.drafts[state.replyOpen]; state.replyOpen = null; },
      replyDel: function (i) { saveReply(Number(i), null); delete state.drafts[i]; WP.toast(TEXT[WP.getLang()].deleted); }
    },
    inputs: {
      /* Typing in search: redraw only the results, so the search box keeps focus. */
      q: function (v) {
        state.q = v;
        var box = document.getElementById("shop-results"), lang = WP.getLang();
        if (!box) return true;
        box.innerHTML = resultsHtml(lang, TEXT[lang], mine());
        return false;
      },
      draft: function (v, el) { state.drafts[el.getAttribute("data-i")] = v; return false; },
      price: function (v, el, e) {
        if (e.type !== "change") return false;
        var t = TEXT[WP.getLang()], i = Number(el.getAttribute("data-i")), p = Math.round(Number(v));
        if (!(p >= 100 && p <= 50000)) { WP.toast(t.prBad, "danger"); el.value = tr.options[i].price; return false; }
        var list = tr.options.map(function (op) { return op.price; });
        list[i] = p;
        var same = list.every(function (x, k) { return x === tr.basePrices[k]; });
        saveOverride({ prices: same ? null : list, from: null });
        WP.toast(t.prSaved(D.minLabel(tr.options[i].min, WP.getLang()), D.baht(p)));
        setTimeout(page.render, 0);   // "change" fires while the box is losing focus; redraw just after, not during it
        return false;
      },
      pause: function (v) {
        var t = TEXT[WP.getLang()];
        saveOverride({ hidden: !v });
        WP.toast(v ? t.psOn : t.psOff);
        return true;
      }
    },
    submits: {
      hours: function () {
        var t = TEXT[WP.getLang()], o = document.getElementById("hr-open").value, c = document.getElementById("hr-close").value;
        if (c <= o) { WP.toast(t.hrBad, "danger"); return false; }
        var h = o + "–" + c;
        saveOverride({ hours: h === V.baseHours ? null : h });
        WP.toast(t.hrSaved(h));
      },
      reply: function (form) {
        var t = TEXT[WP.getLang()], i = Number(form.getAttribute("data-i")), text = (state.drafts[i] !== undefined ? state.drafts[i] : (replies()[i] || {}).text || "").trim();
        if (!text) { WP.toast(t.replyEmpty, "danger"); return false; }
        saveReply(i, text); delete state.drafts[i]; state.replyOpen = null;
        WP.toast(t.posted);
      }
    }
  });
})();
