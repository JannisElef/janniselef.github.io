(function () {
  'use strict';

  var COL_WIDTH = 220;
  var GAP       = 12;

  function itemsPerPage() {
    var w = window.innerWidth;
    if (w < 600) return 8;
    if (w < 900) return 12;
    return 20;
  }

  function assignWeights(items) {
    items.forEach(function (it) { it._w = Math.random(); });
  }

  // Set src from data-src (triggers actual network load) for a slice of items,
  // then call cb when all images are loaded or errored.
  function loadImages(items, from, to, cb) {
    var slice = items.slice(from, to);
    var pending = 0;
    slice.forEach(function (it) {
      var img = it.querySelector('img');
      if (!img) return;
      // Set src from data-src if not already done
      if (img.dataset.src && img.src !== img.dataset.src) {
        img.src = img.dataset.src;
      }
      if (img.complete && img.naturalHeight > 0) return; // already loaded
      pending++;
      function done() { if (--pending === 0) cb(); }
      img.addEventListener('load',  done, { once: true });
      img.addEventListener('error', done, { once: true });
    });
    if (pending === 0) cb();
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
    var colHeights     = [];

    assignWeights(items);
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

    input.addEventListener('input', reset);
    sortSelect.addEventListener('change', reset);
    yearSelect.addEventListener('change', reset);
    sourceSelect.addEventListener('change', reset);

    // ── Load more ─────────────────────────────────────────────────────────
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', function (e) {
        e.preventDefault();
        var from = visibleCount;
        var to   = from + itemsPerPage();

        // Show items immediately (hidden, display:block so they have dimensions)
        currentMatched.slice(from, to).forEach(function (it) {
          it.style.display  = 'block';
          it.style.position = 'absolute';
          it.style.width    = calcColW(calcCols()) + 'px';
          it.style.visibility = 'hidden'; // in DOM but invisible during preload
        });

        loadImages(currentMatched, from, to, function () {
          currentMatched.slice(from, to).forEach(function (it) {
            it.style.visibility = '';
          });
          visibleCount = to;
          placeRange(from, visibleCount, true);
          fillLastRow();
          setGridHeight();
          updateLoadMore();
          if (currentMatched[from]) {
            currentMatched[from].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        });
      });
    }

    // ── Resize ────────────────────────────────────────────────────────────
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(relayout, 120);
    });

    // ── reset ─────────────────────────────────────────────────────────────
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

      // Hide all and clear positions
      items.forEach(function (it) {
        it.style.display    = 'none';
        it.style.visibility = '';
        it.style.position   = '';
        it.style.top        = '';
        it.style.left       = '';
        it.style.width      = '';
        it.classList.remove('gf-visible');
      });
      grid.style.height = '0';
      colHeights = [];

      // Show first-page items as hidden blocks so browser can measure them
      var colW = calcColW(calcCols());
      currentMatched.slice(0, visibleCount).forEach(function (it) {
        it.style.display    = 'block';
        it.style.position   = 'absolute';
        it.style.width      = colW + 'px';
        it.style.visibility = 'hidden';
      });

      // Wait for first-page images to load, then layout
      loadImages(currentMatched, 0, visibleCount, function () {
        currentMatched.slice(0, visibleCount).forEach(function (it) {
          it.style.visibility = '';
        });
        relayout();
      });
    }

    // ── relayout: place ALL visible items from scratch ────────────────────
    function relayout() {
      var cols = calcCols();
      var colW = calcColW(cols);
      colHeights = new Array(cols).fill(0);

      items.forEach(function (it) {
        it.style.display  = 'none';
        it.style.position = '';
        it.style.top      = '';
        it.style.left     = '';
        it.style.width    = '';
        it.classList.remove('gf-visible');
      });

      currentMatched.slice(0, visibleCount).forEach(function (it) {
        it.style.display = 'block';
        placeOne(it, colW);
      });

      fillLastRow();
      setGridHeight();
      updateLoadMore();
      noResults.hidden = currentMatched.length > 0;
    }

    // ── placeRange: place items [from, to) without touching earlier items ─
    function placeRange(from, to, animate) {
      var cols = calcCols();
      var colW = calcColW(cols);
      if (colHeights.length !== cols) { relayout(); return; }

      for (var i = from; i < Math.min(to, currentMatched.length); i++) {
        var it = currentMatched[i];
        it.style.display = 'block';
        placeOne(it, colW);
        if (animate) {
          it.classList.remove('gf-visible');
          void it.offsetWidth;
          it.classList.add('gf-visible');
        }
      }
    }

    // ── placeOne: measure actual offsetHeight, place in shortest col ──────
    function placeOne(el, colW) {
      el.style.position = 'absolute';
      el.style.width    = colW + 'px';
      el.style.top      = '0px'; // temporarily position for measurement
      el.style.left     = '0px';

      // shortest column
      var minH = colHeights[0], minCol = 0;
      for (var c = 1; c < colHeights.length; c++) {
        if (colHeights[c] < minH) { minH = colHeights[c]; minCol = c; }
      }

      el.style.left = (minCol * (colW + GAP)) + 'px';
      el.style.top  = minH + 'px';

      // offsetHeight is reliable now because images are preloaded
      var h = el.offsetHeight;
      if (h < 4) h = Math.round(colW * 0.75); // last-resort fallback
      colHeights[minCol] = minH + h + GAP;
    }

    // ── fillLastRow ───────────────────────────────────────────────────────
    function fillLastRow() {
      if (currentMatched.length <= visibleCount) return;
      var cols      = colHeights.length || calcCols();
      var colW      = calcColW(cols);
      var maxH      = Math.max.apply(null, colHeights);
      var threshold = maxH - colW * 0.5;
      var from      = visibleCount;

      for (var i = from; i < currentMatched.length; i++) {
        if (Math.min.apply(null, colHeights) >= threshold) break;
        var it = currentMatched[i];
        it.style.display = 'block';
        placeOne(it, colW);
        visibleCount++;
      }
    }

    // ── helpers ───────────────────────────────────────────────────────────
    function setGridHeight() {
      var maxH = colHeights.length ? Math.max.apply(null, colHeights) : 0;
      grid.style.height = Math.max(maxH, 0) + 'px';
    }

    function calcCols() {
      return Math.max(2, Math.floor((grid.clientWidth + GAP) / (COL_WIDTH + GAP)));
    }

    function calcColW(cols) {
      return (grid.clientWidth - (cols - 1) * GAP) / cols;
    }

    function updateLoadMore() {
      if (loadMoreCon) {
        loadMoreCon.style.display = currentMatched.length > visibleCount ? 'block' : 'none';
      }
    }

    reset();
  });
})();
