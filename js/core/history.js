/* Wellness Pass: history line chart shared by the admin dashboard and the shop dashboard.
   WP.history.card(lang, bookings, { key, shop }) returns the card's HTML; the page adds
   WP.history.setRange / setMetric as its "hRange" / "hMetric" actions. Needs data.js, ui.js and common.js first. */
(function () {
  "use strict";
  var D = window.WPData, UI = window.UI, WP = window.WP, esc = UI.esc, icon = UI.icon;
  var live = function (b) { return b.status !== "cancelled" && b.status !== "declined"; };
  var earned = function (b) { return b.status === "confirmed" || b.status === "completed"; };

  var TEXT = {
    th: {
      hTitle: { revenue: "ประวัติรายได้", bookings: "ประวัติการจอง" }, hMetric: "ข้อมูลที่แสดง", hRange: "ช่วงเวลา",
      mRevenue: "รายได้", mBookings: "การจอง", r1m: "1 เดือน", r1y: "1 ปี", rAll: "ทั้งหมด",
      hLead: { "1m": "รายวัน 30 วันที่ผ่านมา", "1y": "รายสัปดาห์ 12 เดือนที่ผ่านมา", all: function (d) { return "รายเดือน ตั้งแต่" + d; } },
      kTotal: { revenue: "รายได้รวม", bookings: "การจองทั้งหมด" }, kChange: "เทียบช่วงก่อนหน้า",
      kPrev: { "1m": "เทียบกับ 30 วันก่อนหน้า", "1y": "เทียบกับ 12 เดือนก่อนหน้า", all: "12 เดือนล่าสุด เทียบปีก่อน" },
      kAvg: "มูลค่าเฉลี่ยต่อการจอง", kAvgSub: function (n) { return "จาก " + n.toLocaleString("en-US") + " การจอง"; },
      kPeak: { "1m": "วันที่ดีที่สุด", "1y": "สัปดาห์ที่ดีที่สุด", all: "เดือนที่ดีที่สุด" },
      nBk: function (n) { return n.toLocaleString("en-US") + " การจอง"; }, weekOf: function (a, b) { return a + " – " + b; }, soFar: " (ถึงวันนี้)",
      avgLine: { "1m": "ค่าเฉลี่ยต่อวัน", "1y": "ค่าเฉลี่ยต่อสัปดาห์", all: "ค่าเฉลี่ยต่อเดือน" }, vsAvg: function (d) { return (d >= 0 ? "สูงกว่า" : "ต่ำกว่า") + "ค่าเฉลี่ย " + Math.abs(d) + "%"; },
      avgNote: { "1m": "", "1y": "", all: "ไม่นับเดือนที่ยังไม่จบ" },
      table: "ดูเป็นตาราง", thPeriod: "ช่วงเวลา", hNote: "ข้อมูลย้อนหลังก่อนการจองในเบราว์เซอร์นี้เป็นข้อมูลตัวอย่าง เพื่อให้กราฟมีข้อมูลให้ดู",
      hAria: function (m, r, a, b) { return "กราฟเส้น" + m + " " + r + " ต่ำสุด " + a + " สูงสุด " + b + " ใช้ปุ่มลูกศรเพื่อดูแต่ละจุด"; }
    },
    en: {
      hTitle: { revenue: "Revenue history", bookings: "Booking history" }, hMetric: "Show", hRange: "Time range",
      mRevenue: "Revenue", mBookings: "Bookings", r1m: "1 month", r1y: "1 year", rAll: "All",
      hLead: { "1m": "Per day, last 30 days", "1y": "Per week, last 12 months", all: function (d) { return "Per month, since " + d; } },
      kTotal: { revenue: "Total revenue", bookings: "Total bookings" }, kChange: "Change",
      kPrev: { "1m": "vs the 30 days before", "1y": "vs the 12 months before", all: "Last 12 months vs the year before" },
      kAvg: "Average booking value", kAvgSub: function (n) { return "across " + n.toLocaleString("en-US") + (n === 1 ? " booking" : " bookings"); },
      kPeak: { "1m": "Best day", "1y": "Best week", all: "Best month" },
      nBk: function (n) { return n.toLocaleString("en-US") + (n === 1 ? " booking" : " bookings"); }, weekOf: function (a, b) { return a + " – " + b; }, soFar: " (so far)",
      avgLine: { "1m": "Average per day", "1y": "Average per week", all: "Average per month" }, vsAvg: function (d) { return Math.abs(d) + "% " + (d >= 0 ? "above" : "below") + " average"; },
      avgNote: { "1m": "", "1y": "", all: "The month in progress is left out" },
      table: "Show as a table", thPeriod: "Period", hNote: "History from before this browser's bookings is made-up sample data, so the chart has something to show.",
      hAria: function (m, r, a, b) { return m + " line chart, " + r + ". Lowest " + a + ", highest " + b + ". Use the arrow keys to read each point."; }
    }
  };

  /* Real bookings in this browser only cover a few weeks, so a made-up daily archive from June 2024 sits under them.
     It is fixed (same numbers on every visit), grows over time and follows the tourist seasons (busy Nov-Apr).
     The admin chart uses the whole platform's archive; a shop's chart uses a smaller one priced from its own menu. */
  var HSTART = new Date(2024, 5, 1), SEASON = [1.35, 1.3, 1.1, 1.25, 0.85, 0.75, 0.85, 0.8, 0.7, 0.9, 1.15, 1.4];
  function addDays(dt, n) { return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + n); }
  function isoOf(dt) { return dt.getFullYear() + "-" + ("0" + (dt.getMonth() + 1)).slice(-2) + "-" + ("0" + dt.getDate()).slice(-2); }
  function noise(k) { var x = Math.sin(k * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); }
  function archiveCfg(shopId) {
    if (!shopId) return { base: 4, seed: 0, price: function (r) { return 1200 + Math.round(r * 22) * 100; } };
    var tr = D.get(shopId), prices = tr.basePrices || tr.options.map(function (o) { return o.price; });
    return { base: 1.5, seed: 37, price: function (r, r2) { return prices[Math.floor(r * prices.length)] * (r2 < 0.25 ? 2 : 1); } };
  }
  function archiveDay(dt, k, cfg) {
    var wd = dt.getDay(), wk = wd === 0 || wd === 6 ? 1.3 : wd === 5 ? 1.1 : 0.9;
    var n = Math.round(cfg.base * (1 + k / 800) * SEASON[dt.getMonth()] * wk * (0.7 + 0.6 * noise(k + cfg.seed * 1000))), rev = 0;
    for (var i = 0; i < n; i++) rev += cfg.price(noise(k * 31 + i + 7 + cfg.seed), noise(k * 17 + i + cfg.seed));
    return { n: n, rev: rev };
  }
  function dailyHistory(all, cfg) {
    var now = new Date(), today = new Date(now.getFullYear(), now.getMonth(), now.getDate()), todayIso = isoOf(today), real = {}, days = [];
    all.forEach(function (b) {
      if (!b.date || b.date > todayIso) return;   // appointments still to come are not history yet
      var r = real[b.date] || (real[b.date] = { n: 0, rev: 0 });
      if (live(b)) r.n++;
      if (earned(b)) r.rev += b.total;
    });
    for (var k = 0, dt = HSTART; dt <= today; k++, dt = addDays(HSTART, k)) {
      var a = archiveDay(dt, k, cfg), r = real[isoOf(dt)] || { n: 0, rev: 0 };
      days.push({ from: dt, to: dt, n: a.n + r.n, rev: a.rev + r.rev });
    }
    return days;
  }
  function total(seg) {
    return { from: seg[0].from, to: seg[seg.length - 1].to, n: seg.reduce(function (a, x) { return a + x.n; }, 0), rev: seg.reduce(function (a, x) { return a + x.rev; }, 0) };
  }
  function bucketsFor(days, range) {
    if (range === "1m") return days.slice(-30);
    var out = [];
    if (range === "1y") {
      for (var i = 51; i >= 0; i--) out.push(total(days.slice(days.length - 7 * (i + 1), days.length - 7 * i)));
      return out;
    }
    var cur = null;
    days.forEach(function (x) {
      var key = x.from.getFullYear() * 12 + x.from.getMonth();
      if (!cur || cur.key !== key) { cur = { key: key, from: x.from, to: x.to, n: 0, rev: 0 }; out.push(cur); }
      cur.to = x.to; cur.n += x.n; cur.rev += x.rev;
    });
    return out;
  }
  function niceScale(v) {
    if (v <= 0) return { max: 4, step: 1 };
    var raw = v / 4, p = Math.pow(10, Math.floor(Math.log(raw) / Math.LN10)), f = raw / p;
    var step = (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * p;
    return { max: Math.ceil(v / step) * step, step: step };
  }
  function compact(v, money) {
    var s = v >= 1e6 ? (Math.round(v / 1e5) / 10) + "M" : v >= 1e4 ? Math.round(v / 1e3) + "k" : v >= 1e3 ? (Math.round(v / 100) / 10) + "k" : String(Math.round(v));
    return (money ? "฿" : "") + s;
  }

  var hist = null;   // points of the chart on screen, read by the hover code below
  var curKey = "admin";
  function pref(k, def) { var o = WP.get("hist", {}) || {}; return (o[curKey] || {})[k] || def; }
  function setPref(k, v) { var o = WP.get("hist", {}) || {}; o[curKey] = o[curKey] || {}; o[curKey][k] = v; WP.set({ hist: o }); }

  /* opts: { key: "admin" | "shop", shop: "<treatment id>" (only that venue's bookings and archive), lead: optional text } */
  function card(lang, all, opts) {
    opts = opts || {};
    curKey = opts.key || "admin";
    if (opts.shop) all = all.filter(function (b) { return b.id === opts.shop; });
    var t = TEXT[lang], cfg = archiveCfg(opts.shop);
    var loc = lang === "th" ? "th-TH" : "en-GB", range = pref("range", "1y"), metric = pref("metric", "revenue"), money = metric === "revenue";
    var fmt = function (dt, o) { return dt.toLocaleDateString(loc, o); };
    var days = dailyHistory(all, cfg), pts = bucketsFor(days, range), val = function (x) { return money ? x.rev : x.n; };
    var lastDay = days[days.length - 1].to;
    var label = function (x) {
      if (range === "1m") return fmt(x.from, { weekday: "short", day: "numeric", month: "short", year: "numeric" });
      if (range === "1y") return t.weekOf(fmt(x.from, { day: "numeric", month: "short" }), fmt(x.to, { day: "numeric", month: "short", year: "numeric" }));
      return fmt(x.from, { month: "long", year: "numeric" }) + (x.to.getTime() === lastDay.getTime() && x.to.getDate() < 28 ? t.soFar : "");
    };

    // Summary numbers
    var cur = total(range === "all" ? days.slice(-364) : range === "1y" ? days.slice(-364) : days.slice(-30));
    var prevSeg = range === "1m" ? days.slice(-60, -30) : days.slice(-728, -364), prev = prevSeg.length ? total(prevSeg) : null;
    var all_ = total(range === "1m" ? days.slice(-30) : range === "1y" ? days.slice(-364) : days);
    var change = prev && val(prev) ? Math.round((val(cur) - val(prev)) / val(prev) * 1000) / 10 : null;
    var peak = pts.reduce(function (a, x) { return val(x) > val(a) ? x : a; }, pts[0]);
    var low = pts.reduce(function (a, x) { return val(x) < val(a) ? x : a; }, pts[0]);
    var show = function (v) { return money ? D.baht(v) : v.toLocaleString("en-US"); };
    var peakName = range === "1m" ? fmt(peak.from, { day: "numeric", month: "short" }) : range === "1y" ? t.weekOf(fmt(peak.from, { day: "numeric", month: "short" }), fmt(peak.to, { day: "numeric", month: "short" }))
      : fmt(peak.from, { month: "short", year: "numeric" });
    var kpis = '<div class="s-hist-kpis">' +
      '<div class="s-hist-kpi"><span>' + esc(t.kTotal[metric]) + "</span><strong>" + esc(show(val(all_))) + "</strong><em>" + esc(range === "all" ? t.hLead.all(fmt(HSTART, { month: "short", year: "numeric" })) : t.hLead[range]) + "</em></div>" +
      '<div class="s-hist-kpi"><span>' + esc(t.kChange) + "</span><strong" + (change === null ? "" : ' class="' + (change >= 0 ? "s-trend-up" : "s-trend-down") + '"') + ">" +
        (change === null ? "–" : (change >= 0 ? "▲ +" : "▼ ") + change + "%") + "</strong><em>" + esc(t.kPrev[range]) + "</em></div>" +
      '<div class="s-hist-kpi"><span>' + esc(t.kAvg) + "</span><strong>" + esc(D.baht(all_.n ? Math.round(all_.rev / all_.n) : 0)) + "</strong><em>" + esc(t.kAvgSub(all_.n)) + "</em></div>" +
      '<div class="s-hist-kpi"><span>' + esc(t.kPeak[range]) + "</span><strong>" + esc(show(val(peak))) + "</strong><em>" + esc(peakName) + "</em></div>" +
    "</div>";

    // Chart geometry: a 1000 x 300 box stretched to fit; the line keeps a 2px stroke
    var sc = niceScale(val(peak)), W = 1000, H = 300, N = pts.length;
    var xy = pts.map(function (x, i) { return [N > 1 ? i / (N - 1) * W : W / 2, H - val(x) / sc.max * H]; });
    var line = xy.map(function (p, i) { return (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1); }).join("");
    // In "All", the current month is not over yet: draw its last step dashed so the drop does not look like a crash
    var partial = range === "all" && N > 1 && lastDay.getDate() < 28, solid = line, dash = "";
    var full = partial ? pts.slice(0, -1) : pts;   // the month still in progress would pull the average down
    var avg = full.reduce(function (a, x) { return a + val(x); }, 0) / (full.length || 1), avgPct = avg / sc.max * 100;
    if (partial) {
      solid = xy.slice(0, -1).map(function (p, i) { return (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1); }).join("");
      dash = "M" + xy[N - 2][0].toFixed(1) + " " + xy[N - 2][1].toFixed(1) + "L" + xy[N - 1][0].toFixed(1) + " " + xy[N - 1][1].toFixed(1);
    }
    var area = line + "L" + W + " " + H + "L0 " + H + "Z";
    hist = { pts: pts.map(function (x, i) {
      return { x: xy[i][0] / W * 100, y: xy[i][1] / H * 100, label: label(x), main: show(val(x)), sub: money ? t.nBk(x.n) : D.baht(x.rev),
        avg: avg ? t.vsAvg(Math.round((val(x) - avg) / avg * 100)) : "" };
    }) };
    var grid = "", yLab = "";
    for (var g = 0; g <= sc.max / sc.step + 1e-9; g++) {
      var pct = g * sc.step / sc.max * 100;
      grid += '<span class="s-hist-grid' + (g === 0 ? " is-base" : "") + '" style="bottom: ' + pct + '%;"></span>';
      yLab += '<span style="bottom: ' + pct + '%;">' + esc(compact(g * sc.step, money)) + "</span>";
    }
    // X labels: at most about 7, counted back from the newest point
    var cand = [];
    pts.forEach(function (x, i) {
      if (range === "1m") cand.push([i, fmt(x.from, { day: "numeric", month: "short" })]);
      else if (range === "1y") { if (i && x.to.getMonth() !== pts[i - 1].to.getMonth()) cand.push([i, fmt(x.to, { month: "short" })]); }
      else if (x.from.getMonth() % 3 === 0 || i === 0) cand.push([i, fmt(x.from, { month: "short", year: "2-digit" })]);
    });
    var every = range === "1m" ? 5 : Math.max(1, Math.ceil(cand.length / 7)), xLab = "", kept = 0;
    for (var c = cand.length - 1; c >= 0; c -= (range === "1m" ? 1 : every)) {
      if (range === "1m" && (N - 1 - cand[c][0]) % every) continue;
      var left = N > 1 ? cand[c][0] / (N - 1) * 100 : 50;
      xLab = '<span class="' + (left > 94 ? "is-end" : left < 6 ? "is-start" : "") + (kept++ % 2 ? " is-alt" : "") + '" style="left: ' + left.toFixed(2) + '%;">' + esc(cand[c][1]) + "</span>" + xLab;
    }
    var last = hist.pts[N - 1];
    var rangeName = range === "1m" ? t.r1m : range === "1y" ? t.r1y : t.rAll;
    var seg = function (act, items) {
      return items.map(function (it) { return '<button type="button" aria-pressed="' + (it[0] === (act === "hRange" ? range : metric)) + '" data-action="' + act + '" data-arg="' + it[0] + '">' + esc(it[1]) + "</button>"; }).join("");
    };
    var rows = pts.slice().reverse().map(function (x) {
      return '<tr><td>' + esc(label(x)) + '</td><td class="s-num">' + esc(D.baht(x.rev)) + '</td><td class="s-num">' + x.n.toLocaleString("en-US") + "</td></tr>";
    }).join("");

    return '<section class="s-card s-adm-card s-adm-wide s-hist" aria-labelledby="c-hist">' +
      '<div class="s-hist-head"><div><h2 id="c-hist" class="s-adm-h">' + icon("chart") + esc(t.hTitle[metric]) + '</h2><p class="s-small" style="margin: 0;">' +
          esc(range === "all" ? t.hLead.all(fmt(HSTART, { month: "long", year: "numeric" })) : t.hLead[range]) + "</p></div>" +
        '<div class="s-hist-ctrls"><div class="s-seg" role="group" aria-label="' + esc(t.hMetric) + '">' + seg("hMetric", [["revenue", t.mRevenue], ["bookings", t.mBookings]]) + "</div>" +
          '<div class="s-seg" role="group" aria-label="' + esc(t.hRange) + '">' + seg("hRange", [["1m", t.r1m], ["1y", t.r1y], ["all", t.rAll]]) + "</div></div></div>" +
      kpis +
      '<div class="s-hist-legend"><span><i class="s-key-line" aria-hidden="true"></i>' + esc(metric === "revenue" ? t.mRevenue : t.mBookings) + "</span>" +
        '<span><i class="s-key-avg" aria-hidden="true"></i>' + esc(t.avgLine[range]) + " · <strong>" + esc(show(Math.round(avg))) + "</strong></span>" +
        (t.avgNote[range] ? '<span class="s-sub">' + esc(t.avgNote[range]) + "</span>" : "") + "</div>" +
      '<div class="s-hist-chart"><div class="s-hist-y" aria-hidden="true">' + yLab + "</div>" +
        '<div class="s-hist-plot" tabindex="0" role="img" aria-label="' + esc(t.hAria(t.hTitle[metric], rangeName, show(val(low)), show(val(peak))) + " " + t.avgLine[range] + " " + show(Math.round(avg)) + ".") + '">' + grid +
          '<svg viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="none" aria-hidden="true" focusable="false"><defs><linearGradient id="hist-fill" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0" stop-color="var(--jade)" stop-opacity="0.2"/><stop offset="1" stop-color="var(--jade)" stop-opacity="0"/></linearGradient></defs>' +
            '<path d="' + area + '" fill="url(#hist-fill)"/><path class="s-hist-line" d="' + solid + '" vector-effect="non-scaling-stroke"/>' +
            (dash ? '<path class="s-hist-line is-partial" d="' + dash + '" vector-effect="non-scaling-stroke"/>' : "") + "</svg>" +
          '<span class="s-hist-avg" style="bottom: ' + avgPct.toFixed(2) + '%;" aria-hidden="true"></span>' +
          '<span class="s-hist-dot is-last' + (partial ? " is-partial" : "") + '" style="left: ' + last.x + "%; top: " + last.y + '%;" aria-hidden="true"></span>' +
          '<span class="s-hist-cross" aria-hidden="true"></span><span class="s-hist-dot is-hover" aria-hidden="true"></span>' +
          '<div class="s-hist-tip" aria-live="polite"></div></div>' +
        '<div class="s-hist-x" aria-hidden="true">' + xLab + "</div></div>" +
      '<div class="s-hist-foot"><details class="s-hist-table"><summary>' + esc(t.table) + '</summary><div class="s-table-wrap"><table class="s-table"><thead><tr><th scope="col">' + esc(t.thPeriod) +
        '</th><th scope="col" class="s-num">' + esc(t.mRevenue) + '</th><th scope="col" class="s-num">' + esc(t.mBookings) + "</th></tr></thead><tbody>" + rows + "</tbody></table></div></details>" +
        '<p class="s-small s-hist-note">' + icon("info") + esc(t.hNote) + "</p></div>" +
    "</section>";
  }

  /* Hover, touch and arrow keys move a crosshair + tooltip along the line. */
  function histShow(plot, i) {
    if (!hist || !plot) return;
    i = Math.max(0, Math.min(hist.pts.length - 1, i));
    var p = hist.pts[i], tip = plot.querySelector(".s-hist-tip");
    plot.setAttribute("data-i", i);
    plot.classList.add("is-on");
    plot.querySelector(".s-hist-cross").style.left = p.x + "%";
    var dot = plot.querySelector(".s-hist-dot.is-hover"); dot.style.left = p.x + "%"; dot.style.top = p.y + "%";
    tip.style.left = p.x + "%";
    tip.classList.toggle("is-flip", p.x > 60);
    tip.innerHTML = '<span class="s-sub">' + esc(p.label) + "</span><strong>" + esc(p.main) + '</strong><span class="s-sub">' + esc(p.sub) + "</span>" + (p.avg ? '<span class="s-hist-tip-avg">' + esc(p.avg) + "</span>" : "");
  }
  function histHide(plot) { if (plot) { plot.classList.remove("is-on"); plot.removeAttribute("data-i"); } }
  function plotOf(e) { return e.target && e.target.closest ? e.target.closest(".s-hist-plot") : null; }
  function histPointer(e) {
    var plot = plotOf(e);
    if (!plot || !hist) return;
    var r = plot.getBoundingClientRect();
    histShow(plot, Math.round((e.clientX - r.left) / r.width * (hist.pts.length - 1)));
  }
  document.addEventListener("pointermove", histPointer);
  document.addEventListener("pointerdown", histPointer);
  document.addEventListener("pointerleave", function (e) { if (e.target.classList && e.target.classList.contains("s-hist-plot") && document.activeElement !== e.target) histHide(e.target); }, true);
  document.addEventListener("focusin", function (e) { var plot = plotOf(e); if (plot === e.target && hist) histShow(plot, hist.pts.length - 1); });
  document.addEventListener("focusout", function (e) { var plot = plotOf(e); if (plot === e.target) histHide(plot); });
  document.addEventListener("keydown", function (e) {
    var plot = plotOf(e);
    if (plot !== e.target || !hist) return;
    var i = Number(plot.getAttribute("data-i") || hist.pts.length - 1), n = hist.pts.length;
    var next = { ArrowLeft: i - 1, ArrowRight: i + 1, Home: 0, End: n - 1, PageUp: i - 5, PageDown: i + 5 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    histShow(plot, next);
  });

  WP.history = {
    card: card,
    setRange: function (r) { setPref("range", r); },
    setMetric: function (m) { setPref("metric", m); }
  };
})();
