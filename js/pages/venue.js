/* Wellness Pass: Venue dashboard (venue.html), a demo of the venue side.
   Shows every booking saved in this browser. Venues confirm or decline "request to book" bookings; the guest sees
   the new status in My bookings. Sample bookings can be added for a quick demo. */
(function () {
  "use strict";
  var D = window.WPData, UI = window.UI, WP = window.WP, esc = UI.esc, icon = UI.icon;

  var TEXT = {
    th: {
      eyebrow: "VENUE DASHBOARD · เดโม", title: "แดชบอร์ดสถานที่", lead: "จำลองฝั่งสถานที่ ยืนยันหรือปฏิเสธคำขอจอง แล้วดูผลที่หน้า “การจองของฉัน”",
      demoTitle: "หน้านี้เป็นเดโม", demoBody: "ในระบบจริง แต่ละสถานที่จะเข้าสู่ระบบและเห็นเฉพาะการจองของตัวเอง หน้านี้แสดงทุกการจองที่บันทึกในเบราว์เซอร์นี้",
      sPending: "คำขอรอยืนยัน", sConfirmed: "ยืนยันแล้ว (กำลังจะมาถึง)", sRevenue: "ยอดจองที่ยืนยันแล้ว", sClosed: "ยกเลิก / ปฏิเสธ",
      fAll: "ทั้งหมด", fPending: "รอยืนยัน", fConfirmed: "ยืนยันแล้ว", fClosed: "ยกเลิก / ปฏิเสธ", filterAria: "กรองตามสถานะ",
      addSample: "เพิ่มการจองตัวอย่าง", reset: "ล้างข้อมูลเดโม", added: "เพิ่มการจองตัวอย่าง 5 รายการแล้ว", resetDone: "ล้างข้อมูลเดโมแล้ว",
      thGuest: "ผู้จอง", thTreat: "ทรีตเมนต์", thWhen: "วันและเวลา", thGuests: "ผู้เข้าร่วม", thTotal: "ยอดรวม", thStatus: "สถานะ", thAction: "จัดการ",
      confirm: "ยืนยัน", decline: "ปฏิเสธ", confirmed: "ยืนยันการจองแล้ว ผู้จองจะเห็นสถานะใหม่", declined: "ปฏิเสธการจองแล้ว",
      dTitle: "ปฏิเสธคำขอนี้?", dBody: "ผู้จองจะได้รับแจ้งและไม่ถูกเรียกเก็บเงิน", dYes: "ปฏิเสธคำขอ", dNo: "ยกเลิก",
      rTitle: "ล้างข้อมูลเดโมทั้งหมด?", rBody: "การจองทั้งหมดที่บันทึกในเบราว์เซอร์นี้จะถูกลบ รวมถึงการจองที่คุณทำเอง", rYes: "ล้างข้อมูล",
      emptyTitle: "ยังไม่มีการจอง", emptyBody: "ลองจองทรีตเมนต์ หรือเพิ่มการจองตัวอย่างเพื่อดูการทำงานของแดชบอร์ด", noMatch: "ไม่มีการจองในสถานะนี้",
      by: "จองเมื่อ"
    },
    en: {
      eyebrow: "VENUE DASHBOARD · DEMO", title: "Venue dashboard", lead: "See the venue side: confirm or decline booking requests, then check the result in My bookings.",
      demoTitle: "This page is a demo", demoBody: "On a live system each venue signs in and sees only its own bookings. This page shows every booking saved in this browser.",
      sPending: "Requests waiting", sConfirmed: "Upcoming confirmed", sRevenue: "Confirmed booking value", sClosed: "Cancelled / declined",
      fAll: "All", fPending: "Waiting", fConfirmed: "Confirmed", fClosed: "Cancelled / declined", filterAria: "Filter by status",
      addSample: "Add sample bookings", reset: "Reset demo data", added: "Added 5 sample bookings", resetDone: "Demo data cleared",
      thGuest: "Guest", thTreat: "Treatment", thWhen: "Date and time", thGuests: "Guests", thTotal: "Total", thStatus: "Status", thAction: "Actions",
      confirm: "Confirm", decline: "Decline", confirmed: "Booking confirmed. The guest now sees the new status.", declined: "Booking declined",
      dTitle: "Decline this request?", dBody: "The guest will be told and won't be charged.", dYes: "Decline request", dNo: "Cancel",
      rTitle: "Reset all demo data?", rBody: "Every booking saved in this browser will be deleted, including ones you made yourself.", rYes: "Reset data",
      emptyTitle: "No bookings yet", emptyBody: "Make a booking, or add sample bookings to see how the dashboard works.", noMatch: "No bookings with this status",
      by: "Booked"
    }
  };

  var state = { filter: "all" };

  function sampleBookings() {
    var people = [
      ["Emma", "Clarke", "emma.clarke@example.com", "in-hotel-aroma", 1, "19:30", 2, "pending", "card"],
      ["Kenji", "Sato", "kenji.sato@example.com", "doi-nature-retreat", 4, "07:00", 2, "pending", "promptpay"],
      ["Nicha", "Prasert", "nicha.p@example.com", "thai-traditional", 2, "15:00", 1, "confirmed", "promptpay"],
      ["Lucas", "Weber", "lucas.weber@example.com", "muay-thai", 6, "09:00", 1, "confirmed", "card"],
      ["Sophie", "Martin", "sophie.martin@example.com", "herbal-compress", 3, "13:30", 2, "cancelled", "card"]
    ];
    return people.map(function (p) {
      var tr = D.get(p[3]), dur = tr.options[0].min, total = D.priceFor(tr, dur) * p[6] + (tr.travelFee || 0);
      return { ref: WP.bookings.newRef(), createdAt: new Date(Date.now() - 3600000 * (2 + Math.random() * 30)).toISOString(), sample: true,
        status: p[7], request: !!tr.request, id: tr.id, dur: dur, date: D.isoFromIdx(p[4]), slot: p[5], guests: p[6], party: { a: p[6], s: 0, c: 0 },
        method: p[8], total: total, fee: tr.travelFee || 0, first: p[0], last: p[1], email: p[2], phone: "+66 81 000 0000", refundPct: p[7] === "cancelled" ? 100 : undefined };
    });
  }

  function matches(b) {
    if (state.filter === "pending") return b.status === "pending";
    if (state.filter === "confirmed") return b.status === "confirmed";
    if (state.filter === "closed") return b.status === "cancelled" || b.status === "declined";
    return true;
  }

  function row(b, lang, t) {
    var s = WP.bookingSummary(b, lang);
    var created = new Date(b.createdAt).toLocaleString(lang === "th" ? "th-TH" : "en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
    return "<tr>" +
      '<td class="s-td-main" data-label="' + esc(t.thGuest) + '"><strong>' + esc((b.first + " " + b.last).trim() || "-") + '</strong><span class="s-sub">' + esc(b.email || "") + "</span>" +
        '<span class="s-sub">' + esc(b.ref + " · " + t.by + " " + created) + "</span></td>" +
      '<td data-label="' + esc(t.thTreat) + '"><span><strong>' + esc(s.title) + '</strong><span class="s-sub">' + esc(s.venue) + "</span></span></td>" +
      '<td data-label="' + esc(t.thWhen) + '">' + esc(s.date) + '<span class="s-sub">' + esc(s.time + " · " + s.length) + "</span></td>" +
      '<td data-label="' + esc(t.thGuests) + '">' + esc(s.guestsLabel) + "</td>" +
      '<td class="s-num" data-label="' + esc(t.thTotal) + '">' + esc(D.baht(b.total)) + "</td>" +
      '<td data-label="' + esc(t.thStatus) + '">' + WP.statusBadge(b.status, lang) + "</td>" +
      '<td data-label="' + esc(t.thAction) + '">' + (b.status === "pending"
        ? '<div class="s-btn-row">' + UI.button({ label: t.confirm, size: "sm", action: "confirm", arg: b.ref }) +
          UI.button({ label: t.decline, variant: "danger", size: "sm", action: "decline", arg: b.ref }) + "</div>"
        : '<span class="s-sub">–</span>') + "</td>" +
      "</tr>";
  }

  var page = WP.page({
    active: null,
    view: function (lang) {
      var t = TEXT[lang], all = WP.bookings.all(), list = all.filter(matches);
      var upcoming = function (b) { return D.hoursUntil(b.date, b.slot) > 0; };
      var nPending = all.filter(function (b) { return b.status === "pending"; }).length;
      var confirmedUp = all.filter(function (b) { return b.status === "confirmed" && upcoming(b); });
      var revenue = all.filter(function (b) { return b.status === "confirmed"; }).reduce(function (a, b) { return a + b.total; }, 0);
      var closed = all.filter(function (b) { return b.status === "cancelled" || b.status === "declined"; }).length;
      var filters = [["all", t.fAll, all.length], ["pending", t.fPending, nPending], ["confirmed", t.fConfirmed, all.length - nPending - closed], ["closed", t.fClosed, closed]];
      var table = list.length
        ? '<div class="s-table-wrap"><table class="s-table"><thead><tr><th scope="col">' + esc(t.thGuest) + '</th><th scope="col">' + esc(t.thTreat) + '</th><th scope="col">' + esc(t.thWhen) +
          '</th><th scope="col">' + esc(t.thGuests) + '</th><th scope="col" class="s-num">' + esc(t.thTotal) + '</th><th scope="col">' + esc(t.thStatus) + '</th><th scope="col"><span class="s-sub">' + esc(t.thAction) + "</span></th></tr></thead>" +
          "<tbody>" + list.map(function (b) { return row(b, lang, t); }).join("") + "</tbody></table></div>"
        : '<div class="s-empty"><span class="s-icon-tile">' + icon("calendar") + '</span><h3 class="s-h3">' + esc(all.length ? t.noMatch : t.emptyTitle) + "</h3>" +
          (all.length ? "" : '<p style="margin: 0;">' + esc(t.emptyBody) + "</p>" + UI.button({ label: t.addSample, size: "sm", action: "addSample" })) + "</div>";
      return '<main id="main-content">' + WP.pageHero(t.eyebrow, t.title, t.lead) + '<div class="s-shell s-page-main">' +
        UI.notice({ tone: "info", title: t.demoTitle, cls: "s-wide-notice" }, esc(t.demoBody)) +
        '<div class="s-stats" style="margin-top: 24px;">' +
          '<div class="s-stat' + (nPending ? " is-alert" : "") + '"><strong>' + nPending + "</strong><span>" + esc(t.sPending) + "</span></div>" +
          '<div class="s-stat"><strong>' + confirmedUp.length + "</strong><span>" + esc(t.sConfirmed) + "</span></div>" +
          '<div class="s-stat"><strong>' + esc(D.baht(revenue)) + "</strong><span>" + esc(t.sRevenue) + "</span></div>" +
          '<div class="s-stat"><strong>' + closed + "</strong><span>" + esc(t.sClosed) + "</span></div></div>" +
        '<div class="s-toolbar-row"><div class="s-chips" role="group" aria-label="' + esc(t.filterAria) + '">' + filters.map(function (f) {
            return UI.chip({ label: f[1] + " (" + f[2] + ")", selected: state.filter === f[0], action: "filter", arg: f[0] });
          }).join("") + "</div>" +
          '<div class="s-btn-row">' + UI.button({ label: t.addSample, variant: "ghost", size: "sm", action: "addSample" }) +
            (all.length ? UI.button({ label: t.reset, variant: "danger", size: "sm", action: "reset" }) : "") + "</div></div>" +
        table + "</div></main>";
    },
    actions: {
      filter: function (f) { state.filter = f; },
      addSample: function () {
        var l = WP.bookings.all();
        WP.bookings.save(sampleBookings().concat(l));
        WP.toast(TEXT[WP.getLang()].added);
      },
      confirm: function (ref) { WP.bookings.update(ref, { status: "confirmed" }); WP.toast(TEXT[WP.getLang()].confirmed); },
      decline: function (ref) {
        var t = TEXT[WP.getLang()];
        WP.dialog({ title: t.dTitle, html: "<p>" + esc(t.dBody) + "</p>", actions: [{ label: t.dNo, variant: "ghost" }, { label: t.dYes, variant: "danger", value: "yes" }],
          onClose: function (v) { if (v === "yes") { WP.bookings.update(ref, { status: "declined" }); page.render(); WP.toast(t.declined); } } });
        return false;
      },
      reset: function () {
        var t = TEXT[WP.getLang()];
        WP.dialog({ title: t.rTitle, html: "<p>" + esc(t.rBody) + "</p>", actions: [{ label: t.dNo, variant: "ghost" }, { label: t.rYes, variant: "danger", value: "yes" }],
          onClose: function (v) { if (v === "yes") { WP.bookings.save([]); page.render(); WP.toast(t.resetDone); } } });
        return false;
      }
    }
  });
})();
