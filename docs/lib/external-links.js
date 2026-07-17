document.addEventListener("DOMContentLoaded", function () {
  var links = document.querySelectorAll("a[href]");
  links.forEach(function (a) {
    var href = a.getAttribute("href");
    if (!href) return;
    // Only consider absolute http(s) links
    if (href.indexOf("http://") !== 0 && href.indexOf("https://") !== 0) return;
    try {
      var url = new URL(href, location.origin);
      // Treat as external when hostname differs
      if (url.hostname !== location.hostname) {
        if (!a.hasAttribute("target")) a.setAttribute("target", "_blank");
        var rel = a.getAttribute("rel") || "";
        if (!/\bnoopener\b/.test(rel)) rel = (rel + " noopener").trim();
        if (!/\bnoreferrer\b/.test(rel)) rel = (rel + " noreferrer").trim();
        a.setAttribute("rel", rel);
      }
    } catch (e) {
      // ignore malformed URLs
    }
  });
});
