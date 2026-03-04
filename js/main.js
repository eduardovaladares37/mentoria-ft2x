/**
 * AQUÁRIO37 — Main JavaScript
 * ============================================================
 * All DOM interactions and scroll animations in a single file.
 * Uses IntersectionObserver (no dependencies).
 * ============================================================
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initHeader();
    initMobileNav();
    initFAQ();
    initCurriculum();
    initSmoothScroll();
    initScrollAnimations();
  });

  /* ── Header: scroll effect ─────────────────────────────── */
  function initHeader() {
    var header = document.getElementById('header');
    if (!header) return;

    var scrollThreshold = 60;

    function onScroll() {
      if (window.scrollY > scrollThreshold) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile Navigation ─────────────────────────────────── */
  function initMobileNav() {
    var toggle = document.getElementById('nav-toggle');
    var mobileNav = document.getElementById('mobile-nav');
    if (!toggle || !mobileNav) return;

    toggle.addEventListener('click', function () {
      var isOpen = toggle.classList.toggle('is-open');
      mobileNav.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('is-open');
        mobileNav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── FAQ Accordion ─────────────────────────────────────── */
  function initFAQ() {
    var faqItems = document.querySelectorAll('.faq__item');

    faqItems.forEach(function (item) {
      var question = item.querySelector('.faq__question');
      if (!question) return;

      question.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');

        faqItems.forEach(function (other) {
          other.classList.remove('is-open');
          var q = other.querySelector('.faq__question');
          if (q) q.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('is-open');
          question.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ── Curriculum Tabbed Content ─────────────────────────── */
  function initCurriculum() {
    var buttons = document.querySelectorAll('.curriculum__pillar-btn');
    var panels  = document.querySelectorAll('.curriculum__panel');
    if (!buttons.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.dataset.pillar;

        buttons.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');

        panels.forEach(function (panel) {
          panel.classList.toggle('is-active', panel.dataset.panel === target);
        });
      });
    });

    if (buttons[0]) buttons[0].click();
  }

  /* ── Smooth scroll for anchor links ───────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = anchor.getAttribute('href');
        if (href === '#') return;
        var target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        var headerH = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--header-h') || '80',
          10
        );
        var top = target.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  /* ── Scroll Reveal + Animated Counters (single observer) ── */
  function initScrollAnimations() {
    var revealElements = document.querySelectorAll('[data-reveal]');
    var counterElements = document.querySelectorAll('[data-counter]');

    if (!revealElements.length && !counterElements.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          var el = entry.target;

          if (el.hasAttribute('data-reveal')) {
            el.classList.add('is-visible');
          }

          if (el.hasAttribute('data-counter')) {
            animateCounter(el);
          }

          observer.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach(function (el) { observer.observe(el); });
    counterElements.forEach(function (el) { observer.observe(el); });
  }

  /* ── Counter animation helper ──────────────────────────── */
  function animateCounter(el) {
    var target = parseInt(el.dataset.counter, 10);
    var duration = parseInt(el.dataset.counterDuration || '1500', 10);
    var suffix = el.dataset.counterSuffix || '';
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var value = Math.floor(easeOut(progress) * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }

})();
