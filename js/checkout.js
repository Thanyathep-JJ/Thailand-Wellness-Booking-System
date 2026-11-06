/* Wellness Pass: Checkout (checkout.html), step 3 of 3.
   Demo payment: a card form (formatted and checked as you type) or a PromptPay QR code with a 10-minute timer.
   No money is taken. "Pay" shows a short processing step, saves the booking in this browser (My bookings)
   and opens the result page. Test cards: 4242 4242 4242 4242 succeeds, 4000 0000 0000 0002 is declined. */
(function () {
  "use strict";
  var D = window.WPData, UI = window.UI, WP = window.WP, esc = UI.esc, icon = UI.icon;

  var TEXT = {
    th: {
      back: "กลับไปแก้ไขรายละเอียด", backShort: "ย้อนกลับ", title: "ชำระเงิน", steps: ["ทรีตเมนต์", "ข้อมูลของคุณ", "ชำระเงิน"],
      payTitle: "วิธีชำระเงิน", card: "บัตรเครดิต / เดบิต", cardSub: "Visa, Mastercard, JCB", pp: "พร้อมเพย์ QR", ppSub: "สแกนจ่ายผ่านแอปธนาคาร",
      cName: "ชื่อบนบัตร", cNumber: "หมายเลขบัตร", cExp: "วันหมดอายุ (ดด/ปป)", cCvc: "รหัส CVC", cCvcHint: "3 หลักด้านหลังบัตร",
      eName: "กรอกชื่อตามที่ปรากฏบนบัตร", eNumber: "หมายเลขบัตรไม่ถูกต้อง ตรวจสอบอีกครั้ง", eExp: "กรอกวันหมดอายุให้ถูกต้อง และต้องยังไม่หมดอายุ", eCvc: "กรอกรหัส CVC 3 หลัก",
      testTitle: "บัตรทดสอบสำหรับเดโม:", testOk: "ชำระสำเร็จ", testNo: "ธนาคารปฏิเสธ", testAny: "ใช้วันหมดอายุในอนาคตและ CVC 3 หลักใดก็ได้",
      secure: "ในเว็บไซต์จริง ข้อมูลบัตรจะส่งตรงไปยังผู้ให้บริการชำระเงิน เราไม่เก็บเลขบัตรของคุณ",
      ppScan: "สแกนด้วยแอปธนาคารใดก็ได้", ppAmount: "ยอดชำระ", ppExpires: "QR หมดอายุใน", ppExpired: "QR หมดอายุแล้ว", ppNew: "สร้าง QR ใหม่",
      ppNote: "QR นี้เป็นตัวอย่าง สแกนไม่ได้จริง กดปุ่มด้านล่างเพื่อจำลองว่าชำระแล้ว",
      policyTitle: "การเปลี่ยนเวลาและการยกเลิก", policyNoticeTitle: "ยกเลิกฟรีก่อนเวลานัด 24 ชั่วโมง",
      policyBody: "ยกเลิกก่อน 24 ชั่วโมงขึ้นไป: คืนเงินเต็มจำนวน · 6–24 ชั่วโมง: คืนเงิน 50% · น้อยกว่า 6 ชั่วโมงหรือไม่มาตามนัด: ไม่คืนเงิน", policyLink: "อ่านนโยบายการยกเลิก",
      requestTitle: "คำขอจอง", requestBody: "สำหรับบริการนี้ ระบบจะกันวงเงินไว้ก่อน และตัดเงินจริงเมื่อสถานที่ยืนยันเท่านั้น ถ้าไม่ได้รับการยืนยันภายใน 12 ชั่วโมง วงเงินจะถูกปลดคืน",
      demoTitle: "นี่คือเดโม", demoBody: "ไม่มีการตัดเงินจริง ระบบจะบันทึกการจองตัวอย่างไว้ในเบราว์เซอร์นี้เท่านั้น",
      pay: "ชำระ ", payDemo: " (เดโม)", authorize: "ส่งคำขอและกันวงเงิน ", ppPaid: "ฉันชำระแล้ว · ตรวจสอบการชำระเงิน",
      processingCard: "กำลังดำเนินการชำระเงิน…", processingPP: "กำลังตรวจสอบการชำระเงิน…",
      declinedTitle: "ธนาคารปฏิเสธบัตรนี้ (เดโม)", declinedBody: "ไม่มีการตัดเงิน ลองใช้บัตรอื่น หรือเปลี่ยนไปชำระด้วยพร้อมเพย์",
      fixToast: "ตรวจสอบข้อมูลบัตรอีกครั้ง",
      sumAria: "สรุปการจอง", sumTitle: "สรุปการจอง", edit: "แก้ไข", sDate: "วันที่", sTime: "เวลาเริ่ม", sLength: "ความยาว", sName: "ผู้จอง", sFee: "ค่าเดินทางถึงโรงแรม",
      total: "ยอดชำระ", reprice: "ระบบจะตรวจสอบราคาและเวลาว่างอีกครั้งก่อนตัดเงิน"
    },
    en: {
      back: "Back to your details", backShort: "Back", title: "Payment", steps: ["Treatment", "Your details", "Payment"],
      payTitle: "Payment method", card: "Credit / debit card", cardSub: "Visa, Mastercard, JCB", pp: "PromptPay QR", ppSub: "Scan with your banking app",
      cName: "Name on card", cNumber: "Card number", cExp: "Expiry (MM/YY)", cCvc: "CVC", cCvcHint: "3 digits on the back",
      eName: "Enter the name as it appears on the card", eNumber: "This card number isn't valid. Please check it.", eExp: "Enter a valid expiry date that hasn't passed", eCvc: "Enter the 3-digit CVC",
      testTitle: "Demo test cards:", testOk: "payment succeeds", testNo: "bank declines", testAny: "Use any future expiry date and any 3-digit CVC.",
      secure: "On a live site your card details go straight to the payment provider. We never store your card number.",
      ppScan: "Scan with any banking app", ppAmount: "Amount", ppExpires: "QR expires in", ppExpired: "This QR code has expired", ppNew: "Get a new QR code",
      ppNote: "This QR is a sample and can't really be scanned. Use the button below to simulate a payment.",
      policyTitle: "Changes and cancellation", policyNoticeTitle: "Free cancellation up to 24 hours before",
      policyBody: "24 hours or more before: full refund · 6–24 hours: 50% refund · under 6 hours or no-show: no refund.", policyLink: "Read the cancellation policy",
      requestTitle: "Request to book", requestBody: "For this service the amount is held first and charged only when the venue confirms. If it isn't confirmed within 12 hours, the hold is released.",
      demoTitle: "This is a demo", demoBody: "No money is taken. The sample booking is saved in this browser only.",
      pay: "Pay ", payDemo: " (demo)", authorize: "Send request and hold ", ppPaid: "I've paid · check payment",
      processingCard: "Processing your payment…", processingPP: "Checking your payment…",
      declinedTitle: "Your bank declined this card (demo)", declinedBody: "No money was taken. Try another card, or pay with PromptPay instead.",
      fixToast: "Please check your card details",
      sumAria: "Booking summary", sumTitle: "Your booking", edit: "Edit", sDate: "Date", sTime: "Start time", sLength: "Length", sName: "Booked by", sFee: "In-hotel travel fee",
      total: "Total to pay", reprice: "Price and availability are checked again before you are charged."
    }
  };

  var booking = WP.get("booking", null);
  var contact = WP.get("contact", null) || { first: "Sample", last: "Guest", email: "guest@example.com" };
  var QR_MINUTES = 10;
  var state = {
    method: WP.get("method", "card"),
    card: { name: ((contact.first || "") + " " + (contact.last || "")).trim().toUpperCase(), number: "", exp: "", cvc: "" },
    submitted: false,         // the user pressed Pay at least once (show all card errors)
    declined: false,
    qrSeed: Date.now(),
    qrExpires: Date.now() + QR_MINUTES * 60000
  };
  var timer = null;

  /* ---------- Card checks ---------- */
  function digits(v) { return String(v || "").replace(/\D/g, ""); }
  function brand(num) {
    var n = digits(num);
    if (/^4/.test(n)) return "VISA";
    if (/^(5[1-5]|2[2-7])/.test(n)) return "MASTERCARD";
    if (/^35/.test(n)) return "JCB";
    return "";
  }
  function luhn(n) {
    var sum = 0, alt = false;
    for (var i = n.length - 1; i >= 0; i--) {
      var d = Number(n.charAt(i));
      if (alt) { d *= 2; if (d > 9) d -= 9; }
      sum += d; alt = !alt;
    }
    return n.length >= 13 && sum % 10 === 0;
  }
  function expOk(v) {
    var m = /^(\d{2})\/(\d{2})$/.exec(v || "");
    if (!m) return false;
    var mon = Number(m[1]), yr = 2000 + Number(m[2]), now = new Date();
    if (mon < 1 || mon > 12) return false;
    return yr > now.getFullYear() || (yr === now.getFullYear() && mon >= now.getMonth() + 1);
  }
  function cardErrors(t) {
    var c = state.card;
    return {
      name: /[A-Za-z]{2,}/.test(c.name) ? "" : t.eName,
      number: luhn(digits(c.number)) ? "" : t.eNumber,
      exp: expOk(c.exp) ? "" : t.eExp,
      cvc: /^\d{3}$/.test(c.cvc) ? "" : t.eCvc
    };
  }
  /* Card number shown as groups of 4, keeping the cursor in the right place while typing. */
  function formatNumber(el) {
    var caretDigits = digits(el.value.slice(0, el.selectionStart)).length;
    var d = digits(el.value).slice(0, 16), out = d.replace(/(\d{4})(?=\d)/g, "$1 ");
    el.value = out;
    var pos = 0, seen = 0;
    while (pos < out.length && seen < caretDigits) { if (/\d/.test(out.charAt(pos))) seen++; pos++; }
    try { el.setSelectionRange(pos, pos); } catch (e) {}
    var tag = document.getElementById("card-brand"), b = brand(d);
    if (tag) { tag.textContent = b; tag.hidden = !b; }
    return out;
  }
  function formatExp(el, e) {
    var d = digits(el.value).slice(0, 4);
    if (e && e.inputType === "deleteContentBackward" && el.value.length === 2) d = d.slice(0, 1);
    el.value = d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : (d.length === 2 && (!e || e.inputType !== "deleteContentBackward") ? d + "/" : d);
    return el.value;
  }
  function showCardErrors(onlyKey) {
    var t = TEXT[WP.getLang()], errs = cardErrors(t);
    ["name", "number", "exp", "cvc"].forEach(function (k) {
      if (onlyKey && k !== onlyKey) return;
      var el = document.getElementById("card-" + k);
      if (el) WP.fieldError(el, state.submitted || onlyKey ? errs[k] : "");
    });
    return errs;
  }

  /* ---------- PromptPay QR (a look-alike pattern made from the booking, not a real payment code) ---------- */
  function qrSvg(seed) {
    var n = 25, cells = "", x = seed % 2147483647 || 1;
    var rnd = function () { x = x * 16807 % 2147483647; return x / 2147483647; };
    var finder = function (r, c) {
      return [[0, 0], [0, n - 7], [n - 7, 0]].some(function (f) { return r >= f[0] && r < f[0] + 7 && c >= f[1] && c < f[1] + 7; });
    };
    var finderOn = function (r, c) {
      var f = [[0, 0], [0, n - 7], [n - 7, 0]].filter(function (q) { return r >= q[0] && r < q[0] + 7 && c >= q[1] && c < q[1] + 7; })[0];
      var rr = r - f[0], cc = c - f[1];
      return rr === 0 || rr === 6 || cc === 0 || cc === 6 || (rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4);
    };
    for (var r = 0; r < n; r++) for (var c = 0; c < n; c++) {
      var on = finder(r, c) ? finderOn(r, c) : (r === 7 || c === 7 || r === n - 8 || c === n - 8) && (finder(r, c + 1) || finder(r + 1, c) || finder(r, c - 1) || finder(r - 1, c)) ? false : rnd() > 0.52;
      if (on) cells += '<rect x="' + c + '" y="' + r + '" width="1" height="1"/>';
    }
    return '<svg viewBox="-1 -1 ' + (n + 2) + " " + (n + 2) + '" role="img" aria-label="PromptPay QR (sample)" shape-rendering="crispEdges"><rect x="-1" y="-1" width="' + (n + 2) + '" height="' + (n + 2) + '" fill="#fff"/><g fill="#12352b">' + cells + "</g></svg>";
  }
  function mmss(ms) { var s = Math.max(0, Math.ceil(ms / 1000)); return Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2); }
  function startTimer() {
    clearInterval(timer);
    if (state.method !== "promptpay") return;
    var tick = function () {
      var left = state.qrExpires - Date.now(), el = document.getElementById("pp-timer");
      if (!el) { clearInterval(timer); return; }
      if (left <= 0) { clearInterval(timer); page.render(); return; }
      el.textContent = mmss(left);
      el.parentNode.classList.toggle("is-low", left < 60000);
    };
    tick();
    timer = setInterval(tick, 1000);
  }

  /* ---------- Sections ---------- */
  function cardForm(t) {
    var c = state.card, errs = state.submitted ? cardErrors(t) : {}, b = brand(c.number);
    return '<div class="s-cardform">' +
      UI.textField({ id: "card-name", input: "name", label: t.cName, required: true, value: c.name, autocomplete: "cc-name", error: errs.name }) +
      '<div class="s-cardnum">' + UI.textField({ id: "card-number", input: "number", label: t.cNumber, required: true, value: c.number, autocomplete: "cc-number", inputmode: "numeric", placeholder: "1234 5678 9012 3456", maxlength: 19, error: errs.number }) +
        '<span id="card-brand" class="s-brand-tag"' + (b ? "" : " hidden") + ">" + esc(b) + "</span></div>" +
      '<div class="s-cardform-grid">' +
        UI.textField({ id: "card-exp", input: "exp", label: t.cExp, required: true, value: c.exp, autocomplete: "cc-exp", inputmode: "numeric", placeholder: "MM/YY", maxlength: 5, error: errs.exp }) +
        UI.textField({ id: "card-cvc", input: "cvc", label: t.cCvc, required: true, value: c.cvc, autocomplete: "cc-csc", inputmode: "numeric", placeholder: "123", maxlength: 3, hint: t.cCvcHint, error: errs.cvc }) +
      "</div>" +
      '<div class="s-test-cards"><strong style="font-weight: 500; color: var(--ink-2);">' + esc(t.testTitle) + "</strong>" +
        "<span><code>4242 4242 4242 4242</code> " + esc(t.testOk) + "</span>" +
        "<span><code>4000 0000 0000 0002</code> " + esc(t.testNo) + "</span>" +
        "<span>" + esc(t.testAny) + "</span></div>" +
      '<p class="s-small" style="margin: 0; display: flex; gap: 8px;">' + icon("shield") + esc(t.secure) + "</p>" +
      "</div>";
  }
  function promptPay(t, s) {
    var left = state.qrExpires - Date.now(), expired = left <= 0;
    return '<div class="s-pp' + (expired ? " is-expired" : "") + '">' +
      '<div class="s-pp-qr"><span class="s-pp-head">PromptPay · พร้อมเพย์</span>' + qrSvg(state.qrSeed + s.total) + '<span class="s-small">' + esc(t.ppScan) + "</span></div>" +
      '<div class="s-pp-info"><span class="s-small">' + esc(t.ppAmount) + '</span><span class="s-pp-amount">' + esc(s.totalLabel) + "</span>" +
        (expired
          ? '<p class="s-err-text" role="alert">' + icon("alert") + esc(t.ppExpired) + "</p>" + UI.button({ label: t.ppNew, variant: "ghost", size: "sm", action: "newQr" })
          : '<span class="s-timer">' + icon("clock") + esc(t.ppExpires) + ' <strong id="pp-timer">' + mmss(left) + "</strong></span>") +
        '<p class="s-small" style="margin: 0;">' + esc(t.ppNote) + "</p></div></div>";
  }
  function payOption(id, ico, title, sub) {
    return '<button type="button" class="s-pay-opt" aria-pressed="' + (state.method === id) + '" data-action="pickMethod" data-arg="' + id + '">' +
      '<span class="s-icon-tile" style="border-radius: 12px; flex: none;">' + icon(ico) + "</span>" +
      "<span><strong>" + esc(title) + '</strong><span class="s-pay-sub">' + esc(sub) + "</span></span></button>";
  }

  /* ---------- Paying ---------- */
  function finishPayment() {
    var s = WP.bookingSummary(booking, "en"), b = booking || { id: s.tr.id, dur: 90, dateIdx: 1, slot: "13:30", guests: 2 };
    var rec = {
      ref: WP.bookings.newRef(), createdAt: new Date().toISOString(),
      status: s.tr.request ? "pending" : "confirmed", request: !!s.tr.request,
      id: b.id, dur: b.dur, date: D.isoFromIdx(b.dateIdx), slot: b.slot, guests: s.guests, party: b.party || null,
      method: state.method, total: s.total, fee: s.fee,
      first: contact.first || "", last: contact.last || "", email: contact.email || "", phone: contact.phone || "",
      hotel: contact.hotel || "", room: contact.room || ""
      // Health details are deliberately not saved with the booking.
    };
    WP.bookings.add(rec);
    WP.set({ method: state.method, reference: rec.ref });
    WP.go("success");
  }
  function pay() {
    var lang = WP.getLang(), t = TEXT[lang];
    if (state.method === "card") {
      state.submitted = true;
      var errs = showCardErrors(), bad = Object.keys(errs).filter(function (k) { return errs[k]; });
      if (bad.length) {
        WP.toast(t.fixToast, "danger");
        var first = document.getElementById("card-" + bad[0]);
        if (first) first.focus();
        return;
      }
    }
    var p = WP.processing(state.method === "card" ? t.processingCard : t.processingPP);
    setTimeout(function () {
      if (state.method === "card" && digits(state.card.number) === "4000000000000002") {
        p.done();
        state.declined = true;
        page.render();
        var n = document.getElementById("declined");
        if (n) n.scrollIntoView({ block: "center" });
        return;
      }
      finishPayment();
    }, 1600);
  }

  var page = WP.page({
    active: null,
    view: function (lang) {
      var t = TEXT[lang], s = WP.bookingSummary(booking, lang);
      var payLabel = state.method === "promptpay" ? t.ppPaid : (s.tr.request ? t.authorize : t.pay) + s.totalLabel + t.payDemo;
      var policyBody = esc(t.policyBody) + ' <a href="policy.html">' + esc(t.policyLink) + "</a>";
      return '<main id="main-content" class="s-shell" style="padding: 20px 0 72px;">' +
        WP.backButton(t.back, "goBack") +
        '<h1 class="s-h1" style="margin: 8px 0 24px;">' + esc(t.title) + "</h1>" +
        '<div style="max-width: 720px; margin-bottom: 32px;">' + UI.stepper(t.steps, 2, lang === "th" ? "ขั้นตอนการจอง" : "Booking progress") + "</div>" +
        '<div class="s-split s-sum-first"><div class="s-form">' +
          (state.declined ? '<div id="declined" class="s-errsum" role="alert"><strong style="font-weight: 600;">' + esc(t.declinedTitle) + "</strong><span>" + esc(t.declinedBody) + "</span></div>" : "") +
          '<section class="s-card s-form" aria-labelledby="sec-pay"><h2 id="sec-pay" class="s-sec-title">' + esc(t.payTitle) + "</h2>" +
            '<div class="s-pay-opts" role="group" aria-label="' + esc(t.payTitle) + '">' + payOption("card", "shield", t.card, t.cardSub) + payOption("promptpay", "sparkle", t.pp, t.ppSub) + "</div>" +
            (state.method === "card" ? cardForm(t) : promptPay(t, s)) + "</section>" +
          '<section class="s-card s-form" aria-labelledby="sec-policy"><h2 id="sec-policy" class="s-sec-title">' + esc(t.policyTitle) + "</h2>" +
            UI.notice({ tone: "notice", title: t.policyNoticeTitle }, policyBody) +
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
    after: startTimer,
    actions: {
      goBack: function () { WP.go("booking"); return false; },
      pickMethod: function (m) { state.method = m; state.declined = false; WP.set({ method: m }); },
      newQr: function () { state.qrSeed = Date.now(); state.qrExpires = Date.now() + QR_MINUTES * 60000; },
      pay: function () { pay(); return false; }
    },
    inputs: {
      // Typing never redraws the page (the cursor would jump); errors update in place.
      name: function (v, el, e) { state.card.name = v; if (state.submitted || e.type === "change") showCardErrors("name"); return false; },
      number: function (v, el, e) {
        if (e.type === "input") state.card.number = formatNumber(el); else state.card.number = el.value;
        state.declined = false;
        if (state.submitted || (e.type === "change" && digits(el.value).length)) showCardErrors("number");
        return false;
      },
      exp: function (v, el, e) { state.card.exp = e.type === "input" ? formatExp(el, e) : el.value; if (state.submitted || (e.type === "change" && el.value)) showCardErrors("exp"); return false; },
      cvc: function (v, el, e) { el.value = digits(el.value).slice(0, 3); state.card.cvc = el.value; if (state.submitted || (e.type === "change" && el.value)) showCardErrors("cvc"); return false; }
    }
  });
})();
