// Cookie banner + Google Analytics (GA4). GA loads only after the visitor
// accepts — declining (or ignoring the banner) means no script, no cookies.
// Swap GA_MEASUREMENT_ID for the real one from analytics.google.com.
(function () {
  var GA_MEASUREMENT_ID = "G-EMYRFP5TE6";
  var STORAGE_KEY = "cookie-consent";

  function loadGA() {
    if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID.indexOf("XXXX") !== -1) return;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID);
  }

  function setConsent(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) {}
    if (value === "granted") loadGA();
  }

  function showBanner() {
    var el = document.createElement("div");
    el.className = "cookie-banner";
    el.innerHTML =
      '<div class="cookie-banner-inner">' +
        '<p class="cookie-banner-text">This site uses Google Analytics to see which pages get read &mdash; no ad tracking, no data sold. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Learn more</a>.</p>' +
        '<div class="cookie-banner-actions">' +
          '<button type="button" class="btn btn-outline cookie-decline">Decline</button>' +
          '<button type="button" class="btn btn-primary cookie-accept">Accept</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(el);

    el.querySelector(".cookie-accept").addEventListener("click", function () {
      setConsent("granted");
      el.remove();
    });
    el.querySelector(".cookie-decline").addEventListener("click", function () {
      setConsent("denied");
      el.remove();
    });
  }

  var existing;
  try { existing = localStorage.getItem(STORAGE_KEY); } catch (e) { existing = null; }

  if (existing === "granted") loadGA();
  else if (existing !== "denied") showBanner();
})();
