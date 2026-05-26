/* ============================================================
   SFFR — Main JavaScript
   Hero gallery, carousels, search, tabs, timelines
   ============================================================ */

/* ---- Utility -------------------------------------------------- */
function qs(sel, ctx)  { return (ctx || document).querySelector(sel); }
function qsa(sel, ctx) { return [...(ctx || document).querySelectorAll(sel)]; }

/* ---- Hero Gallery (rotating slides) --------------------------- */
function initHeroGallery() {
  const track = qs('.hero-gallery__track');
  if (!track) return;
  const slides = qsa('.hero-slide', track);
  const dotsWrap = qs('.hero-gallery__dots');
  if (!slides.length) return;

  let current = 0;
  let timer;

  // Build dots
  if (dotsWrap) {
    dotsWrap.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'hero-gallery__dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
  }

  function goTo(idx) {
    slides[current].classList.remove('active');
    if (dotsWrap) dotsWrap.children[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dotsWrap) dotsWrap.children[current].classList.add('active');
  }

  function next() { goTo(current + 1); }

  slides[0].classList.add('active');
  timer = setInterval(next, 5500);
  track.addEventListener('mouseenter', () => clearInterval(timer));
  track.addEventListener('mouseleave', () => { timer = setInterval(next, 5500); });
}

/* ---- Generic Horizontal Carousel ------------------------------ */
function initCarousels() {
  qsa('[data-carousel]').forEach(wrapper => {
    const track = qs('[data-carousel-track]', wrapper);
    const prevBtn = qs('[data-carousel-prev]', wrapper);
    const nextBtn = qs('[data-carousel-next]', wrapper);
    if (!track) return;

    function scrollBy(dir) {
      const cardW = track.firstElementChild ? track.firstElementChild.offsetWidth + 20 : 320;
      track.scrollBy({ left: dir * cardW * 2, behavior: 'smooth' });
    }
    prevBtn && prevBtn.addEventListener('click', () => scrollBy(-1));
    nextBtn && nextBtn.addEventListener('click', () => scrollBy( 1));
  });
}

/* ---- Search Autocomplete -------------------------------------- */
function initSearch() {
  const forms = qsa('.search-form');
  forms.forEach(form => {
    const input = qs('.search-form__input', form);
    const btn   = qs('.search-form__btn',   form);
    if (!input) return;

    // Create autocomplete dropdown
    const ac = document.createElement('div');
    ac.className = 'search-autocomplete';
    form.appendChild(ac);

    let debounceT;
    input.addEventListener('input', () => {
      clearTimeout(debounceT);
      debounceT = setTimeout(() => updateAC(input.value), 140);
    });

    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); doSearch(input.value); }
      if (e.key === 'Escape') hideAC();
    });

    document.addEventListener('click', e => {
      if (!form.contains(e.target)) hideAC();
    });

    function updateAC(q) {
      if (!q.trim() || q.length < 2) { hideAC(); return; }
      if (typeof searchAll !== 'function') return;
      const results = searchAll(q);
      if (!results.length) { hideAC(); return; }
      ac.innerHTML = results.slice(0, 6).map(r =>
        `<button class="search-ac__item" data-url="${r.url}">
           <span class="search-ac__type">${r.type}</span>
           <span class="search-ac__name">${r.name}</span>
         </button>`
      ).join('');
      ac.classList.add('visible');
      qsa('.search-ac__item', ac).forEach(item => {
        item.addEventListener('click', () => navigate(item.dataset.url));
      });
    }

    function hideAC() { ac.classList.remove('visible'); ac.innerHTML = ''; }

    function doSearch(q) {
      if (!q.trim()) return;
      if (typeof searchAll !== 'function') return;
      const results = searchAll(q);
      if (results.length === 1 || (results[0] && results[0].score >= 50)) {
        navigate(results[0].url);
      } else {
        const depth = parseInt(document.body.dataset.depth || '0', 10);
        const root  = depth === 0 ? '' : '../';
        window.location.href = `${root}search.html?q=${encodeURIComponent(q)}`;
      }
    }

    btn && btn.addEventListener('click', () => doSearch(input.value));
  });
}

function navigate(url) {
  const depth = parseInt(document.body.dataset.depth || '0', 10);
  const root  = depth === 0 ? '' : '../';
  // If url already has a directory prefix, use as-is from root
  window.location.href = root + url;
}

/* ---- Tab System ----------------------------------------------- */
function initTabs() {
  qsa('.tabs').forEach(tabBar => {
    const tabs    = qsa('.tab', tabBar);
    const panels  = qsa('[data-panel]', tabBar.closest('[data-tabs]') || document);
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        if (panels.length) {
          panels.forEach(p => p.style.display = 'none');
          if (panels[i]) panels[i].style.display = '';
        }
      });
    });
    // Activate first tab
    if (tabs[0]) tabs[0].classList.add('active');
    if (panels.length) {
      panels.forEach((p, i) => { p.style.display = i === 0 ? '' : 'none'; });
    }
  });
}

/* ---- Timeline Dots -------------------------------------------- */
function initTimelines() {
  qsa('.timeline-item').forEach(item => {
    item.addEventListener('click', () => {
      qsa('.timeline-item').forEach(t => t.classList.remove('active'));
      item.classList.add('active');
    });
  });
}

