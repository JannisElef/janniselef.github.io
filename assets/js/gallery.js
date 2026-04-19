(function () {
  'use strict';

  var COL_WIDTH      = 220; // min column width px
  var GAP            = 12;

  function itemsPerPage() {
    var w = window.innerWidth;
    if (w < 600)  return 8;   // mobile: 2 cols
    if (w < 900)  return 12;  // tablet: 3 cols
    return 20;                // desktop: 4+ cols
  }

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

    var grid           = document.getElementById(input.dataset.grid);
    var items          = Array.from(grid.querySelectorAll('.gallery-item'));
    var selected       = [];
    var visibleCount   = itemsPerPage();
    var currentMatched = [];
    var colHeights     = []; // tracks height of each column

    assignWeights(items);

    // ── Grid must be position:relative for absolute children ─────────────
    grid.style.position = 'relative';

    // ── Year options ──────────────────────────────────────────────────────
    var years = new Set();
    items.forEach(function (it) { if (it.dataset.year) years.add(it.dataset.year); });
    Array.from(years).sort().reverse().forEach(function (y) {
      var o = document.createElement('option');
      o.value = y; o.textContent = y;
      yearSelect.appendChild(o);
    });

    // ── Tag panel ─────────────────────────────────────────────────────────
    filterBtn.addEventListener('click', function () { panel.hidden = !panel.hidden; });

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

    // ── Shuffle ───────────────────────────────────────────────────────────
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

    // ── Controls ──────────────────────────────────────────────────────────
    input.addEventListener('input', reset);
    sortSelect.addEventListener('change', reset);
    yearSelect.addEventListener('change', reset);
    sourceSelect.addEventListener('change', reset);

    // ── Load more — append only new items below existing layout ───────────
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', function (e) {
        e.preventDefault();
        var from = visibleCount;
        visibleCount += itemsPerPage();
        placeItems(from, visibleCount);
        updateLoadMore();
        // scroll to first new item
        if (currentMatched[from]) {
          currentMatched[from].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    }

    // ── Resize: full relayout ─────────────────────────────────────────────
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { relayout(); }, 120);
    });

    // ── reset: refilter, resort, full relayout from scratch ───────────────
    function reset() {
      visibleCount = itemsPerPage();

      var q   = input.value.toLowerCase().trim();
      var yS  = yearSelect.value;
      var sM  = sortSelect.value;
      var src = sourceSelect.value;

      currentMatched = items.filter(function (it) {
        var title = (it.dataset.title       || '').toLowerCase();
        var desc  = (it.dataset.description || '').toLowerCase();
        var tags  = it.dataset.tags
          ? it.dataset.tags.split(',').map(function (t) { return t.trim(); }) : [];
        return (!q   || title.includes(q) || desc.includes(q)) &&
               (selected.length === 0 || selected.every(function (t) { return tags.includes(t); })) &&
               (yS  === 'all' || it.dataset.year === yS) &&
               (src === 'all' || (it.dataset.source || 'thumbnail') === src);
      });

      if (sM === 'random') {
        currentMatched.sort(function (a, b) { return a._w - b._w; });
      } else if (sM === 'asc') {
        currentMatched.sort(function (a, b) { return (a.dataset.date || 0) - (b.dataset.date || 0); });
      } else {
        currentMatched.sort(function (a, b) { return (b.dataset.date || 0) - (a.dataset.date || 0); });
      }

      // hide all, reset positions
      items.forEach(function (it) {
        it.style.display  = 'none';
        it.style.position = '';
        it.style.top      = '';
        it.style.left     = '';
        it.style.width    = '';
        it.classList.remove('gf-visible');
      });
      grid.style.height = '';

      relayout();
    }

    // ── relayout: place all currently visible items from scratch ──────────
    function relayout() {
      var cols   = calcCols();
      var colW   = (grid.clientWidth - (cols - 1) * GAP) / cols;
      colHeights = [];
      for (var c = 0; c < cols; c++) colHeights.push(0);

      // re-place all already visible items (0..visibleCount)
      var toPlace = Math.min(visibleCount, currentMatched.length);
      currentMatched.forEach(function (it, i) {
        if (i < toPlace) {
          it.style.display = 'block';
          placeOne(it, colW);
        } else {
          it.style.display = 'none';
        }
      });

      fillLastRow();
      setGridHeight();
      updateLoadMore();
      noResults.hidden = currentMatched.length > 0;
    }

    // ── placeItems: place items from index `from` up to `to` ─────────────
    // Called by load more — existing items are NOT touched
    function placeItems(from, to) {
      // Make sure cols/colW match current state
      var cols = calcCols();
      var colW = (grid.clientWidth - (cols - 1) * GAP) / cols;

      // If colHeights length doesn't match cols (e.g. after resize between clicks), relayout
      if (colHeights.length !== cols) {
        relayout();
        return;
      }

      for (var i = from; i < Math.min(to, currentMatched.length); i++) {
        var it = currentMatched[i];
        it.style.display = 'block';
        placeOne(it, colW);
        it.classList.remove('gf-visible');
        void it.offsetWidth;
        it.classList.add('gf-visible');
      }

      fillLastRow();
      setGridHeight();
    }

    // ── fillLastRow: keep adding items until all cols are within GAP*3 of tallest ──
    function fillLastRow() {
      if (currentMatched.length <= visibleCount) return; // nothing left to add
      var maxH = Math.max.apply(null, colHeights);
      var threshold = maxH - (COL_WIDTH * 0.5); // within half a col-width of tallest
      var allClose = colHeights.every(function (h) { return h >= threshold; });
      if (allClose) return;

      // Find how many more items we need to roughly level the bottom
      var extras = 0;
      var tmpHeights = colHeights.slice();
      var cols = tmpHeights.length;
      var colW  = (grid.clientWidth - (cols - 1) * GAP) / cols;

      for (var i = visibleCount; i < currentMatched.length; i++) {
        var minH   = tmpHeights[0], minCol = 0;
        for (var c = 1; c < cols; c++) {
          if (tmpHeights[c] < minH) { minH = tmpHeights[c]; minCol = c; }
        }
        var curMax = Math.max.apply(null, tmpHeights);
        var curMin = Math.min.apply(null, tmpHeights);
        if (curMax - curMin < colW * 0.4) break; // close enough, stop

        // estimate item height
        var img = currentMatched[i].querySelector('img');
        var estH = img && img.naturalWidth > 0
          ? Math.round(colW * img.naturalHeight / img.naturalWidth)
          : Math.round(colW * 0.75);
        tmpHeights[minCol] += estH + GAP;
        extras++;
      }

      if (extras > 0) {
        var from = visibleCount;
        visibleCount += extras;
        var cols2 = calcCols();
        var colW2 = (grid.clientWidth - (cols2 - 1) * GAP) / cols2;
        for (var j = from; j < Math.min(visibleCount, currentMatched.length); j++) {
          var it = currentMatched[j];
          it.style.display = 'block';
          placeOne(it, colW2);
        }
      }
    }

    // ── placeOne: find shortest column, position item there ───────────────
    function placeOne(el, colW) {
      el.style.position = 'absolute';
      el.style.width    = colW + 'px';
      el.style.left     = '';
      el.style.top      = '';

      // Find shortest column
      var minH   = colHeights[0];
      var minCol = 0;
      for (var c = 1; c < colHeights.length; c++) {
        if (colHeights[c] < minH) { minH = colHeights[c]; minCol = c; }
      }

      var leftPx = minCol * (colW + GAP);
      var topPx  = minH;

      el.style.left = leftPx + 'px';
      el.style.top  = topPx  + 'px';

      // Item height — use naturalHeight ratio if image not yet loaded
      var img = el.querySelector('img');
      var elH;
      if (img && img.complete && img.naturalHeight > 0) {
        // Image loaded: measure actual rendered height
        elH = el.offsetHeight;
      } else {
        // Image not yet loaded: estimate from natural dimensions or default
        elH = img && img.naturalWidth > 0
          ? Math.round(colW * img.naturalHeight / img.naturalWidth)
          : Math.round(colW * 0.75);
        // When image loads, update the column height
        if (img && !img.complete) {
          (function (element, col) {
            img.addEventListener('load', function () {
              var newH = element.offsetHeight;
              // patch: extend grid if needed
              if (newH > 0) {
                colHeights[col] = (colHeights[col] || 0) + newH + GAP;
                setGridHeight();
              }
            }, { once: true });
          }(el, minCol));
          // Use estimated height for column accounting now
          elH = Math.round(colW * (img.naturalHeight || colW * 0.75) / (img.naturalWidth || colW));
        }
      }

      colHeights[minCol] = topPx + elH + GAP;
    }

    function setGridHeight() {
      var maxH = colHeights.reduce(function (m, h) { return Math.max(m, h); }, 0);
      grid.style.height = maxH + 'px';
    }

    function calcCols() {
      var w = grid.clientWidth;
      return Math.max(2, Math.floor((w + GAP) / (COL_WIDTH + GAP)));
    }

    function updateLoadMore() {
      if (loadMoreCon) {
        loadMoreCon.style.display = currentMatched.length > visibleCount ? 'block' : 'none';
      }
    }

    reset();
  });
})();
