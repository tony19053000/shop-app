const CART_KEY = 'kettle_crate_cart';
const DISCOUNT_KEY = 'kettle_crate_discount';

const listeners = [];

export function subscribeCart(fn) {
  listeners.push(fn);
  return () => {
    const idx = listeners.indexOf(fn);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}

function notifyListeners() {
  const state = getCartState();
  for (const fn of listeners) {
    fn(state);
  }
}

export function getCartItems() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCartItems(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  notifyListeners();
}

export function getDiscountCode() {
  return localStorage.getItem(DISCOUNT_KEY) || '';
}

export function setDiscountCode(code) {
  if (code) {
    localStorage.setItem(DISCOUNT_KEY, code.trim().toUpperCase());
  } else {
    localStorage.removeItem(DISCOUNT_KEY);
  }
  notifyListeners();
}

export function addItem(product, qty = 1) {
  const items = getCartItems();
  const existingIndex = items.findIndex((it) => it.productId === product.id);

  if (existingIndex > -1) {
    items[existingIndex].qty = Math.min(10, items[existingIndex].qty + qty);
  } else {
    items.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      sku: product.sku,
      qty: Math.min(10, Math.max(1, qty))
    });
  }

  saveCartItems(items);
}

export function updateQty(productId, qty) {
  const items = getCartItems();
  const index = items.findIndex((it) => it.productId === productId);
  if (index > -1) {
    if (qty <= 0) {
      items.splice(index, 1);
    } else {
      items[index].qty = Math.min(10, qty);
    }
    saveCartItems(items);
  }
}

export function removeItem(productId) {
  const items = getCartItems().filter((it) => it.productId !== productId);
  saveCartItems(items);
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
  localStorage.removeItem(DISCOUNT_KEY);
  notifyListeners();
}

export function getCartState() {
  const items = getCartItems();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discountCode = getDiscountCode();

  let discountAmount = 0;
  if (discountCode === 'WELCOME10' && subtotal >= 5000) {
    discountAmount = Math.round(subtotal * 0.1);
  }

  const freeShippingThreshold = 7500;
  const shippingCost = subtotal >= freeShippingThreshold ? 0 : (items.length > 0 ? 695 : 0);
  const total = Math.max(0, subtotal - discountAmount + shippingCost);
  const totalItemCount = items.reduce((count, item) => count + item.qty, 0);
  const progressToFreeShipping = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return {
    items,
    itemCount: totalItemCount,
    subtotal,
    discountCode,
    discountAmount,
    shippingCost,
    total,
    freeShippingThreshold,
    progressToFreeShipping,
    amountToFreeShipping
  };
}

export default {
  getCartItems,
  addItem,
  updateQty,
  removeItem,
  clearCart,
  getCartState,
  getDiscountCode,
  setDiscountCode,
  subscribeCart
};
