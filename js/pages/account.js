/* Wellness Pass: My account (account.html). Needs a login.
   Profile details, the account's bookings and saved treatments, language, password change and account deletion.
   Everything is saved in this browser (demo). */
(function () {
  "use strict";
  var D = window.WPData, UI = window.UI, WP = window.WP, esc = UI.esc, icon = UI.icon, A = WP.auth;

  var TEXT = {
    th: {
      eyebrow: "MY ACCOUNT · บัญชีของฉัน", hello: function (n) { return "สวัสดี " + n; },
      since: function (d) { return "เป็นสมาชิกตั้งแต่ " + d; }, navAria: "ส่วนต่าง ๆ ของบัญชี",
      nOverview: "ภาพรวม", nProfile: "ข้อมูลส่วนตัว", nBookings: "การจอง", nSaved: "รายการที่ชอบ", nSecurity: "ความปลอดภัย",
      sUpcoming: "การจองที่กำลังจะมาถึง", sPast: "ใช้บริการแล้ว", sSaved: "ทรีตเมนต์ที่ชอบ", sSpent: "ยอดใช้จ่ายรวม",
      profile: "ข้อมูลส่วนตัว", profileLead: "ใช้กรอกแบบฟอร์มการจองให้อัตโนมัติ", first: "ชื่อ (ภาษาอังกฤษ)", last: "นามสกุล (ภาษาอังกฤษ)", email: "อีเมล", phone: "เบอร์โทรศัพท์",
      lang: "ภาษาที่ใช้", save: "บันทึกการเปลี่ยนแปลง", saved: "บันทึกข้อมูลแล้ว",
      eFirst: "กรอกชื่อเป็นตัวอักษรภาษาอังกฤษ", eLast: "กรอกนามสกุลเป็นตัวอักษรภาษาอังกฤษ", eEmail: "กรอกอีเมลให้ครบ", eTaken: "อีเมลนี้มีบัญชีอื่นใช้อยู่แล้ว",
      bookings: "การจองของคุณ", upcoming: "กำลังจะมาถึง", past: "ที่ผ่านมา", noUpcoming: "ยังไม่มีการจองที่กำลังจะมาถึง", noPast: "ยังไม่มีประวัติการจอง",
      allBookings: "จัดการการจองทั้งหมด", book: "จองทรีตเมนต์",
      savedTitle: "ทรีตเมนต์ที่ชอบ", noSaved: "กดรูปหัวใจบนการ์ดทรีตเมนต์เพื่อเก็บไว้ที่นี่", allSaved: "ดูรายการที่ชอบทั้งหมด", from: "เริ่มต้น",
      security: "ความปลอดภัย", pwNow: "รหัสผ่านปัจจุบัน", pwNew: "รหัสผ่านใหม่", pwNew2: "ยืนยันรหัสผ่านใหม่", pwHint: "อย่างน้อย 8 ตัวอักษร มีทั้งตัวอักษรและตัวเลข",
      pwSave: "เปลี่ยนรหัสผ่าน", pwDemo: "บัญชีเดโมเปลี่ยนรหัสผ่านไม่ได้ เพื่อให้ทุกคนยังเข้าสู่ระบบได้", pwDone: "เปลี่ยนรหัสผ่านแล้ว", ePwNow: "รหัสผ่านปัจจุบันไม่ถูกต้อง", eWeak: "ใช้อย่างน้อย 8 ตัวอักษร มีทั้งตัวอักษรและตัวเลข", eMatch: "รหัสผ่านทั้งสองช่องไม่ตรงกัน",
      show: "แสดง", hide: "ซ่อน",
      danger: "ลบบัญชี", dangerLead: "ลบบัญชีและข้อมูลส่วนตัวออกจากเบราว์เซอร์นี้ การจองที่ทำไว้ยังค้นหาได้ด้วยเลขอ้างอิงและอีเมล",
      del: "ลบบัญชีของฉัน", delDemo: "บัญชีเดโมลบไม่ได้ ลองสมัครบัญชีใหม่เพื่อทดสอบการลบ",
      dTitle: "ลบบัญชีนี้?", dBody: "คุณจะออกจากระบบและบัญชีนี้จะถูกลบ ทำย้อนกลับไม่ได้", dYes: "ลบบัญชี", dNo: "ยกเลิก", deleted: "ลบบัญชีแล้ว",
      logout: "ออกจากระบบ", adminLink: "ไปที่แดชบอร์ดผู้ดูแล", roleAdmin: "ผู้ดูแลระบบ", roleCustomer: "สมาชิก"
    },
    en: {
      eyebrow: "MY ACCOUNT", hello: function (n) { return "Hello, " + n; },
      since: function (d) { return "Member since " + d; }, navAria: "Account sections",
      nOverview: "Overview", nProfile: "Profile", nBookings: "Bookings", nSaved: "Wishlist", nSecurity: "Security",
      sUpcoming: "Upcoming bookings", sPast: "Completed", sSaved: "Saved treatments", sSpent: "Total spent",
      profile: "Personal details", profileLead: "Used to fill in the booking form for you.", first: "First name (English letters)", last: "Last name (English letters)", email: "Email", phone: "Phone",
      lang: "Language", save: "Save changes", saved: "Your details are saved",
      eFirst: "Enter your first name in English letters", eLast: "Enter your last name in English letters", eEmail: "Enter a full email address", eTaken: "Another account already uses this email",
      bookings: "Your bookings", upcoming: "Upcoming", past: "Past", noUpcoming: "No upcoming bookings yet", noPast: "No past bookings yet",
      allBookings: "Manage all bookings", book: "Book a treatment",
      savedTitle: "Saved treatments", noSaved: "Tap the heart on a treatment card to keep it here.", allSaved: "See the whole wishlist", from: "from",
      security: "Security", pwNow: "Current password", pwNew: "New password", pwNew2: "Confirm new password", pwHint: "At least 8 characters, with letters and numbers",
      pwSave: "Change password", pwDemo: "Demo account passwords can't be changed, so everyone can still log in with them.", pwDone: "Password changed", ePwNow: "Your current password isn't right", eWeak: "Use at least 8 characters, with letters and numbers", eMatch: "The passwords don't match",
      show: "Show", hide: "Hide",
      danger: "Delete account", dangerLead: "Removes your account and personal details from this browser. Bookings you made can still be found with the reference and email.",
      del: "Delete my account", delDemo: "Demo accounts can't be deleted. Sign up a new account to try this.",
      dTitle: "Delete this account?", dBody: "You'll be logged out and the account will be deleted. This can't be undone.", dYes: "Delete account", dNo: "Cancel", deleted: "Account deleted",
      logout: "Log out", adminLink: "Go to the admin dashboard", roleAdmin: "Admin", roleCustomer: "Member"
    }
  };

  var me = A.current();
  var f = me ? { first: me.first, last: me.last, email: me.email, phone: me.phone || "" } : {};
  var pwf = { now: "", nw: "", nw2: "" };
  var state = { errors: {}, show: {}, tab: "upcoming" };

  function nameOk(v) { return /^[A-Za-z][A-Za-z' .-]*$/.test((v || "").trim()); }
  function emailOk(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((v || "").trim()); }

  function miniBooking(b, lang) {
    var s = WP.bookingSummary(b, lang), img = D.photos.byId[b.id];
    return '<a class="s-mini-bk" href="mybookings.html?ref=' + encodeURIComponent(b.ref) + '">' +
      '<span class="s-mini-thumb">' + (img ? '<img src="' + esc(img) + '" alt="" loading="lazy">' : "") + "</span>" +
      '<span class="s-mini-main"><strong>' + esc(s.title) + "</strong>" +
        '<span class="s-sub">' + icon("calendar") + esc(s.date + " · " + s.time) + "</span>" +
        '<span class="s-sub">' + esc(b.ref) + "</span></span>" +
      '<span class="s-mini-side">' + WP.statusBadge(b.status, lang) + "<strong>" + esc(D.baht(b.total)) + "</strong></span></a>";
  }

  var page = WP.page({
    active: "account",
    require: "user",
    view: function (lang) {
      var t = TEXT[lang];
      me = A.current();
      if (!me) return "<main id=\"main-content\"></main>";
      var admin = me.role === "admin", list = A.bookingsOf(me);
      var isUp = function (b) { return (b.status === "confirmed" || b.status === "pending") && D.hoursUntil(b.date, b.slot) > 0; };
      var up = list.filter(isUp).sort(function (a, b) { return D.hoursUntil(a.date, a.slot) - D.hoursUntil(b.date, b.slot); });
      var past = list.filter(function (b) { return !isUp(b); });
      var done = list.filter(function (b) { return b.status === "completed" || (b.status === "confirmed" && D.hoursUntil(b.date, b.slot) <= 0); });
      var spent = list.filter(function (b) { return b.status !== "declined" && b.status !== "pending"; })
        .reduce(function (a, b) { return a + (b.status === "cancelled" ? Math.round(b.total * (100 - (b.refundPct || 0)) / 100) : b.total); }, 0);
      var saved = WP.savedList();
      var since = new Date(me.createdAt).toLocaleDateString(lang === "th" ? "th-TH" : "en-GB", { month: "long", year: "numeric" });
      var showList = state.tab === "upcoming" ? up : past;

      var nav = [["acc-overview", "grid", t.nOverview], ["acc-profile", "user", t.nProfile], ["acc-bookings", "calendar", t.nBookings], ["acc-saved", "heart", t.nSaved], ["acc-security", "lock", t.nSecurity]];
      var aside = '<aside class="s-acc-side"><div class="s-card s-acc-id">' +
          '<span class="s-avatar s-avatar-xl' + (admin ? " is-admin" : "") + '" aria-hidden="true">' + A.avatarImg(me) + "</span>" +
          "<strong>" + esc(me.first + " " + me.last) + '</strong><span class="s-small">' + esc(me.email) + "</span>" +
          UI.badge(admin ? t.roleAdmin : t.roleCustomer, admin ? "notice" : "success", admin ? "shield" : "user") +
          '<nav class="s-acc-nav" aria-label="' + esc(t.navAria) + '">' + nav.map(function (n) {
            return '<a href="#' + n[0] + '">' + icon(n[1]) + "<span>" + esc(n[2]) + "</span></a>";
          }).join("") + "</nav>" +
          (admin ? UI.button({ label: t.adminLink, size: "sm", href: "admin.html", cls: "s-acc-wide" }) : "") +
          UI.button({ label: t.logout, variant: "ghost", size: "sm", action: "wp:logout", cls: "s-acc-wide" }) +
        "</div></aside>";

      var e = state.errors;
      var profile = '<section class="s-card s-acc-sec" id="acc-profile" aria-labelledby="h-profile">' +
          '<div><h2 id="h-profile" class="s-sec-title">' + esc(t.profile) + '</h2><p class="s-small" style="margin: 0;">' + esc(t.profileLead) + "</p></div>" +
          '<form class="s-acc-form" data-submit="profile" novalidate><div class="s-field-grid">' +
            UI.textField({ id: "ac-first", input: "first", label: t.first, value: f.first, error: e.first, autocomplete: "given-name", required: true }) +
            UI.textField({ id: "ac-last", input: "last", label: t.last, value: f.last, error: e.last, autocomplete: "family-name", required: true }) +
            UI.textField({ id: "ac-email", input: "email", label: t.email, type: "email", value: f.email, error: e.email, autocomplete: "email", required: true }) +
            UI.textField({ id: "ac-phone", input: "phone", label: t.phone, type: "tel", value: f.phone, autocomplete: "tel" }) +
          "</div>" +
          '<div class="s-filter-row" role="group" aria-label="' + esc(t.lang) + '"><span class="s-filter-label">' + esc(t.lang) + '</span><div class="s-chips">' +
            UI.chip({ label: "ไทย", selected: lang === "th", action: "prefLang", arg: "th" }) + UI.chip({ label: "English", selected: lang === "en", action: "prefLang", arg: "en" }) + "</div></div>" +
          '<div class="s-btn-row">' + UI.button({ label: t.save, type: "submit" }) + "</div></form></section>";

      var bookingsSec = '<section class="s-card s-acc-sec" id="acc-bookings" aria-labelledby="h-bookings">' +
          '<div class="s-acc-sec-head"><h2 id="h-bookings" class="s-sec-title">' + esc(t.bookings) + "</h2>" +
            '<div class="s-chips" role="group" aria-label="' + esc(t.bookings) + '">' +
              UI.chip({ label: t.upcoming + " (" + up.length + ")", selected: state.tab === "upcoming", action: "bkTab", arg: "upcoming" }) +
              UI.chip({ label: t.past + " (" + past.length + ")", selected: state.tab === "past", action: "bkTab", arg: "past" }) + "</div></div>" +
          (showList.length ? '<div class="s-mini-list">' + showList.slice(0, 5).map(function (b) { return miniBooking(b, lang); }).join("") + "</div>"
            : '<div class="s-empty s-empty-sm"><span class="s-icon-tile">' + icon("calendar") + '</span><p style="margin: 0;">' + esc(state.tab === "upcoming" ? t.noUpcoming : t.noPast) + "</p>" +
              UI.button({ label: t.book, size: "sm", arrow: true, href: "treatments.html" }) + "</div>") +
          (list.length ? '<div class="s-btn-row">' + UI.button({ label: t.allBookings, variant: "ghost", size: "sm", arrow: true, href: "mybookings.html" }) + "</div>" : "") +
        "</section>";

      var savedSec = '<section class="s-card s-acc-sec" id="acc-saved" aria-labelledby="h-saved">' +
          '<h2 id="h-saved" class="s-sec-title">' + esc(t.savedTitle) + "</h2>" +
          (saved.length ? '<div class="s-saved-mini">' + saved.slice(0, 4).map(function (id) {
              var tr = D.get(id), img = D.photos.byId[id];
              return '<a class="s-saved-item" href="detail.html?id=' + esc(id) + '"><span class="s-saved-img">' + (img ? '<img src="' + esc(img) + '" alt="" loading="lazy">' : "") + "</span>" +
                "<strong>" + esc(D.L(tr.title, lang)) + '</strong><span class="s-sub">' + esc(t.from + " " + D.baht(tr.options[0].price)) + "</span></a>";
            }).join("") + "</div>" + '<div class="s-btn-row">' + UI.button({ label: t.allSaved, variant: "ghost", size: "sm", arrow: true, href: "wishlist.html" }) + "</div>"
            : '<p class="s-small" style="margin: 0;">' + icon("heart") + " " + esc(t.noSaved) + "</p>") +
        "</section>";

      var pwOpts = function (id, key, label, extra) {
        return UI.passwordField(Object.assign({ id: id, input: key, label: label, value: pwf[key], shown: !!state.show[id], showLabel: t.show, hideLabel: t.hide, error: e[key] }, extra || {}));
      };
      var security = '<section class="s-card s-acc-sec" id="acc-security" aria-labelledby="h-security">' +
          '<h2 id="h-security" class="s-sec-title">' + esc(t.security) + "</h2>" +
          '<form class="s-acc-form" data-submit="password" novalidate>' +
            '<input type="text" name="username" autocomplete="username" value="' + esc(me.email) + '" hidden>' +
            pwOpts("ac-pw", "now", t.pwNow, { autocomplete: "current-password" }) +
            '<div class="s-field-grid">' + pwOpts("ac-pw1", "nw", t.pwNew, { autocomplete: "new-password", hint: t.pwHint }) + pwOpts("ac-pw2", "nw2", t.pwNew2, { autocomplete: "new-password" }) + "</div>" +
            '<div class="s-btn-row">' + UI.button({ label: t.pwSave, type: "submit", variant: "ghost" }) + "</div></form>" +
          '<div class="s-acc-danger"><div><strong>' + esc(t.danger) + '</strong><p class="s-small" style="margin: 0;">' + esc(me.demo ? t.delDemo : t.dangerLead) + "</p></div>" +
            UI.button({ label: t.del, variant: "danger", size: "sm", action: "deleteAcct", attrs: me.demo ? { disabled: true } : {} }) + "</div>" +
        "</section>";

      return '<main id="main-content">' + WP.pageHero(t.eyebrow, t.hello(me.first), t.since(since)) +
        '<div class="s-shell s-page-main"><div class="s-acc">' + aside +
          '<div class="s-acc-main">' +
            '<div class="s-stats" id="acc-overview">' +
              '<div class="s-stat"><strong>' + up.length + "</strong><span>" + esc(t.sUpcoming) + "</span></div>" +
              '<div class="s-stat"><strong>' + done.length + "</strong><span>" + esc(t.sPast) + "</span></div>" +
              '<div class="s-stat"><strong>' + saved.length + "</strong><span>" + esc(t.sSaved) + "</span></div>" +
              '<div class="s-stat"><strong>' + esc(D.baht(spent)) + "</strong><span>" + esc(t.sSpent) + "</span></div></div>" +
            bookingsSec + profile + savedSec + security +
          "</div></div></div></main>";
    },
    actions: {
      bkTab: function (tab) { state.tab = tab; },
      togglePw: function (id) { state.show[id] = !state.show[id]; },
      prefLang: function (l) { page.setLang(l); A.update(me.id, { lang: l }); },
      deleteAcct: function () {
        var t = TEXT[WP.getLang()];
        WP.dialog({ title: t.dTitle, html: "<p>" + esc(t.dBody) + "</p>", actions: [{ label: t.dNo, variant: "ghost" }, { label: t.dYes, variant: "danger", value: "yes" }],
          onClose: function (v) {
            if (v !== "yes") return;
            WP.bookings.save(WP.bookings.all().map(function (b) { if (b.account === me.id) delete b.account; return b; }));
            A.remove(me.id);
            WP.set({ flash: t.deleted });
            location.href = WP.url("index.html");
          } });
        return false;
      }
    },
    inputs: {
      first: function (v) { f.first = v; return false; },
      last: function (v) { f.last = v; return false; },
      email: function (v) { f.email = v; return false; },
      phone: function (v) { f.phone = v; return false; },
      now: function (v) { pwf.now = v; return false; },
      nw: function (v) { pwf.nw = v; return false; },
      nw2: function (v) { pwf.nw2 = v; return false; }
    },
    submits: {
      profile: function () {
        var t = TEXT[WP.getLang()], e = {}, other = A.byEmail(f.email);
        if (!nameOk(f.first)) e.first = t.eFirst;
        if (!nameOk(f.last)) e.last = t.eLast;
        if (!emailOk(f.email)) e.email = t.eEmail;
        else if (other && other.id !== me.id) e.email = t.eTaken;
        state.errors = e;
        if (Object.keys(e).length) return focusError();
        A.update(me.id, { first: f.first.trim(), last: f.last.trim(), email: f.email.trim().toLowerCase(), phone: f.phone.trim() });
        WP.toast(t.saved);
      },
      password: function () {
        var t = TEXT[WP.getLang()], e = {};
        if (me.demo) { WP.toast(t.pwDemo, "danger"); return false; }
        if (!A.checkPw(me, pwf.now)) e.now = t.ePwNow;
        if (pwf.nw.length < 8 || !/[A-Za-z]/.test(pwf.nw) || !/\d/.test(pwf.nw)) e.nw = t.eWeak;
        if (pwf.nw2 !== pwf.nw) e.nw2 = t.eMatch;
        state.errors = e;
        if (Object.keys(e).length) return focusError();
        A.setPw(me.id, pwf.nw);
        pwf = { now: "", nw: "", nw2: "" };
        WP.toast(t.pwDone);
      }
    }
  });

  function focusError() {
    page.render();
    var el = document.querySelector('.s-acc-form [aria-invalid="true"]');
    if (el) el.focus();
    return false;
  }
})();
