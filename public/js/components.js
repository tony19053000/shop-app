import { checkSession, getUser, logout, subscribeAuth } from './auth.js';
import { getCartState, subscribeCart } from './cart.js';

export function formatPrice(cents) {
  return `$${(Number(cents) / 100).toFixed(2)}`;
}

export function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${escapeHtml(message)}</span>
    <button type="button" aria-label="Dismiss notification" style="background:none;border:none;cursor:pointer;color:inherit;opacity:0.6;">&times;</button>
  `;

  const closeBtn = toast.querySelector('button');
  closeBtn.addEventListener('click', () => toast.remove());

  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 4000);
}

// Inline SVG icons with 1.5px stroke
export const icons = {
  kettle: `<svg class="brand-mark-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 11h16a1 1 0 0 1 1 1v6a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-6a1 1 0 0 1 1-1Z"/>
    <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
    <path d="M4 14l-2-1v-2l2 1"/>
    <path d="M12 4v2"/>
  </svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>`,
  cart: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="8" cy="21" r="1"/>
    <circle cx="19" cy="21" r="1"/>
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
  </svg>`,
  user: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="8" r="5"/>
    <path d="M20 21a8 8 0 0 0-16 0"/>
  </svg>`,
  star: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>`,
  menu: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>`,
  close: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>`
};

export function renderProductCard(product) {
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 10;

  let badgeHtml = '';
  if (isOutOfStock) {
    badgeHtml = `<span class="badge badge-neutral product-card-badge">Sold Out</span>`;
  } else if (isLowStock) {
    badgeHtml = `<span class="badge badge-warning product-card-badge">Only ${product.stock} Left</span>`;
  } else if (product.compareAt && product.compareAt > product.price) {
    badgeHtml = `<span class="badge badge-terracotta product-card-badge">Seasonal Offer</span>`;
  }

  return `
    <article class="product-card" data-product-id="${product.id}">
      <a href="/product/${product.id}" class="product-card-media" aria-label="${escapeHtml(product.name)}">
        ${badgeHtml}
        <img src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy" />
      </a>
      <div class="product-card-content">
        <span class="product-card-category">${escapeHtml(product.category.replace('-', ' & '))}</span>
        <h3 class="product-card-title">
          <a href="/product/${product.id}">${escapeHtml(product.name)}</a>
        </h3>
        <div class="product-card-rating">
          ${icons.star}
          <span>${product.rating.toFixed(1)}</span>
          <span style="color:var(--text-light);">(${product.reviewCount})</span>
        </div>
        <div class="product-card-footer">
          <div class="product-price-wrap">
            <span class="price">${formatPrice(product.price)}</span>
            ${product.compareAt ? `<span class="price-compare">${formatPrice(product.compareAt)}</span>` : ''}
          </div>
          <a href="/product/${product.id}" class="btn btn-secondary btn-sm" aria-label="View ${escapeHtml(product.name)}">
            View
          </a>
        </div>
      </div>
    </article>
  `;
}

