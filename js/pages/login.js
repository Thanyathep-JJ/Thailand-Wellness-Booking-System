/* Wellness Pass: Log in / Sign up (login.html).
   Demo accounts saved in this browser (see WP.auth in common.js). Booking without an account still works;
   an account fills in the booking form and keeps all bookings in one place.
   URL options: ?tab=signup  ?email=...  ?need=admin|user (why the person was sent here)  ?next=<page to return to> */
(function () {
  "use strict";
  var UI = window.UI, WP = window.WP, esc = UI.esc, icon = UI.icon, A = WP.auth;

  var TEXT = {
    th: {
      eyebrow: "WELLNESS PASS · บัญชี", tabLogin: "เข้าสู่ระบบ", tabSignup: "สมัครสมาชิก", tabsAria: "เข้าสู่ระบบหรือสมัครสมาชิก",
      loginTitle: "ยินดีต้อนรับกลับมา", loginLead: "เข้าสู่ระบบเพื่อจองได้เร็วขึ้นและดูการจองทั้งหมดในที่เดียว",
      signupTitle: "สร้างบัญชีใหม่", signupLead: "ใช้เวลาไม่ถึงหนึ่งนาที การจองที่ทำไว้ด้วยอีเมลนี้จะถูกเพิ่มเข้าบัญชีให้อัตโนมัติ",
      email: "อีเมล", password: "รหัสผ่าน", pwHint: "อย่างน้อย 8 ตัวอักษร มีทั้งตัวอักษรและตัวเลข", confirm: "ยืนยันรหัสผ่าน",
      first: "ชื่อ", last: "นามสกุล", phone: "เบอร์โทรศัพท์", optional: "ไม่บังคับ", show: "แสดง", hide: "ซ่อน",
      remember: "จดจำฉันไว้ในเบราว์เซอร์นี้", forgot: "ลืมรหัสผ่าน?", login: "เข้าสู่ระบบ", signup: "สร้างบัญชี",
      terms: "ฉันยอมรับข้อกำหนดการใช้งานและนโยบายความเป็นส่วนตัว", or: "หรือ", google: "ดำเนินการต่อด้วย Google", line: "ดำเนินการต่อด้วย LINE",
      socialDemo: "การเข้าสู่ระบบด้วยบัญชีโซเชียลยังไม่เชื่อมต่อในเดโมนี้ ลองใช้บัญชีเดโมด้านล่าง",
      demoTitle: "บัญชีเดโม", demoLead: "กดเพื่อกรอกข้อมูลให้อัตโนมัติ", demoCustomer: "ลูกค้า", demoAdmin: "ผู้ดูแลระบบ",
      guest: "ไม่อยากสมัคร? คุณยังจองแบบไม่ต้องมีบัญชีได้", guestLink: "ดูทรีตเมนต์",
      noAcct: "ยังไม่มีบัญชี?", haveAcct: "มีบัญชีอยู่แล้ว?",
      eEmail: "กรอกอีเมลให้ครบ เช่น name@example.com", ePw: "กรอกรหัสผ่าน", eNoUser: "ไม่พบบัญชีที่ใช้อีเมลนี้ ลองสมัครสมาชิก", eBadPw: "รหัสผ่านไม่ถูกต้อง",
      eFirst: "กรอกชื่อ", eLast: "กรอกนามสกุล", eWeak: "ใช้อย่างน้อย 8 ตัวอักษร มีทั้งตัวอักษรและตัวเลข", eMatch: "รหัสผ่านทั้งสองช่องไม่ตรงกัน",
      eExists: "อีเมลนี้มีบัญชีอยู่แล้ว ลองเข้าสู่ระบบ", eTerms: "โปรดยอมรับข้อกำหนดก่อนสร้างบัญชี", eNotAdmin: "บัญชีนี้ไม่ใช่ผู้ดูแลระบบ ลองใช้ admin@demo.com",
      needAdminTitle: "สำหรับผู้ดูแลระบบเท่านั้น", needAdmin: "เข้าสู่ระบบด้วยบัญชีผู้ดูแลเพื่อเปิดแดชบอร์ด",
      needUserTitle: "โปรดเข้าสู่ระบบ", needUser: "เข้าสู่ระบบเพื่อดูหน้านี้",
      already: function (n) { return "คุณเข้าสู่ระบบเป็น " + n + " อยู่แล้ว"; }, cont: "ไปต่อ", switchAcct: "ออกจากระบบและเปลี่ยนบัญชี",
      wrongRole: "บัญชีที่เข้าสู่ระบบอยู่ไม่ใช่ผู้ดูแลระบบ ออกจากระบบแล้วเข้าด้วยบัญชีผู้ดูแล",
      welcome: function (n) { return "ยินดีต้อนรับ " + n; }, created: function (n) { return "สร้างบัญชีแล้ว ยินดีต้อนรับ " + n; },
      claimed: function (n) { return " · เพิ่มการจองเดิม " + n + " รายการเข้าบัญชีแล้ว"; },
      fTitle: "ลืมรหัสผ่าน", fBody: "ในระบบจริง เราจะส่งลิงก์ตั้งรหัสผ่านใหม่ไปที่อีเมลของคุณ ในเดโมนี้ไม่มีการส่งอีเมล ลองใช้บัญชีเดโม: guest@demo.com / demo1234", fOk: "เข้าใจแล้ว",
      sideTitle: "บัญชีเดียว ดูแลทุกการจอง", b1: "กรอกข้อมูลการจองให้อัตโนมัติ", b2: "ดูและยกเลิกการจองได้ในที่เดียว", b3: "เก็บทรีตเมนต์ที่ชอบไว้ดูภายหลัง",
      demoNote: "เดโม: บัญชีถูกบันทึกในเบราว์เซอร์นี้เท่านั้น อย่าใช้รหัสผ่านจริง"
    },
    en: {
      eyebrow: "WELLNESS PASS · ACCOUNT", tabLogin: "Log in", tabSignup: "Sign up", tabsAria: "Log in or sign up",
      loginTitle: "Welcome back", loginLead: "Log in to book faster and see all your bookings in one place.",
      signupTitle: "Create your account", signupLead: "It takes under a minute. Bookings you made with this email are added to your account.",
      email: "Email", password: "Password", pwHint: "At least 8 characters, with letters and numbers", confirm: "Confirm password",
      first: "First name", last: "Last name", phone: "Phone", optional: "optional", show: "Show", hide: "Hide",
      remember: "Remember me on this browser", forgot: "Forgot password?", login: "Log in", signup: "Create account",
      terms: "I agree to the Terms of use and Privacy policy", or: "or", google: "Continue with Google", line: "Continue with LINE",
      socialDemo: "Social login isn't connected in this demo. Try a demo account below.",
      demoTitle: "Demo accounts", demoLead: "Tap one to fill in the form", demoCustomer: "Customer", demoAdmin: "Admin",
      guest: "Don't want an account? You can still book as a guest.", guestLink: "Browse treatments",
      noAcct: "New to Wellness Pass?", haveAcct: "Already have an account?",
      eEmail: "Enter a full email address, like name@example.com", ePw: "Enter your password", eNoUser: "No account uses this email. Try signing up.", eBadPw: "That password isn't right",
      eFirst: "Enter your first name", eLast: "Enter your last name", eWeak: "Use at least 8 characters, with letters and numbers", eMatch: "The passwords don't match",
      eExists: "This email already has an account. Try logging in.", eTerms: "Please accept the terms to create an account", eNotAdmin: "This account isn't an admin. Try admin@demo.com",
      needAdminTitle: "Admin only", needAdmin: "Log in with an admin account to open the dashboard.",
      needUserTitle: "Please log in", needUser: "Log in to see this page.",
      already: function (n) { return "You're logged in as " + n; }, cont: "Continue", switchAcct: "Log out and switch account",
      wrongRole: "The account you're logged in with isn't an admin. Log out, then log in with an admin account.",
      welcome: function (n) { return "Welcome back, " + n; }, created: function (n) { return "Account created. Welcome, " + n; },
      claimed: function (n) { return " · " + n + (n === 1 ? " earlier booking" : " earlier bookings") + " added to your account"; },
      fTitle: "Forgot password", fBody: "On a live site we would email you a link to set a new password. This demo doesn't send emails. Try a demo account: guest@demo.com / demo1234", fOk: "Got it",
      sideTitle: "One account for every booking", b1: "Your booking details filled in for you", b2: "See and cancel bookings in one place", b3: "Keep the treatments you like for later",
      demoNote: "Demo: accounts are saved in this browser only. Don't use a real password."
    }
  };

  var need = WP.param("need");
  var next = WP.param("next") || "";
  /* Only allow going back to one of our own pages (stops the link sending people to another site). */
  if (!/^(\.\.\/index\.html(#[\w-]*)?|[a-z]+\.html(\?[\w=&%.\-]*)?)$/.test(next) || next.indexOf("login.html") === 0) next = "";

  var state = {
    tab: WP.param("tab") === "signup" ? "signup" : "login", show: {}, errors: {}, remember: true, terms: false,
    l: { email: WP.param("email") || "", pw: "" },
    s: { first: "", last: "", email: WP.param("email") || "", phone: "", pw: "", pw2: "" }
  };

  function emailOk(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((v || "").trim()); }
  function strongOk(v) { return (v || "").length >= 8 && /[A-Za-z]/.test(v) && /\d/.test(v); }

  function goAfter(u, msg) {
    WP.set({ flash: msg });
    var dest = next || (u.role === "admin" ? "admin.html" : "account.html");
    if (need === "admin" && u.role !== "admin") dest = "account.html";
    location.href = dest;
  }

  function pw(id, key, label, value, t, extra) {
    return UI.passwordField(Object.assign({ id: id, input: key, label: label, value: value, shown: !!state.show[id], showLabel: t.show, hideLabel: t.hide,
      error: state.errors[key] }, extra || {}));
  }

  function loginForm(t) {
    return '<form class="s-auth-form" data-submit="login" novalidate>' +
      UI.textField({ id: "li-email", input: "l.email", label: t.email, type: "email", value: state.l.email, autocomplete: "username", error: state.errors["l.email"], required: true }) +
      pw("li-pw", "l.pw", t.password, state.l.pw, t, { autocomplete: "current-password", required: true }) +
      '<div class="s-auth-row">' + UI.consentCheck({ id: "li-remember", label: t.remember, checked: state.remember, input: "remember", cls: "s-auth-check" }) +
        '<button type="button" class="s-linkbtn" data-action="forgot">' + esc(t.forgot) + "</button></div>" +
      UI.button({ label: t.login, type: "submit", cls: "s-auth-submit" }) +
      "</form>";
  }
  function signupForm(t) {
    return '<form class="s-auth-form" data-submit="signup" novalidate>' +
      '<div class="s-auth-2">' +
        UI.textField({ id: "su-first", input: "s.first", label: t.first, value: state.s.first, autocomplete: "given-name", error: state.errors["s.first"], required: true }) +
        UI.textField({ id: "su-last", input: "s.last", label: t.last, value: state.s.last, autocomplete: "family-name", error: state.errors["s.last"], required: true }) +
      "</div>" +
      UI.textField({ id: "su-email", input: "s.email", label: t.email, type: "email", value: state.s.email, autocomplete: "email", error: state.errors["s.email"], required: true }) +
      UI.textField({ id: "su-phone", input: "s.phone", label: t.phone, optional: t.optional, type: "tel", value: state.s.phone, autocomplete: "tel", placeholder: "+66 81 234 5678" }) +
      pw("su-pw", "s.pw", t.password, state.s.pw, t, { autocomplete: "new-password", hint: t.pwHint, required: true }) +
      pw("su-pw2", "s.pw2", t.confirm, state.s.pw2, t, { autocomplete: "new-password", required: true }) +
      UI.consentCheck({ id: "su-terms", label: t.terms, checked: state.terms, input: "terms", required: true, invalid: !!state.errors.terms, cls: "s-auth-check" }) +
      (state.errors.terms ? '<span class="wp-error" role="alert">' + icon("alert") + esc(state.errors.terms) + "</span>" : "") +
      UI.button({ label: t.signup, type: "submit", cls: "s-auth-submit" }) +
      "</form>";
  }

  function demoTiles(t) {
    return '<div class="s-demo-accts"><p class="s-demo-head"><strong>' + esc(t.demoTitle) + "</strong> · " + esc(t.demoLead) + "</p>" +
      '<div class="s-demo-grid">' + A.demo.map(function (d, i) {
        var admin = d.role === "admin";
        return '<button type="button" class="s-demo-acct' + (admin ? " is-admin" : "") + '" data-action="useDemo" data-arg="' + i + '">' +
          '<span class="s-demo-ico">' + icon(admin ? "shield" : "user") + "</span>" +
          '<span><strong>' + esc(admin ? t.demoAdmin : t.demoCustomer) + "</strong><span>" + esc(d.email) + "</span><span>" + esc(d.pw) + "</span></span></button>";
      }).join("") + "</div></div>";
  }

  function social(t) {
    return '<div class="s-auth-or"><span>' + esc(t.or) + "</span></div>" +
      '<div class="s-social">' +
        '<button type="button" class="s-social-btn" data-action="social"><span class="s-social-mark is-g" aria-hidden="true">G</span>' + esc(t.google) + "</button>" +
        '<button type="button" class="s-social-btn" data-action="social"><span class="s-social-mark is-line" aria-hidden="true">LINE</span>' + esc(t.line) + "</button>" +
      "</div>";
  }

  function alreadyCard(t, u) {
    var wrong = need === "admin" && u.role !== "admin";
    return '<div class="s-auth-already">' +
      '<span class="s-avatar s-avatar-xl' + (u.role === "admin" ? " is-admin" : "") + '" aria-hidden="true">' + A.avatarImg(u) + "</span>" +
      '<h1 class="s-auth-title">' + esc(t.already(u.first + " " + u.last)) + "</h1>" +
      '<p class="s-small" style="margin: 0;">' + esc(u.email) + "</p>" +
      (wrong ? UI.notice({ tone: "notice", title: t.needAdminTitle }, esc(t.wrongRole)) : "") +
      '<div class="s-btn-row" style="justify-content: center;">' +
        (wrong ? "" : UI.button({ label: t.cont, arrow: true, href: next || (u.role === "admin" ? "admin.html" : "account.html") })) +
        UI.button({ label: t.switchAcct, variant: wrong ? "primary" : "ghost", action: "switch" }) + "</div></div>";
  }

  var page = WP.page({
    active: "login",
    view: function (lang) {
      var t = TEXT[lang], u = A.current(), signup = state.tab === "signup";
      var needBox = need === "admin" ? UI.notice({ tone: "notice", title: t.needAdminTitle, cls: "s-auth-need" }, esc(t.needAdmin))
        : need === "user" ? UI.notice({ tone: "info", title: t.needUserTitle, cls: "s-auth-need" }, esc(t.needUser)) : "";
      var main = u ? alreadyCard(t, u) :
        needBox +
        '<div class="s-auth-tabs" role="tablist" aria-label="' + esc(t.tabsAria) + '">' +
          '<button type="button" role="tab" id="tab-login" aria-selected="' + !signup + '" aria-controls="auth-panel" data-action="tab" data-arg="login">' + esc(t.tabLogin) + "</button>" +
          '<button type="button" role="tab" id="tab-signup" aria-selected="' + signup + '" aria-controls="auth-panel" data-action="tab" data-arg="signup">' + esc(t.tabSignup) + "</button></div>" +
        '<div id="auth-panel" role="tabpanel" aria-labelledby="' + (signup ? "tab-signup" : "tab-login") + '" class="s-auth-panel">' +
          '<div><h1 class="s-auth-title">' + esc(signup ? t.signupTitle : t.loginTitle) + '</h1><p class="s-small" style="margin: 0;">' + esc(signup ? t.signupLead : t.loginLead) + "</p></div>" +
          (signup ? signupForm(t) : loginForm(t)) +
          social(t) +
          (signup ? "" : demoTiles(t)) +
          '<p class="s-auth-switch">' + esc(signup ? t.haveAcct : t.noAcct) + ' <button type="button" class="s-linkbtn" data-action="tab" data-arg="' + (signup ? "login" : "signup") + '">' +
            esc(signup ? t.tabLogin : t.tabSignup) + "</button></p>" +
        "</div>";
      return '<main id="main-content" class="s-auth-page"><div class="s-shell"><div class="s-auth">' +
        '<aside class="s-auth-side s-dark" aria-hidden="true">' +
          '<img class="s-auth-photo' + (signup ? " is-signup" : "") + '" src="' + esc(signup ? window.WPData.photos.signup : window.WPData.photos.login) + '" alt="" width="1050" height="1400">' +
          '<div class="s-auth-side-in"><p class="s-eyebrow">' + esc(t.eyebrow) + "</p>" +
            '<p class="s-auth-side-title">' + esc(t.sideTitle) + "</p>" +
            '<ul class="s-auth-benefits"><li>' + icon("sparkle") + esc(t.b1) + "</li><li>" + icon("calendar") + esc(t.b2) + "</li><li>" + icon("heart") + esc(t.b3) + "</li></ul></div>" +
        "</aside>" +
        '<section class="s-auth-card">' + main +
          '<p class="s-auth-foot">' + icon("lock") + esc(t.demoNote) + "</p>" +
          (u ? "" : '<p class="s-auth-foot">' + esc(t.guest) + ' <a href="treatments.html">' + esc(t.guestLink) + "</a></p>") +
        "</section></div></div></main>";
    },
    onAuthChange: function () {},
    actions: {
      tab: function (tab) { state.tab = tab; state.errors = {}; },
      togglePw: function (id) { state.show[id] = !state.show[id]; },
      forgot: function () {
        var t = TEXT[WP.getLang()];
        WP.dialog({ title: t.fTitle, html: "<p>" + esc(t.fBody) + "</p>", actions: [{ label: t.fOk }] });
        return false;
      },
      social: function () { WP.toast(TEXT[WP.getLang()].socialDemo); return false; },
      useDemo: function (i) {
        var d = A.demo[Number(i)];
        state.tab = "login"; state.errors = {}; state.l.email = d.email; state.l.pw = d.pw;
        setTimeout(function () { var b = document.querySelector(".s-auth-submit"); if (b) b.focus(); }, 0);
      },
      "switch": function () { A.logout(); }
    },
    inputs: {
      "l.email": function (v) { state.l.email = v; return false; },
      "l.pw": function (v) { state.l.pw = v; return false; },
      "s.first": function (v) { state.s.first = v; return false; },
      "s.last": function (v) { state.s.last = v; return false; },
      "s.email": function (v) { state.s.email = v; return false; },
      "s.phone": function (v) { state.s.phone = v; return false; },
      "s.pw": function (v) { state.s.pw = v; return false; },
      "s.pw2": function (v) { state.s.pw2 = v; return false; },
      remember: function (v) { state.remember = v; return false; },
      terms: function (v) { state.terms = v; return false; }
    },
    submits: {
      login: function () {
        var t = TEXT[WP.getLang()], e = {};
        if (!emailOk(state.l.email)) e["l.email"] = t.eEmail;
        if (!state.l.pw) e["l.pw"] = t.ePw;
        state.errors = e;
        if (Object.keys(e).length) return focusError();
        var before = WP.bookings.all().filter(function (b) { return b.account; }).length;
        var r = A.login(state.l.email, state.l.pw, state.remember);
        if (!r.ok) { state.errors = r.error === "nouser" ? { "l.email": t.eNoUser } : { "l.pw": t.eBadPw }; return focusError(); }
        if (need === "admin" && r.user.role !== "admin") { A.logout(); state.errors = { "l.email": t.eNotAdmin }; return focusError(); }
        var added = WP.bookings.all().filter(function (b) { return b.account; }).length - before;
        goAfter(r.user, t.welcome(r.user.first) + (added > 0 ? t.claimed(added) : ""));
        return false;
      },
      signup: function () {
        var t = TEXT[WP.getLang()], s = state.s, e = {};
        if (!s.first.trim()) e["s.first"] = t.eFirst;
        if (!s.last.trim()) e["s.last"] = t.eLast;
        if (!emailOk(s.email)) e["s.email"] = t.eEmail;
        if (!strongOk(s.pw)) e["s.pw"] = t.eWeak;
        if (s.pw2 !== s.pw) e["s.pw2"] = t.eMatch;
        if (!state.terms) e.terms = t.eTerms;
        state.errors = e;
        if (Object.keys(e).length) return focusError();
        var r = A.signup({ first: s.first, last: s.last, email: s.email, phone: s.phone, pw: s.pw }, state.remember);
        if (!r.ok) { state.errors = { "s.email": t.eExists }; return focusError(); }
        var added = A.bookingsOf(r.user).length;
        goAfter(r.user, t.created(r.user.first) + (added ? t.claimed(added) : ""));
        return false;
      }
    }
  });

  /* After a failed submit: redraw, then move focus to the first field with an error. */
  function focusError() {
    page.render();
    var el = document.querySelector('.s-auth-form [aria-invalid="true"]');
    if (el) el.focus();
    return false;
  }
})();
