/* Wellness Pass: Treatments listing (treatments.html).
   Search fields (treatment / date / guests), filter sidebar (keyword, price, intensity, setting, city), sort, results grid.
   Opens with ?cat=<category id> or ?city=bkk|cnx|hkt to pre-filter. */
(function () {
  "use strict";
  var D = window.WPData, UI = window.UI, WP = window.WP, esc = UI.esc, icon = UI.icon;

  var TEXT = {
    th: {
      eyebrow: "TREATMENTS · ทรีตเมนต์", title: "ทรีตเมนต์ทั้งหมด", lead: "นวดไทย สปา โยคะ มวยไทย และรีทรีต ในกรุงเทพฯ เชียงใหม่ และภูเก็ต",
      searchAria: "ค้นหาทรีตเมนต์", fTreat: "ทรีตเมนต์", fDate: "วันที่", fGuests: "ผู้เข้าร่วม", anyTreat: "ทุกทรีตเมนต์", anyDate: "วันไหนก็ได้", everyDay: "ทุกวัน",
      qToday: "วันนี้", qTomorrow: "พรุ่งนี้", qWeekend: "สุดสัปดาห์นี้", quickAria: "ตัวเลือกด่วน", prevMonth: "เดือนก่อนหน้า", nextMonth: "เดือนถัดไป", calNote: "จองล่วงหน้าได้ 30 วัน",
      done: "เสร็จ", filters: "ตัวกรอง", keyword: "คำค้นหา", searchPh: "เช่น นวดไทย โยคะ", clearSearch: "ล้างคำค้นหา",
      price: "ราคาต่อท่าน", minPrice: "ราคาต่ำสุด", maxPrice: "ราคาสูงสุด",
      fInt: "ความเข้มข้น", fSet: "บรรยากาศ", fCity: "เมือง", anyInt: "ทุกระดับ", anySet: "ทุกที่", anyCity: "ทุกเมือง",
      sortLabel: "เรียงตาม", sortRec: "แนะนำ", sortLow: "ราคาต่ำไปสูง", sortHigh: "ราคาสูงไปต่ำ",
      count: function (n) { return "พบ " + n + " ทรีตเมนต์"; }, sample: "ตัวอย่าง · Sample", priceNote: "ราคาเริ่มต้นโดยประมาณ ระบบคำนวณราคาจริงอีกครั้งตอนชำระเงิน",
      clear: "ล้างตัวกรอง", remove: "ลบตัวกรอง ",
      emptyTitle: "ไม่พบทรีตเมนต์ที่ตรงกับการค้นหา", emptyBody: "ลองลดตัวกรองบางอย่าง หรือดูทรีตเมนต์ทั้งหมด"
    },
    en: {
      eyebrow: "TREATMENTS", title: "All treatments", lead: "Thai massage, spa, yoga, Muay Thai and retreats in Bangkok, Chiang Mai and Phuket.",
      searchAria: "Search treatments", fTreat: "Treatment", fDate: "Date", fGuests: "Guests", anyTreat: "All treatments", anyDate: "Any date", everyDay: "Every day",
      qToday: "Today", qTomorrow: "Tomorrow", qWeekend: "This weekend", quickAria: "Quick picks", prevMonth: "Previous month", nextMonth: "Next month", calNote: "Bookable up to 30 days ahead",
      done: "Done", filters: "Filters", keyword: "Keyword", searchPh: "e.g. Thai massage, yoga", clearSearch: "Clear search",
      price: "Price per person", minPrice: "Minimum price", maxPrice: "Maximum price",
      fInt: "Intensity", fSet: "Setting", fCity: "City", anyInt: "Any intensity", anySet: "Anywhere", anyCity: "Any city",
      sortLabel: "Sort by", sortRec: "Recommended", sortLow: "Price: low to high", sortHigh: "Price: high to low",
      count: function (n) { return n + (n === 1 ? " treatment found" : " treatments found"); }, sample: "Sample · ตัวอย่าง", priceNote: "Starting prices are estimates; checkout re-prices them.",
      clear: "Clear filters", remove: "Remove filter ",
      emptyTitle: "No treatments match your search", emptyBody: "Try removing a filter, or view all treatments."
    }
  };

  var P_MIN = 0, P_MAX = 4000;
  var startDate = WP.get("startDate", 0);
  var state = {
    q: "", cat: WP.param("cat") || WP.get("filterCat", "all"), city: D.cities[WP.param("city")] ? WP.param("city") : "all", inten: "all", setting: "all",
    minP: P_MIN, maxP: P_MAX, sort: "rec",
    open: null,                                   // which search dropdown is open: "cat" | "date" | "guests"
    dateIdx: startDate ? startDate : -1,          // days from today, -1 = any date
    party: D.partyNorm(WP.get("startParty", null) || { a: Math.max(1, Math.min(6, WP.get("startGuests", 1))) }),
    monthOff: 0
  };
  if (state.cat !== "all" && !D.cat(state.cat)) state.cat = "all";

  /* ---------- Filtering ---------- */
  function results() {
    var needle = state.q.trim().toLowerCase();
    var list = D.treatments.filter(function (tr) {
      var p = tr.options[0].price;
      if (state.cat !== "all" && tr.cat !== state.cat) return false;
      if (state.city !== "all" && tr.city !== state.city) return false;
      if (state.inten !== "all" && tr.intensity !== state.inten) return false;
      if (state.setting !== "all" && tr.setting !== state.setting) return false;
      if (p < state.minP || (state.maxP < P_MAX && p > state.maxP)) return false;
      if (needle) {
        var c = D.cat(tr.cat);
        var hay = (tr.title.th + " " + tr.title.en + " " + tr.summary.th + " " + tr.summary.en + " " + c.th + " " + c.en).toLowerCase();
        if (hay.indexOf(needle) < 0) return false;
      }
      return true;
    });
    if (state.sort === "low") list = list.slice().sort(function (a, b) { return a.options[0].price - b.options[0].price; });
    if (state.sort === "high") list = list.slice().sort(function (a, b) { return b.options[0].price - a.options[0].price; });
    return list;
  }

  function appliedFilters(lang) {
    var a = [];
    if (state.cat !== "all") a.push({ label: D.L(D.cat(state.cat), lang), key: "cat" });
    if (state.inten !== "all") a.push({ label: D.L(D.intensity[state.inten], lang), key: "inten" });
    if (state.setting !== "all") a.push({ label: D.L(D.settings[state.setting], lang), key: "setting" });
    if (state.city !== "all") a.push({ label: D.L(D.cities[state.city], lang), key: "city" });
    if (state.minP > P_MIN || state.maxP < P_MAX) a.push({ label: D.baht(state.minP) + "–" + D.baht(state.maxP), key: "price" });
    if (state.q.trim()) a.push({ label: "“" + state.q.trim() + "”", key: "q" });
    return a;
  }

  /* ---------- Search fields bar ---------- */
  function searchFields(lang, t) {
    var th = lang === "th";
    var fields = [
      { id: "cat", icon: "lotus", label: t.fTreat, value: state.cat === "all" ? t.anyTreat : D.L(D.cat(state.cat), lang) },
      { id: "date", icon: "calendar", label: t.fDate, value: state.dateIdx >= 0 ? D.dayInfo(state.dateIdx, lang).long : t.anyDate },
      { id: "guests", icon: "users", label: t.fGuests, value: D.partyLabel(state.party, lang) }
    ];
    return '<div class="s-lst-search" role="search" aria-label="' + esc(t.searchAria) + '">' + fields.map(function (f) {
      var open = state.open === f.id, menu = "";
      if (open && f.id === "cat") {
        var opts = [{ id: "all", label: t.anyTreat }].concat(D.cats.map(function (c) { return { id: c.id, label: D.L(c, lang) }; }));
        menu = '<div class="s-dd-menu s-sf-menu" role="group" aria-label="' + esc(f.label) + '">' + opts.map(function (o) {
          return '<button type="button" class="s-dd-opt" aria-pressed="' + (o.id === state.cat) + '" data-action="pickCat" data-arg="' + esc(o.id) + '"><span>' + esc(o.label) + "</span>" + icon("check") + "</button>";
        }).join("") + "</div>";
      }
      if (open && f.id === "date") {
        var wk = D.weekendIdx();
        var short = function (i) { var d = D.dayInfo(i, lang); return d.dow + " " + d.day; };
        var quick = [{ i: -1, label: t.anyDate, sub: t.everyDay }, { i: 0, label: t.qToday, sub: short(0) }, { i: 1, label: t.qTomorrow, sub: short(1) }, { i: wk, label: t.qWeekend, sub: short(wk) }];
        menu = '<div class="s-dd-menu s-sf-menu s-datepop" role="group" aria-label="' + esc(f.label) + '">' +
          '<div class="s-quickrow" role="group" aria-label="' + esc(t.quickAria) + '">' + quick.map(function (q) {
            return '<button type="button" class="s-qchip" aria-pressed="' + (q.i === state.dateIdx) + '" data-action="quickDate" data-arg="' + q.i + '"><span>' + esc(q.label) + '</span><span class="s-qchip-sub">' + esc(q.sub) + "</span></button>";
          }).join("") + "</div>" +
          WP.calendarHtml(state.monthOff, state.dateIdx, lang, { prev: t.prevMonth, next: t.nextMonth }) +
          '<div class="s-datepop-foot"><span class="s-small">' + esc(t.calNote) + "</span>" + UI.button({ label: t.done, size: "sm", action: "closeMenus" }) + "</div></div>";
      }
      if (open && f.id === "guests") {
        menu = '<div class="s-dd-menu s-sf-menu" style="padding: 16px;">' + WP.partyHtml(state.party, lang) +
          '<p class="s-party-note" style="margin-bottom: 12px;">' + esc(D.partyNote(state.party, lang)) + "</p>" +
          UI.button({ label: t.done, size: "sm", action: "closeMenus" }) + "</div>";
      }
      return '<div class="s-sf"><button type="button" class="s-sf-btn" aria-expanded="' + open + '" data-action="toggleMenu" data-arg="' + f.id + '">' +
        '<span class="s-sf-ico" aria-hidden="true">' + icon(f.icon) + "</span>" +
        '<span class="s-sf-text"><span class="s-sf-label">' + esc(f.label) + '</span><span class="s-sf-val">' + esc(f.value) + "</span></span>" +
        '<svg class="wp-icon s-sf-chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"></path></svg></button>' + menu + "</div>";
    }).join("") + "</div>";
  }

  /* ---------- Filter sidebar ---------- */
  function priceLabels() {
    return { min: D.baht(state.minP), max: D.baht(state.maxP) + (state.maxP >= P_MAX ? "+" : ""),
      fillL: (state.minP - P_MIN) / (P_MAX - P_MIN) * 100, fillR: 100 - (state.maxP - P_MIN) / (P_MAX - P_MIN) * 100 };
  }
  function radios(name, current, opts) {
    return opts.map(function (o) {
      return '<label class="s-fchip"><input type="radio" name="' + name + '" value="' + esc(o.id) + '"' + (current === o.id ? " checked" : "") + ' data-input="' + name + '"><span>' + esc(o.label) + "</span></label>";
    }).join("");
  }
  function sidebar(lang, t, applied) {
    var pl = priceLabels();
    var intOpts = [{ id: "all", label: t.anyInt }].concat(Object.keys(D.intensity).map(function (k) { return { id: k, label: D.L(D.intensity[k], lang) }; }));
    var setIcons = { all: "sparkle", spa: "lotus", nature: "leaf", home: "pin" };
    var setOpts = [{ id: "all", label: t.anySet }].concat(Object.keys(D.settings).map(function (k) { return { id: k, label: D.L(D.settings[k], lang) }; }));
    var cityOpts = [{ id: "all", label: t.anyCity }].concat(Object.keys(D.cities).map(function (k) { return { id: k, label: D.L(D.cities[k], lang) }; }));
    return '<aside class="s-filters" aria-labelledby="f-head">' +
      '<div class="s-f-headrow"><h2 id="f-head" class="s-f-head"><svg class="wp-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h10M18 7h2M4 17h4M12 17h8M14 4v6M8 14v6"></path></svg>' + esc(t.filters) + "</h2>" +
        (applied.length ? '<button type="button" class="s-textbtn s-f-clear" data-action="clearAll">' + esc(t.clear) + "</button>" : "") + "</div>" +
      '<div class="s-f-sec"><label class="s-f-title" for="f-q">' + esc(t.keyword) + "</label>" +
        '<div class="s-search-in" style="margin-top: 6px;">' + icon("search") +
          '<input id="f-q" class="s-input" type="search" value="' + esc(state.q) + '" placeholder="' + esc(t.searchPh) + '" style="width: 100%;" data-input="q">' +
          (state.q ? '<button type="button" class="s-clear" aria-label="' + esc(t.clearSearch) + '" data-action="clearQ">' + icon("close") + "</button>" : "") +
        "</div></div>" +
      '<div class="s-f-sec"><div class="s-f-titlerow"><p class="s-f-title">' + esc(t.price) + "</p>" +
        '<p class="s-price-vals"><span id="p-min-label">' + esc(pl.min) + '</span><span aria-hidden="true">–</span><span id="p-max-label">' + esc(pl.max) + "</span></p></div>" +
        '<div class="s-range"><span class="s-range-track" aria-hidden="true"></span>' +
          '<span id="p-fill" class="s-range-fill" style="left: ' + pl.fillL + "%; right: " + pl.fillR + '%;" aria-hidden="true"></span>' +
          '<input id="p-min" type="range" min="' + P_MIN + '" max="' + P_MAX + '" step="100" value="' + state.minP + '" aria-label="' + esc(t.minPrice) + '" data-input="minP">' +
          '<input id="p-max" type="range" min="' + P_MIN + '" max="' + P_MAX + '" step="100" value="' + state.maxP + '" aria-label="' + esc(t.maxPrice) + '" data-input="maxP">' +
        "</div></div>" +
      '<fieldset class="s-f-sec"><legend class="s-f-title">' + esc(t.fInt) + '</legend><div class="s-fchips">' + radios("inten", state.inten, intOpts) + "</div></fieldset>" +
      '<div class="s-f-sec" role="group" aria-labelledby="f-set"><p id="f-set" class="s-f-title">' + esc(t.fSet) + "</p>" +
        '<div class="s-fchips s-fchips-grid">' + setOpts.map(function (o) {
          return '<button type="button" class="s-fchip" aria-pressed="' + (state.setting === o.id) + '" data-action="pickSetting" data-arg="' + o.id + '">' + icon(setIcons[o.id]) + "<span>" + esc(o.label) + "</span></button>";
        }).join("") + "</div></div>" +
      '<fieldset class="s-f-sec"><legend class="s-f-title">' + esc(t.fCity) + '</legend><div class="s-fchips">' + radios("city", state.city, cityOpts) + "</div></fieldset>" +
      "</aside>";
  }

  /* ---------- Results column ---------- */
  function resultsColumn(lang, t, list, applied) {
    var sortOpts = [["rec", t.sortRec], ["low", t.sortLow], ["high", t.sortHigh]];
    var grid = list.length
      ? '<div class="s-grid-3 s-lst-grid">' + list.map(function (tr) {
          return '<div class="s-cardwrap">' + UI.treatmentCard(Object.assign(D.card(tr, lang), { lang: lang, href: "detail.html?id=" + tr.id, saved: WP.isSaved(tr.id) })) + "</div>";
        }).join("") + "</div>"
      : '<div class="s-empty" style="margin-top: 24px;"><span class="s-icon-tile">' + icon("search") + '</span><h3 class="s-h3">' + esc(t.emptyTitle) + "</h3>" +
        '<p style="margin: 0;">' + esc(t.emptyBody) + "</p>" + UI.button({ label: t.clear, size: "sm", action: "clearAll" }) + "</div>";
    return '<div style="min-width: 0;">' +
      '<div class="s-res-head"><h2 class="s-h2 s-tnum" style="font-size: 28px;" aria-live="polite">' + esc(t.count(list.length)) + "</h2>" +
        '<label style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--muted);"><span>' + esc(t.sortLabel) + "</span>" +
          '<select id="f-sort" class="s-input s-select" data-input="sort">' + sortOpts.map(function (o) {
            return '<option value="' + o[0] + '"' + (state.sort === o[0] ? " selected" : "") + ">" + esc(o[1]) + "</option>";
          }).join("") + "</select></label></div>" +
      '<p class="s-small" style="margin: 6px 0 0; display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">' + UI.badge(t.sample, "notice") + "<span>" + esc(t.priceNote) + "</span></p>" +
      (applied.length ? '<div class="s-chips" style="margin-top: 16px; align-items: center;">' + applied.map(function (a) {
          return '<button type="button" class="s-applied" aria-label="' + esc(t.remove + a.label) + '" data-action="removeFilter" data-arg="' + a.key + '"><span>' + esc(a.label) + "</span>" + icon("close") + "</button>";
        }).join("") + '<button type="button" class="s-textbtn" data-action="clearAll">' + esc(t.clear) + "</button></div>" : "") +
      grid + "</div>";
  }

  /* Remember the chosen date / guests so the detail page starts with them. */
  /* On short screens the sidebar scrolls inside itself; keep its position when the page redraws. */
  var filterScroll = 0;
  document.addEventListener("scroll", function (e) {
    if (e.target.classList && e.target.classList.contains("s-filters")) filterScroll = e.target.scrollTop;
  }, true);
  function restoreFilterScroll() {
    var f = document.querySelector(".s-filters");
    if (f) f.scrollTop = filterScroll;
  }

  function saveSearchContext() {
    WP.set({ filterCat: state.cat, startDate: state.dateIdx >= 0 ? state.dateIdx : 0, startGuests: D.partyTotal(state.party), startParty: state.party });
  }

  /* While a price slider is dragged, update just the labels and the coloured bar (a full redraw would interrupt the drag). */
  function updatePriceUi() {
    var pl = priceLabels();
    document.getElementById("p-min-label").textContent = pl.min;
    document.getElementById("p-max-label").textContent = pl.max;
    var fill = document.getElementById("p-fill");
    fill.style.left = pl.fillL + "%"; fill.style.right = pl.fillR + "%";
  }

  WP.page({
    active: "treatments",
    view: function (lang) {
      var t = TEXT[lang], list = results(), applied = appliedFilters(lang);
      var banner = D.photos.treatments ? '<img class="s-hero-img s-tr-img" src="' + esc(D.photos.treatments) + '" alt=""><div class="s-hero-shade"></div>' : "";
      return '<main id="main-content">' +
        '<section class="s-band s-dark" style="padding: 48px 0 88px;" aria-labelledby="tr-title">' + banner +
          '<div class="s-shell"><p class="s-eyebrow">' + esc(t.eyebrow) + '</p><h1 id="tr-title" class="s-page-title">' + esc(t.title) + '</h1><p class="s-lead">' + esc(t.lead) + "</p></div></section>" +
        '<div class="s-shell" style="position: relative; margin-top: -48px;">' + searchFields(lang, t) +
          '<div class="s-lst-layout">' + sidebar(lang, t, applied) + resultsColumn(lang, t, list, applied) + "</div>" +
        '</div><div style="height: 72px;"></div></main>';
    },
    after: function () { saveSearchContext(); restoreFilterScroll(); },
    actions: {
      toggleMenu: function (id) { state.open = state.open === id ? null : id; },
      closeMenus: function () { state.open = null; },
      pickCat: function (id) { state.cat = id; state.open = null; },
      quickDate: function (i) { state.dateIdx = Number(i); state.monthOff = 0; },
      pickDate: function (i) { state.dateIdx = Number(i); },
      prevMonth: function () { state.monthOff = Math.max(0, state.monthOff - 1); },
      nextMonth: function () { state.monthOff = Math.min(WP.maxMonthOff(), state.monthOff + 1); },
      partyLess: function (i) { state.party = WP.partyChange(state.party, Number(i), "less"); },
      partyMore: function (i) { state.party = WP.partyChange(state.party, Number(i), "more"); },
      pickSetting: function (id) { state.setting = id; },
      clearQ: function () { state.q = ""; },
      removeFilter: function (key) {
        if (key === "price") { state.minP = P_MIN; state.maxP = P_MAX; }
        else if (key === "q") state.q = "";
        else state[key] = "all";
      },
      clearAll: function () {
        state.q = ""; state.cat = "all"; state.city = "all"; state.inten = "all"; state.setting = "all";
        state.minP = P_MIN; state.maxP = P_MAX; state.open = null;
      }
    },
    inputs: {
      q: function (v, el, e) { state.q = v; return e.type === "input"; },          // live search while typing
      sort: function (v) { state.sort = v; return true; },
      inten: function (v) { state.inten = v; return true; },
      city: function (v) { state.city = v; return true; },
      minP: function (v, el, e) {
        state.minP = Math.min(Number(v), state.maxP - 100);
        if (e.type === "input") { updatePriceUi(); return false; }
        return true;                                                              // redraw results when the slider is released
      },
      maxP: function (v, el, e) {
        state.maxP = Math.max(Number(v), state.minP + 100);
        if (e.type === "input") { updatePriceUi(); return false; }
        return true;
      }
    }
  });
})();
