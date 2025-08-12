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

  // --- Fix Lightbox: chặn Lenis bắt anchor "#" ---
  document.querySelectorAll(".w-lightbox").forEach((lightbox) => {
    // Ngăn Lenis intercept click này
    lightbox.addEventListener(
      "click",
      (e) => {
        e.stopPropagation(); // Chặn Lenis anchor handler
      },
      true // capture phase để chặn trước khi Lenis xử lý
    );

    // Khi mở Lightbox → dừng Lenis
    lightbox.addEventListener("click", () => {
      lenis.stop();
    });
  });

  // --- Khi Lightbox đóng → resume Lenis ---
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      lenis.start();
    }
  });

  document.addEventListener("click", (e) => {
    if (
      e.target.closest(".w-lightbox-close") ||
      e.target.closest(".w-lightbox-backdrop")
    ) {
      lenis.start();
    }
  });

  /** ===========================================||===================================== */

  // Custom mouse cursor animation
  const mouseDot = document.querySelector(".mouse-dot");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let dotX = mouseX;
  let dotY = mouseY;
  let isMoving = false;
  let timeoutId;

  // Set initial position
  mouseDot.style.left = `${mouseX}px`;
  mouseDot.style.top = `${mouseY}px`;

  // Mouse move
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMoving = true;
    mouseDot.classList.add("active");

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      isMoving = false;
      mouseDot.classList.remove("active");
      animateDotToTarget();
    }, 150);
  });

  window.addEventListener("message", (event) => {
    if (event.data.type === "mousemove") {
      updateDot(event.data.x, event.data.y);
    }
  });

  // Smooth animation loop
  (function smoothMove() {
    dotX += (mouseX - dotX) * 0.15;
    dotY += (mouseY - dotY) * 0.15;
    updateDot(dotX, dotY);
    requestAnimationFrame(smoothMove);
  })();

  // On mouse leave
  document.addEventListener("mouseleave", () => {
    isMoving = false;
    mouseDot.classList.remove("active");
    mouseDot.style.opacity = "0";
  });

  // On mouse enter
  document.addEventListener("mouseenter", () => {
    mouseDot.style.opacity = "1";
  });

  // On resize
  window.addEventListener("resize", () => {
    if (!isMoving) {
      mouseX = window.innerWidth / 2;
      mouseY = window.innerHeight / 2;
      dotX = mouseX;
      dotY = mouseY;
      updateDot(dotX, dotY);
    }
  });

  // Animate when idle
  function animateDotToTarget() {
    const dx = mouseX - dotX;
    const dy = mouseY - dotY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 1) {
      dotX += dx * 0.15;
      dotY += dy * 0.15;
      updateDot(dotX, dotY);
      requestAnimationFrame(animateDotToTarget);
    } else {
      dotX = mouseX;
      dotY = mouseY;
      updateDot(dotX, dotY);
    }
  }

  function updateDot(x, y) {
    mouseDot.style.left = x + "px";
    mouseDot.style.top = y + "px";
  }
});
