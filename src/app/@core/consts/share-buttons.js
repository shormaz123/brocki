! function(e, t) { "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).ShareButtons = t() }(this, function() { "use strict"; var f = window,
        m = f.document; var e = new function() {
        function s(e, n) { return e.replace(/\{(\d+)\}/g, function(e, t) { return n[t] || e }) }

        function u(e) { return e.join(" - ") }

        function l(e) { return encodeURIComponent(e) }
        this.i = function() { var e, t = m.querySelectorAll(".share-btn"); for (e = t.length; e--;) n(t[e]) }; var n = function(e) { var t, n = e.querySelectorAll("a"); for (t = n.length; t--;) r(n[t], { id: "", url: i(e), title: c(e), desc: o(e) }) },
            r = function(e, t) { t.id = h(e, "data-id"), t.id && a(e, "click", t) },
            i = function(e) { return h(e, "data-url") || location.href || " " },
            c = function(e) { return h(e, "data-title") || m.title || " " },
            o = function(e) { var t = m.querySelector("meta[name=description]"); return h(e, "data-desc") || t && h(t, "content") || " " },
            a = function(e, t, n) {
                function r() { d(n.id, n.url, n.title, n.desc) }
                e.addEventListener ? e.addEventListener(t, r) : e.attachEvent("on" + t, function() { r.call(e) }) },
            h = function(e, t) { return e.getAttribute(t) },
            d = function(e, t, n, r) { var i = l(t),
                    c = l(r),
                    o = l(n),
                    a = o || c || ""; switch (e) {
                    case "fb":
                        p(s("https://www.facebook.com/sharer/sharer.php?u={0}&quote={1}", [i, o]), n); break;
                    case "vk":
                        p(s("https://vk.com/share.php?url={0}&title={1}", [i, u([o, c])]), n); break;
                    case "tw":
                        p(s("https://twitter.com/intent/tweet?url={0}&text={1}", [i, u([o, c])]), n); break;
                    case "tg":
                        p(s("https://t.me/share/url?url={0}&text={1}", [i, u([o, c])]), n); break;
                    case "pk":
                        p(s("https://getpocket.com/edit?url={0}&title={1}", [i, u([o, c])]), n); break;
                    case "re":
                        p(s("https://reddit.com/submit/?url={0}", [i]), n); break;
                    case "ev":
                        p(s("https://www.evernote.com/clip.action?url={0}&t={1}", [i, o]), n); break;
                    case "in":
                        p(s("https://www.linkedin.com/shareArticle?mini=true&url={0}&title={1}&summary={2}&source={0}", [i, o, u([o, c])]), n); break;
                    case "pi":
                        p(s("https://pinterest.com/pin/create/button/?url={0}&media={0}&description={1}", [i, u([o, c])]), n); break;
                    case "sk":
                        p(s("https://web.skype.com/share?url={0}&source=button&text={1}", [i, u([o, c])]), n); break;
                    case "wa":
                        p(s("https://wa.me/?text={0}%20{1}", [u([o, c]), i]), n); break;
                    case "ok":
                        p(s("https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&service=odnoklassniki&st.shareUrl={0}", [i]), n); break;
                    case "tu":
                        p(s("https://www.tumblr.com/widgets/share/tool?posttype=link&title={0}&caption={0}&content={1}&canonicalUrl={1}&shareSource=tumblr_share_button", [u([o, c]), i]), n); break;
                    case "hn":
                        p(s("https://news.ycombinator.com/submitlink?t={0}&u={1}", [u([o, c]), i]), n); break;
                    case "xi":
                        p(s("https://www.xing.com/app/user?op=share;url={0};title={1}", [i, u([o, c])]), n); break;
                    case "mail":
                        0 < o.length && 0 < c.length && (a = u([o, c])), 0 < i.length && (a = a + " / " + i), location.href = s("mailto:?subject={0}&body={1}", [o, a]); break;
                    case "print":
                        window.print() } },
            p = function(e, t) { var n = void 0 !== f.screenLeft ? f.screenLeft : screen.left,
                    r = void 0 !== f.screenTop ? f.screenTop : screen.top,
                    i = (f.innerWidth || m.documentElement.clientWidth || screen.width) / 2 - 300 + n,
                    c = (f.innerHeight || m.documentElement.clientHeight || screen.height) / 3 - 400 / 3 + r,
                    o = f.open(e, "", s("resizable,toolbar=yes,location=yes,scrollbars=yes,menubar=yes,width={0},height={1},top={2},left={3}", [600, 400, c, i]));
                null !== o && o.focus && o.focus() } }; return e.i(), { update: function() { e.i() } } });