document.addEventListener("DOMContentLoaded", function () {
  const lenis = new Lenis({
    anchors: true,
  });

  // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
  lenis.on("scroll", ScrollTrigger.update);

  // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
  // This ensures Lenis's smooth scroll animation updates on each GSAP tick
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Convert time from seconds to milliseconds
  });

  // Disable lag smoothing in GSAP to prevent any delay in scroll animations
  gsap.ticker.lagSmoothing(0);

  /** ===========================================||===================================== */

  // Custom mouse cursor animation
  let e = document.querySelector(".mouse-dot"),
    t = document.querySelector(".mouse-animation-container"),
    s = window.innerWidth / 2,
    l = window.innerHeight / 2,
    n = s,
    i = l,
    o = !1,
    a,
    r = [];
  (e.style.left = s + "px"),
    (e.style.top = l + "px"),
    document.addEventListener("mousemove", (p) => {
      (s = p.clientX),
        (l = p.clientY),
        (o = !0),
        e.classList.add("active"),
        (function e(s, l) {
          let n = document.createElement("div");
          if (
            ((n.className = "mouse-trail"),
            (n.style.left = s + "px"),
            (n.style.top = l + "px"),
            t.appendChild(n),
            r.push(n),
            setTimeout(() => {
              (n.style.opacity = "0"),
                (n.style.transform = "translate(-50%, -50%) scale(0)"),
                (n.style.transition = "all 0.5s ease-out");
            }, 50),
            setTimeout(() => {
              n.parentNode && n.parentNode.removeChild(n),
                (r = r.filter((e) => e !== n));
            }, 550),
            r.length > 20)
          ) {
            let i = r.shift();
            i.parentNode && i.parentNode.removeChild(i);
          }
        })(s, l),
        clearTimeout(a),
        (a = setTimeout(() => {
          (o = !1),
            e.classList.remove("active"),
            (function t() {
              let a = () => {
                let t = s - n,
                  o = l - i;
                Math.sqrt(t * t + o * o) > 1
                  ? ((n += 0.15 * t),
                    (i += 0.15 * o),
                    (e.style.left = n + "px"),
                    (e.style.top = i + "px"),
                    requestAnimationFrame(a))
                  : ((n = s),
                    (i = l),
                    (e.style.left = n + "px"),
                    (e.style.top = i + "px"));
              };
              o || a();
            })();
        }, 150));
    }),
    !(function t() {
      (n += (s - n) * 0.15),
        (i += (l - i) * 0.15),
        (e.style.left = n + "px"),
        (e.style.top = i + "px"),
        requestAnimationFrame(t);
    })(),
    document.addEventListener("mouseleave", () => {
      (o = !1), e.classList.remove("active"), (e.style.opacity = "0");
    }),
    document.addEventListener("mouseenter", () => {
      e.style.opacity = "1";
    }),
    window.addEventListener("resize", () => {
      o ||
        ((s = window.innerWidth / 2),
        (l = window.innerHeight / 2),
        (n = s),
        (i = l),
        (e.style.left = s + "px"),
        (e.style.top = l + "px"));
    });
});
