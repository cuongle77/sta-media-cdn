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

  document.querySelectorAll("a.prevent-default").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
    });
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

  // Smooth animation loop
  (function smoothMove() {
    dotX += (mouseX - dotX) * 0.15;
    dotY += (mouseY - dotY) * 0.15;
    mouseDot.style.left = `${dotX}px`;
    mouseDot.style.top = `${dotY}px`;
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
      mouseDot.style.left = `${dotX}px`;
      mouseDot.style.top = `${dotY}px`;
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
      mouseDot.style.left = `${dotX}px`;
      mouseDot.style.top = `${dotY}px`;
      requestAnimationFrame(animateDotToTarget);
    } else {
      dotX = mouseX;
      dotY = mouseY;
      mouseDot.style.left = `${dotX}px`;
      mouseDot.style.top = `${dotY}px`;
    }
  }
});
