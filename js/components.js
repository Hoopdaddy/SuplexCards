/* ============================================================
   SFFR — Shared Components (Nav + Footer)
   Injects consistent nav/footer into every page.
   body[data-depth="0"] = root (index, about, search, etc.)
   body[data-depth="1"] = subdirectory (franchise/, media/, item/)
   ============================================================ */

(function () {
  const depth = parseInt(document.body.dataset.depth || '0', 10);
  const root  = depth === 0 ? '' : '../';

  /* ---- Navigation HTML ---------------------------------------- */
  const NAV_HTML = `
<nav class="nav" id="site-nav">
  <div class="nav__inner">
    <a href="${root}index.html" class="nav__logo">
      <span>SFFR</span> — Fandom Registry
    </a>
    <div class="nav__links" id="nav-links">
      <a href="${root}index.html"              class="nav__link">Home</a>
      <a href="${root}catalog.html"            class="nav__link">Franchises</a>
      <a href="${root}about.html"              class="nav__link">About</a>
      <a href="${root}how-it-works.html"       class="nav__link">How It Works</a>
    </div>
    <div class="nav__actions">
      <div class="nav-search search-form">
        <input
          type="text"
          class="search-form__input"
          placeholder="Search franchises…"
          autocomplete="off"
          spellcheck="false"
          aria-label="Search"
        >
        <button class="search-form__btn" type="button" aria-label="Search">⌕</button>
      </div>
      <button class="nav__mobile-btn" id="mobile-toggle" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</nav>`;

  /* ---- Footer HTML -------------------------------------------- */
  const FOOTER_HTML = `
<footer class="footer">
  <div class="container">
    <div class="footer__grid">

      <!-- Col 1: Brand -->
      <div>
        <p class="footer__brand-name"><span>SFFR</span> — Sci-Fi &amp; Fantasy Fandom Registry</p>
        <p class="footer__brand-summary">
          The definitive database of movies, TV shows, comics, books, games, and collectibles
          tied to your favorite sci-fi and fantasy universes.
        </p>
      </div>

      <!-- Col 2: Browse -->
      <div>
        <p class="footer__heading">Browse</p>
        <ul class="footer__links">
          <li><a href="${root}catalog.html"            class="footer__link">All Franchises</a></li>
          <li><a href="${root}search.html"           class="footer__link">Search</a></li>
          <li><a href="${root}franchise/star-wars.html"          class="footer__link">Star Wars</a></li>
          <li><a href="${root}franchise/dune.html"               class="footer__link">Dune</a></li>
          <li><a href="${root}franchise/lord-of-the-rings.html"  class="footer__link">Lord of the Rings</a></li>
        </ul>
      </div>

      <!-- Col 3: Discover -->
      <div>
        <p class="footer__heading">Discover</p>
        <ul class="footer__links">
          <li><a href="${root}about.html"        class="footer__link">About Us</a></li>
          <li><a href="${root}how-it-works.html" class="footer__link">How It Works</a></li>
          <li><a href="#" class="footer__link">Submit a Franchise</a></li>
          <li><a href="#" class="footer__link">Collector's Guide</a></li>
        </ul>
      </div>

      <!-- Col 4: Follow Us -->
      <div>
        <p class="footer__heading">Follow Us</p>
        <ul class="footer__links">
          <li>
            <a href="https://instagram.com" target="_blank" rel="noopener" class="footer__social-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Instagram
            </a>
          </li>
          <li>
            <a href="https://discord.com" target="_blank" rel="noopener" class="footer__social-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.114 18.1.132 18.11a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
              </svg>
              Discord
            </a>
          </li>
        </ul>
      </div>

    </div>
    <div class="footer__bottom">
      <span>&copy; 2026 Sci-Fi &amp; Fantasy Fandom Registry. All rights reserved.</span>
      <span>Built for collectors &amp; fans.</span>
    </div>
  </div>
</footer>`;

  /* ---- Inject -------------------------------------------------- */
  const navEl    = document.getElementById('nav-placeholder');
  const footerEl = document.getElementById('footer-placeholder');
  if (navEl)    navEl.outerHTML    = NAV_HTML;
  if (footerEl) footerEl.outerHTML = FOOTER_HTML;

  /* ---- Mobile menu toggle ------------------------------------- */
  document.addEventListener('click', function(e) {
    const btn = document.getElementById('mobile-toggle');
    const links = document.getElementById('nav-links');
    if (btn && btn.contains(e.target)) {
      links && links.classList.toggle('open');
    } else if (links && links.classList.contains('open') && !links.contains(e.target)) {
      links.classList.remove('open');
    }
  });

  /* ---- Mark active nav link ----------------------------------- */
  const path = window.location.pathname;
  document.querySelectorAll('.nav__link').forEach(link => {
    if (link.getAttribute('href') && path.endsWith(link.getAttribute('href').replace(/^.*\//, ''))) {
      link.classList.add('nav__link--active');
    }
  });

})();
