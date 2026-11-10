/* Wellness Pass: shared UI building blocks.
   Each function returns an HTML string. Clicks are wired with data-action="name" (+ optional data-arg="value"),
   which common.js routes to the page's action handlers. Exposes window.UI. */
(function () {
  "use strict";

  /* Escape text before putting it into HTML. Use for every piece of data or translated text. */
  function esc(v) {
    if (v === null || v === undefined) return "";
    return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* Build an attribute string. null / undefined / false are skipped, true becomes a bare attribute. */
  function attrs(o) {
    var out = "";
    for (var k in o) {
      var v = o[k];
      if (v === null || v === undefined || v === false) continue;
      out += v === true ? " " + k : " " + k + '="' + esc(v) + '"';
    }
    return out;
  }

  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(" "); }

  /* Click wiring helper: action("pick", "thai") -> { "data-action": "pick", "data-arg": "thai" } */
  function act(name, arg) {
    var o = {};
    if (name) o["data-action"] = name;
    if (arg !== undefined && arg !== null) o["data-arg"] = arg;
    return o;
  }
  function merge() { return Object.assign.apply(null, [{}].concat(Array.prototype.slice.call(arguments))); }

  /* Inline stroke icons (Lucide-style, 24px grid). */
  var GLYPHS = {
    arrow: [["path", { d: "M5 12h14M13 6l6 6-6 6" }]],
    plus: [["path", { d: "M12 5v14M5 12h14" }]],
    heart: [["path", { d: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" }]],
    star: [["path", { d: "M12 3l2.8 5.8 6.2.8-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.8z" }]],
    check: [["path", { d: "M5 12.5l4.5 4.5L19 7.5" }]],
    search: [["circle", { cx: 11, cy: 11, r: 7 }], ["path", { d: "M20 20l-4-4" }]],
    clock: [["circle", { cx: 12, cy: 12, r: 9 }], ["path", { d: "M12 7v5l3 2" }]],
    calendar: [["rect", { x: 3, y: 5, width: 18, height: 16, rx: 2 }], ["path", { d: "M3 10h18M8 3v4M16 3v4" }]],
    users: [["circle", { cx: 9, cy: 8, r: 3.5 }], ["path", { d: "M2.5 20c0-3.6 3-6 6.5-6s6.5 2.4 6.5 6M16 4.5a3.5 3.5 0 0 1 0 7M18 14c2 .7 3.5 2.6 3.5 6" }]],
    leaf: [["path", { d: "M5 19c0-8 5-14 14-14 0 9-6 14-14 14zM5 19l8-8" }]],
    lotus: [["path", { d: "M12 20c-4 0-8-2-9-6 3 0 6 1 9 4 3-3 6-4 9-4-1 4-5 6-9 6zM12 18c-2-2-3-5-3-8 1.2.6 2.3 1.6 3 3 .7-1.4 1.8-2.4 3-3 0 3-1 6-3 8z" }]],
    drop: [["path", { d: "M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" }]],
    sun: [["circle", { cx: 12, cy: 12, r: 4 }], ["path", { d: "M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" }]],
    moon: [["path", { d: "M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" }]],
    flame: [["path", { d: "M12 21a6 6 0 0 0 6-6c0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-2-2-3-2 2-3 4-3 7a6 6 0 0 0 6 6z" }]],
    hand: [["path", { d: "M7 11V6a1.5 1.5 0 0 1 3 0v4M10 10V4.5a1.5 1.5 0 0 1 3 0V10M13 10V5.5a1.5 1.5 0 0 1 3 0V11M16 11V8a1.5 1.5 0 0 1 3 0v6a7 7 0 0 1-7 7h-1a6 6 0 0 1-5-2.7L3.5 14a1.5 1.5 0 0 1 2.4-1.8L7 13.5" }]],
    pin: [["path", { d: "M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" }], ["circle", { cx: 12, cy: 9.5, r: 2.5 }]],
    cart: [["path", { d: "M3 4h2l2.4 11h10.2L20 8H6.2" }], ["circle", { cx: 9, cy: 19, r: 1.4 }], ["circle", { cx: 17, cy: 19, r: 1.4 }]],
    user: [["circle", { cx: 12, cy: 8, r: 4 }], ["path", { d: "M4 21c0-4 3.6-7 8-7s8 3 8 7" }]],
    globe: [["circle", { cx: 12, cy: 12, r: 9 }], ["path", { d: "M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z" }]],
    info: [["circle", { cx: 12, cy: 12, r: 9 }], ["path", { d: "M12 11v5M12 8h.01" }]],
    alert: [["path", { d: "M12 3l9.5 17h-19z" }], ["path", { d: "M12 10v4M12 17h.01" }]],
    shield: [["path", { d: "M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" }], ["path", { d: "M9 12l2 2 4-4" }]],
    store: [["path", { d: "M4 9.5V20h16V9.5M3 5l1.5-2h15L21 5v2.5a2.5 2.5 0 0 1-4.5 1.5 2.5 2.5 0 0 1-4.5 0 2.5 2.5 0 0 1-4.5 0A2.5 2.5 0 0 1 3 7.5z" }], ["path", { d: "M9.5 20v-5h5v5" }]],
    reply: [["path", { d: "M9 7L4 12l5 5" }], ["path", { d: "M4 12h10a6 6 0 0 1 6 6v1" }]],
    lock2: [["rect", { x: 5, y: 11, width: 14, height: 10, rx: 2 }], ["path", { d: "M8 11V8a4 4 0 0 1 8 0v3" }]],
    sparkle: [["path", { d: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" }], ["path", { d: "M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" }]],
    // Extra glyphs used by the page templates (close, chevrons, menu).
    close: [["path", { d: "M6 6l12 12M18 6L6 18" }]],
    left: [["path", { d: "M15 6l-6 6 6 6" }]],
    right: [["path", { d: "M9 6l6 6-6 6" }]],
    menu: [["path", { d: "M4 7h16M4 12h16M4 17h16" }]],
    lock: [["rect", { x: 5, y: 11, width: 14, height: 10, rx: 2 }], ["path", { d: "M8 11V8a4 4 0 0 1 8 0v3" }]],
    card: [["rect", { x: 2.5, y: 5, width: 19, height: 14, rx: 2.5 }], ["path", { d: "M2.5 10h19M6 15h4" }]],
    phone: [["rect", { x: 6.5, y: 2.5, width: 11, height: 19, rx: 2.5 }], ["path", { d: "M11 18.5h2" }]],
    logout: [["path", { d: "M10 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h5M15 8l4 4-4 4M19 12H9" }]],
    mail: [["rect", { x: 3, y: 5, width: 18, height: 14, rx: 2 }], ["path", { d: "M3.5 6.5l8.5 6.5 8.5-6.5" }]],
    chart: [["path", { d: "M4 20V10M10 20V4M16 20v-7M22 20H2" }]],
    grid: [["rect", { x: 3, y: 3, width: 7.5, height: 7.5, rx: 1.5 }], ["rect", { x: 13.5, y: 3, width: 7.5, height: 7.5, rx: 1.5 }], ["rect", { x: 3, y: 13.5, width: 7.5, height: 7.5, rx: 1.5 }], ["rect", { x: 13.5, y: 13.5, width: 7.5, height: 7.5, rx: 1.5 }]],
    edit: [["path", { d: "M4 20h4l10.5-10.5a2.1 2.1 0 0 0-4-4L4 16z" }], ["path", { d: "M13.5 6.5l4 4" }]],
    scan: [["path", { d: "M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M4 12h16" }]]
  };

  function icon(name, opt) {
    opt = opt || {};
    var parts = GLYPHS[name] || GLYPHS.leaf;
    var inner = parts.map(function (p) { return "<" + p[0] + attrs(p[1]) + "></" + p[0] + ">"; }).join("");
    return "<svg" + attrs({ "class": cx("wp-icon", opt.cls), viewBox: "0 0 24 24", "aria-hidden": opt.label ? null : "true", role: opt.label ? "img" : null, "aria-label": opt.label || null }) + ">" + inner + "</svg>";
  }

  /* Button. o: { label (plain text), html (raw inner html), variant: primary|ghost|cta|..., size: "sm", arrow, href, action, arg, cls, attrs } */
  function button(o) {
    var a = merge({ "class": cx("wp-btn", "wp-btn-" + (o.variant || "primary"), o.size === "sm" && "wp-btn-sm", o.cls) }, act(o.action, o.arg), o.attrs || {});
    var inner = (o.html !== undefined ? o.html : esc(o.label)) + (o.arrow ? icon("arrow") : "");
    if (o.href) return "<a" + attrs(merge({ href: o.href }, a)) + ">" + inner + "</a>";
    return "<button" + attrs(merge({ type: o.type || "button" }, a)) + ">" + inner + "</button>";
  }

  function iconButton(o) {
    return "<button" + attrs(merge({ type: "button", "class": cx("wp-icon-btn", o.cls), "aria-label": o.count ? o.label + " (" + o.count + ")" : o.label }, act(o.action, o.arg), o.attrs || {})) + ">" +
      icon(o.icon) + (o.count ? '<span class="wp-count" aria-hidden="true">' + (o.count > 99 ? "99+" : o.count) + "</span>" : "") + "</button>";
  }

  function chip(o) {
    return "<button" + attrs(merge({ type: "button", "class": cx("wp-chip", o.cls), "aria-pressed": o.selected ? "true" : "false" }, act(o.action, o.arg), o.attrs || {})) + ">" +
      (o.icon ? icon(o.icon) : "") + (o.html !== undefined ? o.html : esc(o.label)) + "</button>";
  }

  var BADGE_ICON = { success: "check", danger: "alert", notice: "info" };
  function badge(text, tone, ico) {
    tone = tone || "neutral";
    var name = ico === false ? null : (ico || BADGE_ICON[tone]);
    return '<span class="' + cx("wp-badge", "wp-badge-" + tone) + '">' + (name ? icon(name) : "") + esc(text) + "</span>";
  }

  /* Hero search bar. fields: [{ icon, label, value }]. Field i is clicked -> action "openPanel" with arg i. Form submit -> data-submit. */
  function searchBar(o) {
    return '<form class="wp-search" role="search"' + attrs({ "aria-label": o.ariaLabel || "Search treatments", "data-submit": o.submit || "submitSearch" }) + ">" +
      o.fields.map(function (f, i) {
        return "<button" + attrs(merge({ type: "button", "class": "wp-search-field", "aria-haspopup": "dialog", "aria-expanded": o.openIndex === i ? "true" : "false" }, act(o.fieldAction || "openPanel", i))) + ">" +
          '<span class="wp-search-ico">' + icon(f.icon) + "</span>" +
          '<span style="min-width: 0px;"><span class="wp-search-label">' + esc(f.label) + '</span><span class="wp-search-value">' + esc(f.value) + "</span></span></button>";
      }).join("") +
      '<button type="submit" class="wp-btn wp-btn-cta wp-search-submit">' + icon("search") + esc(o.buttonLabel || "Search") + "</button></form>";
  }

  /* Category card. o: { label, href, icon, image (optional round illustration shown instead of the icon), labelAlt, cls, style } */
  function categoryCard(o) {
    var art = o.image
      ? '<span class="wp-cat-art has-img" aria-hidden="true"><img class="wp-cat-img" src="' + esc(o.image) + '" alt="" width="88" height="88" loading="lazy"></span>'
      : '<span class="wp-cat-art" aria-hidden="true">' + icon(o.icon || "leaf") + "</span>";
    return '<a class="' + cx("wp-cat", o.cls) + '"' + attrs({ href: o.href || "#", style: o.style }) + ">" + art +
      '<span class="wp-cat-label">' + esc(o.label) + "</span>" +
      (o.labelAlt ? '<span class="wp-hint">' + esc(o.labelAlt) + "</span>" : "") +
      '<span class="wp-cat-arrow" aria-hidden="true">' + icon("arrow") + "</span></a>";
  }

  function matchReasons(o) {
    return '<div class="wp-match"><p class="wp-match-title">' + icon("sparkle") + esc(o.title || "Why this fits you · เหตุผลที่แนะนำ") + "</p>" +
      "<ul>" + (o.reasons || []).map(function (r) { return "<li>" + icon("check") + esc(r) + "</li>"; }).join("") + "</ul>" +
      (o.note === false ? "" : '<p class="wp-match-note">' + esc(o.note || "Based on your answers, not a medical assessment.") + "</p>") + "</div>";
  }

  /* Treatment card. o: card data from WPData.card() plus { href, saved, lang }.
     The heart button uses action "toggleSave" (handled globally in common.js). */
  function treatmentCard(o) {
    var th = o.lang === "th";
    var price = typeof o.price === "number" ? "฿" + o.price.toLocaleString("en-US") : o.price;
    return '<article class="wp-card">' +
      '<div class="wp-card-media">' +
        (o.image ? "<img" + attrs({ src: o.image, alt: o.imageAlt || "", loading: "lazy" }) + ">"
          : '<div class="wp-card-fallback"><span>' + icon(o.icon || "lotus") + "</span></div>") +
        (o.category ? '<span class="wp-card-cat">' + esc(o.category) + "</span>" : "") +
      "</div>" +
      "<button" + attrs(merge({ type: "button", "class": "wp-heart", "aria-pressed": o.saved ? "true" : "false",
        "aria-label": o.saved ? (th ? "นำออกจากรายการที่ชอบ" : "Remove from wishlist") : (th ? "บันทึกไว้ในรายการที่ชอบ" : "Save to wishlist") }, act("toggleSave", o.id))) + ">" + icon("heart") + "</button>" +
      '<div class="wp-card-body">' +
        (o.duration ? '<span class="wp-card-meta">' + icon("clock") + esc(o.duration) + "</span>" : "") +
        '<h3 class="wp-card-title">' + esc(o.title) + "</h3>" +
        (o.rating ? '<span class="wp-rating">' + icon("star") + '<strong class="wp-tnum">' + o.rating.avg.toFixed(1) + "</strong>" +
          '<span class="wp-rating-n">(' + o.rating.count + " " + (th ? "รีวิวตัวอย่าง" : "sample reviews") + ")</span></span>" : "") +
        (o.summary ? '<p class="wp-card-summary">' + esc(o.summary) + "</p>" : "") +
        (o.reasons ? matchReasons({ reasons: o.reasons, note: false, title: th ? "ตรงกับที่คุณเลือก" : "Matches your preferences" }) : "") +
        '<p class="wp-card-price">' + (th ? "เริ่มต้น " : "from ") + "<strong>" + esc(price) + "</strong>" + esc(" / " + (o.unit || "person")) + "</p>" +
      "</div>" +
      "<a" + attrs({ "class": "wp-card-link", href: o.href || "#", "aria-label": o.title }) + "></a>" +
      "</article>";
  }

  /* Booking progress stepper. steps: [labels], current: index. */
  function stepper(steps, current, ariaLabel) {
    return '<ol class="wp-stepper"' + attrs({ "aria-label": ariaLabel || "Booking progress" }) + ">" + steps.map(function (s, i) {
      var done = i < current;
      return "<li" + attrs({ "class": cx("wp-step", done && "is-done"), "aria-current": i === current ? "step" : null }) + '><span class="wp-step-dot">' +
        (done ? icon("check", { label: "Done" }) : (i + 1)) + "</span>" + esc(s) + "</li>";
    }).join("") + "</ol>";
  }

  var NOTICE_ICON = { notice: "info", success: "check", info: "shield" };
  /* Notice box. bodyHtml is raw HTML (escape text yourself). */
  function notice(o, bodyHtml) {
    var tone = o.tone || "notice";
    return "<div" + attrs({ "class": cx("wp-notice", "wp-notice-" + tone, o.cls), role: o.role || (tone === "success" ? "status" : null) }) + ">" +
      icon(o.icon || NOTICE_ICON[tone]) + "<div>" + (o.title ? '<strong class="wp-notice-title">' + esc(o.title) + "</strong>" : "") + (bodyHtml || "") + "</div></div>";
  }

  function money(amount, o) {
    o = o || {};
    var amt = typeof amount === "number" ? amount.toLocaleString("en-US", { minimumFractionDigits: o.decimals ? 2 : 0, maximumFractionDigits: o.decimals ? 2 : 0 }) : amount;
    return '<span class="wp-money"><span class="wp-money-main">฿' + esc(amt) + (o.unit ? '<span class="wp-money-unit"> / ' + esc(o.unit) + "</span>" : "") + "</span></span>";
  }

  /* Text input with label, hint and error. o: { id, label, required, optional, hint, error, type, value, autocomplete, input (data-input name), placeholder, inputmode } */
  function textField(o) {
    var hintId = o.id + "-hint", errId = o.id + "-err";
    var described = [o.hint && hintId, o.error && errId].filter(Boolean).join(" ") || null;
    return '<div class="' + cx("wp-field", o.cls) + '">' +
      "<label" + attrs({ "for": o.id, "class": cx("wp-label", o.required && "wp-label-req") }) + ">" + esc(o.label) +
        (o.optional ? '<span class="wp-label-opt"> (' + esc(o.optional === true ? "optional" : o.optional) + ")</span>" : "") + "</label>" +
      "<input" + attrs({ id: o.id, "class": "wp-input", type: o.type || "text", name: o.name || o.id, value: o.value || "", required: !!o.required,
        autocomplete: o.autocomplete, inputmode: o.inputmode, placeholder: o.placeholder, maxlength: o.maxlength, "aria-invalid": o.error ? "true" : null, "aria-describedby": described,
        "data-input": o.input }) + ">" +
      (o.hint ? '<span id="' + esc(hintId) + '" class="wp-hint">' + esc(o.hint) + "</span>" : "") +
      (o.error ? '<span id="' + esc(errId) + '" class="wp-error" role="alert">' + icon("alert") + esc(o.error) + "</span>" : "") +
      "</div>";
  }

  /* Password input with a show/hide button. o: textField options + { shown, showLabel, hideLabel }.
     The eye button fires action "togglePw" with the input id. */
  function passwordField(o) {
    var html = textField(Object.assign({}, o, { type: o.shown ? "text" : "password", cls: cx("wp-pass", o.cls) }));
    var btn = "<button" + attrs({ type: "button", "class": "wp-pass-eye", "aria-pressed": o.shown ? "true" : "false", "aria-controls": o.id, "data-action": "togglePw", "data-arg": o.id }) + ">" +
      esc(o.shown ? (o.hideLabel || "Hide") : (o.showLabel || "Show")) + "</button>";
    return html.replace(/(<input[^>]*>)/, '<span class="wp-pass-box">$1' + btn + "</span>");
  }

  /* Checkbox with label. o: { id, label, detail, required, checked, input } */
  function consentCheck(o) {
    return '<label class="' + cx("wp-consent", o.cls) + '" for="' + esc(o.id) + '">' +
      "<input" + attrs({ type: "checkbox", id: o.id, checked: !!o.checked, required: !!o.required, "data-input": o.input, "aria-invalid": o.invalid ? "true" : null }) + ">" +
      '<span><span class="' + cx("wp-consent-label", o.required && "wp-label-req") + '">' + esc(o.label) + "</span>" +
      (o.detail ? '<span class="wp-consent-detail">' + esc(o.detail) + "</span>" : "") + "</span></label>";
  }

  /* Row of 5 stars for a rating (rounded to the nearest whole star). The number is given as text for screen readers. */
  function stars(value, label) {
    var n = Math.round(value), out = "";
    for (var i = 1; i <= 5; i++) out += icon("star", { cls: i <= n ? "is-on" : "is-off" });
    return '<span class="wp-stars" role="img" aria-label="' + esc(label || value + " / 5") + '">' + out + "</span>";
  }

  function faqItem(q, a, open) {
    return "<details" + attrs({ "class": "wp-faq", open: !!open }) + "><summary>" + esc(q) + icon("plus") + '</summary><div class="wp-faq-body">' + esc(a) + "</div></details>";
  }

  window.UI = { esc: esc, attrs: attrs, cx: cx, act: act, icon: icon, button: button, iconButton: iconButton, chip: chip, badge: badge,
    searchBar: searchBar, categoryCard: categoryCard, matchReasons: matchReasons, treatmentCard: treatmentCard, stepper: stepper,
    notice: notice, money: money, textField: textField, passwordField: passwordField, consentCheck: consentCheck, faqItem: faqItem, stars: stars };
})();
