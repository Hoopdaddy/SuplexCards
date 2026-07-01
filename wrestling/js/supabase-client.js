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

// ── Cloud sync hook — called by checklist.js on every add/remove ─
window.SUPABASE_CHECKLIST = {
  async sync(action, card) {
    if (!_currentUser) return;
    const cl = await getDefaultChecklist();
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

// ── Nav auth UI ───────────────────────────────────────────────────
function injectAuthNav() {
  const navInner = document.querySelector('.nav-inner');
  if (!navInner) return;
  document.getElementById('nav-auth')?.remove();

  const base = _authBase();
  const div = document.createElement('div');
  div.id = 'nav-auth';
  div.className = 'nav-auth';

  if (_currentUser) {
    const meta = _currentUser.user_metadata || {};
    const name = meta.display_name || _currentUser.email.split('@')[0];
    div.innerHTML = `
      <span class="nav-user-name" title="${_currentUser.email}">&#x1F464; ${name}</span>
      <button class="nav-signout-btn" id="nav-signout-btn">Sign Out</button>`;
    div.querySelector('#nav-signout-btn').addEventListener('click', () => SB_AUTH.signOut());
  } else {
    div.innerHTML = `
      <a href="${base}login.html" class="nav-auth-signin">Sign In</a>
      <a href="${base}register.html" class="nav-auth-register">Register</a>`;
  }

  // Insert before the hamburger (last child), or just append
  const hamburger = navInner.querySelector('.hamburger');
  hamburger ? navInner.insertBefore(div, hamburger) : navInner.appendChild(div);
}

function _authBase() {
  const p = window.location.pathname;
  const segs = p.split('/');
  segs[segs.length - 1] = '';
  return segs.join('/');
}

// ── Auth state listener ───────────────────────────────────────────
sb.auth.onAuthStateChange(async (event, session) => {
  _currentUser = session?.user || null;
  _defaultChecklist = null;
  injectAuthNav();
  if (event === 'SIGNED_IN') await uploadLocalChecklist();
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
        emailRedirectTo: 'https://hoopdaddy.github.io/SuplexCards/wrestling/auth-callback.html'
      }
    }),

  resetPasswordEmail: (email) =>
    sb.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://hoopdaddy.github.io/SuplexCards/wrestling/reset-password.html'
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
