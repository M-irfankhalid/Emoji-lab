/* ═══════════════════════════════════════════════
   Emoji Lab — Application Logic v2
   Dual-picker UX · Copy image · CDN fallback
   ═══════════════════════════════════════════════ */

// ─── Emoji Metadata ───
const EMOJIS = [
    // Smileys
    { char: '😀', name: 'grinning face', cp: '1f600', cat: 'Smileys' },
    { char: '😃', name: 'grinning face big eyes', cp: '1f603', cat: 'Smileys' },
    { char: '😄', name: 'grinning squinting face', cp: '1f604', cat: 'Smileys' },
    { char: '😁', name: 'beaming face', cp: '1f601', cat: 'Smileys' },
    { char: '😆', name: 'squinting face', cp: '1f606', cat: 'Smileys' },
    { char: '😅', name: 'sweat smile', cp: '1f605', cat: 'Smileys' },
    { char: '🤣', name: 'rolling laughing', cp: '1f923', cat: 'Smileys' },
    { char: '😂', name: 'joy tears', cp: '1f602', cat: 'Smileys' },
    { char: '🙂', name: 'slightly smiling', cp: '1f642', cat: 'Smileys' },
    { char: '😉', name: 'winking face', cp: '1f609', cat: 'Smileys' },
    { char: '😊', name: 'smiling blush', cp: '1f60a', cat: 'Smileys' },
    { char: '😇', name: 'smiling halo', cp: '1f607', cat: 'Smileys' },
    { char: '😍', name: 'heart eyes', cp: '1f60d', cat: 'Smileys' },
    { char: '🤩', name: 'star struck', cp: '1f929', cat: 'Smileys' },
    { char: '😘', name: 'kissing heart', cp: '1f618', cat: 'Smileys' },
    { char: '😜', name: 'winking tongue', cp: '1f61c', cat: 'Smileys' },
    { char: '🤪', name: 'zany face', cp: '1f92a', cat: 'Smileys' },
    { char: '😎', name: 'sunglasses cool', cp: '1f60e', cat: 'Smileys' },
    { char: '🤓', name: 'nerd face', cp: '1f913', cat: 'Smileys' },
    { char: '🥳', name: 'party face', cp: '1f973', cat: 'Smileys' },
    { char: '😢', name: 'crying face', cp: '1f622', cat: 'Smileys' },
    { char: '😭', name: 'loudly crying', cp: '1f62d', cat: 'Smileys' },
    { char: '😤', name: 'steam nose', cp: '1f624', cat: 'Smileys' },
    { char: '🤯', name: 'exploding head', cp: '1f92f', cat: 'Smileys' },
    { char: '🥺', name: 'pleading face', cp: '1f97a', cat: 'Smileys' },
    { char: '😈', name: 'smiling horns', cp: '1f608', cat: 'Smileys' },
    { char: '🤡', name: 'clown face', cp: '1f921', cat: 'Smileys' },
    { char: '💀', name: 'skull', cp: '1f480', cat: 'Smileys' },
    { char: '👻', name: 'ghost', cp: '1f47b', cat: 'Smileys' },
    { char: '🤖', name: 'robot', cp: '1f916', cat: 'Smileys' },

    // Animals
    { char: '🐱', name: 'cat face', cp: '1f431', cat: 'Animals' },
    { char: '🐶', name: 'dog face', cp: '1f436', cat: 'Animals' },
    { char: '🐻', name: 'bear', cp: '1f43b', cat: 'Animals' },
    { char: '🐼', name: 'panda', cp: '1f43c', cat: 'Animals' },
    { char: '🐸', name: 'frog', cp: '1f438', cat: 'Animals' },
    { char: '🐵', name: 'monkey face', cp: '1f435', cat: 'Animals' },
    { char: '🦊', name: 'fox', cp: '1f98a', cat: 'Animals' },
    { char: '🦁', name: 'lion', cp: '1f981', cat: 'Animals' },
    { char: '🐧', name: 'penguin', cp: '1f427', cat: 'Animals' },
    { char: '🐢', name: 'turtle', cp: '1f422', cat: 'Animals' },
    { char: '🦋', name: 'butterfly', cp: '1f98b', cat: 'Animals' },
    { char: '🐙', name: 'octopus', cp: '1f419', cat: 'Animals' },
    { char: '🐝', name: 'honeybee', cp: '1f41d', cat: 'Animals' },
    { char: '🦄', name: 'unicorn', cp: '1f984', cat: 'Animals' },

    // Food
    { char: '🍕', name: 'pizza', cp: '1f355', cat: 'Food' },
    { char: '🍔', name: 'hamburger', cp: '1f354', cat: 'Food' },
    { char: '🍩', name: 'doughnut', cp: '1f369', cat: 'Food' },
    { char: '🍦', name: 'ice cream', cp: '1f366', cat: 'Food' },
    { char: '🍉', name: 'watermelon', cp: '1f349', cat: 'Food' },
    { char: '🍓', name: 'strawberry', cp: '1f353', cat: 'Food' },
    { char: '🌮', name: 'taco', cp: '1f32e', cat: 'Food' },
    { char: '🧁', name: 'cupcake', cp: '1f9c1', cat: 'Food' },
    { char: '☕', name: 'coffee', cp: '2615', cat: 'Food' },
    { char: '🍺', name: 'beer', cp: '1f37a', cat: 'Food' },

    // Objects
    { char: '🔥', name: 'fire', cp: '1f525', cat: 'Objects' },
    { char: '⭐', name: 'star', cp: '2b50', cat: 'Objects' },
    { char: '🎸', name: 'guitar', cp: '1f3b8', cat: 'Objects' },
    { char: '🎮', name: 'video game', cp: '1f3ae', cat: 'Objects' },
    { char: '💡', name: 'light bulb', cp: '1f4a1', cat: 'Objects' },
    { char: '🎯', name: 'target', cp: '1f3af', cat: 'Objects' },
    { char: '🎪', name: 'circus tent', cp: '1f3aa', cat: 'Objects' },
    { char: '💎', name: 'gem stone', cp: '1f48e', cat: 'Objects' },
    { char: '🎈', name: 'balloon', cp: '1f388', cat: 'Objects' },
    { char: '🏆', name: 'trophy', cp: '1f3c6', cat: 'Objects' },

    // Hearts
    { char: '❤️', name: 'red heart', cp: '2764-fe0f', cat: 'Hearts' },
    { char: '🧡', name: 'orange heart', cp: '1f9e1', cat: 'Hearts' },
    { char: '💛', name: 'yellow heart', cp: '1f49b', cat: 'Hearts' },
    { char: '💚', name: 'green heart', cp: '1f49a', cat: 'Hearts' },
    { char: '💙', name: 'blue heart', cp: '1f499', cat: 'Hearts' },
    { char: '💜', name: 'purple heart', cp: '1f49c', cat: 'Hearts' },
    { char: '🖤', name: 'black heart', cp: '1f5a4', cat: 'Hearts' },
    { char: '💖', name: 'sparkling heart', cp: '1f496', cat: 'Hearts' },
    { char: '💝', name: 'heart ribbon', cp: '1f49d', cat: 'Hearts' },
    { char: '💘', name: 'heart arrow', cp: '1f498', cat: 'Hearts' },

    // Hands
    { char: '👍', name: 'thumbs up', cp: '1f44d', cat: 'Hands' },
    { char: '👎', name: 'thumbs down', cp: '1f44e', cat: 'Hands' },
    { char: '👏', name: 'clapping', cp: '1f44f', cat: 'Hands' },
    { char: '🤝', name: 'handshake', cp: '1f91d', cat: 'Hands' },
    { char: '✌️', name: 'peace sign', cp: '270c-fe0f', cat: 'Hands' },
    { char: '🤞', name: 'crossed fingers', cp: '1f91e', cat: 'Hands' },
    { char: '💪', name: 'flexed biceps', cp: '1f4aa', cat: 'Hands' },
    { char: '👋', name: 'waving hand', cp: '1f44b', cat: 'Hands' },

    // Weather
    { char: '🌈', name: 'rainbow', cp: '1f308', cat: 'Weather' },
    { char: '☀️', name: 'sun', cp: '2600-fe0f', cat: 'Weather' },
    { char: '🌙', name: 'crescent moon', cp: '1f319', cat: 'Weather' },
    { char: '⚡', name: 'lightning', cp: '26a1', cat: 'Weather' },
    { char: '❄️', name: 'snowflake', cp: '2744-fe0f', cat: 'Weather' },
    { char: '🌊', name: 'wave', cp: '1f30a', cat: 'Weather' },
    { char: '🌸', name: 'cherry blossom', cp: '1f338', cat: 'Weather' },
    { char: '🌻', name: 'sunflower', cp: '1f33b', cat: 'Weather' },
    { char: '🍀', name: 'four leaf clover', cp: '1f340', cat: 'Weather' },
    { char: '🌵', name: 'cactus', cp: '1f335', cat: 'Weather' },
];

