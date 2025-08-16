document.addEventListener("DOMContentLoaded", function () {
  const lenis = new Lenis({
    anchors: true,
  });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  document.querySelectorAll('.w-lightbox[href="#"]').forEach((el) => {
    el.setAttribute("href", "javascript:void(0)");
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

  // Check if mouse is over iframe and hide dot
  function checkIframeOverlap() {
    const iframes = document.querySelectorAll("iframe");
    let isOverIframe = false;

    iframes.forEach((iframe) => {
      const rect = iframe.getBoundingClientRect();
      if (
        mouseX >= rect.left &&
        mouseX <= rect.right &&
        mouseY >= rect.top &&
        mouseY <= rect.bottom
      ) {
        isOverIframe = true;
      }
    });

    // Hide/show mouse dot based on iframe overlap
    if (isOverIframe) {
      mouseDot.style.opacity = "0";
    } else {
      mouseDot.style.opacity = "1";
    }
  }

  // Update mouse position and check iframe overlap
  function updateMousePosition(x, y) {
    mouseX = x;
    mouseY = y;
    checkIframeOverlap();
  }

  // Override the original mousemove to include iframe check
  document.addEventListener("mousemove", (e) => {
    updateMousePosition(e.clientX, e.clientY);
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
      updateMousePosition(event.data.x, event.data.y);
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
    updateMousePosition(x, y);
  }
});
