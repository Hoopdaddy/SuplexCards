/* ===================================================
   SUPLEX TRADING CARDS — Main JavaScript
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initTabs();
  initSetAccordions();
  initChecklists();
});

// ── NAV ──────────────────────────────────────────────
function initNav() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (hamburger) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  }

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

// ── TABS ─────────────────────────────────────────────
function initTabs() {
  document.querySelectorAll('.checklist-tabs').forEach(tabGroup => {
    const buttons = tabGroup.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.dataset.tab;
        document.querySelectorAll('.checklist-panel').forEach(p => {
          p.classList.toggle('active', p.dataset.panel === target);
        });
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

// ── CHECKLISTS (localStorage) ────────────────────────
function initChecklists() {
  document.querySelectorAll('.checklist-body').forEach(body => {
    const setId = body.dataset.setId;
    const boxes = body.querySelectorAll('input[type="checkbox"]');

    boxes.forEach(cb => {
      if (localStorage.getItem(`${setId}-${cb.value}`) === '1') {
        cb.checked = true;
        cb.closest('.card-item').classList.add('checked');
      }
      cb.addEventListener('change', () => {
        localStorage.setItem(`${setId}-${cb.value}`, cb.checked ? '1' : '0');
        cb.closest('.card-item').classList.toggle('checked', cb.checked);
        updateProgress(body);
      });
    });

    body.querySelector('.btn-check-all')?.addEventListener('click', () => {
      boxes.forEach(cb => {
        cb.checked = true;
        cb.closest('.card-item').classList.add('checked');
        localStorage.setItem(`${setId}-${cb.value}`, '1');
      });
      updateProgress(body);
    });
    body.querySelector('.btn-uncheck-all')?.addEventListener('click', () => {
      boxes.forEach(cb => {
        cb.checked = false;
        cb.closest('.card-item').classList.remove('checked');
        localStorage.setItem(`${setId}-${cb.value}`, '0');
      });
      updateProgress(body);
    });

    updateProgress(body);
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
