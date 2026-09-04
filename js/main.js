(function () {
  "use strict";

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Header shadow on scroll
  var header = document.getElementById("siteHeader");
  var onScroll = function () {
    if (window.scrollY > 8) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Nav dropdown ("What We Do" programs)
  var dropdownCarets = Array.prototype.slice.call(document.querySelectorAll(".nav-caret"));
  dropdownCarets.forEach(function (caret) {
    var item = caret.closest(".nav-item");
    if (!item) return;
    caret.addEventListener("click", function (e) {
      e.preventDefault();
      var isOpen = item.classList.toggle("open");
      caret.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });
  document.addEventListener("click", function (e) {
    document.querySelectorAll(".nav-item.open").forEach(function (item) {
      if (item.contains(e.target)) return;
      item.classList.remove("open");
      var c = item.querySelector(".nav-caret");
      if (c) c.setAttribute("aria-expanded", "false");
    });
  });

  // Active nav link on scroll
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".main-nav a.nav-link"));
  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    var byId = {};
    navLinks.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = byId[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(function (a) { a.classList.remove("active"); });
          link.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    sections.forEach(function (s) { spy.observe(s); });
  }

  // Scroll-reveal for cards
  var revealTargets = document.querySelectorAll(
    ".pillar, .program-card, .process li, .quote-carousel, .moment-card, .social-card, .audience-card"
  );
  revealTargets.forEach(function (el) { el.setAttribute("data-reveal", ""); });

  if ("IntersectionObserver" in window) {
    var reveal = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach(function (el) { reveal.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  }

  var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia && window.matchMedia("(pointer: fine)").matches;

  // Hero glow parallax
  var glow = document.querySelector(".hero-glow");
  if (glow && !reducedMotion) {
    var rafId = null;
    var onScrollParallax = function () {
      if (rafId) return;
      rafId = requestAnimationFrame(function () {
        var y = window.scrollY || 0;
        if (y < 700) glow.style.transform = "translateY(" + (y * 0.25) + "px)";
        rafId = null;
      });
    };
    document.addEventListener("scroll", onScrollParallax, { passive: true });
  }

  // At-a-glance stat count-up
  var statEls = Array.prototype.slice.call(document.querySelectorAll(".stat"));
  if (statEls.length) {
    var animateStat = function (el) {
      var target = parseInt(el.getAttribute("data-count-to"), 10) || 0;
      var numEl = el.querySelector(".stat-num");
      if (!numEl) return;
      if (reducedMotion) { numEl.textContent = target; return; }
      var start = null;
      var duration = 900;
      var step = function (ts) {
        if (start === null) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        numEl.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if ("IntersectionObserver" in window) {
      var statObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateStat(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      statEls.forEach(function (el) { statObserver.observe(el); });
    } else {
      statEls.forEach(animateStat);
    }
  }

  // Testimonial carousel
  var carousel = document.querySelector("[data-carousel]");
  if (carousel) {
    var track = carousel.querySelector(".quote-track");
    var slides = Array.prototype.slice.call(carousel.querySelectorAll(".quote-card"));
    var dots = Array.prototype.slice.call(carousel.querySelectorAll("[data-carousel-dot]"));
    var prevBtn = carousel.querySelector("[data-carousel-prev]");
    var nextBtn = carousel.querySelector("[data-carousel-next]");
    var index = 0;
    var autoplayTimer = null;

    var goTo = function (i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = "translateX(-" + (index * 100) + "%)";
      dots.forEach(function (d, di) { d.setAttribute("aria-selected", di === index ? "true" : "false"); });
    };
    var next = function () { goTo(index + 1); };
    var prev = function () { goTo(index - 1); };

    var startAutoplay = function () {
      if (reducedMotion) return;
      stopAutoplay();
      autoplayTimer = setInterval(next, 6000);
    };
    function stopAutoplay() {
      if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
    }

    if (prevBtn) prevBtn.addEventListener("click", function () { prev(); startAutoplay(); });
    if (nextBtn) nextBtn.addEventListener("click", function () { next(); startAutoplay(); });
    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () { goTo(i); startAutoplay(); });
    });
    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);
    carousel.addEventListener("focusin", stopAutoplay);
    carousel.addEventListener("focusout", startAutoplay);

    goTo(0);
    startAutoplay();
  }

  // Card tilt (fine-pointer, motion-safe only)
  if (finePointer && !reducedMotion) {
    document.body.classList.remove("no-tilt");
    var tiltTargets = Array.prototype.slice.call(
      document.querySelectorAll(".pillar, .program-card")
    );
    tiltTargets.forEach(function (card) {
      var raf = null;
      card.addEventListener("mousemove", function (e) {
        if (raf) return;
        raf = requestAnimationFrame(function () {
          var rect = card.getBoundingClientRect();
          var px = (e.clientX - rect.left) / rect.width - 0.5;
          var py = (e.clientY - rect.top) / rect.height - 0.5;
          var rotateX = (-py * 8).toFixed(2);
          var rotateY = (px * 8).toFixed(2);
          card.style.transform =
            "perspective(700px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) translateY(-4px)";
          raf = null;
        });
      });
      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });
  } else {
    document.body.classList.add("no-tilt");
  }

  // Magnetic buttons
  if (finePointer && !reducedMotion) {
    var magnets = Array.prototype.slice.call(document.querySelectorAll(".hero-cta .btn, .join-cta .btn-primary"));
    magnets.forEach(function (btn) {
      btn.classList.add("btn-magnetic");
      var raf = null;
      btn.addEventListener("mousemove", function (e) {
        if (raf) return;
        raf = requestAnimationFrame(function () {
          var rect = btn.getBoundingClientRect();
          var mx = (e.clientX - rect.left - rect.width / 2) * 0.25;
          var my = (e.clientY - rect.top - rect.height / 2) * 0.35;
          btn.style.transform = "translate(" + mx.toFixed(1) + "px, " + my.toFixed(1) + "px)";
          raf = null;
        });
      });
      btn.addEventListener("mouseleave", function () {
        btn.style.transform = "";
      });
    });
  }

  // FAQ accordion (Join Us)
  var faqItems = Array.prototype.slice.call(document.querySelectorAll(".faq-item"));
  faqItems.forEach(function (item) {
    var btn = item.querySelector(".faq-question");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      faqItems.forEach(function (other) {
        other.classList.remove("open");
        var otherBtn = other.querySelector(".faq-question");
        if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Sticky mini-CTA bar
  var stickyCta = document.getElementById("stickyCta");
  if (stickyCta) {
    var stickyDismissed = false;
    try { stickyDismissed = sessionStorage.getItem("saa-sticky-cta-dismissed") === "1"; } catch (e) {}
    var heroEl = document.querySelector(".hero");
    var footerEl = document.querySelector(".site-footer");
    var stickyCloseBtn = stickyCta.querySelector(".sticky-cta-close");
    var stickyRaf = null;

    var updateSticky = function () {
      if (stickyDismissed) return;
      var pastHero = heroEl ? window.scrollY > heroEl.offsetHeight : window.scrollY > 400;
      var nearFooter = footerEl ? footerEl.getBoundingClientRect().top < window.innerHeight : false;
      stickyCta.hidden = false;
      stickyCta.classList.toggle("visible", pastHero && !nearFooter);
    };
    var onScrollSticky = function () {
      if (stickyRaf) return;
      stickyRaf = requestAnimationFrame(function () { updateSticky(); stickyRaf = null; });
    };

    if (!stickyDismissed) {
      document.addEventListener("scroll", onScrollSticky, { passive: true });
      updateSticky();
    }
    if (stickyCloseBtn) {
      stickyCloseBtn.addEventListener("click", function () {
        stickyCta.classList.remove("visible");
        stickyDismissed = true;
        try { sessionStorage.setItem("saa-sticky-cta-dismissed", "1"); } catch (e) {}
      });
    }
  }

  // Moments lightbox
  var lightbox = document.getElementById("momentsLightbox");
  var lightboxCard = document.getElementById("lightboxCard");
  if (lightbox && lightboxCard) {
    var momentCards = Array.prototype.slice.call(document.querySelectorAll("[data-moment]"));
    var lastFocused = null;

    var openLightbox = function (card) {
      lastFocused = document.activeElement;
      var variantClass = Array.prototype.slice.call(card.classList).filter(function (c) {
        return c.indexOf("moment-") === 0 && c !== "moment-card";
      })[0];
      var iconEl = card.querySelector(".moment-icon");
      var captionEl = card.querySelector("figcaption");

      lightboxCard.className = "lightbox-card" + (variantClass ? " " + variantClass : "");
      lightboxCard.innerHTML = "";
      if (iconEl) lightboxCard.appendChild(iconEl.cloneNode(true));
      var figcaption = document.createElement("figcaption");
      figcaption.textContent = captionEl ? captionEl.textContent : "";
      lightboxCard.appendChild(figcaption);

      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
      var closeBtn = lightbox.querySelector(".lightbox-close");
      if (closeBtn) closeBtn.focus();
    };
    var closeLightbox = function () {
      lightbox.hidden = true;
      document.body.style.overflow = "";
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    };

    momentCards.forEach(function (card) {
      card.addEventListener("click", function () { openLightbox(card); });
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openLightbox(card);
        }
      });
    });
    Array.prototype.slice.call(lightbox.querySelectorAll("[data-lightbox-close]")).forEach(function (el) {
      el.addEventListener("click", closeLightbox);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
    });
  }
})();
