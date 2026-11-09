/* Wellness Pass: Booking details (booking.html), step 2 of 3.
   Contact form with validation, optional other guests, optional health details (only after consent),
   hotel address for in-hotel treatments, and the booking summary. */
(function () {
  "use strict";
  var D = window.WPData, UI = window.UI, WP = window.WP, esc = UI.esc, icon = UI.icon;

  var TEXT = {
    th: {
      back: "กลับไปที่ทรีตเมนต์", backShort: "ย้อนกลับ", title: "รายละเอียดการจอง", steps: ["ทรีตเมนต์", "ข้อมูลของคุณ", "ชำระเงิน"],
      fixTitle: "โปรดแก้ไขข้อมูลต่อไปนี้ก่อนดำเนินการต่อ",
      contact: "ข้อมูลติดต่อ", contactHint: "เราจะส่งการยืนยันและรหัสค้นหาการจองไปที่อีเมลนี้", filled: function (n) { return "กรอกข้อมูลจากบัญชีของคุณ (" + n + ") แล้ว แก้ไขได้ถ้าต้องการ"; }, haveAcct: "มีบัญชีอยู่แล้ว?", loginFill: "เข้าสู่ระบบเพื่อกรอกข้อมูลอัตโนมัติ", orGuest: "หรือจองต่อแบบไม่ต้องมีบัญชี",
      first: "ชื่อ (ภาษาอังกฤษ)", last: "นามสกุล (ภาษาอังกฤษ)", email: "อีเมล", emailHint: "เช่น name@example.com", phone: "เบอร์โทรศัพท์", phoneHint: "ใส่รหัสประเทศ เช่น +66 81 234 5678",
      guestsTitle: "ผู้เข้าร่วมคนอื่น", guestName: function (n) { return "ชื่อผู้เข้าร่วมคนที่ " + n; }, optional: "(ไม่บังคับ)", optWord: "ไม่บังคับ",
      healthTitle: "ข้อมูลสุขภาพสำหรับนักบำบัด",
      privacyTitle: "ข้อมูลนี้ปลอดภัย", privacyBody: "ข้อมูลสุขภาพเป็นข้อมูลอ่อนไหวตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล เราส่งให้เฉพาะสถานที่ที่ดูแลการจองนี้ ไม่ใช้เพื่อแนะนำทรีตเมนต์หรือการตลาด และลบภายใน 90 วันหลังวันนัด",
      consentLabel: "ฉันยินยอมให้เก็บข้อมูลสุขภาพเพื่อการจองนี้", consentDetail: "ใช้เพื่อให้นักบำบัดดูแลคุณได้อย่างปลอดภัยเท่านั้น ถอนความยินยอมได้ทุกเมื่อจากหน้าการจองของคุณ",
      pressure: "แรงนวด", therapist: "นักบำบัดที่ต้องการ", pregnant: "ตั้งครรภ์อยู่หรือไม่",
      pLight: "เบา", pMedium: "ปานกลาง", pFirm: "หนัก", tAny: "ไม่ระบุ", tF: "ผู้หญิง", tM: "ผู้ชาย", yes: "ใช่", no: "ไม่ใช่", na: "ไม่ขอระบุ",
      notes: "อาการบาดเจ็บ ภูมิแพ้ หรือสิ่งที่นักบำบัดควรรู้", notesHint: "เช่น ปวดหลังส่วนล่าง แพ้น้ำมันบางชนิด ไม่ต้องใส่ข้อมูลที่ไม่จำเป็น",
      skipHealth: "ไม่ต้องการแจ้งข้อมูลสุขภาพก็ได้ คุณสามารถบอกนักบำบัดโดยตรงเมื่อไปถึง",
      hotelTitle: "ที่อยู่สำหรับบริการถึงโรงแรม", hotel: "ชื่อโรงแรม", room: "หมายเลขห้อง", hotelHint: "นักบำบัดจะติดต่อคุณก่อนเดินทาง ค่าเดินทางคิดต่อการจอง ไม่ใช่ต่อคน",
      next: "ไปที่การชำระเงิน", sumAria: "สรุปการจอง", sDate: "วันที่", sTime: "เวลาเริ่ม", sLength: "ความยาว", sGuests: "ผู้เข้าร่วม", sFee: "ค่าเดินทางถึงโรงแรม",
      estTotal: "ราคารวมโดยประมาณ",
      eFirst: "กรอกชื่อเป็นตัวอักษรภาษาอังกฤษ", eLast: "กรอกนามสกุลเป็นตัวอักษรภาษาอังกฤษ", eEmail: "กรอกอีเมลให้ครบ เช่น name@example.com", ePhone: "กรอกเบอร์โทรศัพท์อย่างน้อย 9 หลัก", eHotel: "กรอกชื่อโรงแรมที่คุณพัก"
    },
    en: {
      back: "Back to treatment", backShort: "Back", title: "Booking details", steps: ["Treatment", "Your details", "Payment"],
      fixTitle: "Please fix the following to continue",
      contact: "Contact details", contactHint: "We send your confirmation and booking lookup code to this email.", filled: function (n) { return "Filled in from your account (" + n + "). You can change anything."; }, haveAcct: "Have an account?", loginFill: "Log in to fill this in", orGuest: "or carry on as a guest",
      first: "First name (English letters)", last: "Last name (English letters)", email: "Email", emailHint: "For example name@example.com", phone: "Phone", phoneHint: "Include the country code, e.g. +66 81 234 5678",
      guestsTitle: "Other guests", guestName: function (n) { return "Guest " + n + " name"; }, optional: "(optional)", optWord: "optional",
      healthTitle: "Health details for your therapist",
      privacyTitle: "How we protect this", privacyBody: "Health details are sensitive data under Thailand’s PDPA. Only the venue handling this booking sees them. They are never used for recommendations or marketing, and are deleted 90 days after your appointment.",
      consentLabel: "I consent to sharing health details for this booking", consentDetail: "Used only so your therapist can care for you safely. You can withdraw consent any time from your booking page.",
      pressure: "Pressure", therapist: "Therapist preference", pregnant: "Are you pregnant?",
      pLight: "Light", pMedium: "Medium", pFirm: "Firm", tAny: "No preference", tF: "Female", tM: "Male", yes: "Yes", no: "No", na: "Prefer not to say",
      notes: "Injuries, allergies or anything your therapist should know", notesHint: "For example lower back pain, or an allergy to certain oils. Share only what is needed.",
      skipHealth: "You can skip this and tell your therapist in person when you arrive.",
      hotelTitle: "Your hotel for the in-hotel session", hotel: "Hotel name", room: "Room number", hotelHint: "Your therapist contacts you before travelling. The travel fee is per booking, not per person.",
      next: "Continue to payment", sumAria: "Booking summary", sDate: "Date", sTime: "Start time", sLength: "Length", sGuests: "Guests", sFee: "In-hotel travel fee",
      estTotal: "Estimated total",
      eFirst: "Enter your first name in English letters", eLast: "Enter your last name in English letters", eEmail: "Enter a full email address, like name@example.com", ePhone: "Enter a phone number with at least 9 digits", eHotel: "Enter the name of your hotel"
    }
  };

  var booking = WP.get("booking", null);
  var tr = D.get((booking || { id: "thai-traditional" }).id);
  var inHotel = tr.setting === "home";
  var guests = (booking && booking.guests) || 2;

  /* Form values. Restored from an earlier visit in this tab, so going back from checkout keeps what was typed. */
  var f = Object.assign({ first: "", last: "", email: "", phone: "", consent: false, pressure: "", therapist: "", preg: "", notes: "", hotel: "", room: "", g2: "", g3: "", g4: "", g5: "", g6: "" }, WP.get("contact", {}));
  var state = { submitted: false, emailTouched: false };
  /* Logged in: fill the contact fields from the account (only the empty ones, so edits are kept). */
  var me = WP.auth.current();
  if (me) ["first", "last", "email", "phone"].forEach(function (k) { if (!f[k]) f[k] = me[k] || ""; });

  /* ---------- Validation ---------- */
  function nameOk(v) { return /^[A-Za-z][A-Za-z' .-]*$/.test((v || "").trim()); }
  function emailOk(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((v || "").trim()); }
  function phoneOk(v) { return (v || "").replace(/\D/g, "").length >= 9; }
  function allErrors(t) {
    return {
      first: nameOk(f.first) ? "" : t.eFirst,
      last: nameOk(f.last) ? "" : t.eLast,
      email: emailOk(f.email) ? "" : t.eEmail,
      phone: phoneOk(f.phone) ? "" : t.ePhone,
      hotel: !inHotel || (f.hotel || "").trim() ? "" : t.eHotel
    };
  }

  function chipRow(label, key, opts) {
    return '<div class="s-filter-row" role="group" aria-label="' + esc(label) + '"><span class="s-filter-label">' + esc(label) + '</span><div class="s-chips">' +
      opts.map(function (o) { return UI.chip({ label: o[1], selected: f[key] === o[0], action: "chip", arg: key + ":" + o[0] }); }).join("") + "</div></div>";
  }

  function form(lang, t) {
    var all = allErrors(t), sub = state.submitted;
    var e = { first: sub ? all.first : "", last: sub ? all.last : "", email: (sub || state.emailTouched) ? all.email : "", phone: sub ? all.phone : "", hotel: sub ? all.hotel : "" };
    var errList = Object.keys(all).map(function (k) { return all[k]; }).filter(Boolean);
    var extra = [];
    for (var n = 2; n <= guests; n++) extra.push(n);
    var healthNum = extra.length ? 3 : 2, hotelNum = extra.length ? 4 : 3;
    var field = function (o) { return UI.textField(Object.assign({ input: o.id.replace("bk-", "") }, o)); };

    return '<form class="s-form" novalidate data-submit="submit" aria-label="' + esc(t.title) + '">' +
      (sub && errList.length ? '<div class="s-errsum" role="alert"><strong style="font-weight: 600;">' + esc(t.fixTitle) + "</strong><ul>" +
        errList.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>" : "") +

      '<section class="s-card s-form" aria-labelledby="sec-contact"><h2 id="sec-contact" class="s-sec-title"><span class="s-num-tile">1</span>' + esc(t.contact) + "</h2>" +
        '<p class="s-small" style="margin: 0;">' + esc(t.contactHint) + "</p>" +
        (me ? '<p class="s-acct-hint">' + '<span class="s-avatar" aria-hidden="true">' + WP.auth.avatarImg(me) + "</span>" + esc(t.filled(me.first + " " + me.last)) + "</p>"
          : '<p class="s-acct-hint">' + icon("user") + "<span>" + esc(t.haveAcct) + ' <a href="' + esc(WP.loginUrl()) + '">' + esc(t.loginFill) + "</a> " + esc(t.orGuest) + "</span></p>") +
        '<div class="s-field-grid">' +
          field({ id: "bk-first", label: t.first, required: true, value: f.first, error: e.first, autocomplete: "given-name" }) +
          field({ id: "bk-last", label: t.last, required: true, value: f.last, error: e.last, autocomplete: "family-name" }) +
          field({ id: "bk-email", label: t.email, required: true, type: "email", value: f.email, error: e.email, hint: t.emailHint, autocomplete: "email" }) +
          field({ id: "bk-phone", label: t.phone, required: true, type: "tel", value: f.phone, error: e.phone, hint: t.phoneHint, autocomplete: "tel" }) +
        "</div></section>" +

      (extra.length ? '<section class="s-card s-form" aria-labelledby="sec-guests"><h2 id="sec-guests" class="s-sec-title"><span class="s-num-tile">2</span>' + esc(t.guestsTitle) + "</h2>" +
        '<div class="s-field-grid">' + extra.map(function (n) {
          return field({ id: "bk-g" + n, label: t.guestName(n), optional: t.optWord, value: f["g" + n] });
        }).join("") + "</div></section>" : "") +

      '<section class="s-card s-form" aria-labelledby="sec-health"><h2 id="sec-health" class="s-sec-title"><span class="s-num-tile">' + healthNum + "</span>" + esc(t.healthTitle) + "</h2>" +
        UI.notice({ tone: "info", title: t.privacyTitle }, esc(t.privacyBody)) +
        UI.consentCheck({ id: "bk-consent", label: t.consentLabel, detail: t.consentDetail, checked: f.consent, input: "consent" }) +
        (f.consent
          ? '<div class="s-form">' +
              chipRow(t.pressure, "pressure", [["light", t.pLight], ["medium", t.pMedium], ["firm", t.pFirm]]) +
              chipRow(t.therapist, "therapist", [["any", t.tAny], ["female", t.tF], ["male", t.tM]]) +
              chipRow(t.pregnant, "preg", [["no", t.no], ["yes", t.yes], ["na", t.na]]) +
              '<div class="wp-field" style="max-width: none;"><label class="wp-label" for="intake-notes">' + esc(t.notes) + ' <span class="wp-label-opt">' + esc(t.optional) + "</span></label>" +
                '<textarea id="intake-notes" class="s-input" aria-describedby="intake-notes-hint" data-input="notes">' + esc(f.notes) + "</textarea>" +
                '<span id="intake-notes-hint" class="wp-hint">' + esc(t.notesHint) + "</span></div>" +
            "</div>"
          : '<p class="s-small" style="margin: 0;">' + esc(t.skipHealth) + "</p>") +
      "</section>" +

      (inHotel ? '<section class="s-card s-form" aria-labelledby="sec-hotel"><h2 id="sec-hotel" class="s-sec-title"><span class="s-num-tile">' + hotelNum + "</span>" + esc(t.hotelTitle) + "</h2>" +
        '<div class="s-field-grid">' +
          field({ id: "bk-hotel", label: t.hotel, required: true, value: f.hotel, error: e.hotel }) +
          field({ id: "bk-room", label: t.room, optional: t.optWord, value: f.room }) +
        '</div><p class="s-small" style="margin: 0;">' + esc(t.hotelHint) + "</p></section>" : "") +

      '<div class="s-btn-row" style="justify-content: space-between;">' +
        '<button type="button" class="s-textbtn" data-action="goBack">' + esc(t.backShort) + "</button>" +
        UI.button({ label: t.next, type: "submit", arrow: true }) +
      "</div></form>";
  }

  function summaryCard(lang, t) {
    var s = WP.bookingSummary(booking, lang);
    return '<aside class="s-sticky" aria-label="' + esc(t.sumAria) + '"><div class="s-card s-sum">' +
      WP.summaryPhoto(s, lang) +
      WP.sumRows([[t.sDate, s.date], [t.sTime, s.time], [t.sLength, s.length], [t.sGuests, s.guestsLabel], [s.lineLabel, s.line], s.fee > 0 && [t.sFee, s.feeLabel]]) +
      '<div class="s-total"><span>' + esc(t.estTotal) + "</span><strong>" + esc(s.totalLabel) + "</strong></div></div></aside>";
  }

  /* Show or clear one field's error message in place (no full redraw, so a click that caused the blur still lands). */
  function showFieldError(el, msg) {
    var box = el.closest(".wp-field"), old = box.querySelector(".wp-error"), errId = el.id + "-err";
    if ((old ? old.textContent : "") === (msg || "")) return;   // unchanged: don't re-announce to screen readers
    if (old) old.remove();
    var described = (el.getAttribute("aria-describedby") || "").split(" ").filter(function (x) { return x && x !== errId; });
    if (msg) {
      box.insertAdjacentHTML("beforeend", '<span id="' + errId + '" class="wp-error" role="alert">' + icon("alert") + esc(msg) + "</span>");
      el.setAttribute("aria-invalid", "true");
      described.push(errId);
    } else el.removeAttribute("aria-invalid");
    if (described.length) el.setAttribute("aria-describedby", described.join(" ")); else el.removeAttribute("aria-describedby");
  }

  /* Update every field error and the error summary in place, without redrawing the page.
     (A redraw while typing would move the cursor, and email fields don't let us put it back.) */
  function refreshErrors() {
    var t = TEXT[WP.getLang()], all = allErrors(t);
    ["first", "last", "email", "phone", "hotel"].forEach(function (k) {
      var el = document.getElementById("bk-" + k);
      if (!el) return;
      var shown = state.submitted || (k === "email" && state.emailTouched);
      showFieldError(el, shown ? all[k] : "");
    });
    var list = Object.keys(all).map(function (k) { return all[k]; }).filter(Boolean);
    var box = document.querySelector(".s-errsum");
    if (!state.submitted || !list.length) { if (box) box.remove(); return; }
    var html = '<strong style="font-weight: 600;">' + esc(t.fixTitle) + "</strong><ul>" + list.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>";
    if (box) { if (box.innerHTML !== html) box.innerHTML = html; }
    else document.querySelector("form.s-form").insertAdjacentHTML("afterbegin", '<div class="s-errsum" role="alert">' + html + "</div>");
  }

  /* Text fields: save as you type; never redraw (see refreshErrors). */
  function textInput(key) {
    return function (v, el, e) {
      f[key] = v;
      if (key === "email" && e.type === "change") state.emailTouched = true;   // check email once the user leaves the field
      if (state.submitted || (key === "email" && state.emailTouched)) refreshErrors();
      return false;
    };
  }
  var inputs = { notes: function (v) { f.notes = v; return false; }, consent: function (v) { f.consent = v; return true; } };
  ["first", "last", "email", "phone", "hotel", "room", "g2", "g3", "g4", "g5", "g6"].forEach(function (k) { inputs[k] = textInput(k); });

  WP.page({
    active: null,
    view: function (lang) {
      var t = TEXT[lang];
      return '<main id="main-content" class="s-shell" style="padding: 20px 0 72px;">' +
        WP.backButton(t.back, "goBack") +
        '<h1 class="s-h1" style="margin: 8px 0 24px;">' + esc(t.title) + "</h1>" +
        '<div style="max-width: 720px; margin-bottom: 32px;">' + UI.stepper(t.steps, 1, lang === "th" ? "ขั้นตอนการจอง" : "Booking progress") + "</div>" +
        '<div class="s-split s-sum-first">' + form(lang, t) + summaryCard(lang, t) + "</div></main>";
    },
    actions: {
      goBack: function () { WP.set({ contact: f }); WP.go("detail", { treatmentId: tr.id }); return false; },
      chip: function (arg) { var p = arg.split(":"); f[p[0]] = p[1]; }
    },
    inputs: inputs,
    submits: {
      submit: function () {
        var errs = allErrors(TEXT[WP.getLang()]);
        var bad = Object.keys(errs).filter(function (k) { return errs[k]; });
        if (bad.length) {
          state.submitted = true;
          window.scrollTo(0, 0);
          return;
        }
        WP.go("checkout", { contact: f });
        return false;
      }
    }
  });
})();
