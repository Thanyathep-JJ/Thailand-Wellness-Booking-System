/* Wellness Pass: Checkout (checkout.html), step 3 of 3.
   Payment method (card / PromptPay, both placeholders), cancellation policy, demo notice and the order summary.
   No money is taken: "Pay" only creates a sample reference and opens the result page. */
(function () {
  "use strict";
  var D = window.WPData, UI = window.UI, WP = window.WP, esc = UI.esc, icon = UI.icon;

  var TEXT = {
    th: {
      back: "กลับไปแก้ไขรายละเอียด", backShort: "ย้อนกลับ", title: "ชำระเงิน", steps: ["ทรีตเมนต์", "ข้อมูลของคุณ", "ชำระเงิน"],
      payTitle: "วิธีชำระเงิน", card: "บัตรเครดิต / เดบิต", cardSub: "Visa, Mastercard, JCB", pp: "พร้อมเพย์ QR", ppSub: "สแกนจ่ายผ่านแอปธนาคาร",
      cardBoxTitle: "ช่องกรอกบัตรจากผู้ให้บริการชำระเงิน", cardBox: "ในเว็บไซต์จริง ฟอร์มบัตรมาจากผู้ให้บริการชำระเงินโดยตรง เราไม่เก็บเลขบัตรของคุณ [ตัวยึดตำแหน่ง]",
      qr: "QR พร้อมเพย์จะแสดงที่นี่ [ตัวยึดตำแหน่ง]", ppBox: "QR มีอายุจำกัด สถานะการจองจะอัปเดตเมื่อผู้ให้บริการยืนยันการชำระเงินแล้วเท่านั้น",
      policyTitle: "การเปลี่ยนเวลาและการยกเลิก", policyNoticeTitle: "นโยบายรอเจ้าของกำหนด",
      policyBody: "ยังไม่มีนโยบายการยกเลิกจริง ตัวอย่างที่ต้องตัดสินใจ: คืนเงินเต็มจำนวนเมื่อยกเลิกล่วงหน้า X ชั่วโมง คืนบางส่วนในช่วงเวลาหนึ่ง และไม่คืนเงินเมื่อใกล้เวลานัด",
      requestTitle: "คำขอจอง", requestBody: "สำหรับบริการนี้ ระบบจะกันวงเงินบัตรไว้ก่อน และตัดเงินจริงเมื่อสถานที่ยืนยันเท่านั้น ถ้าไม่ได้รับการยืนยันภายในเวลาที่กำหนด วงเงินจะถูกปลดคืน",
      demoTitle: "นี่คือเดโม", demoBody: "ไม่มีการตัดเงินจริง ปุ่มด้านล่างจะพาไปยังหน้าผลลัพธ์ตัวอย่างเท่านั้น",
      pay: "ชำระ ", payDemo: " (เดโม)", authorize: "ส่งคำขอและกันวงเงิน ",
      sumAria: "สรุปการจอง", sumTitle: "สรุปการจอง", edit: "แก้ไข", sDate: "วันที่", sTime: "เวลาเริ่ม", sLength: "ความยาว", sName: "ผู้จอง", sFee: "ค่าเดินทางถึงโรงแรม",
      total: "ยอดชำระ", reprice: "ระบบจะตรวจสอบราคาและเวลาว่างอีกครั้งก่อนตัดเงิน"
    },
    en: {
      back: "Back to your details", backShort: "Back", title: "Payment", steps: ["Treatment", "Your details", "Payment"],
      payTitle: "Payment method", card: "Credit / debit card", cardSub: "Visa, Mastercard, JCB", pp: "PromptPay QR", ppSub: "Scan with your banking app",
      cardBoxTitle: "Card form from the payment provider", cardBox: "On the live site the card form comes straight from the payment provider. We never store your card number [placeholder].",
      qr: "PromptPay QR shows here [placeholder]", ppBox: "The QR code expires after a while. Your booking updates only once the provider confirms the payment.",
      policyTitle: "Changes and cancellation", policyNoticeTitle: "Policy to be set by the owner",
      policyBody: "There is no real cancellation policy yet. To decide: a full refund up to X hours before, a partial refund within a window, and no refund close to the appointment.",
      requestTitle: "Request to book", requestBody: "For this service your card is authorized first and charged only when the venue confirms. If it is not confirmed in time, the hold is released.",
      demoTitle: "This is a demo", demoBody: "No money is taken. The button below only opens a sample result page.",
      pay: "Pay ", payDemo: " (demo)", authorize: "Send request and authorize ",
      sumAria: "Booking summary", sumTitle: "Your booking", edit: "Edit", sDate: "Date", sTime: "Start time", sLength: "Length", sName: "Booked by", sFee: "In-hotel travel fee",
      total: "Total to pay", reprice: "Price and availability are checked again before you are charged."
    }
  };

  var booking = WP.get("booking", null);
  var contact = WP.get("contact", null) || { first: "Sample", last: "Guest" };
  var state = { method: WP.get("method", "card") };

  function payOption(id, ico, title, sub) {
    return '<button type="button" class="s-pay-opt" aria-pressed="' + (state.method === id) + '" data-action="pickMethod" data-arg="' + id + '">' +
      '<span class="s-icon-tile" style="border-radius: 12px; flex: none;">' + icon(ico) + "</span>" +
      "<span><strong>" + esc(title) + '</strong><span class="s-pay-sub">' + esc(sub) + "</span></span></button>";
  }

  WP.page({
    active: null,
    view: function (lang) {
      var t = TEXT[lang], s = WP.bookingSummary(booking, lang);
      var payLabel = (s.tr.request ? t.authorize : t.pay) + s.totalLabel + t.payDemo;
      var methodBox = state.method === "card"
        ? '<div class="s-empty" style="justify-items: start; text-align: left; padding: 20px 24px;"><strong style="font-weight: 500; color: var(--forest);">' + esc(t.cardBoxTitle) + '</strong><span class="s-small">' + esc(t.cardBox) + "</span></div>"
        : '<div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: center;"><div class="s-qr">' + esc(t.qr) + '</div><p class="s-small" style="margin: 0; max-width: 360px;">' + esc(t.ppBox) + "</p></div>";

      return '<main id="main-content" class="s-shell" style="padding: 20px 0 72px;">' +
        WP.backButton(t.back, "goBack") +
        '<h1 class="s-h1" style="margin: 8px 0 24px;">' + esc(t.title) + "</h1>" +
        '<div style="max-width: 720px; margin-bottom: 32px;">' + UI.stepper(t.steps, 2, lang === "th" ? "ขั้นตอนการจอง" : "Booking progress") + "</div>" +
        '<div class="s-split s-sum-first"><div class="s-form">' +
          '<section class="s-card s-form" aria-labelledby="sec-pay"><h2 id="sec-pay" class="s-sec-title">' + esc(t.payTitle) + "</h2>" +
            '<div class="s-pay-opts" role="group" aria-label="' + esc(t.payTitle) + '">' + payOption("card", "shield", t.card, t.cardSub) + payOption("promptpay", "sparkle", t.pp, t.ppSub) + "</div>" +
            methodBox + "</section>" +
          '<section class="s-card s-form" aria-labelledby="sec-policy"><h2 id="sec-policy" class="s-sec-title">' + esc(t.policyTitle) + "</h2>" +
            UI.notice({ tone: "notice", title: t.policyNoticeTitle }, esc(t.policyBody)) +
            (s.tr.request ? UI.notice({ tone: "info", title: t.requestTitle }, esc(t.requestBody)) : "") + "</section>" +
          UI.notice({ tone: "notice", title: t.demoTitle }, esc(t.demoBody)) +
          '<div class="s-btn-row" style="justify-content: space-between;">' +
            '<button type="button" class="s-textbtn" data-action="goBack">' + esc(t.backShort) + "</button>" +
            UI.button({ label: payLabel, variant: "cta", arrow: true, action: "pay" }) + "</div>" +
        "</div>" +
        '<aside class="s-sticky" aria-label="' + esc(t.sumAria) + '"><div class="s-card s-sum">' +
          '<div style="display: flex; justify-content: space-between; align-items: center; gap: 12px;"><h2 class="s-h3" style="font-size: 18px;">' + esc(t.sumTitle) + "</h2>" +
            '<button type="button" class="s-textbtn" data-action="goBack">' + esc(t.edit) + "</button></div>" +
          WP.summaryHead(s) +
          WP.sumRows([[t.sDate, s.date], [t.sTime, s.time], [t.sLength, s.length], [t.sName, ((contact.first || "") + " " + (contact.last || "")).trim()],
            [s.lineLabel, s.line], s.fee > 0 && [t.sFee, s.feeLabel]]) +
          '<div class="s-total"><span>' + esc(t.total) + "</span><strong>" + esc(s.totalLabel) + "</strong></div>" +
          '<p class="s-small" style="margin: 0;">' + esc(t.reprice) + "</p>" +
        "</div></aside></div></main>";
    },
    actions: {
      goBack: function () { WP.go("booking"); return false; },
      pickMethod: function (m) { state.method = m; WP.set({ method: m }); },
      pay: function () {
        var ref = "WP-DEMO-" + Math.random().toString(36).slice(2, 6).toUpperCase();
        WP.go("success", { method: state.method, reference: ref });
        return false;
      }
    }
  });
})();
