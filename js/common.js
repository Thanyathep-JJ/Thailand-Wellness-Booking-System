/* Wellness Pass: shared site code used by every page.
   - Store: booking state carried between pages (sessionStorage, cleared when the tab closes) + language (localStorage).
   - WP.go(): navigate to another screen/page.
   - Header and footer.
   - WP.page(): renders a page and wires data-action / data-input / data-submit events to the page's handlers.
   Exposes window.WP. Needs data.js and ui.js loaded first. */
(function () {
  "use strict";
  var UI = window.UI, esc = UI.esc, icon = UI.icon;

  /* ---------- Store ---------- */
  var KEY = "wellnessPass";
  function readAll() { try { return JSON.parse(sessionStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function get(k, def) { var v = readAll()[k]; return v === undefined || v === null ? def : v; }
  function set(patch) {
    var all = readAll();
    for (var k in patch) all[k] = patch[k];
    try { sessionStorage.setItem(KEY, JSON.stringify(all)); } catch (e) {}
  }
  function getLang() { try { return localStorage.getItem(KEY + ".lang") || "th"; } catch (e) { return "th"; } }
  function setLangStored(l) { try { localStorage.setItem(KEY + ".lang", l); } catch (e) {} }

  /* ---------- Navigation ---------- */
  var FILES = { home: "index.html", treatments: "treatments.html", detail: "detail.html", booking: "booking.html", checkout: "checkout.html", success: "success.html" };
  /* go("detail", { treatmentId: "muay-thai" }) saves the patch, then opens the page. */
  function go(screen, patch, hash) {
    patch = patch || {};
    set(patch);
    var url = FILES[screen] || FILES.home;
    if (screen === "detail") url += "?id=" + encodeURIComponent(patch.treatmentId || get("treatmentId", "thai-traditional"));
    if (screen === "treatments" && patch.filterCat && patch.filterCat !== "all") url += "?cat=" + encodeURIComponent(patch.filterCat);
    location.href = url + (hash ? "#" + hash : "");
  }
  function param(name) { try { return new URLSearchParams(location.search).get(name); } catch (e) { return null; } }

  /* ---------- Wishlist hearts (saved for this browser tab) ---------- */
  function savedList() { return get("saved", []); }
  function isSaved(id) { return savedList().indexOf(id) >= 0; }
  function toggleSaved(id) {
    var l = savedList().slice(), i = l.indexOf(id);
    if (i >= 0) l.splice(i, 1); else l.push(id);
    set({ saved: l });
  }

  /* ---------- Header ---------- */
  var HEADER_T = {
    th: { homeAria: "Wellness Pass หน้าแรก", navAria: "เมนูหลัก", home: "หน้าแรก", treatments: "ทรีตเมนต์", picked: "แนะนำสำหรับคุณ", search: "ค้นหาทรีตเมนต์", langAria: "ภาษา", menu: "เมนู", skip: "ข้ามไปยังเนื้อหา" },
    en: { homeAria: "Wellness Pass home", navAria: "Main", home: "Home", treatments: "Treatments", picked: "Picked for you", search: "Search treatments", langAria: "Language", menu: "Menu", skip: "Skip to content" }
  };
  function navLinks(t, active) {
    return '<button type="button" class="s-nav-link"' + (active === "home" ? ' aria-current="page"' : "") + ' data-action="wp:home">' + esc(t.home) + "</button>" +
      '<button type="button" class="s-nav-link"' + (active === "treatments" ? ' aria-current="page"' : "") + ' data-action="wp:all">' + esc(t.treatments) + "</button>" +
      '<button type="button" class="s-nav-link" data-action="wp:quiz">' + esc(t.picked) + "</button>";
  }
  function header(lang, active, menuOpen) {
    var t = HEADER_T[lang], th = lang === "th";
    return '<header class="s-header" style="width: 100%;"><div class="s-shell"><div class="s-header-in">' +
      '<button type="button" class="s-brand" aria-label="' + esc(t.homeAria) + '" data-action="wp:home">Wellness Pass</button>' +
      '<nav class="s-nav" aria-label="' + esc(t.navAria) + '">' + navLinks(t, active) + "</nav>" +
      '<div class="s-tools">' +
        '<span class="s-search-pill">' + UI.button({ label: t.search, size: "sm", action: "wp:all" }) + "</span>" +
        '<div class="s-lang" role="group" aria-label="' + esc(t.langAria) + '">' +
          '<button type="button" lang="th" aria-pressed="' + (th ? "true" : "false") + '" data-action="wp:lang" data-arg="th">ไทย</button>' +
          '<button type="button" lang="en" aria-pressed="' + (th ? "false" : "true") + '" data-action="wp:lang" data-arg="en">EN</button>' +
        "</div>" +
        '<button type="button" class="wp-icon-btn s-menu-btn" aria-label="' + esc(t.menu) + '" aria-expanded="' + (menuOpen ? "true" : "false") + '" data-action="wp:menu">' + icon(menuOpen ? "close" : "menu") + "</button>" +
      "</div></div>" +
      (menuOpen ? '<nav class="s-mobile-nav" aria-label="' + esc(t.navAria) + '">' + navLinks(t, active) + "</nav>" : "") +
      "</div></header>";
  }

  /* ---------- Footer ---------- */
  var FOOTER_T = {
    th: { tagline: "จองนวดไทย สปา โยคะ และรีทรีตทั่วประเทศไทย จากสิ่งที่คุณบอกเรา", demo: "ต้นแบบเดโม · ชื่อแบรนด์ สถานที่ ราคา และนโยบายทั้งหมดเป็นตัวอย่าง",
      explore: "EXPLORE · สำรวจ", all: "ทรีตเมนต์ทั้งหมด", picked: "แนะนำสำหรับคุณ", help: "HELP · ช่วยเหลือ", faq: "คำถามที่พบบ่อย [หน้ายังไม่อยู่ในเดโม]",
      policy: "นโยบายการยกเลิก [รอกำหนด]", contact: "ติดต่อเรา [รอข้อมูลจริง]", copy: "© 2026 Wellness Pass (ชื่อชั่วคราว)", legal: "ข้อกำหนด · ความเป็นส่วนตัว [รอเนื้อหา]" },
    en: { tagline: "Book Thai massage, spa, yoga and retreats across Thailand, matched to what you tell us.", demo: "Demo prototype · brand name, venues, prices and policies are all samples.",
      explore: "EXPLORE", all: "All treatments", picked: "Picked for you", help: "HELP", faq: "FAQ [page not in this demo]",
      policy: "Cancellation policy [to be set]", contact: "Contact [details to come]", copy: "© 2026 Wellness Pass (working name)", legal: "Terms · Privacy [content to come]" }
  };
  var FOOTER_ART = '<svg class="s-foot-art" viewBox="0 0 1440 260" preserveAspectRatio="xMidYMax slice" aria-hidden="true">' +
    '<path d="M0 150 C180 104 330 132 500 110 C670 88 790 126 960 104 C1120 84 1270 118 1440 98 L1440 260 L0 260 Z" fill="#e1f0e7"></path>' +
    '<path d="M0 190 C210 156 400 182 590 166 C790 148 930 182 1130 166 C1280 154 1370 170 1440 164 L1440 260 L0 260 Z" fill="#9fcdb3"></path>' +
    '<g fill="#1b4637"><rect x="1006" y="150" width="108" height="40"></rect><path d="M984 154 L1060 112 L1136 154 Z"></path><path d="M1006 122 L1060 88 L1114 122 Z"></path><path d="M1028 96 L1060 70 L1092 96 Z"></path><rect x="1057" y="40" width="6" height="32"></rect></g>' +
    '<path d="M984 154 C978 146 976 140 980 132 M1136 154 C1142 146 1144 140 1140 132" stroke="#1b4637" stroke-width="4" fill="none" stroke-linecap="round"></path>' +
    '<g fill="#276b53"><path d="M246 170 L310 134 L374 170 Z"></path><rect x="262" y="170" width="6" height="26"></rect><rect x="352" y="170" width="6" height="26"></rect><rect x="250" y="194" width="120" height="6"></rect></g>' +
    '<path d="M150 234 C156 192 150 162 162 128" stroke="#12352b" stroke-width="7" fill="none" stroke-linecap="round"></path>' +
    '<g fill="#1b4637"><path d="M162 128 C140 112 112 114 92 128 C118 124 140 126 162 134 Z"></path><path d="M162 128 C184 108 214 108 236 122 C208 120 186 124 162 134 Z"></path><path d="M162 128 C152 102 128 90 106 92 C130 102 146 114 160 132 Z"></path><path d="M162 128 C176 100 200 90 222 94 C198 104 180 116 164 132 Z"></path><path d="M162 126 C164 104 160 88 150 76 C168 90 172 108 166 128 Z"></path></g>' +
    '<path d="M1290 236 C1292 210 1284 196 1270 184 M1290 214 C1300 200 1312 194 1324 192" stroke="#12352b" stroke-width="6" fill="none" stroke-linecap="round"></path>' +
    '<g fill="#2f7d62"><circle cx="1262" cy="176" r="26"></circle><circle cx="1296" cy="162" r="30"></circle><circle cx="1328" cy="184" r="24"></circle></g>' +
    '<g fill="#fffaf2"><circle cx="1252" cy="166" r="5"></circle><circle cx="1284" cy="150" r="5"></circle><circle cx="1306" cy="172" r="5"></circle><circle cx="1332" cy="178" r="5"></circle><circle cx="1270" cy="188" r="5"></circle></g>' +
    '<path d="M0 222 C300 204 620 232 900 214 C1140 200 1310 222 1440 212 L1440 260 L0 260 Z" fill="#12352b"></path></svg>';
  function footer(lang) {
    var t = FOOTER_T[lang];
    return '<div style="width: 100%; font-family: var(--font-sans);">' + FOOTER_ART +
      '<footer class="s-footer wp-on-dark s-dark"><div class="s-shell"><div class="s-foot-grid">' +
        '<div style="display: grid; gap: 10px; align-content: start; max-width: 420px;">' +
          '<strong style="font-size: 22px; font-weight: 600; color: var(--on-forest);">Wellness Pass</strong>' +
          '<p class="s-foot-muted" style="margin: 0; line-height: 1.75;">' + esc(t.tagline) + "</p>" +
          '<p class="s-foot-muted" style="margin: 0; font-size: 13px;">' + esc(t.demo) + "</p></div>" +
        '<nav aria-label="' + esc(t.explore) + '"><p class="s-eyebrow">' + esc(t.explore) + "</p>" +
          '<button type="button" class="s-foot-link" data-action="wp:all">' + esc(t.all) + "</button>" +
          '<button type="button" class="s-foot-link" data-action="wp:quiz">' + esc(t.picked) + "</button></nav>" +
        '<div><p class="s-eyebrow">' + esc(t.help) + "</p>" +
          '<p class="s-foot-muted" style="margin: 0 0 8px;">' + esc(t.faq) + "</p>" +
          '<p class="s-foot-muted" style="margin: 0 0 8px;">' + esc(t.policy) + "</p>" +
          '<p class="s-foot-muted" style="margin: 0;">' + esc(t.contact) + "</p></div>" +
      '</div><div class="s-foot-bottom"><span>' + esc(t.copy) + "</span><span>" + esc(t.legal) + "</span></div></div></footer></div>";
  }

  /* ---------- Page runner ----------
     WP.page({
       active: "home" | "treatments" | null,   // highlights the header link
       view: function (lang) { return "<main ...>...</main>"; },
       actions: { name: function (arg, el, event) {} },   // data-action clicks; page re-renders afterwards unless the handler returns false
       inputs:  { name: function (value, el, event) {} }, // data-input typing/changes; re-renders only if the handler returns true
       submits: { name: function (form, event) {} },      // data-submit forms; re-renders afterwards
       after:   function () {}                             // runs after every render
     }) */
  function page(cfg) {
    var root = document.getElementById("app");
    var ui = { lang: getLang(), menu: false };
    var api = {};

    function focusKey(el) {
      if (!el || !root.contains(el)) return null;
      if (el.id) return "#" + CSS.escape(el.id);
      var a = el.getAttribute("data-action");
      if (a) {
        var arg = el.getAttribute("data-arg");
        return '[data-action="' + a + '"]' + (arg !== null ? '[data-arg="' + CSS.escape(arg) + '"]' : "");
      }
      return null;
    }

    function render() {
      document.documentElement.lang = ui.lang;
      var active = document.activeElement;
      var fk = focusKey(active);
      var caret = null;
      try { if (active && typeof active.selectionStart === "number") caret = [active.selectionStart, active.selectionEnd]; } catch (e) {}
      var openDetails = Array.prototype.map.call(root.querySelectorAll("details"), function (d) { return d.open; });
      root.innerHTML = '<div class="s-page" style="width: 100%;">' +
        '<a class="s-skip" href="#main-content">' + esc(HEADER_T[ui.lang].skip) + "</a>" +
        '<div class="s-header-slot">' + header(ui.lang, cfg.active, ui.menu) + "</div>" +
        cfg.view(ui.lang) +
        footer(ui.lang) + "</div>";
      Array.prototype.forEach.call(root.querySelectorAll("details"), function (d, i) { if (openDetails[i]) d.open = true; });
      if (fk) {
        var el = root.querySelector(fk);
        if (el) try { el.focus({ preventScroll: true }); if (caret && el.setSelectionRange) el.setSelectionRange(caret[0], caret[1]); } catch (e) {}
      }
      if (cfg.after) cfg.after();
    }

    /* Built-in actions shared by every page (header, footer, hearts). */
    var builtIn = {
      "wp:home": function () { ui.menu = false; go("home"); return false; },
      "wp:all": function () { ui.menu = false; go("treatments", { filterCat: "all" }); return false; },
      "wp:quiz": function () {
        ui.menu = false;
        var q = cfg.active === "home" && document.getElementById("quiz");
        if (q) { render(); document.getElementById("quiz").scrollIntoView(); return false; }
        go("home", null, "quiz"); return false;
      },
      "wp:lang": function (l) { ui.lang = l; setLangStored(l); },
      "wp:menu": function () { ui.menu = !ui.menu; },
      "toggleSave": function (id, el, e) { e.preventDefault(); e.stopPropagation(); toggleSaved(id); }
    };

    root.addEventListener("click", function (e) {
      var el = e.target.closest("[data-action]");
      if (!el || !root.contains(el) || el.disabled || el.getAttribute("aria-disabled") === "true") return;
      var name = el.getAttribute("data-action"), arg = el.getAttribute("data-arg");
      var fn = builtIn[name] || (cfg.actions && cfg.actions[name]);
      if (!fn) return;
      if (el.tagName === "A" && el.getAttribute("href") === "#") e.preventDefault();
      var r = fn.call(api, arg, el, e);
      if (r !== false) render();
    });
    function onInput(e) {
      var el = e.target.closest("[data-input]");
      if (!el || !cfg.inputs) return;
      var fn = cfg.inputs[el.getAttribute("data-input")];
      if (!fn) return;
      var v = el.type === "checkbox" ? el.checked : el.value;
      if (fn.call(api, v, el, e) === true) render();
    }
    /* Handlers get both "input" (every keystroke / slider move) and "change" (committed value) events;
       check e.type if they only care about one. Checkbox, radio and select only fire "change". */
    root.addEventListener("input", function (e) { var t = e.target.type; if (t !== "checkbox" && t !== "radio" && e.target.tagName !== "SELECT") onInput(e); });
    root.addEventListener("change", onInput);
    root.addEventListener("submit", function (e) {
      var f = e.target.closest("[data-submit]");
      if (!f) return;
      e.preventDefault();
      var fn = cfg.submits && cfg.submits[f.getAttribute("data-submit")];
      if (fn && fn.call(api, f, e) !== false) render();
    });

    api.render = render;
    api.lang = function () { return ui.lang; };
    render();
    if (location.hash) { var target = document.getElementById(location.hash.slice(1)); if (target) target.scrollIntoView(); }
    return api;
  }

  /* ---------- Shared widgets used by several pages ---------- */

  /* Guest counter rows (children / adults / seniors). Buttons fire actions "partyLess" / "partyMore" with the row index. */
  function partyHtml(party, lang) {
    return '<div class="s-party">' + window.WPData.partyRows(party, lang, function () {}).map(function (r, i) {
      return '<div class="s-guest-row"><span><strong>' + esc(r.label) + '</strong><span class="s-sub">' + esc(r.sub) + "</span></span>" +
        '<div class="s-stepper-ctl">' +
          '<button type="button" aria-label="' + esc(r.ariaLess) + '"' + (r.noLess ? " disabled" : "") + ' data-action="partyLess" data-arg="' + i + '">−</button>' +
          '<output aria-live="polite">' + r.n + "</output>" +
          '<button type="button" aria-label="' + esc(r.ariaMore) + '"' + (r.noMore ? " disabled" : "") + ' data-action="partyMore" data-arg="' + i + '">+</button>' +
        "</div></div>";
    }).join("") + "</div>";
  }
  /* Apply a guest counter click: returns the new party object. dir = "less" | "more". */
  function partyChange(party, i, dir) {
    var next = party;
    var rows = window.WPData.partyRows(party, "en", function (q) { next = q; });
    if (rows[i]) rows[i][dir]();
    return next;
  }

  /* Month calendar: header with prev/next month buttons, then the day grid.
     Fires "prevMonth", "nextMonth" and "pickDate" (arg = days from today). */
  function calendarHtml(monthOff, selectedIdx, lang, labels) {
    var D = window.WPData, mg = D.monthGrid(monthOff, lang);
    return '<div class="s-cal-head">' +
        '<button type="button" class="s-cal-nav" aria-label="' + esc(labels.prev) + '"' + (monthOff <= 0 ? " disabled" : "") + ' data-action="prevMonth">' + icon("left") + "</button>" +
        '<strong class="s-cal-title" aria-live="polite">' + esc(mg.title) + "</strong>" +
        '<button type="button" class="s-cal-nav" aria-label="' + esc(labels.next) + '"' + (monthOff >= mg.maxOff ? " disabled" : "") + ' data-action="nextMonth">' + icon("right") + "</button>" +
      "</div>" +
      '<div class="s-cal-grid" role="group" aria-label="' + esc(mg.title) + '">' +
        D.dows(lang).map(function (w) { return '<span class="s-cal-dow" aria-hidden="true">' + esc(w) + "</span>"; }).join("") +
        mg.cells.map(function (c) {
          if (c.blank) return '<button type="button" class="s-day is-blank" aria-pressed="false" disabled></button>';
          var cls = "s-day" + (c.isToday ? " is-today" : "") + (c.weekend && c.ok ? " is-wknd" : "");
          return '<button type="button" class="' + cls + '" aria-pressed="' + (c.ok && c.idx === selectedIdx) + '" aria-label="' + esc(c.aria) + '"' + (c.ok ? "" : " disabled") + ' data-action="pickDate" data-arg="' + c.idx + '">' + c.n + "</button>";
        }).join("") +
      "</div>";
  }
  function maxMonthOff() { return window.WPData.monthGrid(0, "en").maxOff; }

  /* Booking summary numbers shared by booking, checkout and success pages.
     b = { id, dur, dateIdx, slot, guests, party } (saved by the detail page). */
  var SAMPLE_BOOKING = { id: "thai-traditional", dur: 90, dateIdx: 1, slot: "13:30", guests: 2 };
  function bookingSummary(b, lang) {
    var D = window.WPData, th = lang === "th";
    b = b || SAMPLE_BOOKING;
    var tr = D.get(b.id), guests = b.guests || 1, unit = D.priceFor(tr, b.dur), fee = tr.travelFee || 0, dates = D.dates(lang);
    return {
      tr: tr, guests: guests, unit: unit, fee: fee, total: unit * guests + fee,
      icon: tr.icon, title: D.L(tr.title, lang), venue: (th ? "สถานที่ตัวอย่าง · " : "Sample venue · ") + D.L(D.cities[tr.city], lang),
      date: (dates[b.dateIdx] || dates[0]).label, time: b.slot, length: D.minLabel(b.dur, lang),
      guestsLabel: b.party ? D.partyLabel(b.party, lang) : String(guests),
      lineLabel: D.baht(unit) + " × " + guests, line: D.baht(unit * guests), feeLabel: D.baht(fee), totalLabel: D.baht(unit * guests + fee)
    };
  }
  /* The treatment icon + title + venue block at the top of a summary card. */
  function summaryHead(sum, titleTag) {
    var tag = titleTag || "strong";
    var title = tag === "h2" ? '<h2 class="s-h3" style="font-size: 18px;">' + esc(sum.title) + "</h2>"
      : '<strong style="display: block; font-weight: 500; color: var(--forest);">' + esc(sum.title) + "</strong>";
    return '<div style="display: flex; gap: 14px; align-items: center;"><span class="s-icon-tile" style="border-radius: 14px; flex: none;">' + icon(sum.icon) + "</span>" +
      '<div style="min-width: 0;">' + title + '<span class="s-small">' + esc(sum.venue) + "</span></div></div>";
  }
  /* <dl> of label/value rows. rows = [[label, value], ...]; falsy rows are skipped. */
  function sumRows(rows) {
    return '<dl class="s-sum-rows">' + rows.filter(Boolean).map(function (r) { return "<div><dt>" + esc(r[0]) + "</dt><dd>" + esc(r[1]) + "</dd></div>"; }).join("") + "</dl>";
  }
  function backButton(label, action) {
    return '<button type="button" class="s-back" data-action="' + action + '">' + icon("arrow") + esc(label) + "</button>";
  }

  window.WP = { get: get, set: set, go: go, param: param, getLang: getLang, isSaved: isSaved, page: page,
    partyHtml: partyHtml, partyChange: partyChange, calendarHtml: calendarHtml, maxMonthOff: maxMonthOff,
    bookingSummary: bookingSummary, summaryHead: summaryHead, sumRows: sumRows, backButton: backButton };
})();
