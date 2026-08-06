// Home-page motion: the count-up stat strip and the looping terminal typer.
// Both no-op gracefully if their markup isn't on the page.

// Count-up stats, triggered when the stat strip first scrolls into view.
(function () {
  var strip = document.getElementById("stats");
  if (!strip) return;
  var spans = strip.querySelectorAll("[data-count]");
  var ran = false;

  function run() {
    if (ran) return;
    ran = true;
    var start = performance.now(), dur = 1600;
    function tick(now) {
      var t = Math.min(1, (now - start) / dur);
      var p = 1 - Math.pow(1 - t, 3);
      spans.forEach(function (el) { el.textContent = Math.round(el.dataset.count * p); });
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    spans.forEach(function (el) { el.textContent = el.dataset.count; });
    return;
  }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries, obs) {
      if (entries.some(function (e) { return e.isIntersecting; })) { run(); obs.disconnect(); }
    }, { threshold: 0.3 }).observe(strip);
  } else {
    run();
  }
})();

// Looping terminal typer in the About panel.
(function () {
  var linesEl = document.getElementById("term-lines");
  var curEl = document.getElementById("term-cur");
  if (!linesEl || !curEl) return;

  var GREEN = "oklch(.8 .12 165)";
  var LOG = [
    { text: "$ deploy ai-orchestration", color: "#8a827a" },
    { text: "✓ vector index warmed", color: GREEN },
    { text: "✓ guardrails online", color: GREEN },
    { text: "→ 40M req/day routed", color: "#d5cfc7" },
    { text: "→ p99 latency  −45%", color: "#d5cfc7" },
    { text: "✓ agents shipping", color: GREEN }
  ];

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    LOG.forEach(function (line) {
      var el = document.createElement("div");
      el.style.color = line.color;
      el.textContent = line.text;
      linesEl.appendChild(el);
    });
    return;
  }

  var li = 0, ci = 0;
  function step() {
    var line = LOG[li];
    if (ci < line.text.length) {
      ci++;
      curEl.textContent = line.text.slice(0, ci);
      setTimeout(step, 40);
      return;
    }
    var done = document.createElement("div");
    done.style.color = line.color;
    done.textContent = line.text;
    linesEl.appendChild(done);
    curEl.textContent = "";
    ci = 0;
    li++;
    if (li < LOG.length) {
      setTimeout(step, 420);
    } else {
      setTimeout(function () {
        linesEl.textContent = "";
        li = 0;
        setTimeout(step, 400);
      }, 2800);
    }
  }
  step();
})();
