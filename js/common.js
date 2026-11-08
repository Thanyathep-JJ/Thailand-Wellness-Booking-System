/* Wellness Pass: shared site code used by every page.
   - Store: booking-in-progress state carried between pages (sessionStorage, cleared when the tab closes).
     Language, wishlist and saved demo bookings live in localStorage (kept in this browser).
   - WP.go(): navigate to another screen/page.
   - Header and footer.
   - Toasts, dialogs and the "processing" overlay.
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
  function lsGet(k, def) { try { var v = JSON.parse(localStorage.getItem(KEY + "." + k)); return v === null || v === undefined ? def : v; } catch (e) { return def; } }
  function lsSet(k, v) { try { localStorage.setItem(KEY + "." + k, JSON.stringify(v)); } catch (e) {} }
  function getLang() { var l = lsGet("lang", null); if (l) return l; try { return localStorage.getItem(KEY + ".lang") === "en" ? "en" : "th"; } catch (e) { return "th"; } }
  function setLangStored(l) { lsSet("lang", l); }

  /* ---------- Demo bookings (saved in this browser, no health details) ---------- */
  var bookings = {
    all: function () { return lsGet("bookings", []); },
    save: function (list) { lsSet("bookings", list); },
    add: function (rec) { var l = bookings.all(); l.unshift(rec); bookings.save(l); return rec; },
    find: function (ref) { var l = bookings.all(); for (var i = 0; i < l.length; i++) if (l[i].ref === ref) return l[i]; return null; },
    update: function (ref, patch) {
      var l = bookings.all();
      l.forEach(function (b) { if (b.ref === ref) Object.assign(b, patch, { updatedAt: new Date().toISOString() }); });
      bookings.save(l);
    },
    newRef: function () {
      var abc = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789", s = "";
      for (var i = 0; i < 6; i++) s += abc.charAt(Math.floor(Math.random() * abc.length));
      return "WP-" + s;
    }
  };

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

  /* ---------- Wishlist hearts (kept in this browser) ---------- */
  function savedList() { return lsGet("saved", []).filter(function (id) { return window.WPData.treatments.some(function (t) { return t.id === id; }); }); }
  function isSaved(id) { return savedList().indexOf(id) >= 0; }
  function toggleSaved(id) {
    var l = savedList().slice(), i = l.indexOf(id);
    if (i >= 0) l.splice(i, 1); else l.push(id);
    lsSet("saved", l);
    return i < 0;   // true = now saved
  }

  /* ---------- Header ---------- */
  var HEADER_T = {
    th: { homeAria: "Wellness Pass หน้าแรก", navAria: "เมนูหลัก", home: "หน้าแรก", treatments: "ทรีตเมนต์", picked: "แนะนำสำหรับคุณ", mine: "การจองของฉัน",
      wishlist: "รายการที่ชอบ", search: "ค้นหาทรีตเมนต์", langAria: "ภาษา", menu: "เมนู", skip: "ข้ามไปยังเนื้อหา" },
    en: { homeAria: "Wellness Pass home", navAria: "Main", home: "Home", treatments: "Treatments", picked: "Picked for you", mine: "My bookings",
      wishlist: "Wishlist", search: "Search treatments", langAria: "Language", menu: "Menu", skip: "Skip to content" }
  };
  function navLink(href, label, current) {
    return '<a class="s-nav-link" href="' + href + '"' + (current ? ' aria-current="page"' : "") + ">" + esc(label) + "</a>";
  }
  function navLinks(t, active, mobile) {
    return navLink("index.html", t.home, active === "home") + navLink("treatments.html", t.treatments, active === "treatments") +
      navLink("index.html#quiz", t.picked, false) +
      (mobile ? navLink("wishlist.html", t.wishlist, active === "wishlist") : "") +
      navLink("mybookings.html", t.mine, active === "mybookings");
  }
  function header(lang, active, menuOpen) {
    var t = HEADER_T[lang], th = lang === "th", n = savedList().length;
    return '<header class="s-header" style="width: 100%;"><div class="s-shell"><div class="s-header-in">' +
      '<a class="s-brand" href="index.html" aria-label="' + esc(t.homeAria) + '">' + icon("lotus", { cls: "s-brand-mark" }) + "Wellness Pass</a>" +
      '<nav class="s-nav" aria-label="' + esc(t.navAria) + '">' + navLinks(t, active) + "</nav>" +
      '<div class="s-tools">' +
        '<span class="s-search-pill">' + UI.button({ label: t.search, size: "sm", href: "treatments.html" }) + "</span>" +
        '<a class="wp-icon-btn s-wish-btn" href="wishlist.html"' + (active === "wishlist" ? ' aria-current="page"' : "") + ' aria-label="' + esc(t.wishlist + (n ? " (" + n + ")" : "")) + '">' + icon("heart") +
          (n ? '<span class="wp-count" aria-hidden="true">' + n + "</span>" : "") + "</a>" +
        '<div class="s-lang" role="group" aria-label="' + esc(t.langAria) + '">' +
          '<button type="button" lang="th" aria-pressed="' + (th ? "true" : "false") + '" data-action="wp:lang" data-arg="th">ไทย</button>' +
          '<button type="button" lang="en" aria-pressed="' + (th ? "false" : "true") + '" data-action="wp:lang" data-arg="en">EN</button>' +
        "</div>" +
        '<button type="button" class="wp-icon-btn s-menu-btn" aria-label="' + esc(t.menu) + '" aria-expanded="' + (menuOpen ? "true" : "false") + '" data-action="wp:menu">' + icon(menuOpen ? "close" : "menu") + "</button>" +
      "</div></div>" +
      (menuOpen ? '<nav class="s-mobile-nav" aria-label="' + esc(t.navAria) + '">' + navLinks(t, active, true) + "</nav>" : "") +
      "</div></header>";
  }

  /* ---------- Footer ---------- */
  var FOOTER_T = {
    th: { tagline: "จองนวดไทย สปา โยคะ และรีทรีตทั่วประเทศไทย จากสิ่งที่คุณบอกเรา", demo: "ต้นแบบเดโม · สถานที่ ราคา รีวิว และการชำระเงินทั้งหมดเป็นตัวอย่าง",
      explore: "EXPLORE · สำรวจ", all: "ทรีตเมนต์ทั้งหมด", picked: "แนะนำสำหรับคุณ", wishlist: "รายการที่ชอบ", mine: "การจองของฉัน",
      help: "HELP · ช่วยเหลือ", faq: "คำถามที่พบบ่อย", policy: "นโยบายการยกเลิก", contact: "ติดต่อเรา", venue: "แดชบอร์ดสถานที่ (เดโม)",
      copy: "© 2026 Wellness Pass · ต้นแบบเพื่อการศึกษา", terms: "ข้อกำหนดการใช้งาน", privacy: "นโยบายความเป็นส่วนตัว" },
    en: { tagline: "Book Thai massage, spa, yoga and retreats across Thailand, matched to what you tell us.", demo: "Demo prototype · venues, prices, reviews and payments are all samples.",
      explore: "EXPLORE", all: "All treatments", picked: "Picked for you", wishlist: "Wishlist", mine: "My bookings",
      help: "HELP", faq: "FAQ", policy: "Cancellation policy", contact: "Contact us", venue: "Venue dashboard (demo)",
      copy: "© 2026 Wellness Pass · A student prototype", terms: "Terms of use", privacy: "Privacy policy" }
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
          footLink("treatments.html", t.all) + footLink("index.html#quiz", t.picked) + footLink("wishlist.html", t.wishlist) + footLink("mybookings.html", t.mine) + "</nav>" +
        '<nav aria-label="' + esc(t.help) + '"><p class="s-eyebrow">' + esc(t.help) + "</p>" +
          footLink("faq.html", t.faq) + footLink("policy.html", t.policy) + footLink("contact.html", t.contact) + footLink("venue.html", t.venue) + "</nav>" +
      '</div><div class="s-foot-bottom"><span>' + esc(t.copy) + '</span><span class="s-foot-legal">' +
        '<a href="terms.html">' + esc(t.terms) + '</a><span aria-hidden="true"> · </span><a href="privacy.html">' + esc(t.privacy) + "</a></span></div></div></footer></div>";
  }
  function footLink(href, label) { return '<a class="s-foot-link" href="' + href + '">' + esc(label) + "</a>"; }

  /* ---------- Toasts: short messages that disappear by themselves (3.5 s) ---------- */
  function toast(msg, tone) {
    var box = document.getElementById("wp-toasts");
    if (!box) {
      box = document.createElement("div");
      box.id = "wp-toasts"; box.className = "wp-toasts"; box.setAttribute("role", "status"); box.setAttribute("aria-live", "polite");
      document.body.appendChild(box);
    }
    var el = document.createElement("div");
    el.className = "wp-toast" + (tone ? " wp-toast-" + tone : "");
    el.innerHTML = icon(tone === "danger" ? "alert" : "check") + "<span>" + esc(msg) + "</span>";
    box.appendChild(el);
    setTimeout(function () { el.classList.add("is-out"); setTimeout(function () { el.remove(); }, 250); }, 3500);
  }

  /* ---------- Dialog (uses <dialog>, so focus stays inside and Esc closes it) ----------
     dialog({ title, html, wide, cls, actions: [{ label, variant, value }], onClose: function (value) {}, onOpen: function (dlg) {} }) */
  function dialog(o) {
    var d = document.createElement("dialog");
    d.className = "wp-dialog" + (o.wide ? " is-wide" : "") + (o.cls ? " " + o.cls : "");
    var closeLabel = getLang() === "th" ? "ปิด" : "Close";
    d.innerHTML = '<div class="wp-dialog-head"><h2 class="wp-dialog-title">' + esc(o.title || "") + "</h2>" +
      '<button type="button" class="wp-icon-btn" data-close="" aria-label="' + esc(closeLabel) + '">' + icon("close") + "</button></div>" +
      '<div class="wp-dialog-body">' + (o.html || "") + "</div>" +
      (o.actions && o.actions.length ? '<div class="wp-dialog-foot">' + o.actions.map(function (a) {
        return UI.button({ label: a.label, variant: a.variant || "primary", attrs: { "data-close": a.value || "" } });
      }).join("") + "</div>" : "");
    document.body.appendChild(d);
    var result = "";
    d.addEventListener("click", function (e) {
      var c = e.target.closest("[data-close]");
      if (c) { result = c.getAttribute("data-close"); d.close(); return; }
      if (e.target === d) d.close();   // click on the backdrop
    });
    d.addEventListener("close", function () { d.remove(); if (o.onClose) o.onClose(result); });
    d.showModal();
    if (o.onOpen) o.onOpen(d);
    return d;
  }

  /* ---------- Full-screen "processing" overlay. Returns { done() } ---------- */
  function processing(text) {
    var el = document.createElement("div");
    el.className = "wp-processing";
    el.setAttribute("role", "status");
    el.innerHTML = '<div class="wp-processing-box"><span class="wp-spinner" aria-hidden="true"></span><strong>' + esc(text) + "</strong></div>";
    document.body.appendChild(el);
    return {
      done: function () { el.remove(); },
      /* Swap the spinner for an animated tick (e.g. "Payment successful") before moving on. */
      success: function (msg) { el.querySelector(".wp-processing-box").innerHTML = '<span class="wp-processing-ok" aria-hidden="true">' + icon("check") + "</span><strong>" + esc(msg) + "</strong>"; }
    };
  }

  /* Show or clear one form field's error message in place, without redrawing the page.
     el = the <input>; it must sit inside a .wp-field box. Unchanged messages are not re-announced. */
  function fieldError(el, msg) {
    var box = el.closest(".wp-field"), old = box.querySelector(".wp-error"), errId = el.id + "-err";
    if ((old ? old.textContent : "") === (msg || "")) return;
    if (old) old.remove();
    var described = (el.getAttribute("aria-describedby") || "").split(" ").filter(function (x) { return x && x !== errId; });
    if (msg) {
      box.insertAdjacentHTML("beforeend", '<span id="' + errId + '" class="wp-error" role="alert">' + icon("alert") + esc(msg) + "</span>");
      el.setAttribute("aria-invalid", "true");
      described.push(errId);
    } else el.removeAttribute("aria-invalid");
    if (described.length) el.setAttribute("aria-describedby", described.join(" ")); else el.removeAttribute("aria-describedby");
  }

  /* Copy text to the clipboard and confirm with a toast. */
  function copyText(text, okMsg) {
    var ok = function () { toast(okMsg); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(ok, fallback); else fallback();
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); ok(); } catch (e) {}
      ta.remove();
    }
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
      "toggleSave": function (id, el, e) {
        e.preventDefault(); e.stopPropagation();
        var now = toggleSaved(id), th = ui.lang === "th";
        toast(now ? (th ? "บันทึกไว้ในรายการที่ชอบแล้ว" : "Saved to your wishlist") : (th ? "นำออกจากรายการที่ชอบแล้ว" : "Removed from your wishlist"));
        if (cfg.onSaveChange) cfg.onSaveChange(id, now);
      }
    };

    root.addEventListener("click", function (e) {
      if (e.target.closest(".s-mobile-nav a")) { setTimeout(function () { if (ui.menu) { ui.menu = false; render(); } }, 0); return; }
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
    root.classList.add("is-ready");   // fades the page in once (see extras.css)
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

  /* Booking summary numbers shared by booking, checkout, success, my bookings and the venue dashboard.
     b = { id, dur, dateIdx, slot, guests, party } from the detail page, or a saved booking that has `date` ("YYYY-MM-DD"). */
  var SAMPLE_BOOKING = { id: "thai-traditional", dur: 90, dateIdx: 1, slot: "13:30", guests: 2 };
  function bookingSummary(b, lang) {
    var D = window.WPData;
    b = b || SAMPLE_BOOKING;
    var tr = D.get(b.id), guests = b.guests || 1, unit = D.priceFor(tr, b.dur), fee = tr.travelFee || 0, dates = D.dates(lang);
    var v = D.venues[tr.id];
    return {
      tr: tr, guests: guests, unit: unit, fee: fee, total: unit * guests + fee,
      icon: tr.icon, title: D.L(tr.title, lang), venue: (v ? v.name : "") + " · " + D.L(D.cities[tr.city], lang),
      date: b.date ? D.isoLabel(b.date, lang) : (dates[b.dateIdx] || dates[0]).label, time: b.slot, length: D.minLabel(b.dur, lang),
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
  /* Summary card header with the treatment photo, category, title, venue and rating (booking + checkout). */
  function summaryPhoto(sum, lang) {
    var D = window.WPData, img = D.photos.byId[sum.tr.id], r = D.rating(sum.tr);
    return '<div class="s-sum-photo">' + (img ? '<img src="' + esc(img) + '" alt="">' : "") +
        '<span class="s-sum-cat">' + icon(sum.tr.icon) + esc(D.L(D.cat(sum.tr.cat), lang)) + "</span></div>" +
      '<div class="s-sum-titlebox"><h2 class="s-sum-title">' + esc(sum.title) + "</h2>" +
        '<span class="s-small">' + esc(sum.venue) + "</span>" +
        '<span class="s-sum-rate">' + UI.stars(r.avg, r.avg.toFixed(1) + " / 5") + "<strong>" + r.avg.toFixed(1) + "</strong><span>(" + r.count + ")</span></span></div>";
  }
  /* <dl> of label/value rows. rows = [[label, value], ...]; falsy rows are skipped. */
  function sumRows(rows) {
    return '<dl class="s-sum-rows">' + rows.filter(Boolean).map(function (r) { return "<div><dt>" + esc(r[0]) + "</dt><dd>" + esc(r[1]) + "</dd></div>"; }).join("") + "</dl>";
  }
  function backButton(label, action) {
    return '<button type="button" class="s-back" data-action="' + action + '">' + icon("arrow") + esc(label) + "</button>";
  }

  /* Status badge for a saved booking. */
  var STATUS = {
    confirmed: { tone: "success", icon: "check", th: "ยืนยันแล้ว", en: "Confirmed" },
    pending: { tone: "notice", icon: "clock", th: "รอสถานที่ยืนยัน", en: "Waiting for venue" },
    declined: { tone: "danger", icon: "alert", th: "สถานที่ปฏิเสธ", en: "Declined by venue" },
    cancelled: { tone: "neutral", icon: "close", th: "ยกเลิกแล้ว", en: "Cancelled" }
  };
  function statusBadge(status, lang) { var s = STATUS[status] || STATUS.pending; return UI.badge(s[lang] || s.en, s.tone, s.icon); }
  function statusLabel(status, lang) { var s = STATUS[status] || STATUS.pending; return s[lang] || s.en; }

  /* Simple page hero band used by the new inner pages. */
  function pageHero(eyebrow, title, lead) {
    return '<section class="s-band s-dark s-inner-hero s-inner-hero-sm"><div class="s-shell">' +
      '<p class="s-eyebrow">' + esc(eyebrow) + '</p><h1 class="s-page-title">' + esc(title) + "</h1>" +
      (lead ? '<p class="s-lead">' + esc(lead) + "</p>" : "") + "</div></section>";
  }

  window.WP = { get: get, set: set, go: go, param: param, getLang: getLang, isSaved: isSaved, savedList: savedList, toggleSaved: toggleSaved, page: page,
    partyHtml: partyHtml, partyChange: partyChange, calendarHtml: calendarHtml, maxMonthOff: maxMonthOff,
    bookingSummary: bookingSummary, summaryHead: summaryHead, summaryPhoto: summaryPhoto, sumRows: sumRows, backButton: backButton,
    bookings: bookings, toast: toast, dialog: dialog, processing: processing, copyText: copyText, fieldError: fieldError,
    statusBadge: statusBadge, statusLabel: statusLabel, pageHero: pageHero };
})();
