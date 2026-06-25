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

// ── TABS (multi-select, name-based filtering) ─────────
// Rules: which set names belong to each tab.
// "flagship" = anything not matching the other three.
const TAB_RULES = {
  chrome:   n => /chrome/i.test(n),
  nxt:      n => /\bnxt\b/i.test(n),
  premium:  n => /undisputed|transcendent/i.test(n),
  flagship: n => !(/chrome/i.test(n) || /\bnxt\b/i.test(n) || /undisputed|transcendent/i.test(n))
};

const _activeTabs = new Set(['flagship']);
let _activeYear   = 'all';
let _activeSection = null;

function _setName(header) {
  const el = header.querySelector('h3') || header.querySelector('.set-name');
  return el ? el.textContent.trim() : '';
}

function _tabVisible(name) {
  if (_activeTabs.size === 0) return true;          // nothing selected → show all
  for (const tab of _activeTabs) {
    if (TAB_RULES[tab] && TAB_RULES[tab](name)) return true;
  }
  return false;
}

// Returns whether a set-header should be visible given BOTH tab and year filters.
function _setVisible(header) {
  const name = _setName(header);
  if (!name) return true;                           // no name → always show (structural)
  if (!_tabVisible(name)) return false;             // tab filter hides it
  if (_activeYear === 'all') return true;           // no year filter
  return header.dataset.year === _activeYear;       // year must match
}

function _applyFilters() {
  // All panels always visible – filtering is per-set-header now
  document.querySelectorAll('.checklist-panel').forEach(p => p.classList.add('active'));

  // Update tab button active states
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.toggle('active', _activeTabs.has(b.dataset.tab));
  });

  // Show/hide each set header + its body
  document.querySelectorAll('.set-header').forEach(header => {
    const visible = _setVisible(header);
    header.style.display = visible ? '' : 'none';
    const body = header.nextElementSibling;
    if (body && body.classList.contains('checklist-body')) {
      // When hiding, close the body; when showing, restore whatever state it had
      if (!visible) {
        body.style.display = 'none';
      } else {
        body.style.display = body.classList.contains('open') ? 'block' : '';
      }
    }
  });

  // Hide year-breaks and era-intros when year filter is active
  const section = _activeSection;
  if (section) {
    const yearActive = _activeYear !== 'all';
    section.querySelectorAll('.year-break').forEach(el => el.style.display = yearActive ? 'none' : '');
    section.querySelectorAll('.era-intro').forEach(el => el.style.display  = yearActive ? 'none' : '');
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
        _applyFilters();
      });
    });
  });
  _applyFilters(); // apply initial state
}

// ── YEAR FILTER ───────────────────────────────────────
function initYearFilter() {
  document.querySelectorAll('.year-filter-bar').forEach(bar => {
    _activeSection = bar.closest('.section');
    bar.querySelectorAll('.year-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        bar.querySelectorAll('.year-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        _activeYear = btn.dataset.year;
        _applyFilters();
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
