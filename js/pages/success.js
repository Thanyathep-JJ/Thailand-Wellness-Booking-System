/* Wellness Pass: Booking result (success.html).
   Reads the booking saved by checkout (by reference) and shows the confirmation, or "request sent" for
   venue-confirmed treatments. Actions: copy the reference, print / save as PDF, preview the confirmation email. */
(function () {
  "use strict";
  var D = window.WPData, UI = window.UI, WP = window.WP, esc = UI.esc, icon = UI.icon;

  var TEXT = {
    th: {
      steps: ["ทรีตเมนต์", "ข้อมูลของคุณ", "ชำระเงิน"],
      okTitle: "จองสำเร็จแล้ว (เดโม)", okBody: "เราส่งอีเมลยืนยันพร้อมเลขอ้างอิงให้คุณแล้ว ในเว็บไซต์จริง หน้านี้จะแสดงหลังผู้ให้บริการชำระเงินยืนยันการชำระแล้วเท่านั้น",
      reqTitle: "ส่งคำขอจองแล้ว (เดโม)", reqBody: "สถานที่จะตรวจสอบและยืนยันภายใน 12 ชั่วโมง คุณจะถูกเรียกเก็บเงินเมื่อได้รับการยืนยันเท่านั้น ลองยืนยันแทนสถานที่ได้ที่แดชบอร์ดสถานที่ (เดโม)",
      demoTitle: "ผลลัพธ์ตัวอย่าง", demoBody: "ไม่มีการตัดเงินจริง การจองนี้บันทึกไว้ในเบราว์เซอร์นี้เท่านั้น",
      refLabel: "เลขอ้างอิงการจอง", copy: "คัดลอก", copied: "คัดลอกเลขอ้างอิงแล้ว",
      sumTitle: "สรุปการจอง", sDate: "วันที่", sTime: "เวลาเริ่ม", sLength: "ความยาว", sGuests: "ผู้เข้าร่วม", sMethod: "วิธีชำระเงิน", sStatus: "สถานะ", total: "ยอดรวม",
      card: "บัตรเครดิต / เดบิต", pp: "พร้อมเพย์ QR",
      nextTitle: "ขั้นตอนถัดไป", n1: function (e) { return "อีเมลยืนยันส่งไปที่ " + e; }, n2: "ดู เปลี่ยนแปลง หรือยกเลิกการจองได้ที่หน้า “การจองของฉัน” ด้วยเลขอ้างอิงและอีเมล", n3: "มาถึงก่อนเวลานัดประมาณ 15 นาที",
      print: "พิมพ์ / บันทึกเป็น PDF", email: "ดูตัวอย่างอีเมลยืนยัน", mine: "ไปที่การจองของฉัน", venue: "เปิดแดชบอร์ดสถานที่ (เดโม)",
      home: "กลับหน้าแรก", more: "ดูทรีตเมนต์อื่น", yourEmail: "อีเมลของคุณ",
      noneTitle: "ไม่พบการจอง", noneBody: "ยังไม่มีการจองที่เพิ่งทำในแท็บนี้ ดูการจองทั้งหมดได้ที่หน้า “การจองของฉัน”",
      mailTitle: "ตัวอย่างอีเมลยืนยัน", mailFrom: "จาก", mailTo: "ถึง", mailSubject: "หัวเรื่อง",
      subjOk: function (r) { return "ยืนยันการจอง " + r + " · Wellness Pass"; }, subjReq: function (r) { return "ได้รับคำขอจอง " + r + " · Wellness Pass"; },
      hi: function (n) { return "สวัสดีคุณ " + n + ","; }, mailOk: "ขอบคุณที่จองกับ Wellness Pass การจองของคุณได้รับการยืนยันแล้ว รายละเอียดด้านล่าง:",
      mailReq: "เราได้รับคำขอจองของคุณแล้ว สถานที่จะยืนยันภายใน 12 ชั่วโมง และเราจะส่งอีเมลแจ้งอีกครั้ง",
      mailManage: "ต้องการเปลี่ยนแปลงหรือยกเลิก? เปิดหน้า “การจองของฉัน” แล้วใส่เลขอ้างอิงและอีเมลนี้", mailSign: "ทีมงาน Wellness Pass", close: "ปิด"
    },
    en: {
      steps: ["Treatment", "Your details", "Payment"],
      okTitle: "You're booked (demo)", okBody: "We've emailed your confirmation and booking reference. On a live site this page appears only after the payment provider confirms the payment.",
      reqTitle: "Booking request sent (demo)", reqBody: "The venue reviews and confirms within 12 hours. You're charged only once it's confirmed. Try confirming it yourself in the venue dashboard (demo).",
      demoTitle: "Sample result", demoBody: "No money was taken. This booking is saved in this browser only.",
      refLabel: "Booking reference", copy: "Copy", copied: "Booking reference copied",
      sumTitle: "Your booking", sDate: "Date", sTime: "Start time", sLength: "Length", sGuests: "Guests", sMethod: "Payment method", sStatus: "Status", total: "Total",
      card: "Credit / debit card", pp: "PromptPay QR",
      nextTitle: "What happens next", n1: function (e) { return "A confirmation email has gone to " + e; }, n2: "View, change or cancel the booking in My bookings with your reference and email.", n3: "Arrive about 15 minutes before your start time.",
      print: "Print / save as PDF", email: "Preview confirmation email", mine: "Go to My bookings", venue: "Open the venue dashboard (demo)",
      home: "Back to home", more: "Browse more treatments", yourEmail: "your email",
      noneTitle: "No booking found", noneBody: "There's no recent booking in this tab. You can see all your bookings in My bookings.",
      mailTitle: "Confirmation email preview", mailFrom: "From", mailTo: "To", mailSubject: "Subject",
      subjOk: function (r) { return "Booking confirmed " + r + " · Wellness Pass"; }, subjReq: function (r) { return "Booking request received " + r + " · Wellness Pass"; },
      hi: function (n) { return "Hi " + n + ","; }, mailOk: "Thank you for booking with Wellness Pass. Your booking is confirmed. Here are the details:",
      mailReq: "We've received your booking request. The venue will confirm within 12 hours and we'll email you again.",
      mailManage: "Need to change or cancel? Open My bookings and enter your reference and this email address.", mailSign: "The Wellness Pass team", close: "Close"
    }
  };

  var rec = WP.bookings.find(WP.param("ref") || WP.get("reference", ""));

  function summaryRows(t, lang, s) {
    return WP.sumRows([[t.sDate, s.date], [t.sTime, s.time], [t.sLength, s.length], [t.sGuests, s.guestsLabel],
      [t.sMethod, rec.method === "promptpay" ? t.pp : t.card], [t.sStatus, WP.statusLabel(rec.status, lang)]]);
  }

  function openEmail() {
    var lang = WP.getLang(), t = TEXT[lang], s = WP.bookingSummary(rec, lang), req = rec.status === "pending";
    WP.dialog({
      title: t.mailTitle, actions: [{ label: t.close, variant: "ghost" }],
      html: '<div class="s-email"><div class="s-email-meta">' +
          "<span>" + esc(t.mailFrom) + ": <strong>" + esc("Wellness Pass <bookings@wellnesspass.example>") + "</strong></span>" +
          "<span>" + esc(t.mailTo) + ": <strong>" + esc(rec.email || t.yourEmail) + "</strong></span>" +
          "<span>" + esc(t.mailSubject) + ": <strong>" + esc(req ? t.subjReq(rec.ref) : t.subjOk(rec.ref)) + "</strong></span></div>" +
        '<div class="s-email-banner"><strong>Wellness Pass</strong><span>' + esc(req ? t.reqTitle : t.okTitle) + "</span></div>" +
        '<div class="s-email-body"><p style="margin: 0;">' + esc(t.hi(rec.first || "")) + "</p>" +
          '<p style="margin: 0;">' + esc(req ? t.mailReq : t.mailOk) + "</p>" +
          WP.summaryHead(s) + summaryRows(t, lang, s) +
          '<div class="s-total"><span>' + esc(t.total) + "</span><strong>" + esc(s.totalLabel) + "</strong></div>" +
          '<div class="s-ref" style="justify-self: start;"><span class="s-small">' + esc(t.refLabel) + "</span><strong>" + esc(rec.ref) + "</strong></div>" +
          '<p style="margin: 0;">' + esc(t.mailManage) + "</p>" +
          '<p style="margin: 0;">' + esc(t.mailSign) + "</p></div></div>"
    });
  }

  WP.page({
    active: null,
    view: function (lang) {
      var t = TEXT[lang];
      if (!rec) {
        return '<main id="main-content" class="s-shell s-page-main" style="max-width: 880px;"><div class="s-empty"><span class="s-icon-tile">' + icon("search") + "</span>" +
          '<h1 class="s-h3">' + esc(t.noneTitle) + '</h1><p style="margin: 0;">' + esc(t.noneBody) + "</p>" + UI.button({ label: t.mine, href: "mybookings.html", size: "sm" }) + "</div></main>";
      }
      var s = WP.bookingSummary(rec, lang), req = rec.status === "pending";
      var check = function (txt) { return "<li>" + icon("check") + "<span>" + esc(txt) + "</span></li>"; };
      return '<main id="main-content" class="s-shell" style="padding: 40px 0 72px; max-width: 880px;">' +
        '<div class="no-print" style="max-width: 720px; margin-bottom: 40px;">' + UI.stepper(t.steps, 3, lang === "th" ? "ขั้นตอนการจอง" : "Booking progress") + "</div>" +
        '<div style="display: grid; gap: 20px; justify-items: start;">' +
          '<span class="s-check-tile">' + icon(req ? "clock" : "check") + "</span>" +
          '<h1 class="s-h1">' + esc(req ? t.reqTitle : t.okTitle) + "</h1>" +
          '<p style="margin: 0; max-width: 640px; color: var(--ink-2);">' + esc(req ? t.reqBody : t.okBody) + "</p>" +
          UI.notice({ tone: "notice", title: t.demoTitle }, esc(t.demoBody)) +
          '<div class="s-ref"><span class="s-small">' + esc(t.refLabel) + "</span><strong>" + esc(rec.ref) + "</strong>" +
            '<button type="button" class="s-copy no-print" data-action="copyRef">' + icon("check") + esc(t.copy) + "</button></div>" +
          '<div class="s-success-actions no-print">' +
            UI.button({ label: t.print, variant: "ghost", size: "sm", action: "print" }) +
            UI.button({ label: t.email, variant: "ghost", size: "sm", action: "email" }) +
            (req ? UI.button({ label: t.venue, variant: "ghost", size: "sm", href: "venue.html" }) : "") +
          "</div>" +
        "</div>" +
        '<div class="s-two" style="margin-top: 40px; align-items: start;">' +
          '<section class="s-card s-sum" aria-labelledby="sum-title"><h2 id="sum-title" class="s-h3" style="font-size: 18px;">' + esc(t.sumTitle) + "</h2>" +
            WP.summaryHead(s) + summaryRows(t, lang, s) +
            '<div class="s-total"><span>' + esc(t.total) + "</span><strong>" + esc(s.totalLabel) + "</strong></div></section>" +
          '<section class="s-card" aria-labelledby="next-title" style="display: grid; gap: 14px; align-content: start;"><h2 id="next-title" class="s-h3" style="font-size: 18px;">' + esc(t.nextTitle) + "</h2>" +
            '<ul class="s-list">' + check(t.n1(rec.email || t.yourEmail)) + check(t.n2) + check(t.n3) + "</ul>" +
            '<div class="s-btn-row no-print" style="margin-top: 8px;">' + UI.button({ label: t.mine, arrow: true, href: "mybookings.html?ref=" + encodeURIComponent(rec.ref) }) +
              UI.button({ label: t.more, variant: "ghost", href: "treatments.html" }) + "</div>" +
          "</section></div></main>";
    },
    actions: {
      copyRef: function () { WP.copyText(rec.ref, TEXT[WP.getLang()].copied); return false; },
      print: function () { window.print(); return false; },
      email: function () { openEmail(); return false; }
    }
  });
})();