const CDN_DATES = ['20201001','20210218','20210831','20220203','20220815','20230301','20230803','20240610'];

// ─── State ───
const state = {
    emojiA: null,
    emojiB: null,
    catA: 'All',
    catB: 'All',
    searchA: '',
    searchB: '',
    currentUrl: '',
};

// Incremented on every new mix; in-flight image chains compare against it and
// abandon their result when it has moved on.
let loadToken = 0;
let toastTimer = null;

// ─── DOM ───
const $ = (s) => document.querySelector(s);
const dom = {
    slotA: $('#slotA'), slotB: $('#slotB'),
    slotAEmoji: $('#slotAEmoji'), slotBEmoji: $('#slotBEmoji'),
    placeholder: $('#resultPlaceholder'),
    loading: $('#resultLoading'),
    resultCard: $('#resultCard'),
    resultImg: $('#resultImg'),
    resultError: $('#resultError'),
    liveStatus: $('#liveStatus'),
    actionButtons: $('#actionButtons'),
    btnCopyImg: $('#btnCopyImg'),
    btnCopyLink: $('#btnCopyLink'),
    btnDownload: $('#btnDownload'),
    btnRandom: $('#btnRandom'),
    searchA: $('#searchA'), searchB: $('#searchB'),
    tabsA: $('#tabsA'), tabsB: $('#tabsB'),
    gridA: $('#gridA'), gridB: $('#gridB'),
    emptyA: $('#emptyA'), emptyB: $('#emptyB'),
    toast: $('#toast'),
};

