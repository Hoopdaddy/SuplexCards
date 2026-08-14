/* ═══════════════════════════════════════════════════════════════
   SUPLEX CARDS — Supabase Client (Release 2)

   Initializes the Supabase client, manages auth state, injects
   nav auth UI, and defines SUPABASE_CHECKLIST so checklist.js
   syncs checked cards to the cloud when a user is logged in.
═══════════════════════════════════════════════════════════════ */

const SUPABASE_URL = 'https://fhugynachpxqkpwiosbg.supabase.co';
const SUPABASE_KEY = 'sb_publishable_mOl_9FvCRmiCi-xdYZjgmg_pnmHeKVb';

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

let _currentUser = null;
let _defaultChecklist = null;
let _activeChecklistId = localStorage.getItem('sc_active_list') || null;

// ── Default checklist (create on first login if missing) ─────────
async function getDefaultChecklist() {
  if (_defaultChecklist) return _defaultChecklist;
  if (!_currentUser) return null;

  const { data } = await sb
    .from('checklists')
    .select('*')
    .eq('user_id', _currentUser.id)
    .eq('is_default', true)
    .maybeSingle();

  if (data) { _defaultChecklist = data; return data; }

  const { data: created } = await sb
    .from('checklists')
    .insert({ user_id: _currentUser.id, name: 'My Checklist', is_default: true })
    .select()
    .single();

  _defaultChecklist = created;
  return created;
}

// ── Active checklist (falls back to default) ─────────────────────
async function getActiveChecklist() {
  if (!_currentUser) return null;
  if (_activeChecklistId) {
    const { data } = await sb.from('checklists').select('*')
      .eq('id', _activeChecklistId).eq('user_id', _currentUser.id).maybeSingle();
    if (data) return data;
  }
  return getDefaultChecklist();
}

// ── Cloud sync hook — called by checklist.js on every add/remove ─
window.SUPABASE_CHECKLIST = {
  async sync(action, card) {
    if (!_currentUser) return;
    const cl = await getActiveChecklist();
    if (!cl) return;

    if (action === 'add') {
      await sb.from('checklist_items').upsert({
        checklist_id: cl.id,
        user_id:      _currentUser.id,
        card_key:     card.id,
        set_id:       card.setId,
        set_name:     card.setName,
        year:         card.year || null,
        card_num:     card.num,
        card_name:    card.name,
        card_type:    card.type,
        page_link:    card.link
      }, { onConflict: 'checklist_id,card_key' });

    } else if (action === 'remove') {
      await sb.from('checklist_items')
        .delete()
        .eq('checklist_id', cl.id)
        .eq('card_key', card.id);
    }
  },

  setActive(id) {
    _activeChecklistId = id;
    if (id) localStorage.setItem('sc_active_list', id);
    else localStorage.removeItem('sc_active_list');
  },

  async getAllChecklists() {
    if (!_currentUser) return [];
    const { data } = await sb.from('checklists')
      .select('id, name, is_default, created_at')
      .eq('user_id', _currentUser.id)
      .order('created_at');
    return data || [];
  },

  async getItems(checklistId) {
    const { data } = await sb.from('checklist_items')
      .select('*')
      .eq('checklist_id', checklistId);
    return (data || []).map(r => ({
      id:        r.card_key,
      setId:     r.set_id,
      setName:   r.set_name,
      year:      r.year,
      num:       r.card_num,
      name:      r.card_name,
      type:      r.card_type,
      link:      r.page_link,
      checkedAt: r.created_at
    }));
  },

  async createChecklist(name) {
    if (!_currentUser) return { error: 'Not signed in.' };
    const { data: existing } = await sb.from('checklists')
      .select('id').eq('user_id', _currentUser.id);
    if (existing && existing.length >= 5)
      return { error: 'You can have a maximum of 5 checklists.' };
    const { data, error } = await sb.from('checklists')
      .insert({ user_id: _currentUser.id, name, is_default: false })
      .select().single();
    return { data, error: error?.message };
  },

  async renameChecklist(id, name) {
    if (!_currentUser) return;
    await sb.from('checklists').update({ name })
      .eq('id', id).eq('user_id', _currentUser.id);
  },

  async deleteChecklist(id) {
    if (!_currentUser) return { error: 'Not signed in.' };
    const { data: all } = await sb.from('checklists')
      .select('id').eq('user_id', _currentUser.id);
    if (!all || all.length <= 1)
      return { error: 'Cannot delete your only checklist.' };
    await sb.from('checklist_items').delete().eq('checklist_id', id);
    await sb.from('checklists').delete().eq('id', id).eq('user_id', _currentUser.id);
    if (_activeChecklistId === id) {
      _activeChecklistId = null;
      localStorage.removeItem('sc_active_list');
      _defaultChecklist = null;
    }
    return {};
  }
};

// ── Upload localStorage checklist to cloud after sign-in ─────────
async function uploadLocalChecklist() {
  if (typeof CHECKLIST === 'undefined') return;
  const entries = Object.values(CHECKLIST.getAll());
  if (!entries.length) return;

  const cl = await getDefaultChecklist();
  if (!cl) return;

  const rows = entries.map(card => ({
    checklist_id: cl.id,
    user_id:      _currentUser.id,
    card_key:     card.id,
    set_id:       card.setId,
    set_name:     card.setName,
    year:         card.year || null,
    card_num:     card.num,
    card_name:    card.name,
    card_type:    card.type,
    page_link:    card.link
  }));

  await sb.from('checklist_items')
    .upsert(rows, { onConflict: 'checklist_id,card_key' });
}

