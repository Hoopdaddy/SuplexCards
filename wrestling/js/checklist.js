/* ═══════════════════════════════════════════════════════════════
   SUPLEX CARDS — Checklist Manager (Release 1: localStorage)

   Manages guest checklist state via localStorage. Designed with a
   clean interface so Release 2 can swap in Supabase sync without
   changing any other files.

   Data shape (localStorage key: 'sc_list'):
   {
     version: 2,
     cards: {
       "univ25-1": {
         id: "univ25-1",        // setId-cardValue
         setId: "univ25",
         setName: "2025 Topps Universe WWE",
         year: 2022,
         num: "1",
         name: "Ivar",
         type: "base",
         link: "current-topps.html",
         checkedAt: "2026-06-30T..."
       }, ...
     }
   }
═══════════════════════════════════════════════════════════════ */

const CHECKLIST = (() => {
  const STORAGE_KEY = 'sc_list';
  const VERSION = 2;

  // ── Internal store ──────────────────────────────────────────────
  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { version: VERSION, cards: {} };
      const data = JSON.parse(raw);
      // Migrate v1 (no metadata) → v2
      if (!data.version || data.version < 2) return { version: VERSION, cards: {} };
      return data;
    } catch { return { version: VERSION, cards: {} }; }
  }

  function save(data) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
  }

  // ── Public API ──────────────────────────────────────────────────
  function add(card) {
    const data = load();
    data.cards[card.id] = { ...card, checkedAt: new Date().toISOString() };
    save(data);
    updateBadge();
    _syncToCloud('add', card);
  }

  function remove(id) {
    const data = load();
    delete data.cards[id];
    save(data);
    updateBadge();
    _syncToCloud('remove', { id });
  }

  function has(id) {
    return !!load().cards[id];
  }

  function getAll() {
    return load().cards;
  }

  function count() {
    return Object.keys(load().cards).length;
  }

  function clear() {
    save({ version: VERSION, cards: {} });
    updateBadge();
  }

  // ── Cloud sync hook (Release 2 wires this in) ────────────────────
  function _syncToCloud(action, data) {
    if (typeof SUPABASE_CHECKLIST !== 'undefined') {
      SUPABASE_CHECKLIST.sync(action, data);
    }
  }

  // ── Nav badge ────────────────────────────────────────────────────
  function updateBadge() {
    // Badge shows checklist count (set by supabase-client for logged-in users).
    // Guests have no named lists — hide the badge; cloud will override when auth resolves.
    const badge = document.getElementById('nav-cl-badge');
    if (!badge) return;
    badge.style.display = 'none';
  }

  function injectNav() {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks || document.getElementById('nav-cl-link')) return;
    const li = document.createElement('li');
    li.innerHTML = `<a href="checklist.html" id="nav-cl-link" class="nav-cl-link">
      My Checklist<span id="nav-cl-badge" class="nav-cl-badge" style="display:none">0</span>
    </a>`;
    navLinks.appendChild(li);
    updateBadge();
  }

  // ── DOM helpers ─────────────────────────────────────────────────
  function getSetName(body) {
    const setId = body.dataset.setId;
    // Direct attribute on set-header
    let header = document.querySelector(`.set-header[data-set-id="${setId}"]`);
    if (!header) {
      // Walk backwards from body to find preceding set-header
      let node = body.previousElementSibling;
      while (node && !node.classList.contains('set-header')) {
        node = node.previousElementSibling;
      }
      header = node;
    }
    if (!header) return setId;
    const span = header.querySelector('.set-name') || header.querySelector('h3');
    return span ? span.textContent.trim() : setId;
  }

  function buildCardData(cb, body) {
    const setId = body.dataset.setId || '';
    const year  = parseInt(body.dataset.year) || 0;
    const num   = cb.value || '';
    const item  = cb.closest('.card-item');
    const label = item?.querySelector('label');
    // Name: label text before any child span
    let name = label ? (label.firstChild?.textContent?.trim() || label.textContent.trim()) : '';
    const type = item?.dataset.type || 'base';
    const link = window.location.pathname.split('/').pop() || '';

    // For tier-bar cards, the key may include tier prefix (from main.js keyFor)
    const bar  = cb._tierBar;
    const tier = bar ? (bar.dataset.activeTier || bar.dataset.baseTier) : null;
    const id   = tier && tier !== bar?.dataset.baseTier
      ? `${setId}__${tier}-${num}`
      : `${setId}-${num}`;

    return { id, setId, setName: getSetName(body), year, num, name, type, link };
  }

  // ── Wire checkbox events (after main.js runs) ────────────────────
  function wireCheckboxes() {
    // Event delegation: catch all checkbox changes inside checklist-body
    document.addEventListener('change', e => {
      const cb = e.target;
      if (cb.type !== 'checkbox') return;
      const body = cb.closest('.checklist-body');
      if (!body) return;

      if (cb.checked) {
        add(buildCardData(cb, body));
      } else {
        const setId = body.dataset.setId || '';
        const bar   = cb._tierBar;
        const tier  = bar ? (bar.dataset.activeTier || bar.dataset.baseTier) : null;
        const id    = tier && tier !== bar?.dataset.baseTier
          ? `${setId}__${tier}-${cb.value}`
          : `${setId}-${cb.value}`;
        remove(id);
      }
    }, true); // capture phase so we see it before bubbling stops
  }

  // ── "Saving to" banner (shown once per era page section) ────────
  async function updateDestBanner() {
    const banners = document.querySelectorAll('.cl-dest-banner');
    if (!banners.length) return;

    const user = (typeof SB_AUTH !== 'undefined') ? SB_AUTH.getUser() : null;
    let html;

    if (user) {
      let name = 'My Checklist';
      try {
        if (typeof SUPABASE_CHECKLIST !== 'undefined') {
          const lists    = await SUPABASE_CHECKLIST.getAllChecklists();
          const activeId = localStorage.getItem('sc_active_list');
          const active   = lists.find(l => l.id === activeId) || lists[0];
          if (active) name = active.name;
        }
      } catch {}
      html = `<span class="cl-dest-icon">✓</span> Saving to <strong class="cl-dest-name">${name}</strong> &nbsp;·&nbsp; <a href="checklist.html">View Checklist →</a>`;
    } else {
      html = `<span class="cl-dest-icon">📋</span> Cards saved in this browser &nbsp;·&nbsp; <a href="login.html">Sign in</a> to sync across devices`;
    }

    banners.forEach(b => b.innerHTML = html);
  }

  function injectDestBanner() {
    // Only inject on pages that have accordion checklist-bodies (era pages)
    const sections = [...document.querySelectorAll('.section')].filter(s =>
      s.querySelector('.checklist-body')
    );
    sections.forEach(section => {
      if (section.querySelector('.cl-dest-banner')) return;
      const banner = document.createElement('div');
      banner.className = 'cl-dest-banner';
      section.insertBefore(banner, section.firstChild);
    });
    updateDestBanner();
  }

  // ── Init ────────────────────────────────────────────────────────
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', _run);
    } else {
      _run();
    }
  }

  function _run() {
    injectNav();
    wireCheckboxes();
    injectDestBanner();

    // Also mark already-checked cards as "in checklist" from prior visits
    // (main.js already restores visual state; this just keeps the store in sync)
    const existing = load().cards;
    document.querySelectorAll('.checklist-body').forEach(body => {
      const setId = body.dataset.setId;
      body.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
        const bar  = cb._tierBar;
        const tier = bar ? (bar.dataset.activeTier || bar.dataset.baseTier) : null;
        const id   = tier && tier !== bar?.dataset.baseTier
          ? `${setId}__${tier}-${cb.value}`
          : `${setId}-${cb.value}`;
        if (!existing[id]) {
          // Checkbox is visually checked (restored by main.js) but not in metadata store → sync
          add(buildCardData(cb, body));
        }
      });
    });
  }

  init();

  return { add, remove, has, getAll, count, clear, updateBadge, updateDestBanner };
})();