const CATEGORIES = ['All', ...new Set(EMOJIS.map(e => e.cat))];
const CAT_ICONS = { All:'✨', Smileys:'😀', Animals:'🐾', Food:'🍕', Objects:'🔥', Hearts:'💖', Hands:'🤚', Weather:'🌈' };

// ─── Init ───
function init() {
    renderTabs('A');
    renderTabs('B');
    renderGrid('A');
    renderGrid('B');
    bindEvents();
}

// ─── Render Tabs ───
function renderTabs(side) {
    const container = side === 'A' ? dom.tabsA : dom.tabsB;
    const active = side === 'A' ? state.catA : state.catB;
    // These are filters, not a tab widget, so the active one is expressed with
    // aria-pressed rather than role="tab"/aria-selected.
    container.innerHTML = CATEGORIES.map(c => {
        const isActive = c === active;
        return `<button class="picker__tab${isActive ? ' active' : ''}" data-cat="${c}" data-side="${side}" aria-pressed="${isActive ? 'true' : 'false'}"><span aria-hidden="true">${CAT_ICONS[c] || '📁'}</span> ${c}</button>`;
    }).join('');
}

// ─── Render Grid ───
function renderGrid(side) {
    const grid = side === 'A' ? dom.gridA : dom.gridB;
    const empty = side === 'A' ? dom.emptyA : dom.emptyB;
    const cat = side === 'A' ? state.catA : state.catB;
    const search = side === 'A' ? state.searchA : state.searchB;
    const selected = side === 'A' ? state.emojiA : state.emojiB;

    const filtered = EMOJIS.filter(e => {
        const matchCat = cat === 'All' || e.cat === cat;
        const matchSearch = !search || e.name.toLowerCase().includes(search) || e.char.includes(search);
        return matchCat && matchSearch;
    });

    if (!filtered.length) {
        grid.innerHTML = '';
        empty.classList.remove('hidden');
        return;
    }

    empty.classList.add('hidden');

    // Replacing innerHTML destroys the focused button. Remember whether the grid
    // held focus so we can restore it — otherwise focus drops to <body> after a
    // selection and arrow-key navigation silently stops working.
    const hadFocus = grid.contains(document.activeElement);

    grid.innerHTML = filtered.map((e, i) => {
        const isSel = selected && selected.cp === e.cp;
        return `<button class="picker__emoji${isSel ? ' selected' : ''}" data-cp="${e.cp}" data-side="${side}" title="${e.name}" aria-pressed="${isSel ? 'true' : 'false'}" tabindex="${i === 0 ? '0' : '-1'}">${e.char}</button>`;
    }).join('');

    if (hadFocus) {
        const target = grid.querySelector('.picker__emoji.selected') || grid.querySelector('.picker__emoji');
        if (target) {
            target.tabIndex = 0;
            target.focus();
        }
    }
}

