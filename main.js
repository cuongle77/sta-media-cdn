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
  let mouseDot = document.querySelector(".mouse-dot");
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let dotX = mouseX;
  let dotY = mouseY;
  let isMoving = false;

  // Set initial position
  mouseDot.style.left = mouseX + "px";
  mouseDot.style.top = mouseY + "px";

  // Mouse move event
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMoving = true;
    mouseDot.classList.add("active");
  });

  // Animation loop with same easing as your code (0.15)
  function animate() {
    dotX += (mouseX - dotX) * 0.08;
    dotY += (mouseY - dotY) * 0.08;

    mouseDot.style.left = dotX + "px";
    mouseDot.style.top = dotY + "px";

    requestAnimationFrame(animate);
  }

  // Start animation
  animate();

  // Mouse leave/enter handling
  document.addEventListener("mouseleave", () => {
    isMoving = false;
    mouseDot.classList.remove("active");
    mouseDot.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    mouseDot.style.opacity = "1";
  });

  // Resize handling
  window.addEventListener("resize", () => {
    if (!isMoving) {
      mouseX = window.innerWidth / 2;
      mouseY = window.innerHeight / 2;
      dotX = mouseX;
      dotY = mouseY;
      mouseDot.style.left = mouseX + "px";
      mouseDot.style.top = mouseY + "px";
    }
  });

  // Start animation
  animate();

  // Create floating particles
  function createParticle() {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * window.innerWidth + "px";
    particle.style.top = Math.random() * window.innerHeight + "px";

    document.body.appendChild(particle);

    // Animate particle
    const duration = 3000 + Math.random() * 2000;
    const startTime = Date.now();

    function animateParticle() {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;

      if (progress >= 1) {
        particle.remove();
        return;
      }

      // Float upward
      const startY = parseFloat(particle.style.top);
      particle.style.top = startY - progress * 100 + "px";
      particle.style.opacity = 1 - progress;

      requestAnimationFrame(animateParticle);
    }

    animateParticle();
  }

  // Create particles periodically
  setInterval(createParticle, 1000);

  // Responsive handling
  window.addEventListener("resize", () => {
    // Update any position-dependent calculations if needed
  });
});
