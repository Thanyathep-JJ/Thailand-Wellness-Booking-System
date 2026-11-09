/* Wellness Pass: My bookings (mybookings.html).
   Lists the demo bookings saved in this browser, finds one by reference + email, and lets the guest cancel
   (the refund follows the cancellation policy). Opens with ?ref=WP-XXXXXX to highlight a booking. */
(function () {
  "use strict";
  var D = window.WPData, UI = window.UI, WP = window.WP, esc = UI.esc, icon = UI.icon;

  var TEXT = {
    th: {
      eyebrow: "MY BOOKINGS · การจองของฉัน", title: "การจองของฉัน", lead: "ดูสถานะ เปลี่ยนแปลง หรือยกเลิกการจองของคุณ",
      findTitle: "ค้นหาการจอง", findLead: "ใส่เลขอ้างอิงและอีเมลที่ใช้จอง ไม่ต้องสมัครสมาชิก หรือเข้าสู่ระบบเพื่อดูการจองทั้งหมดในบัญชี", ref: "เลขอ้างอิง", email: "อีเมล", find: "ค้นหา",
      notFound: "ไม่พบการจองที่ตรงกับเลขอ้างอิงและอีเมลนี้", found: "พบการจองแล้ว", needRef: "กรอกเลขอ้างอิง เช่น WP-AB12CD",
      listTitle: "การจองในเบราว์เซอร์นี้", demoNote: "ในเดโมนี้ การจองถูกบันทึกไว้ในเบราว์เซอร์ของคุณเท่านั้น",
      emptyTitle: "ยังไม่มีการจอง", emptyBody: "การจองที่คุณทำจะแสดงที่นี่", browse: "ดูทรีตเมนต์",
      view: "ดูทรีตเมนต์", cancel: "ยกเลิกการจอง", copy: "คัดลอกเลขอ้างอิง", copied: "คัดลอกเลขอ้างอิงแล้ว",
      past: "ผ่านเวลานัดแล้ว", refunded: function (p, a) { return p ? "คืนเงิน " + p + "% (" + a + ")" : "ไม่มีการคืนเงิน"; },
      declinedNote: "สถานที่ไม่สามารถรับการจองนี้ได้ ไม่มีการเรียกเก็บเงิน", pendingNote: "สถานที่จะยืนยันภายใน 12 ชั่วโมง",
      cTitle: "ยกเลิกการจองนี้?", cRefund: function (p, a, h) { return "ยกเลิกก่อนเวลานัด " + h + " · คุณจะได้รับเงินคืน " + p + "% (" + a + ")"; },
      cNone: function (h) { return "เหลือเวลาก่อนนัด " + h + " ซึ่งน้อยกว่า 6 ชั่วโมง ตามนโยบายจะไม่มีการคืนเงิน"; },
      cPending: "การจองนี้ยังรอสถานที่ยืนยันและยังไม่มีการตัดเงิน ยกเลิกได้ฟรี", cPolicy: "อ่านนโยบายการยกเลิก",
      cKeep: "เก็บการจองไว้", cYes: "ยืนยันการยกเลิก", cancelled: "ยกเลิกการจองแล้ว",
      hours: function (h) { return h >= 48 ? Math.floor(h / 24) + " วัน" : Math.max(0, Math.floor(h)) + " ชั่วโมง"; }
    },
    en: {
      eyebrow: "MY BOOKINGS", title: "My bookings", lead: "Check the status of your bookings, or change and cancel them.",
      findTitle: "Find a booking", findLead: "Enter the reference and the email you booked with. No account needed, or log in to see every booking in your account.", ref: "Booking reference", email: "Email", find: "Find booking",
      notFound: "We couldn't find a booking with that reference and email.", found: "Booking found", needRef: "Enter a reference, e.g. WP-AB12CD",
      listTitle: "Bookings in this browser", demoNote: "In this demo, bookings are saved in your browser only.",
      emptyTitle: "No bookings yet", emptyBody: "Bookings you make will appear here.", browse: "Browse treatments",
      view: "View treatment", cancel: "Cancel booking", copy: "Copy reference", copied: "Booking reference copied",
      past: "This appointment has passed", refunded: function (p, a) { return p ? p + "% refunded (" + a + ")" : "No refund"; },
      declinedNote: "The venue couldn't take this booking. You were not charged.", pendingNote: "The venue confirms within 12 hours.",
      cTitle: "Cancel this booking?", cRefund: function (p, a, h) { return "You're cancelling " + h + " before your appointment, so you'll get " + p + "% back (" + a + ")."; },
      cNone: function (h) { return "Your appointment is " + h + " away, which is under 6 hours, so under the policy there is no refund."; },
      cPending: "This booking is still waiting for the venue and you haven't been charged, so cancelling is free.", cPolicy: "Read the cancellation policy",
      cKeep: "Keep booking", cYes: "Cancel booking", cancelled: "Booking cancelled",
      hours: function (h) { return h >= 48 ? Math.floor(h / 24) + " days" : Math.max(0, Math.floor(h)) + (Math.floor(h) === 1 ? " hour" : " hours"); }
    }
  };

  var state = { ref: WP.param("ref") || "", email: "", highlight: WP.param("ref") || "", lookupMsg: "", lookupOk: false };

  function bookingRow(b, lang, t) {
    var s = WP.bookingSummary(b, lang), hrs = D.hoursUntil(b.date, b.slot), active = b.status === "confirmed" || b.status === "pending";
    var note = "";
    if (b.status === "cancelled") note = t.refunded(b.refundPct || 0, D.baht(Math.round(b.total * (b.refundPct || 0) / 100)));
    else if (b.status === "declined") note = t.declinedNote;
    else if (hrs < 0) note = t.past;
    else if (b.status === "pending") note = t.pendingNote;
    var img = D.photos.byId[b.id];
    return '<article class="s-bk' + (b.ref === state.highlight ? " is-highlight" : "") + '" id="bk-' + esc(b.ref) + '">' +
      '<div class="s-bk-thumb">' + (img ? '<img src="' + esc(img) + '" alt="" loading="lazy">' : "") + "</div>" +
      '<div class="s-bk-main">' +
        '<div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">' + WP.statusBadge(b.status, lang) + '<span class="s-bk-ref">' + esc(b.ref) + "</span>" +
          '<button type="button" class="s-copy" data-action="copy" data-arg="' + esc(b.ref) + '" aria-label="' + esc(t.copy + " " + b.ref) + '">' + icon("check") + "<span>" + esc(t.copy) + "</span></button></div>" +
        '<h2 class="s-bk-title"><a href="detail.html?id=' + esc(b.id) + '">' + esc(s.title) + "</a></h2>" +
        '<div class="s-bk-meta"><span>' + icon("calendar") + esc(s.date + " · " + s.time) + "</span><span>" + icon("clock") + esc(s.length) + "</span>" +
          "<span>" + icon("users") + esc(s.guestsLabel) + "</span><span>" + icon("pin") + esc(s.venue) + "</span></div>" +
        (note ? '<span class="s-bk-note">' + esc(note) + "</span>" : "") +
      "</div>" +
      '<div class="s-bk-side"><span class="s-bk-total">' + esc(D.baht(b.total)) + "</span>" +
        '<div class="s-btn-row">' + UI.button({ label: t.view, variant: "ghost", size: "sm", href: "detail.html?id=" + b.id }) +
          (active && hrs > 0 ? UI.button({ label: t.cancel, variant: "danger", size: "sm", action: "cancel", arg: b.ref }) : "") + "</div></div>" +
      "</article>";
  }

  function askCancel(ref) {
    var lang = WP.getLang(), t = TEXT[lang], b = WP.bookings.find(ref);
    if (!b) return;
    var hrs = D.hoursUntil(b.date, b.slot);
    var pct = b.status === "pending" ? 100 : D.refundPct(hrs), amount = D.baht(Math.round(b.total * pct / 100));
    var msg = b.status === "pending" ? t.cPending : pct ? t.cRefund(pct, amount, t.hours(hrs)) : t.cNone(t.hours(hrs));
    var s = WP.bookingSummary(b, lang);
    WP.dialog({
      title: t.cTitle,
      html: WP.summaryHead(s) + WP.sumRows([[s.date, s.time], [b.ref, D.baht(b.total)]]) +
        UI.notice({ tone: pct ? "info" : "notice" }, esc(msg) + ' <a href="policy.html">' + esc(t.cPolicy) + "</a>"),
      actions: [{ label: t.cKeep, variant: "ghost" }, { label: t.cYes, variant: "danger", value: "yes" }],
      onClose: function (v) {
        if (v !== "yes") return;
        WP.bookings.update(ref, { status: "cancelled", refundPct: pct, cancelledAt: new Date().toISOString() });
        page.render();
        WP.toast(t.cancelled);
      }
    });
  }

  var page = WP.page({
    active: "mybookings",
    view: function (lang) {
      var t = TEXT[lang], list = WP.bookings.all();
      return '<main id="main-content">' + WP.pageHero(t.eyebrow, t.title, t.lead) + '<div class="s-shell s-page-main">' +
        '<section class="s-card" aria-labelledby="find-title" style="display: grid; gap: 16px;">' +
          '<div><h2 id="find-title" class="s-sec-title">' + esc(t.findTitle) + '</h2><p class="s-small" style="margin: 0;">' + esc(t.findLead) + "</p></div>" +
          '<form class="s-lookup" data-submit="lookup" novalidate>' +
            UI.textField({ id: "lk-ref", input: "ref", label: t.ref, value: state.ref, placeholder: "WP-AB12CD", autocomplete: "off" }) +
            UI.textField({ id: "lk-email", input: "email", label: t.email, type: "email", value: state.email, autocomplete: "email" }) +
            UI.button({ label: t.find, type: "submit", attrs: { style: "height: var(--field-h);" } }) +
          "</form>" +
          (state.lookupMsg ? '<p class="' + (state.lookupOk ? "s-small" : "s-err-text") + '" role="' + (state.lookupOk ? "status" : "alert") + '" style="margin: 0;">' +
            icon(state.lookupOk ? "check" : "alert") + " " + esc(state.lookupMsg) + "</p>" : "") +
        "</section>" +
        '<div class="s-toolbar-row"><h2 class="s-h3" style="font-size: 22px;">' + esc(t.listTitle) + '</h2><span class="s-small">' + esc(t.demoNote) + "</span></div>" +
        (list.length
          ? '<div class="s-bk-list">' + list.map(function (b) { return bookingRow(b, lang, t); }).join("") + "</div>"
          : '<div class="s-empty"><span class="s-icon-tile">' + icon("calendar") + '</span><h3 class="s-h3">' + esc(t.emptyTitle) + "</h3>" +
            '<p style="margin: 0;">' + esc(t.emptyBody) + "</p>" + UI.button({ label: t.browse, arrow: true, size: "sm", href: "treatments.html" }) + "</div>") +
        "</div></main>";
    },
    after: function () {
      if (state.highlight && !state.scrolled) {
        var el = document.getElementById("bk-" + state.highlight);
        if (el) { el.scrollIntoView({ block: "center" }); state.scrolled = true; }
      }
    },
    actions: {
      copy: function (ref) { WP.copyText(ref, TEXT[WP.getLang()].copied); return false; },
      cancel: function (ref) { askCancel(ref); return false; }
    },
    inputs: {
      ref: function (v) { state.ref = v; return false; },
      email: function (v) { state.email = v; return false; }
    },
    submits: {
      lookup: function () {
        var t = TEXT[WP.getLang()], ref = state.ref.trim().toUpperCase(), email = state.email.trim().toLowerCase();
        state.scrolled = false;
        if (!ref) { state.lookupMsg = t.needRef; state.lookupOk = false; return; }
        var b = WP.bookings.find(ref);
        if (b && (!b.email || b.email.toLowerCase() === email)) {   // the email must match when the booking has one
          state.highlight = ref; state.lookupMsg = t.found; state.lookupOk = true;
        } else { state.highlight = ""; state.lookupMsg = t.notFound; state.lookupOk = false; }
      }
    }
  });
})();
