/**
 * ShardaCare "Ask Bhartiya Didi" embed.
 *
 * Drop-in for any site:
 *   <script src="https://ai.shardacare.com/embed.js" defer></script>
 *
 * Options, read off the script tag itself:
 *   data-target="#selector"  render inline there instead of docked to the bottom
 *   data-source="wordpress"  tags outgoing links with utm_source for attribution
 *
 * Everything lives in a shadow root, so the host page's CSS cannot reach in and
 * ours cannot leak out. The bar is a native GET form: once injected, submitting
 * is the browser's job, not ours.
 */
(function () {
  "use strict";

  var CONTENT = __CONTENT__;
  var STYLES = __STYLES__;
  var FONT_HREF =
    "https://fonts.googleapis.com/css2?family=Mulish:wght@200..1000&display=swap";

  if (window.__shardacareAskLoaded) return;
  window.__shardacareAskLoaded = true;

  var tag = document.currentScript;
  var target = tag && tag.dataset.target;
  var source = (tag && tag.dataset.source) || "embed";

  /** Same encoding the native form produces: spaces as "+", not "%20". */
  function askUrl(query) {
    var p = new URLSearchParams({ query: query });
    p.set("utm_source", source);
    p.set("utm_medium", "askbar");
    return CONTENT.askUrl + "?" + p.toString();
  }

  function homeUrl() {
    var p = new URLSearchParams({ utm_source: source, utm_medium: "askbar" });
    return CONTENT.homeUrl + "?" + p.toString();
  }

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* @font-face inside a shadow root is ignored, so Mulish has to be loaded
     at document level or the bar silently falls back to a system font. */
  function loadFont() {
    if (document.querySelector('link[data-scai-font]')) return;
    var l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = FONT_HREF;
    l.setAttribute("data-scai-font", "");
    document.head.appendChild(l);
  }

  function chips() {
    return CONTENT.suggestedQuestions
      .map(function (q, i) {
        return (
          '<li><a class="scai__chip" style="animation-delay:' +
          i * 60 +
          'ms" href="' + esc(askUrl(q.question)) + '">' +
          esc(q.label) + "</a></li>"
        );
      })
      .join("");
  }

  function phrases() {
    return CONTENT.placeholderPhrases
      .map(function (p, i) {
        return (
          '<span class="scai__phrase" style="animation-delay:' +
          i * 4 + 's">' + esc(p) + "</span>"
        );
      })
      .join("");
  }

  var SEND_ICON =
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
    '<path d="M3.5 20.5l17.1-7.32a1 1 0 0 0 0-1.84L3.5 4.02a.98.98 0 0 0-1.37.9L2.1 9.4c0 .49.36.9.85.97L15 12l-12.05 1.63c-.49.07-.85.48-.85.97l.03 4.5c0 .7.72 1.18 1.37.9z"></path></svg>';

  function markup() {
    return (
      '<div class="scai' + (target ? " scai--inline" : "") + '">' +
        '<div class="scai__stage">' +
          '<div class="scai__glass" aria-hidden="true"></div>' +
          '<div class="scai__inner">' +
            '<nav class="scai__chips" aria-label="Suggested questions">' +
              '<ul class="scai__chiplist">' + chips() + "</ul>" +
            "</nav>" +
            '<div class="scai__row">' +
              '<form class="scai__field" action="' + esc(CONTENT.askUrl) +
                '" method="GET">' +
                                '<div class="scai__pill">' +
                  '<span class="scai__badge" aria-hidden="true">हिं<i>/</i>EN</span>' +
                  '<span class="scai__divider" aria-hidden="true"></span>' +
                  '<div class="scai__inputwrap">' +
                    '<input class="scai__input" type="search" name="query" required ' +
                      'maxlength="300" autocomplete="off" enterkeyhint="search" ' +
                      'placeholder=" " aria-label="Ask Bhartiya Didi, in Hindi or English">' +
                    '<span class="scai__phrases" aria-hidden="true">' + phrases() + "</span>" +
                  "</div>" +
                  '<button class="scai__send" type="submit" aria-label="Ask">' +
                    SEND_ICON +
                  "</button>" +
                "</div>" +
                '<input type="hidden" name="utm_source" value="' + esc(source) + '">' +
                '<input type="hidden" name="utm_medium" value="askbar">' +
              "</form>" +
              '<a class="scai__cta" href="' + esc(homeUrl()) + '">' +
                esc(CONTENT.ctaLabel) +
              "</a>" +
            "</div>" +
            '<p class="scai__note">' +
              esc(CONTENT.note.records) +
              "<em>&middot;</em>" +
              esc(CONTENT.note.language) +
              "<em>&middot;</em>" +
              esc(CONTENT.note.emergency) +
              ' <a href="tel:' + esc(CONTENT.helplineTel) + '">Call ' +
              esc(CONTENT.helplineDisplay) + "</a>" +
            "</p>" +
          "</div>" +
        "</div>" +
      "</div>"
    );
  }

  function mount() {
    var slot = target ? document.querySelector(target) : null;
    if (target && !slot) {
      console.warn("[shardacare] data-target not found:", target);
      return;
    }

    loadFont();

    var host = document.createElement("div");
    host.setAttribute("data-shardacare-ask", "");
    /* Inline so the host page's own rules (e.g. `div { font: ... }`) cannot
       touch our host element. display:block is restored explicitly because
       `all:initial` would otherwise make it inline. */
    host.style.cssText = "all:initial;display:block";

    var root = host.attachShadow({ mode: "open" });
    root.innerHTML =
      "<style>" + STYLES + "</style>" + markup();

    (slot || document.body).appendChild(host);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
