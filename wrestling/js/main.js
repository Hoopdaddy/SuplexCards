/* ===================================================
   SUPLEX TRADING CARDS — Main JavaScript
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  normalizeSetStructure();  // must run before any filtering
  rebuildYearGroups();      // sort sets by year + regenerate dividers
  normalizeSetLabels();     // one consistent filter-category tag per set
  initTabs();
  initYearFilter();
  initSetAccordions();
  initTierTrackers();
  initChecklists();
  initCardFilters();
});

// ── NORMALIZE SET STRUCTURE ──────────────────────────
// Some sets were authored with the tier-bar placed either INSIDE the
// set-header or as a stray SIBLING between the header and its body:
//   <set-header> <tier-bar> <checklist-body>
// Both break filtering and the accordion, which rely on the body being
// the header's immediate nextElementSibling. Relocate every tier-bar to
// the top of its matching checklist-body so the structure is uniform.
function normalizeSetStructure() {
  document.querySelectorAll('.tier-bar').forEach(tierBar => {
    if (tierBar.closest('.checklist-body')) return;  // already in place

    // Find the checklist-body this tier-bar belongs to: walk forward
    // past the header/tier-bar siblings until we hit the body.
    let node = tierBar.nextElementSibling;
    while (node && !node.classList.contains('checklist-body') &&
           !node.classList.contains('set-header')) {
      node = node.nextElementSibling;
    }
    if (node && node.classList.contains('checklist-body')) {
      node.insertBefore(tierBar, node.firstChild);
    }
  });
}

// ── REBUILD YEAR GROUPS ──────────────────────────────
// The hand-authored HTML has two classes of structural damage:
//   1. year-break dividers that are missing, duplicated, or out of order
//   2. stray/misplaced </div> tags that let whole sets "leak" out of
//      their <checklist-panel> and land as direct children of .section
// Rather than hunt every bad tag in a multi-MB file, rebuild each
// section from the source of truth — each set-header's name + data-year:
//   • collect EVERY set (in a panel or leaked) across the whole section
//   • re-home each set into the correct panel by matching TAB_RULES
//   • sort each panel's sets by year and emit one fresh divider per year
// An .era-intro banner keeps its place at the top of its panel.
const _PANEL_PRIORITY = ['premium', 'nxt', 'chrome', 'select', 'prizm', 'flagship', 'wcw90', 'ecw90', 'wwf90'];

function rebuildYearGroups() {
  const makeBreak = year => {
    const wrap = document.createElement('div');
    wrap.className = 'year-break';
    wrap.innerHTML =
      '<div class="year-break-line"></div>' +
      '<span class="year-break-label">' + year + '</span>' +
      '<div class="year-break-line"></div>';
    return wrap;
  };

  document.querySelectorAll('.section').forEach(section => {
    const panelEls = [...section.querySelectorAll('.checklist-panel')];
    if (!panelEls.length) return;

    const panels = {};
    panelEls.forEach(p => { panels[p.dataset.panel] = p; });
    const available = new Set(Object.keys(panels));

    // Which panel does a set belong in? First matching rule by priority.
    const panelFor = name => {
      for (const key of _PANEL_PRIORITY) {
        if (available.has(key) && TAB_RULES[key] && TAB_RULES[key](name)) return key;
      }
      return available.has('flagship') ? 'flagship' : panelEls[0].dataset.panel;
    };

    // Preserve each panel's era-intro banner(s).
    const leads = {};
    panelEls.forEach(p => {
      leads[p.dataset.panel] = [...p.children].filter(c => c.classList.contains('era-intro'));
    });

    // Collect every set across the whole section (panels + leaked).
    const buckets = {};
    available.forEach(k => (buckets[k] = []));
    section.querySelectorAll('.set-header').forEach(header => {
      const nameEl = header.querySelector('h3') || header.querySelector('.set-name');
      const name   = nameEl ? nameEl.textContent.trim() : '';
      const year   = header.dataset.year || '';
      const body   = header.nextElementSibling;
      const nodes  = [header];
      if (body && body.classList.contains('checklist-body')) nodes.push(body);
      const target = panelFor(name);
      buckets[target].push({ year, nodes, order: buckets[target].length });
    });

    // Drop all existing dividers; we re-emit fresh ones.
    section.querySelectorAll('.year-break').forEach(yb => yb.remove());

    // Rebuild each panel: era-intro lead, then year-sorted sets.
    Object.keys(panels).forEach(key => {
      const panel  = panels[key];
      const groups = buckets[key];
      groups.sort((a, b) => {
        const ya = parseInt(a.year, 10) || Infinity;
        const yb = parseInt(b.year, 10) || Infinity;
        return ya !== yb ? ya - yb : a.order - b.order;
      });

      panel.innerHTML = '';
      (leads[key] || []).forEach(el => panel.appendChild(el));
      let lastYear = null;
      groups.forEach(g => {
        if (g.year !== lastYear) {
          if (g.year) panel.appendChild(makeBreak(g.year));
          lastYear = g.year;
        }
        g.nodes.forEach(n => panel.appendChild(n));
      });
    });

    // Sweep up any stragglers that leaked directly into the section.
    [...section.children].forEach(c => {
      if (c.classList.contains('set-header') ||
          c.classList.contains('checklist-body') ||
          c.classList.contains('year-break')) {
        c.remove();
      }
    });
  });
}

// ── NORMALIZE SET LABELS ─────────────────────────────
// Every set row shows exactly ONE tag = the filter category it belongs to,
// so labels are consistent instead of a mix of year / brand / sub-brand tags.
//   • physical panels (data-panel)  → that panel IS the category
//   • single name-filtered panel    → first matching TAB_RULES category
//   • pages with no filter tabs      → collapse to just the year tag
// Tier-bars and chevrons are left untouched (they aren't labels).
const _FILTER_TAG = {
  flagship: ['Flagship', 'tag-flagship'],
  chrome:   ['Chrome',   'tag-chrome'],
  premium:  ['Premium',  'tag-premium'],
  nxt:      ['NXT',      'tag-nxt'],
  prizm:    ['Prizm',    'tag-prizm'],
  select:   ['Select',   'tag-select'],
  wwf90:    ['WWF',      'tag-wwf'],
  wcw90:    ['WCW',      'tag-wcw'],
  ecw90:    ['ECW',      'tag-ecw'],
};

function _setFilterTag(header, label, cls) {
  header.querySelectorAll('.tag').forEach(t => t.remove());
  const tag = document.createElement('span');
  tag.className = 'tag ' + cls;
  tag.textContent = label;
  // Old style: a flex container holding the chevron sits as a header child.
  const flex = [...header.children].find(c => c.querySelector && c.querySelector('.set-chevron'));
  if (flex) {
    flex.insertBefore(tag, flex.querySelector('.set-chevron'));
  } else {
    (header.querySelector('.set-title-row') || header).appendChild(tag);
  }
}

function normalizeSetLabels() {
  // Only categories that are actual filter tabs ON THIS PAGE are valid labels.
  const pageTabs = new Set([...document.querySelectorAll('.tab-btn')].map(b => b.dataset.tab));
  const hasTabs = pageTabs.size > 0;
  const nameOrder = _PANEL_PRIORITY.filter(k => pageTabs.has(k) && TAB_RULES[k] && _FILTER_TAG[k]);

  document.querySelectorAll('.set-header').forEach(header => {
    const panel = header.closest('.checklist-panel');
    const panelKey = panel && panel.dataset.panel;

    // 1. Physical panel → use the panel as the category (most accurate).
    if (panelKey && _FILTER_TAG[panelKey]) {
      _setFilterTag(header, _FILTER_TAG[panelKey][0], _FILTER_TAG[panelKey][1]);
      return;
    }

    // 2. Single name-filtered panel (e.g. Panini) → match by set name.
    if (hasTabs) {
      const name = _setName(header);
      const key = nameOrder.find(k => TAB_RULES[k](name));
      if (key) {
        _setFilterTag(header, _FILTER_TAG[key][0], _FILTER_TAG[key][1]);
      } else {
        header.querySelectorAll('.tag').forEach(t => t.remove()); // belongs to no filter
      }
      return;
    }

    // 3. No filter tabs on this page → keep only the year tag for consistency.
    const tags = [...header.querySelectorAll('.tag')];
    const yearTag = tags.find(t => /^\d{4}/.test(t.textContent.trim()));
    if (yearTag) tags.forEach(t => { if (t !== yearTag) t.remove(); });
  });
}

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
// First Topps premium: Undisputed, Transcendent, Legends, Women's Division, Elite
const _PREMIUM_TOPPS  = /undisputed|transcendent|\blegends\b|women.s.division|\belite\b/i;
// Panini premium: National Treasures, Immaculate, Impeccable, Prizm Premium Box Set
const _PREMIUM_PANINI = /national.treasures|immaculate|impeccable|prizm.premium.box/i;
const _isPremium      = n => _PREMIUM_TOPPS.test(n) || _PREMIUM_PANINI.test(n);

const TAB_RULES = {
  // ── First Topps era ──────────────────────────────────
  chrome:   n => /chrome/i.test(n),
  flagship: n => !(/chrome/i.test(n) || /\bnxt\b/i.test(n) || _isPremium(n)),

  // ── Panini era ───────────────────────────────────────
  prizm:    n => /prizm/i.test(n) && !_PREMIUM_PANINI.test(n),
  select:   n => /select/i.test(n),

  // ── Shared ───────────────────────────────────────────
  nxt:      n => /\bnxt\b/i.test(n),
  premium:  n => _isPremium(n),

  // ── Golden Age era (by promotion) ────────────────────
  wcw90:    n => /\bwcw\b/i.test(n),
  ecw90:    n => /\becw\b/i.test(n),
  wwf90:    n => /\bwwf\b/i.test(n),
};

// Seed active tabs from whatever tab-btn has class="active" in the HTML.
// Falls back to 'flagship' for pages that don't mark an initial tab.
const _seedTab = (() => {
  const btn = document.querySelector('.tab-btn.active');
  return btn ? btn.dataset.tab : null;
})();
const _activeTabs = _seedTab ? new Set([_seedTab]) : new Set();
let _activeYear   = 'all';
let _activeSection = null;

function _setName(header) {
  const el = header.querySelector('h3') || header.querySelector('.set-name');
  return el ? el.textContent.trim() : '';
}

function _tabVisible(header, name) {
  if (_activeTabs.size === 0) return true;          // nothing selected → show all
  // Physical-panel pages (First Topps, Golden Age): a set's category is the
  // panel it physically lives in — match that, not its name.
  const panel = header.closest('.checklist-panel');
  const panelKey = panel && panel.dataset.panel;
  if (panelKey) return _activeTabs.has(panelKey);
  // Single-panel pages (Panini): match the set name against the tab rules.
  for (const tab of _activeTabs) {
    if (TAB_RULES[tab] && TAB_RULES[tab](name)) return true;
  }
  return false;
}

// Returns whether a set-header should be visible given BOTH tab and year filters.
function _setVisible(header) {
  const name = _setName(header);
  if (!name) return true;                           // no name → always show (structural)
  if (!_tabVisible(header, name)) return false;     // tab filter hides it
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
      body.style.display = visible ? (body.classList.contains('open') ? 'block' : '') : 'none';
    }
  });

  // Hide year-breaks that have no visible sets, and era-intros when year-filtered
  _hideEmptyYearBreaks();
}

function _hideEmptyYearBreaks() {
  // Hide each year-break that has no visible set-header following it
  // (stops at the next year-break or end of container)
  document.querySelectorAll('.year-break').forEach(yb => {
    let sib = yb.nextElementSibling;
    let hasVisible = false;
    while (sib && !sib.classList.contains('year-break')) {
      if (sib.classList.contains('set-header') && sib.style.display !== 'none') {
        hasVisible = true;
        break;
      }
      sib = sib.nextElementSibling;
    }
    yb.style.display = hasVisible ? '' : 'none';
  });

  // Hide era-intro banners when a year or tab filter is active
  const filtered = _activeYear !== 'all' || _activeTabs.size > 0;
  document.querySelectorAll('.era-intro').forEach(el => {
    el.style.display = filtered ? 'none' : '';
  });
}

function initTabs() {
  document.querySelectorAll('.checklist-tabs').forEach(tabGroup => {
    tabGroup.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        if (_activeTabs.has(tab)) {
          // Clicking the active tab deselects it → show all
          _activeTabs.clear();
        } else {
          // Clicking a different tab → exclusive selection
          _activeTabs.clear();
          _activeTabs.add(tab);
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
  // Tier-bar relocation is handled by normalizeSetStructure() up front,
  // so every set-header's nextElementSibling is now its checklist-body.

  // ── Step 2: Ensure every expandable set-header has a chevron ────
  document.querySelectorAll('.set-header').forEach(header => {
    if (!header.querySelector('.set-chevron')) {
      const chev = document.createElement('span');
      chev.className = 'set-chevron';
      chev.innerHTML = '&#9662;';
      header.appendChild(chev);
    }
  });

  // ── Step 3: Bind accordion toggle ───────────────────────────────
  document.querySelectorAll('.set-header').forEach(header => {
    header.addEventListener('click', e => {
      // Ignore clicks inside tier-bar (parallel picker)
      if (e.target.closest('.tier-bar')) return;
      const body = header.nextElementSibling;
      if (!body || !body.classList.contains('checklist-body')) return;
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
