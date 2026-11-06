/* Wellness Pass: Booking result (success.html).
   Shows the sample confirmation (or "request sent" for venue-confirmed treatments), the reference and next steps. */
(function () {
  "use strict";
  var UI = window.UI, WP = window.WP, esc = UI.esc, icon = UI.icon;

  var TEXT = {
    th: {
      steps: ["ทรีตเมนต์", "ข้อมูลของคุณ", "ชำระเงิน"],
      okTitle: "ได้รับการจองของคุณแล้ว (เดโม)", okBody: "ในเว็บไซต์จริง หน้านี้จะแสดงคำว่า \"ยืนยันแล้ว\" ก็ต่อเมื่อผู้ให้บริการชำระเงินยืนยันกับเซิร์ฟเวอร์ของเราแล้วเท่านั้น",
      reqTitle: "ส่งคำขอจองแล้ว (เดโม)", reqBody: "สถานที่จะตรวจสอบและยืนยันภายในช่วงเวลาที่กำหนด [รอเจ้าของกำหนด] คุณจะถูกเรียกเก็บเงินเมื่อได้รับการยืนยันเท่านั้น",
      demoTitle: "ผลลัพธ์ตัวอย่าง", demoBody: "ไม่มีการตัดเงินจริง และไม่มีการจองเกิดขึ้น เลขอ้างอิงด้านล่างเป็นตัวอย่าง",
      refLabel: "เลขอ้างอิงการจอง", sample: "ตัวอย่าง · Sample",
      sumTitle: "สรุปการจอง", sDate: "วันที่", sTime: "เวลาเริ่ม", sLength: "ความยาว", sGuests: "ผู้เข้าร่วม", sMethod: "วิธีชำระเงิน", total: "ยอดรวม",
      card: "บัตรเครดิต / เดบิต", pp: "พร้อมเพย์ QR",
      nextTitle: "ขั้นตอนถัดไป", n1: function (e) { return "เราจะส่งอีเมลยืนยันไปที่ " + e; }, n2: "ค้นหาการจองได้ด้วยเลขอ้างอิงและอีเมล โดยไม่ต้องสมัครสมาชิก", n3: "ถ้าต้องการเปลี่ยนแปลง ให้ติดต่อเราก่อนเวลานัดตามเงื่อนไขของทรีตเมนต์",
      home: "กลับหน้าแรก", more: "ดูทรีตเมนต์อื่น", yourEmail: "อีเมลของคุณ"
    },
    en: {
      steps: ["Treatment", "Your details", "Payment"],
      okTitle: "We received your booking (demo)", okBody: "On the live site this page says \"Confirmed\" only after the payment provider has confirmed the payment to our server.",
      reqTitle: "Booking request sent (demo)", reqBody: "The venue reviews and confirms within a set window [owner to set]. You are charged only once it is confirmed.",
      demoTitle: "Sample result", demoBody: "No money was taken and no booking was made. The reference below is a sample.",
      refLabel: "Booking reference", sample: "Sample · ตัวอย่าง",
      sumTitle: "Your booking", sDate: "Date", sTime: "Start time", sLength: "Length", sGuests: "Guests", sMethod: "Payment method", total: "Total",
      card: "Credit / debit card", pp: "PromptPay QR",
      nextTitle: "What happens next", n1: function (e) { return "We send a confirmation email to " + e; }, n2: "Look up your booking any time with the reference and your email, no account needed.", n3: "To change anything, contact us before your appointment under the treatment’s rules.",
      home: "Back to home", more: "Browse more treatments", yourEmail: "your email"
    }
  };

  var booking = WP.get("booking", null);
  var contact = WP.get("contact", {}) || {};
  var method = WP.get("method", "card");
  var reference = WP.get("reference", "WP-DEMO-0000");

  WP.page({
    active: null,
    view: function (lang) {
      var t = TEXT[lang], s = WP.bookingSummary(booking, lang), req = !!s.tr.request;
      var check = function (txt) { return "<li>" + icon("check") + "<span>" + esc(txt) + "</span></li>"; };
      return '<main id="main-content" class="s-shell" style="padding: 40px 0 72px; max-width: 880px;">' +
        '<div style="max-width: 720px; margin-bottom: 40px;">' + UI.stepper(t.steps, 3, lang === "th" ? "ขั้นตอนการจอง" : "Booking progress") + "</div>" +
        '<div style="display: grid; gap: 20px; justify-items: start;">' +
          '<span class="s-check-tile">' + icon(req ? "clock" : "check") + "</span>" +
          '<h1 class="s-h1">' + esc(req ? t.reqTitle : t.okTitle) + "</h1>" +
          '<p style="margin: 0; max-width: 640px; color: var(--ink-2);">' + esc(req ? t.reqBody : t.okBody) + "</p>" +
          UI.notice({ tone: "notice", title: t.demoTitle }, esc(t.demoBody)) +
          '<div class="s-ref"><span class="s-small">' + esc(t.refLabel) + "</span><strong>" + esc(reference) + "</strong>" + UI.badge(t.sample, "notice") + "</div>" +
        "</div>" +
        '<div class="s-two" style="margin-top: 40px; align-items: start;">' +
          '<section class="s-card s-sum" aria-labelledby="sum-title"><h2 id="sum-title" class="s-h3" style="font-size: 18px;">' + esc(t.sumTitle) + "</h2>" +
            WP.summaryHead(s) +
            WP.sumRows([[t.sDate, s.date], [t.sTime, s.time], [t.sLength, s.length], [t.sGuests, s.guestsLabel], [t.sMethod, method === "promptpay" ? t.pp : t.card]]) +
            '<div class="s-total"><span>' + esc(t.total) + "</span><strong>" + esc(s.totalLabel) + "</strong></div></section>" +
          '<section class="s-card" aria-labelledby="next-title" style="display: grid; gap: 14px; align-content: start;"><h2 id="next-title" class="s-h3" style="font-size: 18px;">' + esc(t.nextTitle) + "</h2>" +
            '<ul class="s-list">' + check(t.n1(contact.email || t.yourEmail)) + check(t.n2) + check(t.n3) + "</ul>" +
            '<div class="s-btn-row" style="margin-top: 8px;">' + UI.button({ label: t.home, arrow: true, action: "wp:home" }) + UI.button({ label: t.more, variant: "ghost", action: "wp:all" }) + "</div>" +
          "</section></div></main>";
    }
  });
})();
