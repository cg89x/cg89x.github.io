/* ============================================================
   Christian Kontz — Academic Homepage · main.js
   ============================================================ */

(function () {
  'use strict';

  /* Reduced-motion preference */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------
     1. Fade-in reveal
        Above-the-fold hero content (everything inside #home) is
        revealed on load instead of on scroll. Otherwise, on a
        phone, the tall stacked hero can sit below the observer's
        threshold at scroll 0, so the name/affiliation only fade in
        after a nudge. Everything else still reveals as it scrolls in.
     ---------------------------------------------------------- */
  var fadeEls = document.querySelectorAll('.fade-in');
  var heroFadeEls = document.querySelectorAll('#home .fade-in');

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
      if (el.closest('#home')) return; /* hero content is revealed on load, not on scroll */
      fadeObserver.observe(el);
    });

    /* Reveal hero content on load — paint once at opacity 0, then add
       .visible on the next frame so the fade transition still plays. */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        heroFadeEls.forEach(function (el) {
          el.classList.add('visible');
        });
      });
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
    var setActivePill = function (id) {
      navPills.forEach(function (pill) {
        pill.classList.remove('active');
        if (pill.getAttribute('href') === '#' + id) {
          pill.classList.add('active');
        }
      });
    };

    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActivePill(entry.target.getAttribute('id'));
        }
      });
    }, {
      rootMargin: '-88px 0px -66% 0px'
    });

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });

    /* Fallback: when scrolled near the bottom, the last section may never
       cross the observer band because the page runs out of scroll first.
       Force-activate the last section's pill in that case. */
    var lastSectionId = sections[sections.length - 1].getAttribute('id');
    var handleBottomScroll = function () {
      var nearBottom = window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (nearBottom) setActivePill(lastSectionId);
    };
    window.addEventListener('scroll', handleBottomScroll, { passive: true });
    window.addEventListener('resize', handleBottomScroll);
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

  /* ----------------------------------------------------------
     6. Recent News -> paper links: open the target paper and
        scroll to it exactly once. In-page #paper-* clicks are
        intercepted so we don't get BOTH the browser's native
        anchor scroll AND the accordion toggle scroll (which the
        two competing smooth animations would make janky).
     ---------------------------------------------------------- */
  function revealPaper(target) {
    if (!target) return;
    if (target.tagName === 'DETAILS' && !target.open) {
      target.open = true; /* toggle handler (section 5) scrolls it into view */
    } else {
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    }
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#paper-"]');
    if (!link) return;
    var id = link.getAttribute('href');
    var target;
    try {
      target = document.querySelector(id);
    } catch (err) {
      return;
    }
    if (!target) return;
    e.preventDefault();
    revealPaper(target);
    if (window.history && history.pushState) {
      history.pushState(null, '', id);
    } else {
      window.location.hash = id;
    }
  });

  /* Deep links / back-forward: open the targeted paper on load and on hashchange. */
  function openHashTarget() {
    var hash = window.location.hash;
    if (!hash || hash.length < 2) return;
    var target;
    try {
      target = document.querySelector(hash);
    } catch (e) {
      return;
    }
    if (target && target.tagName === 'DETAILS' && !target.open) {
      target.open = true;
    }
  }

  window.addEventListener('hashchange', openHashTarget);
  openHashTarget();

  /* ----------------------------------------------------------
     7. Keep scroll-padding-top in sync with the ACTUAL nav
        height. The sticky nav wraps to 2-3 rows on tablet/phone,
        growing well past --nav-height, which would otherwise let
        a section heading hide behind it after an anchor jump.
     ---------------------------------------------------------- */
  var navEl = document.querySelector('nav');
  if (navEl) {
    var syncNavOffset = function () {
      document.documentElement.style.scrollPaddingTop =
        (navEl.offsetHeight + 24) + 'px';
    };
    syncNavOffset();
    window.addEventListener('resize', syncNavOffset);
    window.addEventListener('load', syncNavOffset);
  }

})();
