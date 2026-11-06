/* Wellness Pass: Wishlist (wishlist.html). Treatments saved with the heart button, kept in this browser. */
(function () {
  "use strict";
  var D = window.WPData, UI = window.UI, WP = window.WP, esc = UI.esc, icon = UI.icon;

  var TEXT = {
    th: { eyebrow: "WISHLIST · รายการที่ชอบ", title: "รายการที่ชอบ", lead: "ทรีตเมนต์ที่คุณกดหัวใจไว้ บันทึกไว้ในเบราว์เซอร์นี้",
      count: function (n) { return n + " ทรีตเมนต์ที่บันทึกไว้"; }, clear: "ล้างทั้งหมด", cleared: "ล้างรายการที่ชอบแล้ว",
      emptyTitle: "ยังไม่มีทรีตเมนต์ที่บันทึกไว้", emptyBody: "กดรูปหัวใจบนการ์ดทรีตเมนต์เพื่อเก็บไว้ดูภายหลัง", browse: "ดูทรีตเมนต์ทั้งหมด",
      confirmTitle: "ล้างรายการที่ชอบทั้งหมด?", confirmBody: "ทรีตเมนต์ทั้งหมดจะถูกนำออกจากรายการนี้", yes: "ล้างทั้งหมด", no: "ยกเลิก" },
    en: { eyebrow: "WISHLIST", title: "Your wishlist", lead: "Treatments you saved with the heart button, kept in this browser.",
      count: function (n) { return n + (n === 1 ? " saved treatment" : " saved treatments"); }, clear: "Clear all", cleared: "Wishlist cleared",
      emptyTitle: "Nothing saved yet", emptyBody: "Tap the heart on any treatment card to keep it here for later.", browse: "Browse all treatments",
      confirmTitle: "Clear your wishlist?", confirmBody: "All treatments will be removed from this list.", yes: "Clear all", no: "Cancel" }
  };

  var page = WP.page({
    active: "wishlist",
    view: function (lang) {
      var t = TEXT[lang], ids = WP.savedList();
      var body = ids.length
        ? '<div class="s-res-head"><h2 class="s-h2 s-tnum" style="font-size: 28px;" aria-live="polite">' + esc(t.count(ids.length)) + "</h2>" +
            UI.button({ label: t.clear, variant: "ghost", size: "sm", action: "clearAll" }) + "</div>" +
          '<div class="s-grid-3 s-lst-grid">' + ids.map(function (id) {
            return '<div class="s-cardwrap">' + UI.treatmentCard(Object.assign(D.card(D.get(id), lang), { lang: lang, href: "detail.html?id=" + id, saved: true })) + "</div>";
          }).join("") + "</div>"
        : '<div class="s-empty"><span class="s-icon-tile">' + icon("heart") + '</span><h2 class="s-h3">' + esc(t.emptyTitle) + "</h2>" +
          '<p style="margin: 0;">' + esc(t.emptyBody) + "</p>" + UI.button({ label: t.browse, arrow: true, href: "treatments.html", size: "sm" }) + "</div>";
      return '<main id="main-content">' + WP.pageHero(t.eyebrow, t.title, t.lead) + '<div class="s-shell s-page-main">' + body + "</div></main>";
    },
    actions: {
      clearAll: function () {
        var t = TEXT[WP.getLang()];
        WP.dialog({ title: t.confirmTitle, html: "<p>" + esc(t.confirmBody) + "</p>",
          actions: [{ label: t.no, variant: "ghost" }, { label: t.yes, variant: "danger", value: "yes" }],
          onClose: function (v) { if (v === "yes") { WP.savedList().forEach(function (id) { WP.toggleSaved(id); }); page.render(); WP.toast(t.cleared); } } });
        return false;
      }
    }
  });
})();
