/**
 * AQUÁRIO37 — Main JavaScript
 * ============================================================
 * ARCHITECTURE RULES:
 * - All DOM interactions go here (main.js)
 * - Scroll animations go in animations.js
 * - Do NOT add jQuery or large libraries without approval
 * - Keep functions small, named, and well-commented
 * - Use event delegation for dynamically created elements
 * ============================================================
 */

(function () {
  'use strict';

  /* ── DOM Ready ─────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    initHeader();
    initMobileNav();
    initFAQ();
    initCurriculum();
    initSmoothScroll();
    initWhatsApp();
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
    onScroll(); // run once on load
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

    // Close on link click
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

        // Close all others
        faqItems.forEach(function (other) {
          other.classList.remove('is-open');
          var q = other.querySelector('.faq__question');
          if (q) q.setAttribute('aria-expanded', 'false');
        });

        // Toggle current
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

        // Update button states
        buttons.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');

        // Update panel visibility
        panels.forEach(function (panel) {
          panel.classList.toggle('is-active', panel.dataset.panel === target);
        });
      });
    });

    // Activate first by default
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

  /* ── WhatsApp CTA click tracking ──────────────────────── */
  function initWhatsApp() {
    document.querySelectorAll('[data-whatsapp]').forEach(function (el) {
      el.addEventListener('click', function () {
        // Optional: add analytics event here
        // e.g. gtag('event', 'whatsapp_click', { section: el.dataset.whatsapp });
      });
    });
  }

})();