export function initGlobalLayout() {
  // 1. Announcement Bar
  const announcementMount = document.getElementById('announcement-mount');
  if (announcementMount) {
    announcementMount.innerHTML = `
      <div class="announcement-bar">
        <span style="display:inline-flex;align-items:center;gap:6px;">
          <span class="pulse-dot" style="background-color:#FFFFFF;width:6px;height:6px;"></span>
          Free shipping on orders over $75 &middot; 30-day returns
        </span>
      </div>
    `;
  }

  // 2. Main Site Header
  const headerMount = document.getElementById('header-mount');
  if (headerMount) {
    headerMount.innerHTML = `
      <header class="site-header">
        <div class="container header-inner">
          <button type="button" class="mobile-nav-toggle" id="mobile-menu-trigger" aria-label="Open mobile navigation">
            ${icons.menu}
          </button>

          <a href="/" class="brand-link" aria-label="Kettle & Crate Home">
            ${icons.kettle}
            <span class="brand-wordmark">Kettle &amp; Crate</span>
          </a>

          <nav aria-label="Primary navigation">
            <ul class="nav-links">
              <li><a href="/shop/cookware" class="nav-link" id="nav-cookware">Cookware</a></li>
              <li><a href="/shop/tableware" class="nav-link" id="nav-tableware">Tableware</a></li>
              <li><a href="/shop/coffee-tea" class="nav-link" id="nav-coffee-tea">Coffee &amp; Tea</a></li>
              <li><a href="/shop/pantry" class="nav-link" id="nav-pantry">Pantry</a></li>
              <li><a href="/shop" class="nav-link" id="nav-shop-all">All Goods</a></li>
            </ul>
          </nav>

          <div class="header-search">
            <form action="/search" method="GET" class="search-input-wrapper">
              ${icons.search}
              <input
                type="search"
                name="q"
                id="site-search-input"
                class="header-search-input"
                placeholder="Search home & kitchen goods..."
                autocomplete="off"
                aria-label="Search goods"
              />
            </form>
            <div id="search-suggestions" class="search-suggestions-popover" role="listbox"></div>
          </div>

          <div class="header-actions">
            <div class="account-menu-wrapper" id="account-menu-container">
              <a href="/signin" class="account-menu-trigger" id="auth-button">
                ${icons.user}
                <span>Sign in</span>
              </a>
              <div class="account-dropdown" id="account-dropdown-menu"></div>
            </div>

            <a href="/cart" class="cart-button" id="header-cart-link" aria-label="View shopping bag">
              ${icons.cart}
              <span class="cart-badge" id="header-cart-count">0</span>
            </a>
          </div>
        </div>
      </header>

      <!-- Mobile Navigation Drawer -->
      <div class="mobile-drawer-backdrop" id="mobile-drawer-backdrop"></div>
      <div class="mobile-drawer" id="mobile-drawer" aria-label="Mobile navigation">
        <div class="mobile-drawer-header">
          <a href="/" class="brand-link">
            ${icons.kettle}
            <span class="brand-wordmark">Kettle &amp; Crate</span>
          </a>
          <button type="button" class="btn-ghost" id="mobile-drawer-close" aria-label="Close navigation">
            ${icons.close}
          </button>
        </div>
        <form action="/search" method="GET" style="margin-top:var(--space-2);">
          <input
            type="search"
            name="q"
            class="form-input"
            placeholder="Search our catalog..."
            style="border-radius:var(--radius-pill);"
          />
        </form>
        <ul class="mobile-nav-links">
          <li><a href="/shop/cookware">Cookware</a></li>
          <li><a href="/shop/tableware">Tableware</a></li>
          <li><a href="/shop/coffee-tea">Coffee &amp; Tea</a></li>
          <li><a href="/shop/pantry">Pantry</a></li>
          <li><a href="/shop">Browse All Goods</a></li>
          <li style="border-top:1px solid var(--border-color);padding-top:var(--space-3);"><a href="/about">Our Story</a></li>
          <li><a href="/journal">The Journal</a></li>
          <li><a href="/account">My Account &amp; Orders</a></li>
        </ul>
      </div>
    `;

    setupHeaderSearch();
    setupMobileDrawer();
    setupAuthMenu();
    updateCartCount();
  }

  // 3. Site Footer
  const footerMount = document.getElementById('footer-mount');
  if (footerMount) {
    footerMount.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div>
              <a href="/" class="brand-link" style="margin-bottom:var(--space-4);">
                ${icons.kettle}
                <span class="brand-wordmark">Kettle &amp; Crate</span>
              </a>
              <p style="color:var(--text-muted);font-size:0.92rem;max-width:320px;line-height:1.6;">
                Honest tools and daily artifacts crafted for hearth, kitchen, and gathering. Built to last generations in small workshop batches.
              </p>
              <p style="color:var(--text-light);font-size:0.85rem;margin-top:var(--space-4);">
                Portland, Oregon &middot; Established 2026
              </p>
            </div>

            <div>
              <h4 class="footer-col-title">Shop</h4>
              <ul class="footer-link-list">
                <li><a href="/shop/cookware">Cookware</a></li>
                <li><a href="/shop/tableware">Tableware</a></li>
                <li><a href="/shop/coffee-tea">Coffee &amp; Tea</a></li>
                <li><a href="/shop/pantry">Pantry</a></li>
                <li><a href="/shop">All Provisions</a></li>
              </ul>
            </div>

            <div>
              <h4 class="footer-col-title">Help</h4>
              <ul class="footer-link-list">
                <li><a href="/shipping">Shipping &amp; Returns</a></li>
                <li><a href="/faq">Frequently Asked Questions</a></li>
                <li><a href="/contact">Contact Our Studio</a></li>
              </ul>
            </div>

            <div>
              <h4 class="footer-col-title">Company</h4>
              <ul class="footer-link-list">
                <li><a href="/about">Our Story</a></li>
                <li><a href="/journal">The Journal</a></li>
                <li><a href="/terms">Terms of Service</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
              </ul>
              <div style="margin-top:var(--space-5);">
                <label for="newsletter-email" style="font-size:0.85rem;font-weight:600;display:block;margin-bottom:var(--space-2);">The Morning Dispatch</label>
                <form id="newsletter-form" style="display:flex;gap:var(--space-2);">
                  <input
                    type="email"
                    id="newsletter-email"
                    placeholder="Your email address"
                    class="form-input"
                    style="height:38px;font-size:0.85rem;"
                    required
                  />
                  <button type="submit" class="btn btn-primary btn-sm">Join</button>
                </form>
                <p id="newsletter-status" style="font-size:0.82rem;color:var(--status-success);margin-top:var(--space-2);display:none;"></p>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <span>&copy; 2026 Kettle &amp; Crate &middot; Portland, Oregon</span>
            <span>Plastic-Free Packaging &middot; Heirloom Quality</span>
          </div>
        </div>
      </footer>
    `;

    setupNewsletter();
  }

  // Subscribe to state updates
  subscribeCart(updateCartCount);
  subscribeAuth(renderAuthDropdown);
  checkSession();
}

function updateCartCount() {
  const countEl = document.getElementById('header-cart-count');
  if (countEl) {
    const state = getCartState();
    countEl.textContent = state.itemCount;
    countEl.style.display = state.itemCount > 0 ? 'flex' : 'none';
  }
}

function setupAuthMenu() {
  const trigger = document.getElementById('auth-button');
  const dropdown = document.getElementById('account-dropdown-menu');
  if (!trigger || !dropdown) return;

  trigger.addEventListener('click', (e) => {
    const user = getUser();
    if (user) {
      e.preventDefault();
      dropdown.classList.toggle('open');
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#account-menu-container')) {
      dropdown.classList.remove('open');
    }
  });
}

function renderAuthDropdown(user) {
  const trigger = document.getElementById('auth-button');
  const dropdown = document.getElementById('account-dropdown-menu');
  if (!trigger || !dropdown) return;

  if (user) {
    trigger.href = '#';
    trigger.innerHTML = `${icons.user} <span>${escapeHtml(user.name.split(' ')[0])}</span>`;

    let adminLinks = '';
    if (user.role === 'admin') {
      adminLinks = `
        <a href="/admin" class="dropdown-link" style="color:var(--terracotta);font-weight:600;">
          Admin Dashboard
        </a>
        <div class="dropdown-divider"></div>
      `;
    }

    dropdown.innerHTML = `
      <div style="padding:var(--space-2) var(--space-3);font-size:0.82rem;color:var(--text-muted);border-bottom:1px solid var(--border-color);margin-bottom:var(--space-1);">
        Signed in as<br/><strong style="color:var(--text-main);">${escapeHtml(user.email)}</strong>
      </div>
      ${adminLinks}
      <a href="/account" class="dropdown-link">Orders &amp; Profile</a>
      <div class="dropdown-divider"></div>
      <button type="button" class="dropdown-link" id="signout-button" style="color:var(--status-danger);">
        Sign Out
      </button>
    `;

    const signoutBtn = dropdown.querySelector('#signout-button');
    if (signoutBtn) {
      signoutBtn.addEventListener('click', async () => {
        await logout();
        showToast('You have been signed out');
        window.location.href = '/';
      });
    }
  } else {
    trigger.href = '/signin';
    trigger.innerHTML = `${icons.user} <span>Sign in</span>`;
    dropdown.innerHTML = '';
    dropdown.classList.remove('open');
  }
}

function setupHeaderSearch() {
  const searchInput = document.getElementById('site-search-input');
  const suggestionsBox = document.getElementById('search-suggestions');
  if (!searchInput || !suggestionsBox) return;

  let debounceTimer;

  searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    const query = searchInput.value.trim();

    if (query.length < 2) {
      suggestionsBox.innerHTML = '';
      suggestionsBox.classList.remove('active');
      return;
    }

    debounceTimer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/products?q=${encodeURIComponent(query)}`);
        const products = await res.json();

        if (!Array.isArray(products) || products.length === 0) {
          suggestionsBox.innerHTML = `
            <div style="padding:var(--space-3);font-size:0.88rem;color:var(--text-muted);">
              No products found for "${escapeHtml(query)}"
            </div>
          `;
          suggestionsBox.classList.add('active');
          return;
        }

        const itemsHtml = products.slice(0, 5).map((p) => `
          <a href="/product/${p.id}" class="suggestion-item">
            <div class="suggestion-thumb">
              <img src="${p.image}" alt="${escapeHtml(p.name)}" />
            </div>
            <div style="flex:1;">
              <div style="font-size:0.88rem;font-weight:500;">${escapeHtml(p.name)}</div>
              <div style="font-size:0.8rem;color:var(--text-muted);">${formatPrice(p.price)}</div>
            </div>
          </a>
        `).join('');

        suggestionsBox.innerHTML = `
          <div style="font-size:0.75rem;text-transform:uppercase;color:var(--text-light);padding:var(--space-1) var(--space-3);margin-bottom:var(--space-1);">Products</div>
          ${itemsHtml}
          <div style="border-top:1px solid var(--border-color);margin-top:var(--space-2);padding-top:var(--space-2);">
            <a href="/search?q=${encodeURIComponent(query)}" style="font-size:0.85rem;color:var(--terracotta);display:block;padding:var(--space-1) var(--space-3);font-weight:500;">
              View all results for &ldquo;${escapeHtml(query)}&rdquo; &rarr;
            </a>
          </div>
        `;
        suggestionsBox.classList.add('active');
      } catch {
        suggestionsBox.classList.remove('active');
      }
    }, 200);
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.header-search')) {
      suggestionsBox.classList.remove('active');
    }
  });
}

function setupMobileDrawer() {
  const trigger = document.getElementById('mobile-menu-trigger');
  const backdrop = document.getElementById('mobile-drawer-backdrop');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('mobile-drawer-close');

  if (!trigger || !drawer || !backdrop) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  trigger.addEventListener('click', openDrawer);
  backdrop.addEventListener('click', closeDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
}

function setupNewsletter() {
  const form = document.getElementById('newsletter-form');
  const status = document.getElementById('newsletter-status');
  if (!form || !status) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.style.display = 'none';
    status.textContent = "Thanks, you're on the list";
    status.style.display = 'block';
  });
}

export default {
  formatPrice,
  escapeHtml,
  showToast,
  renderProductCard,
  initGlobalLayout
};