// ─── Select ───
function selectEmoji(side, cp) {
    const emoji = EMOJIS.find(e => e.cp === cp);
    if (!emoji) return;

    if (side === 'A') {
        state.emojiA = emoji;
        dom.slotAEmoji.textContent = emoji.char;
        dom.slotA.classList.add('filled');
    } else {
        state.emojiB = emoji;
        dom.slotBEmoji.textContent = emoji.char;
        dom.slotB.classList.remove('filled');
        dom.slotB.classList.add('filled', 'filled-b');
    }

    renderGrid(side);

    if (state.emojiA && state.emojiB) {
        loadMixedEmoji();
    }
}

// ─── Update Slots (for random) ───
function updateSlots() {
    if (state.emojiA) {
        dom.slotAEmoji.textContent = state.emojiA.char;
        dom.slotA.classList.add('filled');
        dom.slotA.classList.remove('filled-b');
    }
    if (state.emojiB) {
        dom.slotBEmoji.textContent = state.emojiB.char;
        dom.slotB.classList.add('filled', 'filled-b');
    }
}

// ─── CDN URL ───
function buildUrl(date, a, b) {
    return `https://www.gstatic.com/android/keyboard/emojikitchen/${date}/u${a}/u${a}_u${b}.png`;
}

// Some entries carry a FE0F variation selector (❤️ ✌️ ☀️ ❄️) and it is not
// documented which form the CDN uses for them, so try the declared form first
// and the bare codepoint as a fallback. Emoji without FE0F yield one variant.
function cpVariants(cp) {
    return cp.includes('-fe0f') ? [cp, cp.replace('-fe0f', '')] : [cp];
}

// Every URL worth trying, in priority order: direct order before reversed, and
// within each, newest CDN date first. Generated once per load so the sequential
// walk below is a simple index.
function buildCandidates(a, b) {
    const urls = [];
    for (const [x, y] of [[a, b], [b, a]]) {
        for (let i = CDN_DATES.length - 1; i >= 0; i--) {
            for (const cx of cpVariants(x)) {
                for (const cy of cpVariants(y)) {
                    urls.push(buildUrl(CDN_DATES[i], cx, cy));
                }
            }
        }
    }
    return urls;
}

