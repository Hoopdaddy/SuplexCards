/* ===================================================
   SUPLEX TRADING CARDS — Main JavaScript
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initTabs();
  initYearFilter();
  initSetAccordions();
  initTierTrackers();
  initChecklists();
  initCardFilters();
});

// ── NAV ──────────────────────────────────────────────
function initNav() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
    });
  }

  // Close nav when a non-dropdown link is tapped on mobile
  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        navLinks.classList.remove('open');
        hamburger?.classList.remove('open');
      }
    });
  });

  // Mobile: tap dropdown trigger to expand submenu
  document.querySelectorAll('.dropdown .nav-drop-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        trigger.closest('.dropdown').classList.toggle('open');
      }
    });
  });

  // Active link
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });
}

// ── TABS (multi-select toggle) ────────────────────────
// Track which tab panels are currently active. Empty = show all.
const _activeTabs = new Set(['flagship']);
let _activeYear = 'all';
let _activeSection = null;

function _applyPanels() {
  const showAll = _activeTabs.size === 0;
  document.querySelectorAll('.checklist-panel').forEach(p => {
    p.classList.toggle('active', showAll || _activeTabs.has(p.dataset.panel));
  });
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.toggle('active', _activeTabs.has(b.dataset.tab));
  });
  // Re-apply year filter so newly visible panels are filtered correctly
  if (_activeYear !== 'all' && _activeSection) {
    _applyYearFilter(_activeSection, _activeYear);
  }
}

function _applyYearFilter(section, yr) {
  if (yr === 'all') {
    section.classList.remove('year-filter-active');
    section.querySelectorAll('.set-header').forEach(h => h.classList.remove('year-match'));
  } else {
    section.classList.add('year-filter-active');
    section.querySelectorAll('.set-header[data-year]').forEach(h => {
      const panel = h.closest('.checklist-panel');
      const inVisible = !panel || panel.classList.contains('active');
      h.classList.toggle('year-match', inVisible && h.dataset.year === yr);
    });
  }
}

function initTabs() {
  document.querySelectorAll('.checklist-tabs').forEach(tabGroup => {
    tabGroup.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        if (_activeTabs.has(tab)) {
          _activeTabs.delete(tab);   // toggle off
        } else {
          _activeTabs.add(tab);      // toggle on
        }
        _applyPanels();
      });
    });
  });
  _applyPanels(); // apply initial state
}

// ── YEAR FILTER ───────────────────────────────────────
function initYearFilter() {
  document.querySelectorAll('.year-filter-bar').forEach(bar => {
    const section = bar.closest('.section');
    _activeSection = section;
    bar.querySelectorAll('.year-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        bar.querySelectorAll('.year-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        _activeYear = btn.dataset.year;
        _applyYearFilter(section, _activeYear);
      });
    });
  });
}

// ── ACCORDIONS ───────────────────────────────────────
function initSetAccordions() {
  document.querySelectorAll('.set-header').forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const isOpen = body.classList.contains('open');
      header.classList.toggle('open', !isOpen);
      body.classList.toggle('open', !isOpen);
    });
  });
}

// ── TIER TRACKERS (parallel rainbow) ─────────────────
// A .tier-bar lets a collector switch which parallel of a section they're
// tracking. Each tier saves to its own localStorage namespace; the section's
// base/default tier keeps the legacy unsuffixed key for backward compatibility.
function initTierTrackers() {
  document.querySelectorAll('.tier-bar').forEach(bar => {
    if (!bar.dataset.baseTier)   bar.dataset.baseTier = 'base';
    if (!bar.dataset.activeTier) bar.dataset.activeTier = bar.dataset.baseTier;

    // Controlled boxes = following card-item checkboxes until the next divider.
    const boxes = [];
    let sib = bar.nextElementSibling;
    while (sib && !(sib.classList.contains('card-item') && sib.classList.contains('card-divider'))) {
      if (sib.classList.contains('tier-bar')) break;
      const cb = sib.querySelector && sib.querySelector('input[type="checkbox"]');
      if (cb) { boxes.push(cb); cb._tierBar = bar; }
      sib = sib.nextElementSibling;
    }
    bar._boxes = boxes;

    bar.querySelectorAll('.tier-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const setId = bar.closest('.checklist-body').dataset.setId;
        bar.dataset.activeTier = pill.dataset.tier;
        bar.querySelectorAll('.tier-pill').forEach(p => p.classList.toggle('active', p === pill));
        boxes.forEach(cb => {
          const on = localStorage.getItem(keyFor(setId, cb)) === '1';
          cb.checked = on;
          cb.closest('.card-item').classList.toggle('checked', on);
        });
        updateTierCount(bar);
        updateProgress(bar.closest('.checklist-body'));
      });
    });
  });
}

// localStorage key for a checkbox, honoring its tier-bar's active tier.
function keyFor(setId, cb) {
  const bar = cb._tierBar;
  if (!bar) return `${setId}-${cb.value}`;
  const tier = bar.dataset.activeTier || bar.dataset.baseTier;
  return tier === bar.dataset.baseTier ? `${setId}-${cb.value}` : `${setId}__${tier}-${cb.value}`;
}

function updateTierCount(bar) {
  const boxes = bar._boxes || [];
  const checked = boxes.filter(cb => cb.checked).length;
  const cnt = bar.querySelector('.tier-bar-count');
  if (cnt) cnt.textContent = `${checked}/${boxes.length}`;
}

// ── CHECKLISTS (localStorage) ────────────────────────
function initChecklists() {
  document.querySelectorAll('.checklist-body').forEach(body => {
    const setId = body.dataset.setId;
    const boxes = body.querySelectorAll('input[type="checkbox"]');

    boxes.forEach(cb => {
      if (localStorage.getItem(keyFor(setId, cb)) === '1') {
        cb.checked = true;
        cb.closest('.card-item').classList.add('checked');
      }
      cb.addEventListener('change', () => {
        localStorage.setItem(keyFor(setId, cb), cb.checked ? '1' : '0');
        cb.closest('.card-item').classList.toggle('checked', cb.checked);
        updateProgress(body);
        if (cb._tierBar) updateTierCount(cb._tierBar);
      });
    });

    body.querySelector('.btn-check-all')?.addEventListener('click', () => {
      boxes.forEach(cb => {
        cb.checked = true;
        cb.closest('.card-item').classList.add('checked');
        localStorage.setItem(keyFor(setId, cb), '1');
      });
      updateProgress(body);
      body.querySelectorAll('.tier-bar').forEach(updateTierCount);
    });
    body.querySelector('.btn-uncheck-all')?.addEventListener('click', () => {
      boxes.forEach(cb => {
        cb.checked = false;
        cb.closest('.card-item').classList.remove('checked');
        localStorage.setItem(keyFor(setId, cb), '0');
      });
      updateProgress(body);
      body.querySelectorAll('.tier-bar').forEach(updateTierCount);
    });

    updateProgress(body);
    body.querySelectorAll('.tier-bar').forEach(updateTierCount);
  });
}

// ── CARD TYPE FILTERS ─────────────────────────────
function initCardFilters() {
  document.querySelectorAll('.card-filter-strip').forEach(strip => {
    const body     = strip.closest('.checklist-body');
    if (!body) return;
    const cardList = body.querySelector('.card-list');
    const buttons  = strip.querySelectorAll('.filter-btn');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        if (!cardList) return;

        cardList.querySelectorAll('.card-item:not(.card-divider)').forEach(item => {
          item.style.display = (filter === 'all' || item.dataset.type === filter) ? '' : 'none';
        });

        // Parallel callout only makes sense under All / Parallel views
        cardList.querySelectorAll('.parallel-note').forEach(note => {
          note.style.display = (filter === 'all' || filter === 'parallel') ? '' : 'none';
        });

        // Hide dividers whose entire section is filtered out
        cardList.querySelectorAll('.card-item.card-divider').forEach(div => {
          let sib = div.nextElementSibling;
          let visible = false;
          while (sib && !sib.classList.contains('card-divider')) {
            if (sib.style.display !== 'none') { visible = true; break; }
            sib = sib.nextElementSibling;
          }
          div.style.display = visible ? '' : 'none';
        });
      });
    });
  });
}

function updateProgress(body) {
  const total   = body.querySelectorAll('input[type="checkbox"]').length;
  const checked = body.querySelectorAll('input[type="checkbox"]:checked').length;
  const pct     = total ? Math.round((checked / total) * 100) : 0;
  const bar     = body.querySelector('.progress-bar');
  const label   = body.querySelector('.progress-label');
  if (bar)   bar.style.width = pct + '%';
  if (label) label.textContent = `${checked} / ${total} (${pct}%)`;
}
