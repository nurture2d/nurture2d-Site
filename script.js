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

  // ── Showcase media renderer ──────────────────────────────────────────
  // Supports data-media="image|gif|video|svg"
  // gif and image both render as <img> — gifs autoplay natively
  document.querySelectorAll(".showcase-media[data-media]").forEach(el => {
    const type = el.dataset.media;
    const src  = el.dataset.src;
    const alt  = el.dataset.alt || "";
    if (!src || el.children.length > 0) return; // skip if already has content or no src
    if (type === "image" || type === "gif") {
      const img = document.createElement("img");
      img.src = src; img.alt = alt;
      el.appendChild(img);
    } else if (type === "video") {
      const vid = document.createElement("video");
      vid.src = src; vid.autoplay = true;
      vid.loop = true; vid.muted = true; vid.playsInline = true;
      el.appendChild(vid);
    }
  });

  // ── Showcase canvas: wave-grid with warm glowing orbs ────────────────
  (function () {
    const canvas = document.getElementById("showcase-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const wrap = canvas.parentElement;

    // Grid config
    const COLS = 14, ROWS = 20;
    const SPEED = 0.0006;   // wave speed — keep low for lightweight feel
    let W, H, cw, ch, t = 0;

    // Warm orb colours cycling through grid points
    const ORB_COLORS = [
      [180, 80, 255],   // violet
      [255, 120, 40],   // amber
      [220, 60, 180],   // magenta
      [100, 160, 255],  // cool blue accent
    ];

    function resize() {
      // Canvas covers the dark-side column (left 50% of wrap)
      const rect = wrap.getBoundingClientRect();
      W = Math.round(rect.width * 0.5);
      H = rect.height || wrap.offsetHeight;
      canvas.width  = W;
      canvas.height = H;
      cw = W / (COLS - 1);
      ch = H / (ROWS - 1);
    }

    function lerp(a, b, t) { return a + (b - a) * t; }

    function draw() {
      t += SPEED;
      ctx.clearRect(0, 0, W, H);

      // ── Base background: matches --grey-800 ──
      ctx.fillStyle = "#1c1c1f";
      ctx.fillRect(0, 0, W, H);

      // ── Vignette: darker corners ──
      const vg = ctx.createRadialGradient(W * 0.5, H * 0.4, H * 0.1, W * 0.5, H * 0.4, H * 0.9);
      vg.addColorStop(0,   "rgba(30,20,60,0)");
      vg.addColorStop(0.6, "rgba(10,6,24,0.3)");
      vg.addColorStop(1,   "rgba(4,2,12,0.75)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, W, H);

      // ── Compute wave-displaced grid points ──
      const pts = [];
      for (let r = 0; r < ROWS; r++) {
        pts[r] = [];
        for (let c = 0; c < COLS; c++) {
          const bx = c * cw;
          const by = r * ch;
          // Two overlapping sine waves for organic feel
          const dx = Math.sin(r * 0.45 + t * 6.2 + c * 0.3) * cw * 0.18;
          const dy = Math.cos(c * 0.4  + t * 5.1 + r * 0.25) * ch * 0.18;
          pts[r][c] = { x: bx + dx, y: by + dy };
        }
      }

      // ── Draw grid lines ──
      ctx.lineWidth = 0.6;
      // Horizontal
      for (let r = 0; r < ROWS; r++) {
        const alpha = 0.08 + 0.04 * Math.sin(r * 0.5 + t * 3);
        ctx.strokeStyle = `rgba(140,80,255,${alpha})`;
        ctx.beginPath();
        for (let c = 0; c < COLS; c++) {
          const p = pts[r][c];
          c === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
      // Vertical
      for (let c = 0; c < COLS; c++) {
        const alpha = 0.08 + 0.04 * Math.sin(c * 0.5 + t * 2.5);
        ctx.strokeStyle = `rgba(140,80,255,${alpha})`;
        ctx.beginPath();
        for (let r = 0; r < ROWS; r++) {
          const p = pts[r][c];
          r === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      // ── Draw glowing orbs at grid intersections ──
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const p = pts[r][c];
          // Pulse: each orb has its own phase
          const phase = (r * COLS + c) * 0.37;
          const pulse = 0.5 + 0.5 * Math.sin(t * 8 + phase);
          // Pick colour by position
          const ci = (r + c) % ORB_COLORS.length;
          const [rr, gg, bb] = ORB_COLORS[ci];
          const radius = lerp(1.5, 3.5, pulse);
          const alpha  = lerp(0.15, 0.55, pulse);

          // Soft glow halo
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 5);
          grd.addColorStop(0,   `rgba(${rr},${gg},${bb},${alpha * 0.6})`);
          grd.addColorStop(0.4, `rgba(${rr},${gg},${bb},${alpha * 0.15})`);
          grd.addColorStop(1,   `rgba(${rr},${gg},${bb},0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius * 5, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();

          // Core dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rr},${gg},${bb},${alpha})`;
          ctx.fill();
        }
      }

      requestAnimationFrame(draw);
    }

    // Observe wrap size changes (handles rows being added)
    const ro = new ResizeObserver(() => { resize(); });
    ro.observe(wrap);
    resize();
    draw();

    // On mobile the canvas covers full width
    window.addEventListener("resize", resize, { passive: true });
  })();
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

// ── Feature Tutorials Tab System ─────────────────────────────────────────────
(function () {
  const tabsEl = document.getElementById("feat-tabs");
  const gridEl = document.getElementById("feat-grid");
  if (!tabsEl || !gridEl) return;

  // ── Tutorial data — swap in real video URLs / thumbnails when ready ──
  const tutorials = {
    sketch: [
      { title: "Pen Tool Presets Overview",       duration: "4:12", thumb: null },
      { title: "Sketch Brush & Pressure Curves",  duration: "6:30", thumb: null },
      { title: "Draw Behind Feature",             duration: "3:05", thumb: null },
      { title: "Onion Skinning Setup",            duration: "5:48", thumb: null },
      { title: "Shift & Trace Workflow",          duration: "7:20", thumb: null },
      { title: "Brush Engine Deep Dive",          duration: "9:15", thumb: null },
    ],
    cleanup: [
      { title: "Lineart Cleanup Basics",          duration: "5:00", thumb: null },
      { title: "Using the Eraser Effectively",    duration: "3:40", thumb: null },
      { title: "Layer Management for Cleanup",    duration: "4:55", thumb: null },
      { title: "Smoothing Rough Lines",           duration: "6:10", thumb: null },
    ],
    animation: [
      { title: "Frame-by-Frame Basics",           duration: "8:00", thumb: null },
      { title: "Exposure Control",                duration: "4:30", thumb: null },
      { title: "Flipbook Playback",               duration: "3:15", thumb: null },
      { title: "Timing & Spacing",                duration: "10:05", thumb: null },
      { title: "Walk Cycle Tutorial",             duration: "12:40", thumb: null },
    ],
    coloring: [
      { title: "Auto Color Line Fill",            duration: "5:25", thumb: null },
      { title: "Filling Transparent Gaps",        duration: "4:00", thumb: null },
      { title: "Color Wheel Walkthrough",         duration: "3:50", thumb: null },
      { title: "Dplate Tool for Color Sheets",    duration: "6:35", thumb: null },
      { title: "Cell Shading Workflow",           duration: "9:00", thumb: null },
    ],
    exporting: [
      { title: "Exporting Image Sequences",       duration: "4:45", thumb: null },
      { title: "Output Folder Organisation",      duration: "3:20", thumb: null },
      { title: "Export Settings Overview",        duration: "5:10", thumb: null },
    ],
  };

  // Play icon SVG
  const playIcon = `<svg class="vcard-play-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="rgba(85,0,255,0.85)"/>
    <polygon points="10,8 17,12 10,16" fill="#fff"/>
  </svg>`;

  function render(cat) {
    const list = tutorials[cat] || [];
    gridEl.innerHTML = list.map((item, i) => `
      <button class="vcard" data-index="${i}" data-cat="${cat}" aria-label="Play: ${item.title}">
        <div class="vcard-thumb">
          ${item.thumb
            ? `<img src="${item.thumb}" alt="${item.title}" />`
            : `<div class="vcard-thumb-placeholder"></div>`}
          ${playIcon}
        </div>
        <div class="vcard-info">
          <span class="vcard-title">${item.title}</span>
          <span class="vcard-meta">${item.duration}</span>
        </div>
      </button>
    `).join("");

    // Stagger cards in
    gridEl.querySelectorAll(".vcard").forEach((card, i) => {
      card.style.animationDelay = `${i * 55}ms`;
      card.classList.add("vcard-enter");
    });
  }

  // Tab switching
  tabsEl.addEventListener("click", e => {
    const btn = e.target.closest(".feat-tab");
    if (!btn) return;
    tabsEl.querySelectorAll(".feat-tab").forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");
    render(btn.dataset.cat);
  });

  // Card click — video player hook (wired up later)
  gridEl.addEventListener("click", e => {
    const card = e.target.closest(".vcard");
    if (!card) return;
    // TODO: open video player modal
    console.log("Play tutorial:", card.dataset.cat, card.dataset.index);
  });

  // Initial render
  render("sketch");
})();