// ─── Load Image ───
function loadMixedEmoji() {
    if (!state.emojiA || !state.emojiB) return;
    // Bump the token so any in-flight chain from a previous pair abandons its
    // result instead of overwriting this one (or blanking it via the error path).
    const token = ++loadToken;
    showState('loading');
    tryLoad(buildCandidates(state.emojiA.cp, state.emojiB.cp), 0, token);
}

function tryLoad(candidates, i, token) {
    if (token !== loadToken) return;

    if (i >= candidates.length) {
        showState('error');
        dom.actionButtons.classList.add('hidden');
        state.currentUrl = '';
        return;
    }

    const url = candidates[i];
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
        if (token !== loadToken) return;
        state.currentUrl = url;
        dom.resultImg.src = url;
        dom.resultImg.alt = `${state.emojiA.name} mixed with ${state.emojiB.name}`;
        showState('result');
        dom.actionButtons.classList.remove('hidden');
    };
    img.onerror = () => tryLoad(candidates, i + 1, token);
    img.src = url;
}

function showState(v) {
    dom.placeholder.classList.add('hidden');
    dom.loading.classList.add('hidden');
    dom.resultImg.classList.add('hidden');
    dom.resultError.classList.add('hidden');
    dom.resultCard.setAttribute('aria-busy', v === 'loading' ? 'true' : 'false');

    switch (v) {
        case 'loading': dom.loading.classList.remove('hidden'); break;
        case 'result':  dom.resultImg.classList.remove('hidden'); break;
        case 'error':   dom.resultError.classList.remove('hidden'); break;
        default:        dom.placeholder.classList.remove('hidden');
    }

    const a = state.emojiA?.name;
    const b = state.emojiB?.name;
    dom.liveStatus.textContent =
        v === 'loading' ? 'Mixing…'
            : v === 'result' ? `${a} mixed with ${b} — ready`
                : v === 'error' ? `No artwork found for ${a} and ${b}`
                    : '';
}

// ─── Actions ───

// Copy actual image to clipboard (as PNG blob)
async function copyImage() {
    if (!state.currentUrl) return;
    try {
        const resp = await fetch(state.currentUrl);
        const blob = await resp.blob();
        const pngBlob = await toPngBlob(blob);
        await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': pngBlob })
        ]);
        showToast('📋 Image copied to clipboard!');
    } catch {
        // Fallback: copy link instead
        try {
            await navigator.clipboard.writeText(state.currentUrl);
            showToast('🔗 Link copied (image copy not supported in this browser)');
        } catch {
            showToast('⚠️ Copy failed — try right-clicking the image');
        }
    }
}

// The CDN already serves PNG, so the canvas round-trip is only needed for other
// formats. Returns the original blob whenever conversion isn't possible, so the
// caller never hands ClipboardItem a null.
async function toPngBlob(blob) {
    if (blob.type === 'image/png') return blob;

    const objectUrl = URL.createObjectURL(blob);
    try {
        return await new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                canvas.getContext('2d').drawImage(img, 0, 0);
                canvas.toBlob((pngBlob) => resolve(pngBlob || blob), 'image/png');
            };
            img.onerror = () => resolve(blob);
            img.src = objectUrl;
        });
    } finally {
        URL.revokeObjectURL(objectUrl);
    }
}

async function copyLink() {
    if (!state.currentUrl) return;
    try {
        await navigator.clipboard.writeText(state.currentUrl);
        showToast('🔗 Link copied to clipboard!');
    } catch {
        const ta = document.createElement('textarea');
        ta.value = state.currentUrl;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('🔗 Link copied!');
    }
}

