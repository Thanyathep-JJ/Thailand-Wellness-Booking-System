/* Wellness Pass: Admin dashboard (admin.html). Needs an admin login (admin@demo.com / admin1234).
   Tabs: Overview (numbers + charts), Bookings (search, filter, change status, export CSV),
   Treatments (change the starting price, hide from the site) and Customers (accounts, roles).
   Demo: works on the data saved in this browser. The first visit loads 30 sample bookings so the charts have data. */
(function () {
  "use strict";
  var D = window.WPData, UI = window.UI, WP = window.WP, esc = UI.esc, icon = UI.icon, A = WP.auth;

  var TEXT = {
    th: {
      eyebrow: "ADMIN · ผู้ดูแลระบบ", title: "แดชบอร์ดผู้ดูแลระบบ", lead: "ภาพรวมธุรกิจ จัดการการจอง ทรีตเมนต์ และลูกค้า",
      demoTitle: "หน้านี้เป็นเดโม", demoBody: "ข้อมูลทั้งหมดมาจากเบราว์เซอร์นี้ ในระบบจริงข้อมูลจะเก็บบนเซิร์ฟเวอร์และผู้ดูแลจะเห็นการจองของทุกคน",
      tabsAria: "ส่วนของแดชบอร์ด", tOverview: "ภาพรวม", tBookings: "การจอง", tTreatments: "ทรีตเมนต์", tCustomers: "ลูกค้า",
      loadSample: "เพิ่มข้อมูลตัวอย่าง 30 รายการ", reset: "ล้างข้อมูลเดโม", venue: "แดชบอร์ดสถานที่",
      sampleAdded: "เพิ่มการจองตัวอย่าง 30 รายการแล้ว", resetDone: "ล้างข้อมูลเดโมแล้ว",
      rTitle: "ล้างข้อมูลเดโมทั้งหมด?", rBody: "การจองทั้งหมด การแก้ไขราคา และบัญชีที่สมัครไว้ในเบราว์เซอร์นี้จะถูกลบ บัญชีเดโมยังใช้ได้", rYes: "ล้างข้อมูล", cancel: "ยกเลิก",
      sToday: "นัดหมายวันนี้", sRevenue: "รายได้เดือนนี้", sTop: "ทรีตเมนต์ยอดนิยม", sCancel: "อัตราการยกเลิก",
      sPending: function (n) { return n + " คำขอรอยืนยัน"; }, sTopN: function (n) { return n + " การจอง"; }, sOfAll: function (n) { return "จาก " + n + " การจองทั้งหมด"; },
      sMonth: function (m) { return "นัดหมายใน" + m; }, none: "ยังไม่มี",
      cDays: "นัดหมายรายวัน", cDaysLead: "7 วันที่ผ่านมาและ 7 วันข้างหน้า (ไม่รวมที่ยกเลิก)", today: "วันนี้",
      cCats: "รายได้ตามหมวดหมู่", cCatsLead: "การจองที่ยืนยันแล้วและใช้บริการแล้ว", cCities: "การจองตามเมือง", recent: "การจองล่าสุด", seeAll: "ดูการจองทั้งหมด",
      search: "ค้นหาชื่อ อีเมล หรือเลขอ้างอิง", status: "สถานะ", city: "เมือง", all: "ทั้งหมด", allCities: "ทุกเมือง",
      export: "ส่งออก CSV", exported: "ดาวน์โหลดไฟล์ CSV แล้ว", shown: function (n, m) { return "แสดง " + n + " จาก " + m + " รายการ"; },
      thBooking: "การจอง", thTreat: "ทรีตเมนต์", thWhen: "วันนัด", thTotal: "ยอดรวม", thStatus: "สถานะ",
      statusChanged: function (r, s) { return r + " เปลี่ยนเป็น " + s; }, noMatch: "ไม่มีการจองที่ตรงกับตัวกรอง", account: "สมาชิก",
      trLead: "เปลี่ยนราคาเริ่มต้น (ตัวเลือกที่ยาวกว่าจะปรับตามสัดส่วน) หรือซ่อนทรีตเมนต์จากหน้าเว็บ มีผลทันทีในเบราว์เซอร์นี้",
      thName: "ทรีตเมนต์", thCity: "เมือง", thPrice: "ราคาเริ่มต้น (฿)", thBk: "การจอง", thShow: "แสดงบนเว็บ", thLink: "ดู",
      priceSaved: function (n, p) { return n + ": ราคาเริ่มต้น " + p; }, priceBad: "ใส่ราคาระหว่าง ฿100 ถึง ฿50,000", shownOn: "แสดงบนเว็บแล้ว", hiddenOn: "ซ่อนจากเว็บแล้ว",
      resetPrices: "คืนค่าราคาและการแสดงผลทั้งหมด", pricesReset: "คืนค่าทรีตเมนต์ทั้งหมดแล้ว", edited: "แก้ไขแล้ว", was: "เดิม",
      thCustomer: "ลูกค้า", thRole: "บทบาท", thJoined: "สมัครเมื่อ", thSpent: "ยอดใช้จ่าย", you: "คุณ", roleChanged: "เปลี่ยนบทบาทแล้ว",
      roles: { customer: "สมาชิก", admin: "ผู้ดูแลระบบ" }, guestsTitle: "ผู้จองแบบไม่มีบัญชี", guestsLead: function (n) { return n + " อีเมลที่จองโดยไม่สมัครสมาชิก"; },
      custLead: "บัญชีที่สมัครไว้ในเบราว์เซอร์นี้ เปลี่ยนบทบาทเป็นผู้ดูแลได้ (ยกเว้นบัญชีของคุณเอง)",
      hTitle: { revenue: "ประวัติรายได้", bookings: "ประวัติการจอง" }, hMetric: "ข้อมูลที่แสดง", hRange: "ช่วงเวลา",
      mRevenue: "รายได้", mBookings: "การจอง", r1m: "1 เดือน", r1y: "1 ปี", rAll: "ทั้งหมด",
      hLead: { "1m": "รายวัน 30 วันที่ผ่านมา", "1y": "รายสัปดาห์ 12 เดือนที่ผ่านมา", all: function (d) { return "รายเดือน ตั้งแต่" + d; } },
      kTotal: { revenue: "รายได้รวม", bookings: "การจองทั้งหมด" }, kChange: "เทียบช่วงก่อนหน้า",
      kPrev: { "1m": "เทียบกับ 30 วันก่อนหน้า", "1y": "เทียบกับ 12 เดือนก่อนหน้า", all: "12 เดือนล่าสุด เทียบปีก่อน" },
      kAvg: "มูลค่าเฉลี่ยต่อการจอง", kAvgSub: function (n) { return "จาก " + n.toLocaleString("en-US") + " การจอง"; },
      kPeak: { "1m": "วันที่ดีที่สุด", "1y": "สัปดาห์ที่ดีที่สุด", all: "เดือนที่ดีที่สุด" },
      nBk: function (n) { return n.toLocaleString("en-US") + " การจอง"; }, weekOf: function (a, b) { return a + " – " + b; }, soFar: " (ถึงวันนี้)",
      avgLine: { "1m": "ค่าเฉลี่ยต่อวัน", "1y": "ค่าเฉลี่ยต่อสัปดาห์", all: "ค่าเฉลี่ยต่อเดือน" }, vsAvg: function (d) { return (d >= 0 ? "สูงกว่า" : "ต่ำกว่า") + "ค่าเฉลี่ย " + Math.abs(d) + "%"; },
      avgNote: { "1m": "", "1y": "", all: "ไม่นับเดือนที่ยังไม่จบ" },
      table: "ดูเป็นตาราง", thPeriod: "ช่วงเวลา", hNote: "ข้อมูลย้อนหลังก่อนการจองในเบราว์เซอร์นี้เป็นข้อมูลตัวอย่าง เพื่อให้กราฟมีข้อมูลให้ดู",
      hAria: function (m, r, a, b) { return "กราฟเส้น" + m + " " + r + " ต่ำสุด " + a + " สูงสุด " + b + " ใช้ปุ่มลูกศรเพื่อดูแต่ละจุด"; }
    },
    en: {
      eyebrow: "ADMIN", title: "Admin dashboard", lead: "See how the business is doing and manage bookings, treatments and customers.",
      demoTitle: "This page is a demo", demoBody: "All data comes from this browser. On a live system the data is kept on a server and the admin sees everyone's bookings.",
      tabsAria: "Dashboard sections", tOverview: "Overview", tBookings: "Bookings", tTreatments: "Treatments", tCustomers: "Customers",
      loadSample: "Add 30 sample bookings", reset: "Reset demo data", venue: "Venue dashboard",
      sampleAdded: "Added 30 sample bookings", resetDone: "Demo data cleared",
      rTitle: "Reset all demo data?", rBody: "Every booking, price change and signed-up account in this browser will be deleted. The demo accounts keep working.", rYes: "Reset data", cancel: "Cancel",
      sToday: "Appointments today", sRevenue: "Revenue this month", sTop: "Most booked", sCancel: "Cancellation rate",
      sPending: function (n) { return n + (n === 1 ? " request waiting" : " requests waiting"); }, sTopN: function (n) { return n + (n === 1 ? " booking" : " bookings"); },
      sOfAll: function (n) { return "of " + n + " bookings"; }, sMonth: function (m) { return "Appointments in " + m; }, none: "None yet",
      cDays: "Appointments per day", cDaysLead: "Last 7 days and next 7 days, cancelled ones left out", today: "Today",
      cCats: "Revenue by category", cCatsLead: "Confirmed and completed bookings", cCities: "Bookings by city", recent: "Latest bookings", seeAll: "See all bookings",
      search: "Search name, email or reference", status: "Status", city: "City", all: "All", allCities: "All cities",
      export: "Export CSV", exported: "CSV file downloaded", shown: function (n, m) { return "Showing " + n + " of " + m; },
      thBooking: "Booking", thTreat: "Treatment", thWhen: "Appointment", thTotal: "Total", thStatus: "Status",
      statusChanged: function (r, s) { return r + " is now " + s; }, noMatch: "No bookings match these filters", account: "Member",
      trLead: "Change the starting price (longer options scale with it) or hide a treatment from the site. Changes apply straight away in this browser.",
      thName: "Treatment", thCity: "City", thPrice: "Starting price (฿)", thBk: "Bookings", thShow: "Shown on site", thLink: "View",
      priceSaved: function (n, p) { return n + ": starting price " + p; }, priceBad: "Enter a price between ฿100 and ฿50,000", shownOn: "Shown on the site", hiddenOn: "Hidden from the site",
      resetPrices: "Reset all prices and visibility", pricesReset: "All treatments reset", edited: "Edited", was: "was",
      thCustomer: "Customer", thRole: "Role", thJoined: "Joined", thSpent: "Spent", you: "You", roleChanged: "Role changed",
      roles: { customer: "Member", admin: "Admin" }, guestsTitle: "Guest bookers (no account)", guestsLead: function (n) { return n + (n === 1 ? " email" : " emails") + " booked without signing up"; },
      custLead: "Accounts signed up in this browser. You can make someone an admin (except your own account).",
      hTitle: { revenue: "Revenue history", bookings: "Booking history" }, hMetric: "Show", hRange: "Time range",
      mRevenue: "Revenue", mBookings: "Bookings", r1m: "1 month", r1y: "1 year", rAll: "All",
      hLead: { "1m": "Per day, last 30 days", "1y": "Per week, last 12 months", all: function (d) { return "Per month, since " + d; } },
      kTotal: { revenue: "Total revenue", bookings: "Total bookings" }, kChange: "Change",
      kPrev: { "1m": "vs the 30 days before", "1y": "vs the 12 months before", all: "Last 12 months vs the year before" },
      kAvg: "Average booking value", kAvgSub: function (n) { return "across " + n.toLocaleString("en-US") + (n === 1 ? " booking" : " bookings"); },
      kPeak: { "1m": "Best day", "1y": "Best week", all: "Best month" },
      nBk: function (n) { return n.toLocaleString("en-US") + (n === 1 ? " booking" : " bookings"); }, weekOf: function (a, b) { return a + " – " + b; }, soFar: " (so far)",
      avgLine: { "1m": "Average per day", "1y": "Average per week", all: "Average per month" }, vsAvg: function (d) { return Math.abs(d) + "% " + (d >= 0 ? "above" : "below") + " average"; },
      avgNote: { "1m": "", "1y": "", all: "The month in progress is left out" },
      table: "Show as a table", thPeriod: "Period", hNote: "History from before this browser's bookings is made-up sample data, so the chart has something to show.",
      hAria: function (m, r, a, b) { return m + " line chart, " + r + ". Lowest " + a + ", highest " + b + ". Use the arrow keys to read each point."; }
    }
  };

  var state = { tab: WP.get("adminTab", "overview"), q: "", status: "all", city: "all", hRange: WP.get("adminHRange", "1y"), hMetric: WP.get("adminHMetric", "revenue") };

  /* ---------- Sample data ---------- */
  function seeded(n) { return function () { n = (n * 9301 + 49297) % 233280; return n / 233280; }; }
  function sampleBookings() {
    var rnd = seeded(Date.now() % 233280), pick = function (a) { return a[Math.floor(rnd() * a.length)]; };
    var names = [["Emma", "Clarke"], ["Kenji", "Sato"], ["Nicha", "Prasert"], ["Lucas", "Weber"], ["Sophie", "Martin"], ["Arthit", "Wongsa"], ["Mia", "Jensen"],
      ["Ploy", "Charoen"], ["Daniel", "Kim"], ["Ananya", "Rao"], ["Tom", "Becker"], ["Krit", "Boonmee"], ["Chloe", "Dubois"], ["Hiro", "Tanaka"]];
    var out = [];
    for (var i = 0; i < 30; i++) {
      var tr = D.treatments[Math.floor(rnd() * D.treatments.length)], opt = pick(tr.options), guests = 1 + Math.floor(rnd() * 3);
      var day = Math.floor(rnd() * 31) - 12, mine = i < 4, n = mine ? ["Somchai", "Jaidee"] : pick(names);
      if (mine) day = [3, 9, -5, -11][i];   // the demo customer always has 2 upcoming and 2 past bookings
      var status;
      if (mine) status = day < 0 ? "completed" : "confirmed";
      else if (day < 0) status = rnd() < 0.8 ? "completed" : "cancelled";
      else if (tr.request && rnd() < 0.6) status = "pending";
      else status = rnd() < 0.86 ? "confirmed" : "cancelled";
      var date = D.isoFromIdx(day), slot = pick(D.slotList(day > 0 ? day : 1, tr).map(function (s) { return s.time; }));
      var created = Math.min(Date.now() - 3600000, new Date(date).getTime() - (1 + rnd() * 8) * 86400000);
      if (day >= 0) created = Date.now() - rnd() * 12 * 86400000;
      var email = mine ? "guest@demo.com" : (n[0] + "." + n[1]).toLowerCase() + "@example.com";
      out.push({ ref: WP.bookings.newRef(), createdAt: new Date(created).toISOString(), sample: true, status: status, request: !!tr.request,
        id: tr.id, dur: opt.min, date: date, slot: slot, guests: guests, party: { a: guests, s: 0, c: 0 }, method: rnd() < 0.5 ? "card" : "promptpay",
        total: opt.price * guests + (tr.travelFee || 0), fee: tr.travelFee || 0, first: n[0], last: n[1], email: email, phone: "+66 8" + Math.floor(10000000 + rnd() * 89999999),
        account: mine ? "u-guest" : undefined, refundPct: status === "cancelled" ? (rnd() < 0.7 ? 100 : 50) : undefined });
    }
    return out.sort(function (a, b) { return a.createdAt < b.createdAt ? 1 : -1; });
  }
  if (!WP.lsGet("adminSeeded", false) && !WP.bookings.all().length) {
    WP.bookings.save(sampleBookings());
    WP.lsSet("adminSeeded", true);
  }

  /* ---------- Numbers ---------- */
  var live = function (b) { return b.status !== "cancelled" && b.status !== "declined"; };
  var earned = function (b) { return b.status === "confirmed" || b.status === "completed"; };
  function catOf(b) { return D.get(b.id).cat; }

  function bar(label, value, max, valueLabel, hl) {
    var pct = max ? Math.max(2, Math.round(value / max * 100)) : 0;
    return '<div class="s-hbar' + (hl ? " is-hl" : "") + '"><span class="s-hbar-label">' + esc(label) + '</span><span class="s-hbar-track"><span style="width: ' + pct + '%;"></span></span>' +
      '<span class="s-hbar-val">' + esc(valueLabel) + "</span></div>";
  }

  function overview(lang, t, all) {
    var todayIso = D.isoFromIdx(0), now = new Date(), month = todayIso.slice(0, 7);
    var todayN = all.filter(function (b) { return live(b) && b.date === todayIso; }).length;
    var pending = all.filter(function (b) { return b.status === "pending"; }).length;
    var revenue = all.filter(function (b) { return earned(b) && b.date.slice(0, 7) === month; }).reduce(function (a, b) { return a + b.total; }, 0);
    var counts = {};
    all.filter(live).forEach(function (b) { counts[b.id] = (counts[b.id] || 0) + 1; });
    var topId = Object.keys(counts).sort(function (a, b) { return counts[b] - counts[a]; })[0];
    var closed = all.filter(function (b) { return !live(b); }).length, rate = all.length ? Math.round(closed / all.length * 100) : 0;
    var monthName = now.toLocaleDateString(lang === "th" ? "th-TH" : "en-GB", { month: "long" });

    // Appointments per day: 7 days back to 7 days ahead
    var days = [];
    for (var d = -7; d <= 7; d++) {
      var iso = D.isoFromIdx(d), dt = new Date(now.getFullYear(), now.getMonth(), now.getDate() + d);
      days.push({ d: d, n: all.filter(function (b) { return live(b) && b.date === iso; }).length, day: dt.getDate(),
        dow: dt.toLocaleDateString(lang === "th" ? "th-TH" : "en-GB", { weekday: "short" }), long: dt.toLocaleDateString(lang === "th" ? "th-TH" : "en-GB", { weekday: "long", day: "numeric", month: "long" }) });
    }
    var maxDay = Math.max.apply(null, days.map(function (x) { return x.n; }).concat([1]));
    var dayChart = '<div class="s-vbars" role="list">' + days.map(function (x) {
      return '<div class="s-vbar' + (x.d === 0 ? " is-today" : x.d > 0 ? " is-future" : "") + '" role="listitem" aria-label="' + esc(x.long + ": " + x.n) + '">' +
        '<span class="s-vbar-n" aria-hidden="true">' + (x.n || "") + '</span><span class="s-vbar-col" aria-hidden="true"><span style="height: ' + (x.n ? Math.max(4, Math.round(x.n / maxDay * 100)) : 0) + '%;"></span></span>' +
        '<span class="s-vbar-x" aria-hidden="true"><strong>' + x.day + "</strong>" + esc(x.d === 0 ? t.today : x.dow) + "</span></div>";
    }).join("") + "</div>";

    // Revenue by category
    var byCat = D.cats.map(function (c) {
      return { label: D.L(c, lang), v: all.filter(function (b) { return earned(b) && catOf(b) === c.id; }).reduce(function (a, b) { return a + b.total; }, 0) };
    }).sort(function (a, b) { return b.v - a.v; });
    var maxCat = byCat[0] ? byCat[0].v : 0;
    // By city
    var liveAll = all.filter(live), byCity = Object.keys(D.cities).map(function (k) {
      return { label: D.L(D.cities[k], lang), v: liveAll.filter(function (b) { return D.get(b.id).city === k; }).length };
    });
    var cityTotal = liveAll.length || 1;

    var recent = all.slice().sort(function (a, b) { return a.createdAt < b.createdAt ? 1 : -1; }).slice(0, 5);

    return '<div class="s-stats">' +
        '<div class="s-stat"><strong>' + todayN + "</strong><span>" + esc(t.sToday) + "</span>" + (pending ? '<em class="s-stat-note is-alert">' + esc(t.sPending(pending)) + "</em>" : "") + "</div>" +
        '<div class="s-stat"><strong>' + esc(D.baht(revenue)) + "</strong><span>" + esc(t.sRevenue) + '</span><em class="s-stat-note">' + esc(t.sMonth(monthName)) + "</em></div>" +
        '<div class="s-stat"><strong class="s-stat-text">' + esc(topId ? D.L(D.get(topId).title, lang) : t.none) + "</strong><span>" + esc(t.sTop) + "</span>" +
          (topId ? '<em class="s-stat-note">' + esc(t.sTopN(counts[topId])) + "</em>" : "") + "</div>" +
        '<div class="s-stat"><strong>' + rate + "%</strong><span>" + esc(t.sCancel) + '</span><em class="s-stat-note">' + esc(t.sOfAll(all.length)) + "</em></div>" +
      "</div>" +
      '<div class="s-adm-grid">' +
        '<section class="s-card s-adm-card s-adm-wide" aria-labelledby="c-days"><div><h2 id="c-days" class="s-adm-h">' + icon("chart") + esc(t.cDays) + '</h2><p class="s-small" style="margin: 0;">' + esc(t.cDaysLead) + "</p></div>" + dayChart + "</section>" +
        '<section class="s-card s-adm-card" aria-labelledby="c-cats"><div><h2 id="c-cats" class="s-adm-h">' + icon("grid") + esc(t.cCats) + '</h2><p class="s-small" style="margin: 0;">' + esc(t.cCatsLead) + "</p></div>" +
          '<div class="s-hbars">' + byCat.map(function (c, i) { return bar(c.label, c.v, maxCat, D.baht(c.v), i === 0 && c.v > 0); }).join("") + "</div></section>" +
        '<section class="s-card s-adm-card" aria-labelledby="c-city"><h2 id="c-city" class="s-adm-h">' + icon("pin") + esc(t.cCities) + "</h2>" +
          '<div class="s-citybar" aria-hidden="true">' + byCity.map(function (c, i) { return '<span class="s-citybar-' + i + '" style="flex-grow: ' + c.v + ';"></span>'; }).join("") + "</div>" +
          '<ul class="s-citybar-legend">' + byCity.map(function (c, i) {
            return '<li><span class="s-dot s-citybar-' + i + '" aria-hidden="true"></span>' + esc(c.label) + "<strong>" + c.v + '</strong><span class="s-sub">' + Math.round(c.v / cityTotal * 100) + "%</span></li>";
          }).join("") + "</ul>" +
          '<h2 class="s-adm-h" style="margin-top: 8px;">' + icon("clock") + esc(t.recent) + "</h2>" +
          '<ul class="s-recent">' + recent.map(function (b) {
            return "<li><span><strong>" + esc(b.first + " " + b.last) + '</strong><span class="s-sub">' + esc(D.L(D.get(b.id).title, lang)) + "</span></span>" + WP.statusBadge(b.status, lang) + "</li>";
          }).join("") + "</ul>" +
          UI.button({ label: t.seeAll, variant: "ghost", size: "sm", arrow: true, action: "tab", arg: "bookings" }) + "</section>" +
        historyCard(lang, t, all) +
      "</div>";
  }

  /* ---------- History line chart (bottom of Overview) ----------
     Real bookings in this browser only cover a few weeks, so a made-up daily archive from June 2024 sits under them.
     It is fixed (same numbers on every visit), grows over time and follows the tourist seasons (busy Nov-Apr). */
  var HSTART = new Date(2024, 5, 1), SEASON = [1.35, 1.3, 1.1, 1.25, 0.85, 0.75, 0.85, 0.8, 0.7, 0.9, 1.15, 1.4];
  function addDays(dt, n) { return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + n); }
  function isoOf(dt) { return dt.getFullYear() + "-" + ("0" + (dt.getMonth() + 1)).slice(-2) + "-" + ("0" + dt.getDate()).slice(-2); }
  function noise(k) { var x = Math.sin(k * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); }
  function archiveDay(dt, k) {
    var wd = dt.getDay(), wk = wd === 0 || wd === 6 ? 1.3 : wd === 5 ? 1.1 : 0.9;
    var n = Math.round(4 * (1 + k / 800) * SEASON[dt.getMonth()] * wk * (0.7 + 0.6 * noise(k))), rev = 0;
    for (var i = 0; i < n; i++) rev += 1200 + Math.round(noise(k * 31 + i + 7) * 22) * 100;
    return { n: n, rev: rev };
  }
  function dailyHistory(all) {
    var now = new Date(), today = new Date(now.getFullYear(), now.getMonth(), now.getDate()), todayIso = isoOf(today), real = {}, days = [];
    all.forEach(function (b) {
      if (!b.date || b.date > todayIso) return;   // appointments still to come are not history yet
      var r = real[b.date] || (real[b.date] = { n: 0, rev: 0 });
      if (live(b)) r.n++;
      if (earned(b)) r.rev += b.total;
    });
    for (var k = 0, dt = HSTART; dt <= today; k++, dt = addDays(HSTART, k)) {
      var a = archiveDay(dt, k), r = real[isoOf(dt)] || { n: 0, rev: 0 };
      days.push({ from: dt, to: dt, n: a.n + r.n, rev: a.rev + r.rev });
    }
    return days;
  }
  function total(seg) {
    return { from: seg[0].from, to: seg[seg.length - 1].to, n: seg.reduce(function (a, x) { return a + x.n; }, 0), rev: seg.reduce(function (a, x) { return a + x.rev; }, 0) };
  }
  function bucketsFor(days, range) {
    if (range === "1m") return days.slice(-30);
    var out = [];
    if (range === "1y") {
      for (var i = 51; i >= 0; i--) out.push(total(days.slice(days.length - 7 * (i + 1), days.length - 7 * i)));
      return out;
    }
    var cur = null;
    days.forEach(function (x) {
      var key = x.from.getFullYear() * 12 + x.from.getMonth();
      if (!cur || cur.key !== key) { cur = { key: key, from: x.from, to: x.to, n: 0, rev: 0 }; out.push(cur); }
      cur.to = x.to; cur.n += x.n; cur.rev += x.rev;
    });
    return out;
  }
  function niceScale(v) {
    if (v <= 0) return { max: 4, step: 1 };
    var raw = v / 4, p = Math.pow(10, Math.floor(Math.log(raw) / Math.LN10)), f = raw / p;
    var step = (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * p;
    return { max: Math.ceil(v / step) * step, step: step };
  }
  function compact(v, money) {
    var s = v >= 1e6 ? (Math.round(v / 1e5) / 10) + "M" : v >= 1e4 ? Math.round(v / 1e3) + "k" : v >= 1e3 ? (Math.round(v / 100) / 10) + "k" : String(Math.round(v));
    return (money ? "฿" : "") + s;
  }

  var hist = null;   // points of the chart on screen, read by the hover code below

  function historyCard(lang, t, all) {
    var loc = lang === "th" ? "th-TH" : "en-GB", range = state.hRange, metric = state.hMetric, money = metric === "revenue";
    var fmt = function (dt, o) { return dt.toLocaleDateString(loc, o); };
    var days = dailyHistory(all), pts = bucketsFor(days, range), val = function (x) { return money ? x.rev : x.n; };
    var lastDay = days[days.length - 1].to;
    var label = function (x) {
      if (range === "1m") return fmt(x.from, { weekday: "short", day: "numeric", month: "short", year: "numeric" });
      if (range === "1y") return t.weekOf(fmt(x.from, { day: "numeric", month: "short" }), fmt(x.to, { day: "numeric", month: "short", year: "numeric" }));
      return fmt(x.from, { month: "long", year: "numeric" }) + (x.to.getTime() === lastDay.getTime() && x.to.getDate() < 28 ? t.soFar : "");
    };

    // Summary numbers
    var cur = total(range === "all" ? days.slice(-364) : range === "1y" ? days.slice(-364) : days.slice(-30));
    var prevSeg = range === "1m" ? days.slice(-60, -30) : days.slice(-728, -364), prev = prevSeg.length ? total(prevSeg) : null;
    var all_ = total(range === "1m" ? days.slice(-30) : range === "1y" ? days.slice(-364) : days);
    var change = prev && val(prev) ? Math.round((val(cur) - val(prev)) / val(prev) * 1000) / 10 : null;
    var peak = pts.reduce(function (a, x) { return val(x) > val(a) ? x : a; }, pts[0]);
    var low = pts.reduce(function (a, x) { return val(x) < val(a) ? x : a; }, pts[0]);
    var show = function (v) { return money ? D.baht(v) : v.toLocaleString("en-US"); };
    var peakName = range === "1m" ? fmt(peak.from, { day: "numeric", month: "short" }) : range === "1y" ? t.weekOf(fmt(peak.from, { day: "numeric", month: "short" }), fmt(peak.to, { day: "numeric", month: "short" }))
      : fmt(peak.from, { month: "short", year: "numeric" });
    var kpis = '<div class="s-hist-kpis">' +
      '<div class="s-hist-kpi"><span>' + esc(t.kTotal[metric]) + "</span><strong>" + esc(show(val(all_))) + "</strong><em>" + esc(range === "all" ? t.hLead.all(fmt(HSTART, { month: "short", year: "numeric" })) : t.hLead[range]) + "</em></div>" +
      '<div class="s-hist-kpi"><span>' + esc(t.kChange) + "</span><strong" + (change === null ? "" : ' class="' + (change >= 0 ? "s-trend-up" : "s-trend-down") + '"') + ">" +
        (change === null ? "–" : (change >= 0 ? "▲ +" : "▼ ") + change + "%") + "</strong><em>" + esc(t.kPrev[range]) + "</em></div>" +
      '<div class="s-hist-kpi"><span>' + esc(t.kAvg) + "</span><strong>" + esc(D.baht(all_.n ? Math.round(all_.rev / all_.n) : 0)) + "</strong><em>" + esc(t.kAvgSub(all_.n)) + "</em></div>" +
      '<div class="s-hist-kpi"><span>' + esc(t.kPeak[range]) + "</span><strong>" + esc(show(val(peak))) + "</strong><em>" + esc(peakName) + "</em></div>" +
    "</div>";

    // Chart geometry: a 1000 x 300 box stretched to fit; the line keeps a 2px stroke
    var sc = niceScale(val(peak)), W = 1000, H = 300, N = pts.length;
    var xy = pts.map(function (x, i) { return [N > 1 ? i / (N - 1) * W : W / 2, H - val(x) / sc.max * H]; });
    var line = xy.map(function (p, i) { return (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1); }).join("");
    // In "All", the current month is not over yet: draw its last step dashed so the drop does not look like a crash
    var partial = range === "all" && N > 1 && lastDay.getDate() < 28, solid = line, dash = "";
    var full = partial ? pts.slice(0, -1) : pts;   // the month still in progress would pull the average down
    var avg = full.reduce(function (a, x) { return a + val(x); }, 0) / (full.length || 1), avgPct = avg / sc.max * 100;
    if (partial) {
      solid = xy.slice(0, -1).map(function (p, i) { return (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1); }).join("");
      dash = "M" + xy[N - 2][0].toFixed(1) + " " + xy[N - 2][1].toFixed(1) + "L" + xy[N - 1][0].toFixed(1) + " " + xy[N - 1][1].toFixed(1);
    }
    var area = line + "L" + W + " " + H + "L0 " + H + "Z";
    hist = { pts: pts.map(function (x, i) {
      return { x: xy[i][0] / W * 100, y: xy[i][1] / H * 100, label: label(x), main: show(val(x)), sub: money ? t.nBk(x.n) : D.baht(x.rev),
        avg: avg ? t.vsAvg(Math.round((val(x) - avg) / avg * 100)) : "" };
    }) };
    var grid = "", yLab = "";
    for (var g = 0; g <= sc.max / sc.step + 1e-9; g++) {
      var pct = g * sc.step / sc.max * 100;
      grid += '<span class="s-hist-grid' + (g === 0 ? " is-base" : "") + '" style="bottom: ' + pct + '%;"></span>';
      yLab += '<span style="bottom: ' + pct + '%;">' + esc(compact(g * sc.step, money)) + "</span>";
    }
    // X labels: at most about 7, counted back from the newest point
    var cand = [];
    pts.forEach(function (x, i) {
      if (range === "1m") cand.push([i, fmt(x.from, { day: "numeric", month: "short" })]);
      else if (range === "1y") { if (i && x.to.getMonth() !== pts[i - 1].to.getMonth()) cand.push([i, fmt(x.to, { month: "short" })]); }
      else if (x.from.getMonth() % 3 === 0 || i === 0) cand.push([i, fmt(x.from, { month: "short", year: "2-digit" })]);
    });
    var every = range === "1m" ? 5 : Math.max(1, Math.ceil(cand.length / 7)), xLab = "", kept = 0;
    for (var c = cand.length - 1; c >= 0; c -= (range === "1m" ? 1 : every)) {
      if (range === "1m" && (N - 1 - cand[c][0]) % every) continue;
      var left = N > 1 ? cand[c][0] / (N - 1) * 100 : 50;
      xLab = '<span class="' + (left > 94 ? "is-end" : left < 6 ? "is-start" : "") + (kept++ % 2 ? " is-alt" : "") + '" style="left: ' + left.toFixed(2) + '%;">' + esc(cand[c][1]) + "</span>" + xLab;
    }
    var last = hist.pts[N - 1];
    var rangeName = range === "1m" ? t.r1m : range === "1y" ? t.r1y : t.rAll;
    var seg = function (act, items) {
      return items.map(function (it) { return '<button type="button" aria-pressed="' + (it[0] === (act === "hRange" ? range : metric)) + '" data-action="' + act + '" data-arg="' + it[0] + '">' + esc(it[1]) + "</button>"; }).join("");
    };
    var rows = pts.slice().reverse().map(function (x) {
      return '<tr><td>' + esc(label(x)) + '</td><td class="s-num">' + esc(D.baht(x.rev)) + '</td><td class="s-num">' + x.n.toLocaleString("en-US") + "</td></tr>";
    }).join("");

    return '<section class="s-card s-adm-card s-adm-wide s-hist" aria-labelledby="c-hist">' +
      '<div class="s-hist-head"><div><h2 id="c-hist" class="s-adm-h">' + icon("chart") + esc(t.hTitle[metric]) + '</h2><p class="s-small" style="margin: 0;">' +
          esc(range === "all" ? t.hLead.all(fmt(HSTART, { month: "long", year: "numeric" })) : t.hLead[range]) + "</p></div>" +
        '<div class="s-hist-ctrls"><div class="s-seg" role="group" aria-label="' + esc(t.hMetric) + '">' + seg("hMetric", [["revenue", t.mRevenue], ["bookings", t.mBookings]]) + "</div>" +
          '<div class="s-seg" role="group" aria-label="' + esc(t.hRange) + '">' + seg("hRange", [["1m", t.r1m], ["1y", t.r1y], ["all", t.rAll]]) + "</div></div></div>" +
      kpis +
      '<div class="s-hist-legend"><span><i class="s-key-line" aria-hidden="true"></i>' + esc(metric === "revenue" ? t.mRevenue : t.mBookings) + "</span>" +
        '<span><i class="s-key-avg" aria-hidden="true"></i>' + esc(t.avgLine[range]) + " · <strong>" + esc(show(Math.round(avg))) + "</strong></span>" +
        (t.avgNote[range] ? '<span class="s-sub">' + esc(t.avgNote[range]) + "</span>" : "") + "</div>" +
      '<div class="s-hist-chart"><div class="s-hist-y" aria-hidden="true">' + yLab + "</div>" +
        '<div class="s-hist-plot" tabindex="0" role="img" aria-label="' + esc(t.hAria(t.hTitle[metric], rangeName, show(val(low)), show(val(peak))) + " " + t.avgLine[range] + " " + show(Math.round(avg)) + ".") + '">' + grid +
          '<svg viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="none" aria-hidden="true" focusable="false"><defs><linearGradient id="hist-fill" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0" stop-color="var(--jade)" stop-opacity="0.2"/><stop offset="1" stop-color="var(--jade)" stop-opacity="0"/></linearGradient></defs>' +
            '<path d="' + area + '" fill="url(#hist-fill)"/><path class="s-hist-line" d="' + solid + '" vector-effect="non-scaling-stroke"/>' +
            (dash ? '<path class="s-hist-line is-partial" d="' + dash + '" vector-effect="non-scaling-stroke"/>' : "") + "</svg>" +
          '<span class="s-hist-avg" style="bottom: ' + avgPct.toFixed(2) + '%;" aria-hidden="true"></span>' +
          '<span class="s-hist-dot is-last' + (partial ? " is-partial" : "") + '" style="left: ' + last.x + "%; top: " + last.y + '%;" aria-hidden="true"></span>' +
          '<span class="s-hist-cross" aria-hidden="true"></span><span class="s-hist-dot is-hover" aria-hidden="true"></span>' +
          '<div class="s-hist-tip" aria-live="polite"></div></div>' +
        '<div class="s-hist-x" aria-hidden="true">' + xLab + "</div></div>" +
      '<div class="s-hist-foot"><details class="s-hist-table"><summary>' + esc(t.table) + '</summary><div class="s-table-wrap"><table class="s-table"><thead><tr><th scope="col">' + esc(t.thPeriod) +
        '</th><th scope="col" class="s-num">' + esc(t.mRevenue) + '</th><th scope="col" class="s-num">' + esc(t.mBookings) + "</th></tr></thead><tbody>" + rows + "</tbody></table></div></details>" +
        '<p class="s-small s-hist-note">' + icon("info") + esc(t.hNote) + "</p></div>" +
    "</section>";
  }

  /* Hover, touch and arrow keys move a crosshair + tooltip along the line. */
  function histShow(plot, i) {
    if (!hist || !plot) return;
    i = Math.max(0, Math.min(hist.pts.length - 1, i));
    var p = hist.pts[i], tip = plot.querySelector(".s-hist-tip");
    plot.setAttribute("data-i", i);
    plot.classList.add("is-on");
    plot.querySelector(".s-hist-cross").style.left = p.x + "%";
    var dot = plot.querySelector(".s-hist-dot.is-hover"); dot.style.left = p.x + "%"; dot.style.top = p.y + "%";
    tip.style.left = p.x + "%";
    tip.classList.toggle("is-flip", p.x > 60);
    tip.innerHTML = '<span class="s-sub">' + esc(p.label) + "</span><strong>" + esc(p.main) + '</strong><span class="s-sub">' + esc(p.sub) + "</span>" + (p.avg ? '<span class="s-hist-tip-avg">' + esc(p.avg) + "</span>" : "");
  }
  function histHide(plot) { if (plot) { plot.classList.remove("is-on"); plot.removeAttribute("data-i"); } }
  function plotOf(e) { return e.target && e.target.closest ? e.target.closest(".s-hist-plot") : null; }
  function histPointer(e) {
    var plot = plotOf(e);
    if (!plot || !hist) return;
    var r = plot.getBoundingClientRect();
    histShow(plot, Math.round((e.clientX - r.left) / r.width * (hist.pts.length - 1)));
  }
  document.addEventListener("pointermove", histPointer);
  document.addEventListener("pointerdown", histPointer);
  document.addEventListener("pointerleave", function (e) { if (e.target.classList && e.target.classList.contains("s-hist-plot") && document.activeElement !== e.target) histHide(e.target); }, true);
  document.addEventListener("focusin", function (e) { var plot = plotOf(e); if (plot === e.target && hist) histShow(plot, hist.pts.length - 1); });
  document.addEventListener("focusout", function (e) { var plot = plotOf(e); if (plot === e.target) histHide(plot); });
  document.addEventListener("keydown", function (e) {
    var plot = plotOf(e);
    if (plot !== e.target || !hist) return;
    var i = Number(plot.getAttribute("data-i") || hist.pts.length - 1), n = hist.pts.length;
    var next = { ArrowLeft: i - 1, ArrowRight: i + 1, Home: 0, End: n - 1, PageUp: i - 5, PageDown: i + 5 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    histShow(plot, next);
  });

  function filtered(all) {
    var q = state.q.trim().toLowerCase();
    return all.filter(function (b) {
      if (state.status !== "all" && b.status !== state.status) return false;
      if (state.city !== "all" && D.get(b.id).city !== state.city) return false;
      if (q && (b.ref + " " + b.first + " " + b.last + " " + b.email).toLowerCase().indexOf(q) < 0) return false;
      return true;
    });
  }

  function bookingsTab(lang, t, all) {
    var list = filtered(all).sort(function (a, b) { return a.createdAt < b.createdAt ? 1 : -1; });
    var statuses = ["pending", "confirmed", "completed", "cancelled", "declined"];
    var users = A.users();
    var rows = list.map(function (b) {
      var s = WP.bookingSummary(b, lang), member = b.account && users.some(function (u) { return u.id === b.account; });
      return "<tr>" +
        '<td class="s-td-main" data-label="' + esc(t.thBooking) + '"><strong>' + esc((b.first + " " + b.last).trim() || "-") + (member ? " " + UI.badge(t.account, "success", "user") : "") + "</strong>" +
          '<span class="s-sub">' + esc(b.email || "") + '</span><span class="s-sub s-tnum">' + esc(b.ref) + "</span></td>" +
        '<td data-label="' + esc(t.thTreat) + '"><span><strong>' + esc(s.title) + '</strong><span class="s-sub">' + esc(D.L(D.cities[s.tr.city], lang) + " · " + s.guestsLabel) + "</span></span></td>" +
        '<td data-label="' + esc(t.thWhen) + '">' + esc(s.date) + '<span class="s-sub">' + esc(s.time + " · " + s.length) + "</span></td>" +
        '<td class="s-num" data-label="' + esc(t.thTotal) + '">' + esc(D.baht(b.total)) + "</td>" +
        '<td data-label="' + esc(t.thStatus) + '"><select class="s-status-sel is-' + esc(b.status) + '" data-input="setStatus" data-ref="' + esc(b.ref) + '" aria-label="' + esc(t.thStatus + " " + b.ref) + '">' +
          statuses.map(function (st) { return '<option value="' + st + '"' + (st === b.status ? " selected" : "") + ">" + esc(WP.statusLabel(st, lang)) + "</option>"; }).join("") + "</select></td>" +
        "</tr>";
    }).join("");
    var count = function (st) { return all.filter(function (b) { return b.status === st; }).length; };
    return '<div class="s-adm-filters">' +
        '<div class="wp-field s-adm-search"><label class="wp-sr" for="adm-q">' + esc(t.search) + "</label>" + icon("search") +
          '<input id="adm-q" class="wp-input" type="search" data-input="q" value="' + esc(state.q) + '" placeholder="' + esc(t.search) + '" autocomplete="off"></div>' +
        '<label class="s-adm-select"><span class="wp-sr">' + esc(t.city) + '</span><select class="wp-input" data-input="city">' +
          '<option value="all">' + esc(t.allCities) + "</option>" + Object.keys(D.cities).map(function (k) {
            return '<option value="' + k + '"' + (state.city === k ? " selected" : "") + ">" + esc(D.L(D.cities[k], lang)) + "</option>"; }).join("") + "</select></label>" +
        UI.button({ label: t.export, variant: "ghost", size: "sm", action: "csv", html: icon("arrow") + esc(t.export) }) +
      "</div>" +
      '<div class="s-chips" role="group" aria-label="' + esc(t.status) + '" style="margin-bottom: 16px;">' +
        UI.chip({ label: t.all + " (" + all.length + ")", selected: state.status === "all", action: "status", arg: "all" }) +
        statuses.map(function (st) { return UI.chip({ label: WP.statusLabel(st, lang) + " (" + count(st) + ")", selected: state.status === st, action: "status", arg: st }); }).join("") +
      "</div>" +
      '<div id="adm-results">' + resultsHtml(lang, t, all, list, rows) + "</div>";
  }
  function resultsHtml(lang, t, all, list, rows) {
    return '<p class="s-small" aria-live="polite" style="margin: 0 0 10px;">' + esc(t.shown(list.length, all.length)) + "</p>" +
      (list.length ? '<div class="s-table-wrap"><table class="s-table"><thead><tr><th scope="col">' + esc(t.thBooking) + '</th><th scope="col">' + esc(t.thTreat) + '</th><th scope="col">' +
          esc(t.thWhen) + '</th><th scope="col" class="s-num">' + esc(t.thTotal) + '</th><th scope="col">' + esc(t.thStatus) + "</th></tr></thead><tbody>" + rows + "</tbody></table></div>"
        : '<div class="s-empty"><span class="s-icon-tile">' + icon("search") + '</span><p style="margin: 0;">' + esc(t.noMatch) + "</p></div>");
  }

  function overrides() { return WP.lsGet("overrides", {}); }

  function treatmentsTab(lang, t, all) {
    var ovr = overrides();
    var rows = D.treatments.map(function (tr) {
      var n = all.filter(function (b) { return b.id === tr.id && live(b); }).length, img = D.photos.byId[tr.id];
      var changed = tr.options[0].price !== tr.basePrices[0];
      return "<tr" + (tr.hidden ? ' class="is-muted"' : "") + ">" +
        '<td class="s-td-main" data-label="' + esc(t.thName) + '"><span class="s-adm-tr"><span class="s-adm-thumb">' + (img ? '<img src="' + esc(img) + '" alt="" loading="lazy">' : "") + "</span>" +
          "<span><strong>" + esc(D.L(tr.title, lang)) + '</strong><span class="s-sub">' + esc(D.L(D.cat(tr.cat), lang)) + "</span></span></span></td>" +
        '<td data-label="' + esc(t.thCity) + '">' + esc(D.L(D.cities[tr.city], lang)) + "</td>" +
        '<td data-label="' + esc(t.thPrice) + '"><span class="s-price-edit"><input class="wp-input" type="number" min="100" max="50000" step="10" inputmode="numeric" value="' + tr.options[0].price +
          '" data-input="price" data-id="' + esc(tr.id) + '" aria-label="' + esc(t.thPrice + ": " + D.L(tr.title, lang)) + '">' +
          (changed ? '<span class="s-sub">' + esc(t.was + " " + D.baht(tr.basePrices[0])) + "</span>" : "") + "</span></td>" +
        '<td class="s-num" data-label="' + esc(t.thBk) + '">' + n + "</td>" +
        '<td data-label="' + esc(t.thShow) + '"><label class="s-switch"><input type="checkbox"' + (tr.hidden ? "" : " checked") + ' data-input="vis" data-id="' + esc(tr.id) + '" aria-label="' + esc(t.thShow + ": " + D.L(tr.title, lang)) + '"><span aria-hidden="true"></span></label></td>' +
        '<td data-label="' + esc(t.thLink) + '"><a class="s-linkbtn" href="detail.html?id=' + esc(tr.id) + '">' + esc(t.thLink) + "</a></td>" +
        "</tr>";
    }).join("");
    return '<div class="s-toolbar-row" style="margin-top: 0;"><p class="s-small" style="margin: 0; max-width: 720px;">' + esc(t.trLead) + "</p>" +
        (Object.keys(ovr).length ? UI.button({ label: t.resetPrices, variant: "ghost", size: "sm", action: "resetTr" }) : "") + "</div>" +
      '<div class="s-table-wrap"><table class="s-table s-adm-trs"><thead><tr><th scope="col">' + esc(t.thName) + '</th><th scope="col">' + esc(t.thCity) + '</th><th scope="col">' + esc(t.thPrice) +
        '</th><th scope="col" class="s-num">' + esc(t.thBk) + '</th><th scope="col">' + esc(t.thShow) + '</th><th scope="col"><span class="wp-sr">' + esc(t.thLink) + "</span></th></tr></thead><tbody>" + rows + "</tbody></table></div>";
  }

  function customersTab(lang, t, all) {
    var me = A.current(), users = A.users();
    var rows = users.map(function (u) {
      var list = A.bookingsOf(u), spent = list.filter(earned).reduce(function (a, b) { return a + b.total; }, 0), self = u.id === me.id;
      var joined = new Date(u.createdAt).toLocaleDateString(lang === "th" ? "th-TH" : "en-GB", { day: "numeric", month: "short", year: "numeric" });
      return "<tr>" +
        '<td class="s-td-main" data-label="' + esc(t.thCustomer) + '"><span class="s-adm-tr"><span class="s-avatar' + (u.role === "admin" ? " is-admin" : "") + '" aria-hidden="true">' + A.avatarImg(u) + "</span>" +
          "<span><strong>" + esc(u.first + " " + u.last) + (self ? " · " + esc(t.you) : "") + '</strong><span class="s-sub">' + esc(u.email) + "</span></span></span></td>" +
        '<td data-label="' + esc(t.thRole) + '">' + (self ? UI.badge(t.roles[u.role], u.role === "admin" ? "notice" : "success", u.role === "admin" ? "shield" : "user")
          : '<select class="s-status-sel" data-input="role" data-id="' + esc(u.id) + '" aria-label="' + esc(t.thRole + ": " + u.email) + '">' +
            ["customer", "admin"].map(function (r) { return '<option value="' + r + '"' + (u.role === r ? " selected" : "") + ">" + esc(t.roles[r]) + "</option>"; }).join("") + "</select>") + "</td>" +
        '<td class="s-num" data-label="' + esc(t.thBk) + '">' + list.length + "</td>" +
        '<td class="s-num" data-label="' + esc(t.thSpent) + '">' + esc(D.baht(spent)) + "</td>" +
        '<td data-label="' + esc(t.thJoined) + '">' + esc(joined) + "</td></tr>";
    }).join("");
    var guestEmails = {};
    all.forEach(function (b) { if (b.email && !users.some(function (u) { return u.id === b.account || u.email === b.email.toLowerCase(); })) guestEmails[b.email.toLowerCase()] = 1; });
    return '<p class="s-small" style="margin: 0 0 16px;">' + esc(t.custLead) + "</p>" +
      '<div class="s-table-wrap"><table class="s-table"><thead><tr><th scope="col">' + esc(t.thCustomer) + '</th><th scope="col">' + esc(t.thRole) + '</th><th scope="col" class="s-num">' + esc(t.thBk) +
        '</th><th scope="col" class="s-num">' + esc(t.thSpent) + '</th><th scope="col">' + esc(t.thJoined) + "</th></tr></thead><tbody>" + rows + "</tbody></table></div>" +
      '<div class="s-stat" style="margin-top: 16px; max-width: 360px;"><strong>' + Object.keys(guestEmails).length + "</strong><span>" + esc(t.guestsTitle) + "</span></div>";
  }

  function downloadCsv(list, lang) {
    var cols = ["ref", "created", "first", "last", "email", "phone", "treatment", "city", "date", "time", "minutes", "guests", "total_thb", "status", "member"];
    var q = function (v) { v = String(v === undefined || v === null ? "" : v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
    var lines = [cols.join(",")].concat(list.map(function (b) {
      var tr = D.get(b.id);
      return [b.ref, b.createdAt, b.first, b.last, b.email, b.phone, D.L(tr.title, "en"), D.L(D.cities[tr.city], "en"), b.date, b.slot, b.dur, b.guests, b.total, b.status, b.account ? "yes" : "no"].map(q).join(",");
    }));
    var blob = new Blob(["﻿" + lines.join("\n")], { type: "text/csv;charset=utf-8" }), a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "wellness-pass-bookings-" + D.isoFromIdx(0) + ".csv";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }

  var page = WP.page({
    active: "admin",
    require: "admin",
    view: function (lang) {
      var t = TEXT[lang], all = WP.bookings.all();
      var tabs = [["overview", "chart", t.tOverview], ["bookings", "calendar", t.tBookings], ["treatments", "leaf", t.tTreatments], ["customers", "users", t.tCustomers]];
      var body = state.tab === "bookings" ? bookingsTab(lang, t, all) : state.tab === "treatments" ? treatmentsTab(lang, t, all)
        : state.tab === "customers" ? customersTab(lang, t, all) : overview(lang, t, all);
      return '<main id="main-content">' + WP.pageHero(t.eyebrow, t.title, t.lead) + '<div class="s-shell s-page-main">' +
        UI.notice({ tone: "info", title: t.demoTitle, cls: "s-wide-notice" }, esc(t.demoBody)) +
        '<div class="s-adm-bar"><div class="s-adm-tabs" role="tablist" aria-label="' + esc(t.tabsAria) + '">' + tabs.map(function (x) {
            return '<button type="button" role="tab" id="atab-' + x[0] + '" aria-selected="' + (state.tab === x[0]) + '" aria-controls="adm-panel" data-action="tab" data-arg="' + x[0] + '">' + icon(x[1]) + "<span>" + esc(x[2]) + "</span></button>";
          }).join("") + "</div>" +
          '<div class="s-btn-row">' + UI.button({ label: t.venue, variant: "ghost", size: "sm", href: "venue.html" }) +
            UI.button({ label: t.loadSample, variant: "ghost", size: "sm", action: "sample" }) +
            UI.button({ label: t.reset, variant: "danger", size: "sm", action: "reset" }) + "</div></div>" +
        '<div id="adm-panel" role="tabpanel" aria-labelledby="atab-' + esc(state.tab) + '">' + body + "</div>" +
        "</div></main>";
    },
    actions: {
      tab: function (tab) { state.tab = tab; WP.set({ adminTab: tab }); if (tab === "bookings") setTimeout(function () { window.scrollTo({ top: document.querySelector(".s-adm-bar").offsetTop - 96 }); }, 0); },
      status: function (st) { state.status = st; },
      hRange: function (r) { state.hRange = r; WP.set({ adminHRange: r }); },
      hMetric: function (m) { state.hMetric = m; WP.set({ adminHMetric: m }); },
      sample: function () { WP.bookings.save(sampleBookings().concat(WP.bookings.all())); WP.toast(TEXT[WP.getLang()].sampleAdded); },
      csv: function () { var t = TEXT[WP.getLang()]; downloadCsv(filtered(WP.bookings.all()), WP.getLang()); WP.toast(t.exported); return false; },
      resetTr: function () {
        WP.lsSet("overrides", {});
        D.treatments.forEach(function (tr) { D.applyOverride(tr, null); });
        WP.toast(TEXT[WP.getLang()].pricesReset);
      },
      reset: function () {
        var t = TEXT[WP.getLang()];
        WP.dialog({ title: t.rTitle, html: "<p>" + esc(t.rBody) + "</p>", actions: [{ label: t.cancel, variant: "ghost" }, { label: t.rYes, variant: "danger", value: "yes" }],
          onClose: function (v) {
            if (v !== "yes") return;
            var me = A.current();
            WP.bookings.save([]); WP.lsSet("overrides", {});
            D.treatments.forEach(function (tr) { D.applyOverride(tr, null); });
            A.saveUsers(A.users().filter(function (u) { return u.demo || u.id === me.id; }));
            page.render(); WP.toast(t.resetDone);
          } });
        return false;
      }
    },
    inputs: {
      /* Typing in search: redraw only the results, so the search box keeps focus. */
      q: function (v) {
        state.q = v;
        var box = document.getElementById("adm-results"), lang = WP.getLang();
        if (!box) return true;
        var tmp = document.createElement("div");
        tmp.innerHTML = bookingsTab(lang, TEXT[lang], WP.bookings.all());
        box.innerHTML = tmp.querySelector("#adm-results").innerHTML;
        return false;
      },
      city: function (v) { state.city = v; return true; },
      setStatus: function (v, el) {
        var ref = el.getAttribute("data-ref"), lang = WP.getLang();
        WP.bookings.update(ref, { status: v });
        WP.toast(TEXT[lang].statusChanged(ref, WP.statusLabel(v, lang)));
        return true;
      },
      price: function (v, el, e) {
        if (e.type !== "change") return false;
        var t = TEXT[WP.getLang()], id = el.getAttribute("data-id"), tr = D.get(id), p = Math.round(Number(v));
        if (!(p >= 100 && p <= 50000)) { WP.toast(t.priceBad, "danger"); el.value = tr.options[0].price; return false; }
        var ovr = overrides(), o = ovr[id] || {};
        o.from = p === tr.basePrices[0] ? 0 : p;
        if (!o.from && !o.hidden) delete ovr[id]; else ovr[id] = o;
        WP.lsSet("overrides", ovr);
        D.applyOverride(tr, ovr[id]);
        WP.toast(t.priceSaved(D.L(tr.title, WP.getLang()), D.baht(tr.options[0].price)));
        setTimeout(page.render, 0);   // "change" fires while the box is losing focus; redraw just after, not during it
        return false;
      },
      vis: function (v, el) {
        var t = TEXT[WP.getLang()], id = el.getAttribute("data-id"), tr = D.get(id), ovr = overrides(), o = ovr[id] || {};
        o.hidden = !v;
        if (!o.from && !o.hidden) delete ovr[id]; else ovr[id] = o;
        WP.lsSet("overrides", ovr);
        D.applyOverride(tr, ovr[id]);
        WP.toast(v ? t.shownOn : t.hiddenOn);
        return true;
      },
      role: function (v, el) {
        A.update(el.getAttribute("data-id"), { role: v });
        WP.toast(TEXT[WP.getLang()].roleChanged);
        return true;
      }
    }
  });
})();
