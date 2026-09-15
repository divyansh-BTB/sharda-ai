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

  var CONTENT = {"askUrl":"https://ai.shardacare.com/q","homeUrl":"https://ai.shardacare.com/","helplineDisplay":"73000 40000","helplineTel":"+917300040000","whatsappUrl":"https://wa.me/917300040000","note":{"records":"Answers come from the hospital's verified records","language":"हिंदी ya English, dono chalega","emergency":"Emergency?"},"ctaLabel":"Ask Bhartiya Didi","placeholderPhrases":["Which doctor should I see for chest pain?","What does the heart checkup at ₹499 include?","Is cashless insurance accepted here?","Book an appointment with a neurologist","Best full body checkup for my parents?","Kya knee replacement yahan hota hai?","How do I get a free second opinion?"],"suggestedQuestions":[{"label":"Find the Right Doctor","question":"I have chest pain. Which cardiologist should I see at ShardaCare and when are they available?"},{"label":"Heart Checkup ₹499","question":"What does the ₹499 heart checkup at ShardaCare include?"},{"label":"Book an Appointment","question":"How do I book an OPD appointment at ShardaCare and what are the timings?"},{"label":"Insurance & Cashless","question":"Which insurance companies and TPAs are on panel at ShardaCare for cashless treatment?"},{"label":"Treatment Costs","question":"What do common treatments and surgeries cost at ShardaCare?"},{"label":"Free Second Opinion","question":"How do I get a free second opinion from ShardaCare's senior specialists using my medical reports?"}]};
  var STYLES = ":host {\ndisplay: block;\n}\n*,\n*::before,\n*::after {\nbox-sizing: border-box;\n}\nbutton,\ninput,\na,\np,\nul,\nli,\nnav,\nform,\nspan,\ndiv,\nem,\ni,\nsvg {\nmargin: 0;\npadding: 0;\nfont: inherit;\ncolor: inherit;\nletter-spacing: inherit;\ntext-transform: none;\ntext-align: inherit;\n}\nbutton {\nbackground: none;\nborder: 0;\ncursor: pointer;\n}\ninput {\nbackground: none;\nborder: 0;\noutline: 0;\nborder-radius: 0;\n-webkit-appearance: none;\nappearance: none;\n}\na {\ntext-decoration: none;\n}\nul {\nlist-style: none;\n}\n.scai {\nfont-family: Mulish, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\",\nRoboto, sans-serif;\nfont-size: 16px;\nfont-weight: 400;\nfont-style: normal;\nline-height: 1.4;\nletter-spacing: normal;\ntext-align: left;\ndirection: ltr;\n-webkit-font-smoothing: antialiased;\n--primary: #1e5a8e;\n--primary-dark: #143d61;\n--ink: #16283a;\n--accent: #e3376d;\n--accent-dark: #c72a5c;\n--line: #e3e8f1;\n--muted: #586080;\n--indigo: #313669;\n--cta: linear-gradient(90deg, #de2263 0%, #e96e33 100%);\nposition: fixed;\ninset-inline: 0;\nbottom: 0;\nz-index: 2147483000;\n}\n.scai--inline {\nposition: relative;\nz-index: auto;\n}\n.scai__stage {\nposition: relative;\n}\n.scai__glass {\nposition: absolute;\ninset: 0;\npointer-events: none;\nbackground: linear-gradient(\nto top,\nrgba(231, 237, 245, 0.95),\nrgba(238, 243, 249, 0.8) 55%,\nrgba(255, 255, 255, 0.1)\n);\nbackdrop-filter: blur(18px) saturate(1.35);\n-webkit-backdrop-filter: blur(18px) saturate(1.35);\n-webkit-mask-image: linear-gradient(\nto top,\n#000 0%,\n#000 52%,\ntransparent 100%\n);\nmask-image: linear-gradient(to top, #000 0%, #000 52%, transparent 100%);\n}\n.scai--inline .scai__glass {\ndisplay: none;\n}\n.scai__inner {\nposition: relative;\nwidth: 100%;\nmax-width: 768px;\nmargin: 0 auto;\npadding: 48px 16px max(16px, env(safe-area-inset-bottom));\n}\n.scai--inline .scai__inner {\npadding: 0;\n}\n.scai__chips {\nmargin-bottom: 12px;\noverflow-x: auto;\nscrollbar-width: none;\n-webkit-mask-image: linear-gradient(\n90deg,\ntransparent,\n#000 22px,\n#000 calc(100% - 22px),\ntransparent\n);\nmask-image: linear-gradient(\n90deg,\ntransparent,\n#000 22px,\n#000 calc(100% - 22px),\ntransparent\n);\n}\n.scai__chips::-webkit-scrollbar {\ndisplay: none;\n}\n.scai__chiplist {\ndisplay: flex;\nwidth: max-content;\nalign-items: center;\ngap: 8px;\npadding: 4px 6px;\n}\n.scai__chip {\ndisplay: inline-flex;\nmax-width: 210px;\nalign-items: center;\noverflow: hidden;\nborder-radius: 999px;\nbackground: #fff;\npadding: 8px 16px;\nfont-size: 13px;\nfont-weight: 500;\nwhite-space: nowrap;\ncolor: rgba(22, 40, 58, 0.8);\nbox-shadow:\n0 0 0 1px rgba(22, 40, 58, 0.06),\n0 1px 2px rgba(22, 40, 58, 0.06),\n0 4px 10px -6px rgba(20, 61, 97, 0.25);\ntransition:\ncolor 0.15s,\nbox-shadow 0.15s;\nanimation: scai-chip-in 0.45s cubic-bezier(0.34, 1.4, 0.5, 1) backwards;\n}\n.scai__chip:hover {\ncolor: var(--primary);\nbox-shadow:\n0 0 0 1px rgba(30, 90, 142, 0.25),\n0 2px 4px rgba(22, 40, 58, 0.08),\n0 8px 18px -8px rgba(20, 61, 97, 0.35);\n}\n.scai__chip:focus-visible {\noutline: 2px solid var(--primary);\noutline-offset: 2px;\n}\n.scai__row {\ndisplay: flex;\nwidth: 100%;\nalign-items: center;\ngap: 12px;\n}\n.scai__field {\nmin-width: 0;\nflex: 1 1 auto;\nborder-radius: 17px;\npadding: 1px;\nbackground: linear-gradient(\n90deg,\nrgba(30, 90, 142, 0.55),\nrgba(49, 54, 105, 0.45),\nrgba(227, 55, 109, 0.55)\n);\nbox-shadow:\n0 2px 6px -2px rgba(22, 40, 58, 0.1),\n0 18px 44px -16px rgba(20, 61, 97, 0.45);\ntransition: background 0.3s, box-shadow 0.3s;\n}\n.scai__field:focus-within {\nbackground: linear-gradient(90deg, #1e5a8e, #313669, #e3376d);\nbox-shadow:\n0 2px 8px -2px rgba(22, 40, 58, 0.12),\n0 24px 56px -16px rgba(20, 61, 97, 0.55);\n}\n.scai__pill {\ndisplay: flex;\nwidth: 100%;\nalign-items: center;\ngap: 12px;\nborder-radius: 16px;\nbackground: #fff;\npadding: 6px 6px 6px 12px;\nbox-shadow:\n0 1px 2px rgba(22, 40, 58, 0.05),\n0 2px 6px -2px rgba(22, 40, 58, 0.08);\n}\n.scai__badge {\nflex: 0 0 auto;\nborder-radius: 8px;\nbackground: rgba(30, 90, 142, 0.09);\npadding: 6px 8px;\nfont-size: 10px;\nfont-weight: 600;\nline-height: 1;\nletter-spacing: 0.02em;\ncolor: var(--primary-dark);\n}\n.scai__badge i {\nfont-style: normal;\nopacity: 0.4;\n}\n.scai__divider {\nflex: 0 0 auto;\nwidth: 1px;\nheight: 24px;\nbackground: var(--line);\n}\n.scai__inputwrap {\nposition: relative;\nmin-width: 0;\nflex: 1 1 auto;\n}\n.scai__input {\nwidth: 100%;\npadding: 10px 0;\nfont-size: 16px;\nfont-weight: 500;\nletter-spacing: -0.01em;\ncolor: var(--ink);\n}\n.scai__input::-webkit-search-cancel-button {\ndisplay: none;\n}\n.scai__phrases {\nposition: absolute;\ninset: 0;\ndisplay: flex;\nalign-items: center;\noverflow: hidden;\npointer-events: none;\nopacity: 0;\n}\n.scai__input:placeholder-shown ~ .scai__phrases {\nopacity: 1;\n}\n.scai__phrase {\nposition: absolute;\ninset-inline: 0;\noverflow: hidden;\ntext-overflow: ellipsis;\nwhite-space: nowrap;\nfont-size: 16px;\ncolor: rgba(88, 96, 128, 0.55);\nanimation: scai-phrase 28s ease-in-out infinite both;\n}\n.scai__send {\ndisplay: flex;\nflex: 0 0 auto;\nwidth: 36px;\nheight: 36px;\nalign-items: center;\njustify-content: center;\nborder-radius: 999px;\ncolor: var(--accent);\ntransition: background 0.15s, color 0.15s;\n}\n.scai__send svg {\nwidth: 20px;\nheight: 20px;\nmargin-left: -1px;\n}\n.scai__send:hover {\nbackground: rgba(227, 55, 109, 0.1);\ncolor: var(--accent-dark);\n}\n.scai__send:focus-visible {\noutline: 2px solid var(--accent);\noutline-offset: 2px;\n}\n.scai__field:has(.scai__input:placeholder-shown) .scai__send {\ncolor: rgba(88, 96, 128, 0.4);\ncursor: default;\n}\n.scai__field:has(.scai__input:placeholder-shown) .scai__send:hover {\nbackground: none;\n}\n.scai__cta {\ndisplay: none;\nflex: 0 0 auto;\nalign-items: center;\nborder-radius: 12px;\nbackground: var(--cta);\npadding: 14px 24px;\nfont-size: 14px;\nfont-weight: 600;\nwhite-space: nowrap;\ncolor: #fff;\nbox-shadow:\ninset 0 1px 0 rgba(255, 255, 255, 0.3),\n0 8px 22px -8px rgba(222, 34, 99, 0.8);\ntransition: filter 0.15s;\n}\n.scai__cta:hover {\nfilter: brightness(1.07);\n}\n.scai__cta:focus-visible {\noutline: 2px solid var(--accent);\noutline-offset: 2px;\n}\n@media (min-width: 640px) {\n.scai__cta {\ndisplay: inline-flex;\n}\n}\n.scai__note {\nmargin-top: 12px;\ntext-align: center;\nfont-size: 12px;\nline-height: 20px;\ncolor: rgba(22, 40, 58, 0.85);\n}\n.scai__note em {\nfont-style: normal;\nmargin: 0 8px;\nopacity: 0.3;\n}\n.scai__note a {\nfont-weight: 600;\ncolor: var(--accent-dark);\ntext-underline-offset: 2px;\n}\n.scai__note a:hover {\ntext-decoration: underline;\n}\n@keyframes scai-chip-in {\nfrom {\nopacity: 0;\ntransform: translateY(6px) scale(0.96);\n}\nto {\nopacity: 1;\ntransform: none;\n}\n}\n@keyframes scai-phrase {\n0% {\nopacity: 0;\ntransform: translateY(4px);\n}\n2.14%,\n12.14% {\nopacity: 1;\ntransform: none;\n}\n14.29%,\n100% {\nopacity: 0;\ntransform: translateY(-4px);\n}\n}\n@media (prefers-reduced-motion: reduce) {\n.scai__chip {\nanimation: none;\n}\n.scai__phrase {\nanimation: none;\nopacity: 0;\n}\n.scai__phrase:first-child {\nopacity: 1;\n}\n}";
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
