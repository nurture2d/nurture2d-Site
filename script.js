document.addEventListener("DOMContentLoaded", () => {

  // Year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Navbar scroll effect
  const navbar = document.getElementById("navbar");
  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Hamburger menu
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
    // Close on link click
    navLinks.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => navLinks.classList.remove("open"));
    });
  }

  // Reveal on scroll
  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings in same parent
        const siblings = [...entry.target.parentElement.querySelectorAll(".reveal:not(.visible)")];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, idx * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  reveals.forEach(el => observer.observe(el));

  // Showcase media renderer
  // Supports data-media="image|gif|video|svg"
  // gif and image both render as <img> — gifs autoplay natively
  document.querySelectorAll(".showcase-media[data-media]").forEach(el => {
    const type = el.dataset.media;
    const src  = el.dataset.src;
    const alt  = el.dataset.alt || "";
    if (!src) return; // svg type has inline content, skip
    if (type === "image" || type === "gif") {
      const img = document.createElement("img");
      img.src = src;
      img.alt = alt;
      el.appendChild(img);
    } else if (type === "video") {
      const vid = document.createElement("video");
      vid.src = src;
      vid.autoplay = true;
      vid.loop = true;
      vid.muted = true;
      vid.playsInline = true;
      el.appendChild(vid);
    }
  });
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav-links a[href^='#']");
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute("href") === `#${entry.target.id}`
            ? "var(--text)"
            : "";
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => sectionObserver.observe(s));

});
