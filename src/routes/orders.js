import { Router } from 'express';
import { requireAdmin, requireAuth } from '../middleware/auth.js';
import payments from '../services/payments.js';
import { nextRefundId } from '../store/counters.js';
import { orderRepository } from '../store/orderRepository.js';
import { productRepository } from '../store/productRepository.js';

const router = Router();

// POST /api/orders (auth required)
router.post('/', requireAuth, async (req, res) => {
  const { items, shippingAddress, discountCode } = req.body || {};

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order must include at least one item' });
  }

  if (!shippingAddress || typeof shippingAddress !== 'object') {
    return res.status(400).json({ error: 'Shipping address is required' });
  }

  const { name, line1, line2, city, region, postcode, country } = shippingAddress;
  if (!name || !line1 || !city || !region || !postcode || !country) {
    return res.status(400).json({ error: 'Complete shipping address fields are required' });
  }

  const resolvedItems = [];
  let subtotal = 0;

  for (const item of items) {
    const productId = Number(item.productId);
    const qty = Number(item.qty);

    if (!Number.isInteger(productId)) {
      return res.status(400).json({ error: 'Invalid product reference' });
    }

    if (!Number.isInteger(qty) || qty < 1 || qty > 10) {
      return res.status(400).json({ error: 'Quantity must be between 1 and 10 per item' });
    }

    const product = productRepository.findById(productId);
    if (!product || !product.active) {
      return res.status(404).json({ error: 'One or more items in your cart are no longer available' });
    }

    if (product.stock < qty) {
      return res.status(409).json({ error: `Only ${product.stock} left of ${product.name}` });
    }

    const itemTotal = product.price * qty;
    subtotal += itemTotal;

    resolvedItems.push({
      productId: product.id,
      name: product.name,
      sku: product.sku,
      qty,
      unitPrice: product.price,
      totalPrice: itemTotal
    });
  }

  let discountAmount = 0;
  let normalizedCode = null;

  if (discountCode && typeof discountCode === 'string' && discountCode.trim()) {
    normalizedCode = discountCode.trim().toUpperCase();
    if (normalizedCode === 'WELCOME10') {
      if (subtotal >= 5000) {
        discountAmount = Math.round(subtotal * 0.1);
      } else {
        return res.status(400).json({ error: 'Promotional code WELCOME10 requires an order subtotal over $50' });
      }
    } else {
      return res.status(400).json({ error: 'Invalid promotional code' });
    }
  }

  const shippingCost = subtotal >= 7500 ? 0 : 695;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const chargeResult = await payments.charge(total);

  for (const item of resolvedItems) {
    productRepository.decrementStock(item.productId, item.qty);
  }

  const now = new Date().toISOString();
  const order = orderRepository.create({
    userId: req.user.id,
    customerName: req.user.name,
    customerEmail: req.user.email,
    items: resolvedItems,
    shippingAddress: {
      name: name.trim(),
      line1: line1.trim(),
      line2: line2 ? line2.trim() : '',
      city: city.trim(),
      region: region.trim(),
      postcode: postcode.trim(),
      country: country.trim()
    },
    subtotal,
    discountCode: normalizedCode,
    discountAmount,
    shipping: shippingCost,
    total,
    status: 'paid',
    paidAt: now,
    chargeId: chargeResult.id,
    refundedTotal: 0,
    refunds: [],
    timeline: [
      { at: now, event: 'placed', detail: 'Order placed by customer' },
      { at: now, event: 'paid', detail: `Payment of $${(total / 100).toFixed(2)} confirmed` }
    ],
    createdAt: now
  });

  return res.status(201).json(order);
});

// GET /api/orders (current user orders)
router.get('/', requireAuth, (req, res) => {
  const orders = orderRepository.findByUserId(req.user.id);
  return res.json(orders);
});

// GET /api/orders/:id
router.get('/:id', requireAuth, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(404).json({ error: 'Order not found' });
  }

  const order = orderRepository.findById(id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  const isOwner = order.userId === req.user.id;
  const isAdmin = req.user.role === 'admin';

  if (!isOwner && !isAdmin) {
    return res.status(404).json({ error: 'Order not found' });
  }

  return res.json(order);
});

// POST /api/orders/:id/cancel
router.post('/:id/cancel', requireAuth, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(404).json({ error: 'Order not found' });
  }

  const order = orderRepository.findById(id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  const isOwner = order.userId === req.user.id;
  const isAdmin = req.user.role === 'admin';

  if (!isOwner && !isAdmin) {
    return res.status(404).json({ error: 'Order not found' });
  }

  if (order.status === 'shipped') {
    return res.status(400).json({ error: 'Cannot cancel an order that has already shipped' });
  }

  if (order.status === 'cancelled') {
    return res.status(400).json({ error: 'Order has already been cancelled' });
  }

  for (const item of order.items) {
    productRepository.incrementStock(item.productId, item.qty);
  }

  const refundAmount = order.total - order.refundedTotal;
  const now = new Date().toISOString();

  if (refundAmount > 0) {
    const refundId = nextRefundId();
    order.refunds.push({
      id: refundId,
      amount: refundAmount,
      reason: 'Order cancelled by customer prior to shipment',
      at: now
    });
    order.refundedTotal += refundAmount;
  }

  order.status = 'cancelled';
  order.timeline.push(
    { at: now, event: 'cancelled', detail: 'Order cancelled' },
    { at: now, event: 'refunded', detail: `Full refund of $${(refundAmount / 100).toFixed(2)} processed` }
  );

  return res.json(order);
});

// POST /api/orders/:id/ship (admin only)
router.post('/:id/ship', requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(404).json({ error: 'Order not found' });
  }

  const order = orderRepository.findById(id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  const { carrier, trackingNumber } = req.body || {};
  if (!carrier || typeof carrier !== 'string' || !carrier.trim()) {
    return res.status(400).json({ error: 'Carrier name is required' });
  }

  if (!trackingNumber || typeof trackingNumber !== 'string' || !trackingNumber.trim()) {
    return res.status(400).json({ error: 'Tracking number is required' });
  }

  if (!order.paidAt) {
    return res.status(400).json({ error: 'Cannot ship an unpaid order' });
  }

  const now = new Date().toISOString();
  order.status = 'shipped';
  order.shippedAt = now;
  order.carrier = carrier.trim();
  order.trackingNumber = trackingNumber.trim();
  order.timeline.push({
    at: now,
    event: 'shipped',
    detail: `Dispatched via ${order.carrier} (${order.trackingNumber})`
  });

  return res.json(order);
});

// POST /api/orders/:id/refunds (admin only)
router.post('/:id/refunds', requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(404).json({ error: 'Order not found' });
  }

  const order = orderRepository.findById(id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  const { amount, reason } = req.body || {};
  const numAmount = Number(amount);

  if (!Number.isInteger(numAmount) || numAmount <= 0) {
    return res.status(400).json({ error: 'Refund amount must be a positive integer in cents' });
  }

  if (numAmount > order.total) {
    return res.status(400).json({ error: 'Refund amount exceeds order total' });
  }

  const refundId = nextRefundId();
  const now = new Date().toISOString();
  const refund = {
    id: refundId,
    amount: numAmount,
    reason: (reason && String(reason).trim()) || 'Administrative refund',
    at: now
  };

  order.refunds.push(refund);
  order.refundedTotal += numAmount;
  order.timeline.push({
    at: now,
    event: 'refunded',
    detail: `Refund of $${(numAmount / 100).toFixed(2)} processed: ${refund.reason}`
  });

  return res.status(201).json(refund);
});

export default router;