async function downloadPng() {
    if (!state.currentUrl) return;
    try {
        showToast('⬇️ Downloading…');
        const r = await fetch(state.currentUrl);
        const blob = await r.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `emoji-lab-${state.emojiA.cp}_${state.emojiB.cp}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('✅ Downloaded!');
    } catch {
        showToast('⚠️ Download failed — try right-clicking the image');
    }
}

function randomize() {
    const a = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    let b;
    do { b = EMOJIS[Math.floor(Math.random() * EMOJIS.length)]; } while (b.cp === a.cp);
    state.emojiA = a;
    state.emojiB = b;
    updateSlots();
    renderGrid('A');
    renderGrid('B');
    loadMixedEmoji();
}

// ─── Toast ───
function showToast(msg) {
    // Clear the pending hide so a fast follow-up toast ("Downloading…" then
    // "Downloaded!") isn't cut short by the earlier timer.
    clearTimeout(toastTimer);
    dom.toast.textContent = msg;
    dom.toast.classList.remove('hidden');
    void dom.toast.offsetWidth;
    dom.toast.classList.add('show');
    toastTimer = setTimeout(() => {
        dom.toast.classList.remove('show');
        toastTimer = setTimeout(() => dom.toast.classList.add('hidden'), 300);
    }, 2200);
}

// ─── Events ───
function bindEvents() {
    // Grid clicks (delegated)
    dom.gridA.addEventListener('click', (e) => {
        const btn = e.target.closest('.picker__emoji');
        if (btn) selectEmoji('A', btn.dataset.cp);
    });
    dom.gridB.addEventListener('click', (e) => {
        const btn = e.target.closest('.picker__emoji');
        if (btn) selectEmoji('B', btn.dataset.cp);
    });

    // Tab clicks (delegated)
    dom.tabsA.addEventListener('click', (e) => {
        const t = e.target.closest('.picker__tab');
        if (!t) return;
        state.catA = t.dataset.cat;
        renderTabs('A');
        renderGrid('A');
    });
    dom.tabsB.addEventListener('click', (e) => {
        const t = e.target.closest('.picker__tab');
        if (!t) return;
        state.catB = t.dataset.cat;
        renderTabs('B');
        renderGrid('B');
    });

    // Search
    dom.searchA.addEventListener('input', (e) => {
        state.searchA = e.target.value.trim().toLowerCase();
        renderGrid('A');
    });
    dom.searchB.addEventListener('input', (e) => {
        state.searchB = e.target.value.trim().toLowerCase();
        renderGrid('B');
    });

    // Action buttons
    dom.btnCopyImg.addEventListener('click', copyImage);
    dom.btnCopyLink.addEventListener('click', copyLink);
    dom.btnDownload.addEventListener('click', downloadPng);
    dom.btnRandom.addEventListener('click', randomize);

    // Keyboard nav in grids
    [dom.gridA, dom.gridB].forEach(grid => {
        grid.addEventListener('keydown', (e) => {
            const items = [...grid.querySelectorAll('.picker__emoji')];
            const cur = document.activeElement;
            const idx = items.indexOf(cur);
            if (idx === -1) return;

            // Count columns by position rather than dividing widths — the old
            // width math ignored the grid gap and padding and came out one
            // column too high, so ArrowDown drifted sideways as you pressed it.
            const cols = items.filter(el => el.offsetTop === items[0].offsetTop).length || 1;

            let next = -1;
            switch (e.key) {
                case 'ArrowRight': next = Math.min(idx + 1, items.length - 1); break;
                case 'ArrowLeft':  next = Math.max(idx - 1, 0); break;
                case 'ArrowDown':  next = Math.min(idx + cols, items.length - 1); break;
                case 'ArrowUp':    next = Math.max(idx - cols, 0); break;
                // Enter/Space deliberately unhandled: the button's native click
                // already reaches the delegated grid handler. Intercepting them
                // here fired selectEmoji() twice for one keypress.
                default: return;
            }

            if (next !== -1 && next !== idx) {
                e.preventDefault();
                items[idx].tabIndex = -1;
                items[next].tabIndex = 0;
                items[next].focus();
            }
        });
    });

    // R for random
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        if (e.key === 'r' || e.key === 'R') { e.preventDefault(); randomize(); }
    });
}

// ─── Boot ───
document.addEventListener('DOMContentLoaded', init);
