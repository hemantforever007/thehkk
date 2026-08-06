// App switcher in the nav. The rows are real <a> links rendered server-side, so
// the menu still navigates with JavaScript disabled — this only adds the
// open/close toggle and the search filter.
(function () {
  var root = document.querySelector(".switcher");
  if (!root) return;

  var btn = root.querySelector(".switcher-btn");
  var panel = root.querySelector(".switcher-panel");
  var input = root.querySelector(".switcher-search input");
  var rows = Array.prototype.slice.call(root.querySelectorAll(".switcher-row[data-search]"));
  var empty = root.querySelector(".switcher-empty");
  if (!btn || !panel) return;

  function open(yes) {
    root.classList.toggle("is-open", yes);
    panel.hidden = !yes;
    btn.setAttribute("aria-expanded", yes ? "true" : "false");
    if (yes && input) { input.value = ""; filter(); input.focus(); }
  }

  function filter() {
    var q = (input ? input.value : "").trim().toLowerCase();
    var hits = 0;
    rows.forEach(function (row) {
      var match = !q || row.dataset.search.indexOf(q) !== -1;
      row.hidden = !match;
      if (match) hits++;
    });
    if (empty) empty.hidden = hits > 0;
  }

  open(false);

  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    open(panel.hidden);
  });

  if (input) {
    input.addEventListener("input", filter);
    // Enter jumps to the first visible result.
    input.addEventListener("keydown", function (e) {
      if (e.key !== "Enter") return;
      var first = rows.filter(function (r) { return !r.hidden; })[0];
      if (first) { e.preventDefault(); first.click(); }
    });
  }

  document.addEventListener("click", function (e) {
    if (!root.contains(e.target)) open(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !panel.hidden) { open(false); btn.focus(); }
  });
})();