// ── Nav list selector (populated after auth resolves) ─────────────
async function populateNavListSelect() {
  const select = document.getElementById('nav-list-select');
  if (!select || !_currentUser) return;
  const lists = await SUPABASE_CHECKLIST.getAllChecklists();
  if (!lists || lists.length < 2) return;
  const activeId = _activeChecklistId || lists[0]?.id;
  select.innerHTML = lists.map(l =>
    `<option value="${l.id}"${l.id === activeId ? ' selected' : ''}>${l.name}</option>`
  ).join('');
  select.style.display = '';
  select.addEventListener('change', () => SUPABASE_CHECKLIST.setActive(select.value));
}

// ── Nav auth UI ───────────────────────────────────────────────────
function injectAuthNav() {
  const navInner = document.querySelector('.nav-inner');
  if (!navInner) return;
  document.getElementById('nav-auth')?.remove();
  document.getElementById('nav-mobile-auth')?.remove();

  const base = _authBase();

  // Desktop top-bar auth block
  const div = document.createElement('div');
  div.id = 'nav-auth';
  div.className = 'nav-auth';

  // Mobile auth block — appended inside .nav-links overlay
  const mobileEl = document.createElement('li');
  mobileEl.id = 'nav-mobile-auth';
  mobileEl.className = 'nav-mobile-auth';

  if (_currentUser) {
    const meta = _currentUser.user_metadata || {};
    const name = meta.display_name || _currentUser.email.split('@')[0];
    div.innerHTML = `
      <span class="nav-user-name" title="${_currentUser.email}">&#x1F464; ${name}</span>
      <select class="nav-list-select" id="nav-list-select" style="display:none" title="Active checklist"></select>
      <button class="nav-signout-btn" id="nav-signout-btn">Sign Out</button>`;
    div.querySelector('#nav-signout-btn').addEventListener('click', () => SB_AUTH.signOut());
    mobileEl.innerHTML = `
      <span class="nav-user-name">&#x1F464; ${name}</span>
      <button class="nav-signout-btn" id="nav-mobile-signout-btn">Sign Out</button>`;
    mobileEl.querySelector('#nav-mobile-signout-btn').addEventListener('click', () => SB_AUTH.signOut());
    populateNavListSelect();
  } else {
    div.innerHTML = `
      <a href="${base}login.html" class="nav-auth-signin">Sign In</a>
      <a href="${base}register.html" class="nav-auth-register">Register</a>`;
    mobileEl.innerHTML = `
      <a href="${base}login.html" class="nav-auth-signin">Sign In</a>
      <a href="${base}register.html" class="nav-auth-register">Register</a>`;
  }

  // Insert desktop block before the hamburger
  const hamburger = navInner.querySelector('.hamburger');
  hamburger ? navInner.insertBefore(div, hamburger) : navInner.appendChild(div);

  // Append mobile block at bottom of slide-out nav
  const navLinks = document.querySelector('.nav-links');
  if (navLinks) navLinks.appendChild(mobileEl);
}

function _authBase() {
  const p = window.location.pathname;
  const segs = p.split('/');
  segs[segs.length - 1] = '';
  return segs.join('/');
}

// ── Nav badge: cloud count for logged-in users ────────────────────
async function _updateNavBadgeFromCloud() {
  try {
    const { count } = await sb.from('checklists')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', _currentUser.id);
    if (count == null) return;
    const badge = document.getElementById('nav-cl-badge');
    if (badge) {
      badge.textContent = count > 999 ? '999+' : count;
      badge.style.display = count > 0 ? 'inline-flex' : 'none';
    }
  } catch {}
}

// ── Auth state listener ───────────────────────────────────────────
sb.auth.onAuthStateChange(async (event, session) => {
  _currentUser = session?.user || null;
  _defaultChecklist = null;
  injectAuthNav();
  if (event === 'SIGNED_IN') await uploadLocalChecklist();
  if (typeof CHECKLIST !== 'undefined') CHECKLIST.updateDestBanner?.();
  if (_currentUser) _updateNavBadgeFromCloud();
});

// ── Public API ────────────────────────────────────────────────────
window.SB_AUTH = {
  getUser:   () => _currentUser,
  getClient: () => sb,

  async signOut() {
    await sb.auth.signOut();
    window.location.href = _authBase() + 'index.html';
  },

  signIn: (email, password) =>
    sb.auth.signInWithPassword({ email, password }),

  signUp: (email, password, displayName) =>
    sb.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName },
        emailRedirectTo: 'https://suplexcards.cardboardmania.com/auth-callback.html'
      }
    }),

  resetPasswordEmail: (email) =>
    sb.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://suplexcards.cardboardmania.com/reset-password.html'
    }),

  updatePassword: (newPassword) =>
    sb.auth.updateUser({ password: newPassword })
};

// ── Init: restore session on page load ───────────────────────────
(async () => {
  const { data: { session } } = await sb.auth.getSession();
  _currentUser = session?.user || null;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectAuthNav);
  } else {
    injectAuthNav();
  }
})();
