/* Wellness Pass: information pages (faq.html, policy.html, terms.html, privacy.html, contact.html).
   Which page to show comes from <body data-page="...">. All content is sample text for the demo. */
(function () {
  "use strict";
  var D = window.WPData, UI = window.UI, WP = window.WP, esc = UI.esc, icon = UI.icon;
  var PAGE = document.body.getAttribute("data-page") || "faq";
  var P = D.policy;

  var NAV = [
    { id: "faq", icon: "info", th: "คำถามที่พบบ่อย", en: "FAQ" },
    { id: "policy", icon: "calendar", th: "นโยบายการยกเลิก", en: "Cancellation policy" },
    { id: "contact", icon: "user", th: "ติดต่อเรา", en: "Contact us" },
    { id: "terms", icon: "check", th: "ข้อกำหนดการใช้งาน", en: "Terms of use" },
    { id: "privacy", icon: "shield", th: "นโยบายความเป็นส่วนตัว", en: "Privacy policy" }
  ];
  var COMMON = {
    th: { eyebrow: "HELP · ช่วยเหลือ", updated: "ปรับปรุงล่าสุด: 1 พฤศจิกายน 2026 · เนื้อหาตัวอย่างสำหรับต้นแบบ", navAria: "หน้าช่วยเหลือ" },
    en: { eyebrow: "HELP", updated: "Last updated: 1 November 2026 · sample content for this prototype", navAria: "Help pages" }
  };

  /* ---------- Content ---------- */
  var FAQ = {
    th: [
      { group: "การจอง", items: [
        ["ต้องสมัครสมาชิกก่อนจองไหม", "ไม่ต้อง กรอกชื่อ อีเมล และเบอร์โทรตอนจองก็พอ แล้วใช้เลขอ้างอิงกับอีเมลเพื่อดูการจองที่หน้า “การจองของฉัน” แต่ถ้ามีบัญชี ระบบจะกรอกข้อมูลการจองให้อัตโนมัติ และเก็บการจองทั้งหมดไว้ในที่เดียว"],
        ["จองล่วงหน้าได้นานแค่ไหน", "จองได้ตั้งแต่วันนี้จนถึง " + P.windowDays + " วันข้างหน้า"],
        ["จองให้หลายคนได้ไหม", "ได้ สูงสุด " + P.maxGuests + " ท่านต่อการจอง ทรีตเมนต์คู่ใช้นักบำบัดสองคน และผู้ที่อายุต่ำกว่า 18 ปีต้องมีผู้ปกครองอยู่ด้วย"],
        ["“รอสถานที่ยืนยัน” หมายความว่าอะไร", "บางบริการ เช่น บริการถึงโรงแรมและรีทรีต สถานที่ต้องตรวจสอบก่อน จะยืนยันภายใน " + P.confirmHours + " ชั่วโมง และคุณจะถูกเรียกเก็บเงินเมื่อยืนยันแล้วเท่านั้น"]
      ] },
      { group: "การชำระเงิน", items: [
        ["ชำระเงินด้วยวิธีใดได้บ้าง", "บัตรเครดิตหรือเดบิต (Visa, Mastercard, JCB) และพร้อมเพย์ QR"],
        ["ราคาที่เห็นเป็นราคาสุดท้ายไหม", "ราคาบนหน้าทรีตเมนต์เป็นราคาประมาณการต่อท่าน ระบบจะคำนวณยอดจริงรวมค่าเดินทาง (ถ้ามี) อีกครั้งก่อนชำระเงิน"],
        ["เว็บไซต์เก็บเลขบัตรของฉันไหม", "ไม่เก็บ ในเว็บไซต์จริง ข้อมูลบัตรจะส่งตรงไปยังผู้ให้บริการชำระเงินที่ได้มาตรฐาน PCI DSS"]
      ] },
      { group: "สุขภาพและความปลอดภัย", items: [
        ["ต้องแจ้งข้อมูลสุขภาพไหม", "ไม่บังคับ คุณเลือกแจ้งได้ในขั้นตอนกรอกรายละเอียดหลังให้ความยินยอม หรือบอกนักบำบัดโดยตรงเมื่อไปถึง"],
        ["ตั้งครรภ์จองได้ไหม", "บางทรีตเมนต์ไม่เหมาะกับผู้ตั้งครรภ์ โปรดแจ้งในขั้นตอนกรอกรายละเอียดและปรึกษาแพทย์ก่อนจอง"],
        ["ถ้าแรงนวดมากเกินไปทำอย่างไร", "บอกนักบำบัดได้ตลอดเวลา นักบำบัดจะถามระดับแรงก่อนเริ่มและระหว่างนวด"]
      ] },
      { group: "การเปลี่ยนแปลงและยกเลิก", items: [
        ["ยกเลิกได้ไหม", "ได้ ยกเลิกฟรีก่อนเวลานัด " + P.freeHours + " ชั่วโมง คืนเงิน " + P.partialPct + "% เมื่อยกเลิกก่อน " + P.partialHours + "–" + P.freeHours + " ชั่วโมง"],
        ["เปลี่ยนวันหรือเวลาได้ไหม", "ได้ ฟรีหนึ่งครั้งหากแจ้งก่อนเวลานัด " + P.freeHours + " ชั่วโมง ขึ้นอยู่กับเวลาว่างของสถานที่"],
        ["ถ้าสถานที่ปฏิเสธการจองล่ะ", "คุณจะไม่ถูกเรียกเก็บเงิน และวงเงินที่กันไว้จะถูกปลดคืนทันที"]
      ] }
    ],
    en: [
      { group: "Booking", items: [
        ["Do I need an account to book?", "No. Just add your name, email and phone when you book, then use your reference and email to find the booking in My bookings. With an account, your details are filled in for you and all your bookings stay in one place."],
        ["How far ahead can I book?", "From today up to " + P.windowDays + " days ahead."],
        ["Can I book for a group?", "Yes, up to " + P.maxGuests + " guests per booking. Couples treatments use two therapists, and guests under 18 need a parent or guardian on site."],
        ["What does “Waiting for venue” mean?", "Some services, such as in-hotel treatments and retreats, are checked by the venue first. They confirm within " + P.confirmHours + " hours, and you're only charged once confirmed."]
      ] },
      { group: "Payment", items: [
        ["How can I pay?", "By credit or debit card (Visa, Mastercard, JCB) or PromptPay QR."],
        ["Is the price I see the final price?", "Prices on treatment pages are estimates per person. The final amount, including any travel fee, is checked again before you pay."],
        ["Do you store my card number?", "No. On a live site card details go straight to a PCI DSS compliant payment provider."]
      ] },
      { group: "Health and safety", items: [
        ["Do I have to share health details?", "No. You can choose to share them in the details step after giving consent, or tell your therapist in person."],
        ["Can I book if I'm pregnant?", "Some treatments aren't suitable during pregnancy. Please say so in the details step and check with your doctor before booking."],
        ["What if the pressure is too strong?", "Tell your therapist at any time. They check the pressure before and during the session."]
      ] },
      { group: "Changes and cancellations", items: [
        ["Can I cancel?", "Yes. Cancel for free up to " + P.freeHours + " hours before, or get " + P.partialPct + "% back between " + P.partialHours + " and " + P.freeHours + " hours before."],
        ["Can I change the date or time?", "Yes, once for free if you ask at least " + P.freeHours + " hours before, subject to the venue's availability."],
        ["What if the venue declines my booking?", "You won't be charged, and any amount held is released straight away."]
      ] }
    ]
  };

  function faqView(lang) {
    var t = lang === "th" ? { title: "คำถามที่พบบ่อย", lead: "คำตอบเรื่องการจอง การชำระเงิน ข้อมูลสุขภาพ และการยกเลิก", more: "ไม่พบคำตอบที่ต้องการ?", contact: "ติดต่อเรา" }
      : { title: "Frequently asked questions", lead: "Answers about booking, payment, health details and cancellations.", more: "Can't find your answer?", contact: "Contact us" };
    return { title: t.title, lead: t.lead, html: FAQ[lang].map(function (g, gi) {
      return '<section class="s-faq-group" aria-labelledby="faq-g' + gi + '"><h2 id="faq-g' + gi + '" class="s-h3" style="font-size: 22px; margin-bottom: 8px;">' + esc(g.group) + "</h2>" +
        g.items.map(function (q) { return UI.faqItem(q[0], q[1]); }).join("") + "</section>";
    }).join("") + '<div class="s-empty" style="margin-top: 40px; padding: 24px; justify-items: start; text-align: left;"><strong style="color: var(--forest); font-weight: 500;">' + esc(t.more) + "</strong>" +
      UI.button({ label: t.contact, href: "contact.html", size: "sm", arrow: true }) + "</div>" };
  }

  function policyView(lang) {
    var th = lang === "th";
    var tiers = th
      ? [["100%", "ยกเลิกก่อนเวลานัด " + P.freeHours + " ชั่วโมงขึ้นไป", "is-full"], [P.partialPct + "%", "ยกเลิกก่อน " + P.partialHours + "–" + P.freeHours + " ชั่วโมง", ""], ["0%", "น้อยกว่า " + P.partialHours + " ชั่วโมง หรือไม่มาตามนัด", "is-none"]]
      : [["100%", P.freeHours + " hours or more before your appointment", "is-full"], [P.partialPct + "%", "Between " + P.partialHours + " and " + P.freeHours + " hours before", ""], ["0%", "Under " + P.partialHours + " hours before, or no-show", "is-none"]];
    var body = th
      ? "<h2>เงินคืนเมื่อยกเลิก</h2><p>เงินคืนขึ้นอยู่กับเวลาที่ยกเลิกก่อนเวลานัด:</p>" +
        '<div class="s-tiers">' + tiers.map(function (x) { return '<div class="s-tier ' + x[2] + '"><strong>' + x[0] + "</strong><span>" + esc(x[1]) + "</span></div>"; }).join("") + "</div>" +
        "<h2>วิธียกเลิก</h2><ul><li>เปิดหน้า <a href=\"mybookings.html\">การจองของฉัน</a> แล้วกด “ยกเลิกการจอง”</li><li>ระบบแสดงจำนวนเงินคืนก่อนให้คุณยืนยัน</li><li>เงินคืนเข้าช่องทางเดิมภายใน 7–14 วันทำการ</li></ul>" +
        "<h2>การเปลี่ยนวันหรือเวลา</h2><p>เปลี่ยนได้ฟรีหนึ่งครั้งหากแจ้งก่อนเวลานัด " + P.freeHours + " ชั่วโมง ขึ้นอยู่กับเวลาว่างของสถานที่</p>" +
        "<h2>คำขอจอง (รอสถานที่ยืนยัน)</h2><p>สำหรับบริการที่สถานที่ต้องยืนยันก่อน ระบบจะกันวงเงินไว้ และตัดเงินเมื่อสถานที่ยืนยันภายใน " + P.confirmHours + " ชั่วโมงเท่านั้น หากยกเลิกก่อนได้รับการยืนยัน ไม่มีค่าใช้จ่าย</p>" +
        "<h2>เมื่อสถานที่ยกเลิก</h2><p>หากสถานที่ปฏิเสธหรือยกเลิกการจอง คุณจะได้รับเงินคืนเต็มจำนวนเสมอ</p>"
      : "<h2>Refunds when you cancel</h2><p>Your refund depends on how long before the appointment you cancel:</p>" +
        '<div class="s-tiers">' + tiers.map(function (x) { return '<div class="s-tier ' + x[2] + '"><strong>' + x[0] + "</strong><span>" + esc(x[1]) + "</span></div>"; }).join("") + "</div>" +
        "<h2>How to cancel</h2><ul><li>Open <a href=\"mybookings.html\">My bookings</a> and choose “Cancel booking”.</li><li>You'll see the refund amount before you confirm.</li><li>Refunds go back to the original payment method within 7–14 business days.</li></ul>" +
        "<h2>Changing the date or time</h2><p>You can change once for free if you ask at least " + P.freeHours + " hours before, subject to the venue's availability.</p>" +
        "<h2>Booking requests (waiting for venue)</h2><p>For services the venue confirms first, the amount is held and only charged when the venue confirms, within " + P.confirmHours + " hours. Cancelling before it's confirmed is free.</p>" +
        "<h2>If the venue cancels</h2><p>If a venue declines or cancels your booking, you always get a full refund.</p>";
    return { title: th ? "นโยบายการยกเลิก" : "Cancellation policy", lead: th ? "ยกเลิกฟรีก่อนเวลานัด 24 ชั่วโมง" : "Free cancellation up to 24 hours before your appointment.", html: '<div class="s-prose">' + body + "</div>" };
  }

  function termsView(lang) {
    var th = lang === "th";
    var body = th
      ? "<h2>1. เกี่ยวกับเว็บไซต์นี้</h2><p>Wellness Pass เป็นต้นแบบเพื่อการศึกษา ชื่อสถานที่ ราคา รีวิว และการชำระเงินทั้งหมดเป็นข้อมูลตัวอย่าง ไม่มีการจองหรือการชำระเงินเกิดขึ้นจริง</p>" +
        "<h2>2. บทบาทของเรา</h2><p>Wellness Pass เป็นตัวกลางที่ช่วยให้คุณค้นหาและจองบริการจากสถานที่ต่าง ๆ สถานที่แต่ละแห่งเป็นผู้ให้บริการและรับผิดชอบคุณภาพของบริการ</p>" +
        "<h2>3. การจองและการชำระเงิน</h2><ul><li>การจองจะสมบูรณ์เมื่อคุณได้รับอีเมลยืนยัน</li><li>ราคาแสดงเป็นเงินบาทและรวมภาษีแล้ว</li><li>การยกเลิกเป็นไปตาม<a href=\"policy.html\">นโยบายการยกเลิก</a></li></ul>" +
        "<h2>4. ความรับผิดชอบของผู้ใช้</h2><ul><li>ให้ข้อมูลที่ถูกต้องและเป็นปัจจุบัน</li><li>มาถึงตรงเวลาและแจ้งข้อมูลสุขภาพที่จำเป็นต่อความปลอดภัย</li><li>ทรีตเมนต์ไม่ใช่การรักษาทางการแพทย์</li></ul>" +
        "<h2>5. ติดต่อ</h2><p>หากมีคำถามเกี่ยวกับข้อกำหนดนี้ <a href=\"contact.html\">ติดต่อเรา</a></p>"
      : "<h2>1. About this website</h2><p>Wellness Pass is a student prototype. All venue names, prices, reviews and payments are sample content, and no real bookings or payments take place.</p>" +
        "<h2>2. Our role</h2><p>Wellness Pass helps you find and book services from independent venues. Each venue provides its own services and is responsible for their quality.</p>" +
        "<h2>3. Bookings and payment</h2><ul><li>A booking is complete when you receive a confirmation email.</li><li>Prices are in Thai baht and include tax.</li><li>Cancellations follow our <a href=\"policy.html\">cancellation policy</a>.</li></ul>" +
        "<h2>4. Your responsibilities</h2><ul><li>Give accurate, up-to-date details.</li><li>Arrive on time and share any health information needed for your safety.</li><li>Treatments are not medical care.</li></ul>" +
        "<h2>5. Contact</h2><p>Questions about these terms? <a href=\"contact.html\">Contact us</a>.</p>";
    return { title: th ? "ข้อกำหนดการใช้งาน" : "Terms of use", lead: th ? "เงื่อนไขการใช้เว็บไซต์ต้นแบบ Wellness Pass" : "The rules for using the Wellness Pass prototype.", html: '<div class="s-prose">' + body + "</div>" };
  }

  function privacyView(lang) {
    var th = lang === "th";
    var body = th
      ? "<h2>ข้อมูลที่เราเก็บ</h2><ul><li>ข้อมูลติดต่อ: ชื่อ อีเมล และเบอร์โทร เพื่อจัดการการจอง</li><li>รายละเอียดการจอง: ทรีตเมนต์ วันเวลา และจำนวนผู้เข้าร่วม</li><li>ข้อมูลสุขภาพ (ไม่บังคับ): เก็บเฉพาะเมื่อคุณให้ความยินยอม</li></ul>" +
        "<h2>ข้อมูลสุขภาพ</h2><p>ข้อมูลสุขภาพเป็นข้อมูลอ่อนไหวตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA) เราส่งให้เฉพาะสถานที่ที่ดูแลการจองนั้น ไม่ใช้เพื่อการตลาด และลบภายใน " + P.retentionDays + " วันหลังวันนัด คุณถอนความยินยอมได้ทุกเมื่อ</p>" +
        "<h2>ผู้ที่ได้รับข้อมูล</h2><p>สถานที่ที่คุณจอง และผู้ให้บริการชำระเงิน เราไม่ขายข้อมูลส่วนบุคคลของคุณ</p>" +
        "<h2>สิทธิของคุณ</h2><ul><li>ขอดู แก้ไข หรือลบข้อมูลของคุณ</li><li>ถอนความยินยอมเรื่องข้อมูลสุขภาพ</li><li>ร้องเรียนต่อสำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล</li></ul>" +
        "<h2>ในเดโมนี้</h2><p>ข้อมูลการจองตัวอย่างถูกเก็บไว้ในเบราว์เซอร์ของคุณเท่านั้น (Local Storage) ไม่ได้ส่งไปที่เซิร์ฟเวอร์ใด และไม่บันทึกข้อมูลสุขภาพไว้กับการจอง ล้างได้จากแดชบอร์ดสถานที่ (เดโม)</p>"
      : "<h2>What we collect</h2><ul><li>Contact details: name, email and phone, to manage your booking.</li><li>Booking details: treatment, date and time, and number of guests.</li><li>Health details (optional): only if you give consent.</li></ul>" +
        "<h2>Health details</h2><p>Health details are sensitive data under Thailand's Personal Data Protection Act (PDPA). We share them only with the venue handling that booking, never use them for marketing, and delete them " + P.retentionDays + " days after your appointment. You can withdraw consent at any time.</p>" +
        "<h2>Who receives your data</h2><p>The venue you book with and our payment provider. We never sell your personal data.</p>" +
        "<h2>Your rights</h2><ul><li>See, correct or delete your data.</li><li>Withdraw consent for health details.</li><li>Complain to Thailand's Personal Data Protection Committee.</li></ul>" +
        "<h2>In this demo</h2><p>Sample bookings are kept only in your browser (local storage). Nothing is sent to a server, and health details are not saved with bookings. You can clear the data from the venue dashboard (demo).</p>";
    return { title: th ? "นโยบายความเป็นส่วนตัว" : "Privacy policy", lead: th ? "วิธีที่เราดูแลข้อมูลส่วนบุคคลและข้อมูลสุขภาพของคุณ" : "How we handle your personal and health information.", html: '<div class="s-prose">' + body + "</div>" };
  }

  /* Contact page: details + a demo form (checked in the browser, nothing is sent). */
  var form = { name: "", email: "", topic: "booking", message: "", ref: "", sent: false, tried: false };
  function contactText(lang) {
    return lang === "th" ? {
      title: "ติดต่อเรา", lead: "ทีมงานพร้อมช่วยทุกวัน 09:00–21:00 น. (เวลาประเทศไทย)",
      email: "อีเมล", phone: "โทรศัพท์", line: "LINE Official", hours: "เวลาทำการ", hoursV: "ทุกวัน 09:00–21:00 น.", reply: "ตอบกลับภายใน 24 ชั่วโมง",
      formTitle: "ส่งข้อความถึงเรา", fName: "ชื่อ", fEmail: "อีเมล", fTopic: "เรื่อง", fRef: "เลขอ้างอิงการจอง", fMsg: "ข้อความ",
      topics: [["booking", "การจอง"], ["payment", "การชำระเงิน"], ["cancel", "การเปลี่ยนแปลง / ยกเลิก"], ["venue", "สนใจเป็นสถานที่พาร์ตเนอร์"], ["other", "อื่น ๆ"]],
      send: "ส่งข้อความ", eName: "กรอกชื่อของคุณ", eEmail: "กรอกอีเมลให้ครบ เช่น name@example.com", eMsg: "เขียนข้อความอย่างน้อย 10 ตัวอักษร",
      sentTitle: "ส่งข้อความแล้ว (เดโม)", sentBody: "ในเว็บไซต์จริง ทีมงานจะตอบกลับทางอีเมลภายใน 24 ชั่วโมง ในเดโมนี้ไม่มีการส่งข้อความจริง", again: "ส่งข้อความอื่น", optional: "ไม่บังคับ"
    } : {
      title: "Contact us", lead: "Our team is here every day, 09:00–21:00 (Thailand time).",
      email: "Email", phone: "Phone", line: "LINE Official", hours: "Opening hours", hoursV: "Every day, 09:00–21:00", reply: "We reply within 24 hours",
      formTitle: "Send us a message", fName: "Name", fEmail: "Email", fTopic: "Topic", fRef: "Booking reference", fMsg: "Message",
      topics: [["booking", "A booking"], ["payment", "Payment"], ["cancel", "Changes / cancellation"], ["venue", "Becoming a partner venue"], ["other", "Something else"]],
      send: "Send message", eName: "Enter your name", eEmail: "Enter a full email address, like name@example.com", eMsg: "Write at least 10 characters",
      sentTitle: "Message sent (demo)", sentBody: "On a live site our team would reply by email within 24 hours. In this demo nothing is actually sent.", again: "Send another message", optional: "optional"
    };
  }
  function contactErrors(t) {
    return { name: form.name.trim() ? "" : t.eName, email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()) ? "" : t.eEmail, message: form.message.trim().length >= 10 ? "" : t.eMsg };
  }
  function contactView(lang) {
    var t = contactText(lang), e = form.tried ? contactErrors(t) : {};
    var item = function (ico, label, value, sub) {
      return '<div class="s-contact-item"><span class="s-icon-tile" style="width: 44px; height: 44px; flex: none;">' + icon(ico) + "</span><div><strong>" + esc(label) + "</strong>" +
        '<span style="display: block; color: var(--ink-2); font-size: 15px;">' + esc(value) + "</span>" + (sub ? "<span>" + esc(sub) + "</span>" : "") + "</div></div>";
    };
    var html = '<div class="s-contact-grid">' +
      item("globe", t.email, "support@wellnesspass.example", t.reply) + item("user", t.phone, "+66 2 000 0000", t.hoursV) +
      item("sparkle", t.line, "@wellnesspass (sample)", t.reply) + item("clock", t.hours, t.hoursV, "") + "</div>" +
      '<section class="s-card s-form" aria-labelledby="cf-title"><h2 id="cf-title" class="s-sec-title">' + esc(t.formTitle) + "</h2>" +
      (form.sent
        ? UI.notice({ tone: "success", title: t.sentTitle }, esc(t.sentBody)) + '<div>' + UI.button({ label: t.again, variant: "ghost", size: "sm", action: "again" }) + "</div>"
        : '<form class="s-form" data-submit="send" novalidate>' +
            '<div class="s-field-grid">' +
              UI.textField({ id: "cf-name", input: "name", label: t.fName, required: true, value: form.name, autocomplete: "name", error: e.name }) +
              UI.textField({ id: "cf-email", input: "email", label: t.fEmail, required: true, type: "email", value: form.email, autocomplete: "email", error: e.email }) +
              '<div class="wp-field"><label class="wp-label" for="cf-topic">' + esc(t.fTopic) + "</label>" +
                '<select id="cf-topic" class="s-input" data-input="topic">' + t.topics.map(function (o) {
                  return '<option value="' + o[0] + '"' + (form.topic === o[0] ? " selected" : "") + ">" + esc(o[1]) + "</option>";
                }).join("") + "</select></div>" +
              UI.textField({ id: "cf-ref", input: "ref", label: t.fRef, optional: t.optional, value: form.ref, placeholder: "WP-AB12CD" }) +
            "</div>" +
            '<div class="wp-field" style="max-width: none;"><label class="wp-label wp-label-req" for="cf-msg">' + esc(t.fMsg) + "</label>" +
              '<textarea id="cf-msg" class="s-input" data-input="message"' + (e.message ? ' aria-invalid="true" aria-describedby="cf-msg-err"' : "") + ">" + esc(form.message) + "</textarea>" +
              (e.message ? '<span id="cf-msg-err" class="wp-error" role="alert">' + icon("alert") + esc(e.message) + "</span>" : "") + "</div>" +
            "<div>" + UI.button({ label: t.send, type: "submit", arrow: true }) + "</div>" +
          "</form>") +
      "</section>";
    return { title: t.title, lead: t.lead, html: html };
  }

  var VIEWS = { faq: faqView, policy: policyView, terms: termsView, privacy: privacyView, contact: contactView };

  WP.page({
    active: null,
    view: function (lang) {
      var c = COMMON[lang], v = (VIEWS[PAGE] || faqView)(lang);
      document.title = v.title + " · Wellness Pass";
      return '<main id="main-content">' + WP.pageHero(c.eyebrow, v.title, v.lead) +
        '<div class="s-shell s-page-main"><div class="s-info-layout">' +
          '<nav class="s-info-nav" aria-label="' + esc(c.navAria) + '">' + NAV.map(function (n) {
            return '<a href="' + n.id + '.html"' + (n.id === PAGE ? ' aria-current="page"' : "") + ">" + icon(n.icon) + esc(n[lang]) + "</a>";
          }).join("") + "</nav>" +
          "<div>" + (PAGE === "contact" || PAGE === "faq" ? "" : '<p class="s-updated">' + esc(c.updated) + "</p>") + v.html + "</div>" +
        "</div></div></main>";
    },
    actions: {
      again: function () { form = { name: form.name, email: form.email, topic: "booking", message: "", ref: "", sent: false, tried: false }; }
    },
    inputs: {
      name: function (v, el) { form.name = v; if (form.tried) WP.fieldError(el, contactErrors(contactText(WP.getLang())).name); return false; },
      email: function (v, el, e) { form.email = v; if (form.tried || e.type === "change") WP.fieldError(el, contactErrors(contactText(WP.getLang())).email); return false; },
      topic: function (v) { form.topic = v; return false; },
      ref: function (v) { form.ref = v; return false; },
      message: function (v) { form.message = v; return false; }
    },
    submits: {
      send: function () {
        form.tried = true;
        var errs = contactErrors(contactText(WP.getLang()));
        if (errs.name || errs.email || errs.message) return;   // redraw shows the errors
        form.sent = true;
        WP.toast(WP.getLang() === "th" ? "ส่งข้อความแล้ว (เดโม)" : "Message sent (demo)");
      }
    }
  });
})();