/* ---- Sort Toggle (L2 pages) ----------------------------------- */
function initSortToggle() {
  qsa('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.sort-bar') || btn.parentElement;
      qsa('.toggle-btn', group).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

/* ---- Search Results Page -------------------------------------- */
function initSearchPage() {
  const grid = qs('#search-results-grid');
  if (!grid) return;
  const params = new URLSearchParams(window.location.search);
  const q      = params.get('q') || '';
  const queryEl = qs('#search-query');
  if (queryEl) queryEl.textContent = q;

  if (!q || typeof searchAll !== 'function') {
    grid.innerHTML = '<p class="text-muted">Enter a search term to discover franchises, films, and collectibles.</p>';
    return;
  }

  const results = searchAll(q);
  const depth = parseInt(document.body.dataset.depth || '0', 10);
  const root  = depth === 0 ? '' : '../';

  if (!results.length) {
    grid.innerHTML = `<p class="text-muted">No results found for "<strong>${q}</strong>". Try a franchise name like "Star Wars" or "Dune".</p>`;
    return;
  }

  grid.innerHTML = results.map(r => `
    <a href="${root}${r.url}" class="franchise-card">
      <div class="franchise-card__image" style="background: linear-gradient(135deg, #1A2B42, #0D1B2E); display:flex; align-items:center; justify-content:center;">
        <span style="font-size:2rem">🔍</span>
      </div>
      <div class="franchise-card__body">
        <p class="franchise-card__meta text-accent">${r.type}</p>
        <h3 class="franchise-card__name">${r.name}</h3>
      </div>
    </a>
  `).join('');
}

/* ---- IP Chips on Home Page ------------------------------------ */
function initFranchiseChips() {
  const grid = qs('#franchise-chips');
  if (!grid || typeof FRANCHISES === 'undefined') return;
  const depth = parseInt(document.body.dataset.depth || '0', 10);
  const root  = depth === 0 ? '' : '../';

  grid.innerHTML = FRANCHISES.map(f => `
    <a href="${root}franchise/${f.slug}.html" class="ip-chip">
      <div class="ip-chip__icon" style="background: ${f.bgGradient || 'var(--surface-alt)'};">${f.emoji}</div>
      <div>
        <div class="ip-chip__name">${f.shortName || f.name}</div>
        <div class="ip-chip__count">${f.stats ? f.stats.years : ''}</div>
      </div>
    </a>
  `).join('');
}

/* ---- Hero Slides on Home Page --------------------------------- */
function buildHeroSlides() {
  const track = qs('#hero-slides');
  if (!track || typeof FRANCHISES === 'undefined') return;
  const depth = parseInt(document.body.dataset.depth || '0', 10);
  const root  = depth === 0 ? '' : '../';

  const featured = FRANCHISES.slice(0, 6);
  track.innerHTML = featured.map((f, i) => `
    <div class="hero-slide${i === 0 ? ' active' : ''}">
      <div class="hero-slide__bg" style="background: ${f.bgGradient || 'var(--bg)'};"></div>
      <div class="hero-slide__overlay"></div>
      <div class="hero-slide__content">
        <p class="hero-slide__genre">${(f.genre || []).join(' · ')}</p>
        <h2 class="hero-slide__title">${f.name}</h2>
        <p class="hero-slide__desc">${(f.description || '').slice(0, 160)}…</p>
        <a href="${root}franchise/${f.slug}.html" class="btn btn--primary btn--lg">Explore Universe</a>
      </div>
    </div>
  `).join('');
}

/* ---- News Carousel on Home Page ------------------------------ */
function buildNewsCarousel() {
  const track = qs('#news-track');
  if (!track || typeof NEWS_ITEMS === 'undefined') return;
  track.innerHTML = NEWS_ITEMS.map(n => `
    <a href="${n.url}" class="news-card">
      <div class="news-card__image" style="background: ${n.bg};"></div>
      <div class="news-card__body">
        <p class="news-card__tag">${n.tag}</p>
        <h4 class="news-card__title">${n.title}</h4>
        <p class="news-card__date">${n.date}</p>
      </div>
    </a>
  `).join('');
}

/* ---- Films Gallery on Home Page ------------------------------ */
function buildFilmsGallery() {
  const track = qs('#films-track');
  if (!track || typeof RECENT_FILMS === 'undefined') return;
  track.innerHTML = RECENT_FILMS.map(f => `
    <div class="media-card">
      <div class="media-card__poster">
        <div class="media-card__poster-bg" style="background: ${f.bg};"></div>
        <div class="media-card__overlay"></div>
        <div class="media-card__info">
          <p class="media-card__title">${f.title}</p>
          <p class="media-card__year">${f.franchise} · ${f.year}</p>
        </div>
      </div>
    </div>
  `).join('');
}

/* ---- Collectibles Gallery on Home Page ----------------------- */
function buildCollectiblesGallery() {
  const track = qs('#collectibles-track');
  if (!track || typeof RECENT_COLLECTIBLES === 'undefined') return;
  track.innerHTML = RECENT_COLLECTIBLES.map(c => `
    <div class="media-card">
      <div class="media-card__poster">
        <div class="media-card__poster-bg" style="background: ${c.bg};"></div>
        <div class="media-card__overlay"></div>
        <div class="media-card__info">
          <p class="media-card__title">${c.name}</p>
          <p class="media-card__year">${c.maker} · ${c.type}</p>
        </div>
      </div>
    </div>
  `).join('');
}

/* ---- Init on DOM Ready --------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  buildHeroSlides();
  buildNewsCarousel();
  buildFilmsGallery();
  buildCollectiblesGallery();
  initFranchiseChips();
  initHeroGallery();
  initCarousels();
  initSearch();
  initTabs();
  initTimelines();
  initSortToggle();
  initSearchPage();
});
