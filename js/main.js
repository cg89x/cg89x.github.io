/* ============================================================
   Christian Kontz — Academic Homepage · main.js
   ============================================================ */

(function () {
  'use strict';

  /* Reduced-motion preference */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------
     1. Fade-in observer
     ---------------------------------------------------------- */
  var fadeEls = document.querySelectorAll('.fade-in');

  if (prefersReducedMotion) {
    /* If user prefers reduced motion, make all visible immediately */
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  } else if ('IntersectionObserver' in window) {
    var fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeEls.forEach(function (el) {
      fadeObserver.observe(el);
    });
  } else {
    /* Fallback for browsers without IntersectionObserver */
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ----------------------------------------------------------
     2. Active section tracker
     ---------------------------------------------------------- */
  var sections = document.querySelectorAll('section[id]');
  var navPills = document.querySelectorAll('.nav-pills a[href^="#"]');

  if (sections.length && navPills.length && 'IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navPills.forEach(function (pill) {
            pill.classList.remove('active');
            if (pill.getAttribute('href') === '#' + id) {
              pill.classList.add('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-88px 0px -66% 0px'
    });

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* ----------------------------------------------------------
     3. BibTeX toggle (event delegation)
     ---------------------------------------------------------- */
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-bibtex]');
    if (!trigger) return;
    e.preventDefault();
    var el = document.getElementById(trigger.dataset.bibtex);
    if (!el) return;
    var isOpen = el.style.display !== 'block';
    el.style.display = isOpen ? 'block' : 'none';
    trigger.setAttribute('aria-expanded', String(isOpen));
  });

  /* ----------------------------------------------------------
     4. OpenAlex citation fetch
     ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    var badges = document.querySelectorAll('[data-openalex]');
    badges.forEach(function (badge) {
      var id = (badge.dataset.openalex || '').trim();
      if (!/^W\d+$/i.test(id)) return;

      var countSpan = badge.querySelector('.count');
      if (!countSpan) return;

      var url = 'https://api.openalex.org/works/' + id.toUpperCase() + '?mailto=ckontz@stanford.edu';
      fetch(url, { headers: { 'Accept': 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          return r.json();
        })
        .then(function (j) {
          var n = j.cited_by_count;
          if (Number.isFinite(n)) countSpan.textContent = n.toLocaleString();
        })
        .catch(function (e) {
          console.error('OpenAlex fetch failed for', id, e);
          countSpan.textContent = '\u2014';
        });
    });
  });

  /* ----------------------------------------------------------
     5. Paper accordion scroll
     ---------------------------------------------------------- */
  document.querySelectorAll('details.paper-card').forEach(function (details) {
    details.addEventListener('toggle', function () {
      if (this.open) {
        if (prefersReducedMotion) {
          this.scrollIntoView({ behavior: 'auto', block: 'start' });
        } else {
          this.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });


})();
