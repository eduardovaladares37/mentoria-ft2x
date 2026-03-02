/**
 * AQUÁRIO37 — Scroll Animations
 * ============================================================
 * Uses IntersectionObserver (no dependencies).
 * Elements with [data-reveal] fade in when entering viewport.
 * Supports [data-reveal-delay="X"] for staggered animations.
 * ============================================================
 */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        initReveal();
        initCounters();
    });

    /* ── Scroll Reveal ─────────────────────────────────────── */
    function initReveal() {
        var elements = document.querySelectorAll('[data-reveal]');
        if (!elements.length) return;

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
        );

        elements.forEach(function (el) { observer.observe(el); });
    }

    /* ── Animated number counters ──────────────────────────── */
    function initCounters() {
        var counters = document.querySelectorAll('[data-counter]');
        if (!counters.length) return;

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        counters.forEach(function (el) { observer.observe(el); });
    }

    function animateCounter(el) {
        var target = parseInt(el.dataset.counter, 10);
        var duration = parseInt(el.dataset.counterDuration || '1500', 10);
        var suffix = el.dataset.counterSuffix || '';
        var start = 0;
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
