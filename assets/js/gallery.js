(function () {
  'use strict';

  var ITEMS_PER_PAGE = 20;

  function assignWeights(items) {
    items.forEach(function (it) { it._w = Math.random(); });
  }

  document.addEventListener('DOMContentLoaded', function () {

    var input        = document.getElementById('psf-input');
    var filterBtn    = document.getElementById('psf-filter-btn');
    var panel        = document.getElementById('psf-panel');
    var tagBtns      = document.querySelectorAll('.psf-tag-btn');
    var clearBtn     = document.getElementById('psf-clear-btn');
    var countLbl     = document.getElementById('psf-count');
    var noResults    = document.getElementById('psf-no-results');
    var sortSelect   = document.getElementById('psf-sort');
    var yearSelect   = document.getElementById('psf-year-filter');
    var sourceSelect = document.getElementById('gallery-source-filter');
    var shuffleBtn   = document.getElementById('gallery-shuffle-btn');
    var loadMoreBtn  = document.getElementById('gallery-load-more-btn');
    var loadMoreCon  = document.getElementById('gallery-load-more-container');

    if (!input) return;

    var grid         = document.getElementById(input.dataset.grid);
    var items        = Array.from(grid.querySelectorAll('.gallery-item'));
    var selected     = [];
    var visibleCount = ITEMS_PER_PAGE;

    // matched holds the current filtered+sorted list, stable between load-more clicks
    var currentMatched = [];

    assignWeights(items);

    // ── Year options ─────────────────────────────────────────────────────
    var years = new Set();
    items.forEach(function (it) { if (it.dataset.year) years.add(it.dataset.year); });
    Array.from(years).sort().reverse().forEach(function (y) {
      var o = document.createElement('option');
      o.value = y; o.textContent = y;
      yearSelect.appendChild(o);
    });

    // ── Tag panel ────────────────────────────────────────────────────────
    filterBtn.addEventListener('click', function () {
      panel.hidden = !panel.hidden;
    });

    tagBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        var t = b.dataset.tag, i = selected.indexOf(t);
        if (i === -1) { selected.push(t); b.classList.add('psf-selected'); }
        else          { selected.splice(i, 1); b.classList.remove('psf-selected'); }
        updateCount(); reset();
      });
    });

    clearBtn.addEventListener('click', function () {
      selected = [];
      tagBtns.forEach(function (b) { b.classList.remove('psf-selected'); });
      updateCount(); reset();
    });

    function updateCount() {
      countLbl.textContent = selected.length > 0 ? selected.length + ' active' : '';
    }

    // ── Shuffle ──────────────────────────────────────────────────────────
    shuffleBtn.addEventListener('click', function () {
      var icon = shuffleBtn.querySelector('.material-icons');
      if (icon) {
        icon.style.transition = 'transform 0.35s ease';
        icon.style.transform  = 'rotate(180deg)';
        setTimeout(function () { icon.style.transform = ''; }, 380);
      }
      sortSelect.value = 'random';
      assignWeights(items);
      reset();
    });

    // ── Controls — all trigger a full reset ──────────────────────────────
    input.addEventListener('input', reset);
    sortSelect.addEventListener('change', reset);
    yearSelect.addEventListener('change', reset);
    sourceSelect.addEventListener('change', reset);

    // ── Load more — only reveals more from currentMatched, no re-sort ───
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', function (e) {
        e.preventDefault();
        var firstNew = currentMatched[visibleCount]; // item that will become visible
        visibleCount += ITEMS_PER_PAGE;
        reveal();                                    // show only, no DOM reorder
        if (firstNew) {
          firstNew.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    // ── reset: refilter + resort + restart pagination ────────────────────
    function reset() {
      visibleCount = ITEMS_PER_PAGE;
      applyFull();
    }

    // ── applyFull: filter, sort, reorder DOM, show first page ────────────
    function applyFull() {
      var q   = input.value.toLowerCase().trim();
      var yS  = yearSelect.value;
      var sM  = sortSelect.value;
      var src = sourceSelect.value;

      currentMatched = items.filter(function (it) {
        var title  = (it.dataset.title       || '').toLowerCase();
        var desc   = (it.dataset.description || '').toLowerCase();
        var tags   = it.dataset.tags
          ? it.dataset.tags.split(',').map(function (t) { return t.trim(); })
          : [];
        var source = it.dataset.source || 'thumbnail';

        return (!q   || title.includes(q) || desc.includes(q)) &&
               (selected.length === 0 || selected.every(function (t) { return tags.includes(t); })) &&
               (yS  === 'all' || it.dataset.year === yS) &&
               (src === 'all' || source === src);
      });

      if (sM === 'random') {
        currentMatched.sort(function (a, b) { return a._w - b._w; });
      } else if (sM === 'asc') {
        currentMatched.sort(function (a, b) { return (a.dataset.date || 0) - (b.dataset.date || 0); });
      } else {
        currentMatched.sort(function (a, b) { return (b.dataset.date || 0) - (a.dataset.date || 0); });
      }

      // Hide all items first
      items.forEach(function (it) {
        it.style.display = 'none';
        it.classList.remove('gf-visible');
      });

      // Re-append in sorted order (sets DOM sequence for masonry)
      currentMatched.forEach(function (it) { grid.appendChild(it); });

      // Show first page
      reveal();
    }

    // ── reveal: show up to visibleCount from currentMatched, no DOM reorder
    function reveal() {
      currentMatched.forEach(function (it, i) {
        if (i < visibleCount) {
          if (it.style.display === 'none' || it.style.display === '') {
            var wasHidden = it.style.display === 'none';
            it.style.display = '';
            if (wasHidden) {
              it.classList.remove('gf-visible');
              void it.offsetWidth;
              it.classList.add('gf-visible');
            }
          }
        } else {
          it.style.display = 'none';
          it.classList.remove('gf-visible');
        }
      });

      noResults.hidden = currentMatched.length > 0;
      if (loadMoreCon) {
        loadMoreCon.style.display = currentMatched.length > visibleCount ? 'block' : 'none';
      }
    }

    applyFull();
  });
})();
