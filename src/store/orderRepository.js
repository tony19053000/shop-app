import { nextOrderNumber } from './counters.js';

let orders = [];
let nextOrderId = 1;

export const orderRepository = {
  create({
    orderNumber,
    userId,
    customerName,
    customerEmail,
    items,
    shippingAddress,
    subtotal,
    discountCode = null,
    discountAmount = 0,
    shipping = 0,
    total,
    status = 'paid',
    paidAt = new Date().toISOString(),
    shippedAt = null,
    carrier = null,
    trackingNumber = null,
    chargeId,
    refundedTotal = 0,
    refunds = [],
    timeline = [],
    createdAt = new Date().toISOString()
  }) {
    const order = {
      id: nextOrderId++,
      orderNumber: orderNumber || nextOrderNumber(),
      userId: Number(userId),
      customerName,
      customerEmail: customerEmail.toLowerCase(),
      items: items.map((item) => ({
        productId: Number(item.productId),
        name: item.name,
        sku: item.sku,
        qty: Number(item.qty),
        unitPrice: Number(item.unitPrice),
        totalPrice: Number(item.unitPrice) * Number(item.qty)
      })),
      shippingAddress: {
        name: shippingAddress.name,
        line1: shippingAddress.line1,
        line2: shippingAddress.line2 || '',
        city: shippingAddress.city,
        region: shippingAddress.region,
        postcode: shippingAddress.postcode,
        country: shippingAddress.country
      },
      subtotal: Number(subtotal),
      discountCode: discountCode || null,
      discountAmount: Number(discountAmount) || 0,
      shipping: Number(shipping),
      total: Number(total),
      status,
      paidAt,
      shippedAt,
      carrier,
      trackingNumber,
      chargeId,
      refundedTotal: Number(refundedTotal) || 0,
      refunds: [...refunds],
      timeline: timeline.length > 0 ? [...timeline] : [
        { at: createdAt, event: 'placed', detail: 'Order placed by customer' },
        { at: paidAt || createdAt, event: 'paid', detail: `Payment of $${(total / 100).toFixed(2)} confirmed` }
      ],
      createdAt
    };

    orders.push(order);
    return order;
  },

  findById(id) {
    const numId = Number(id);
    return orders.find((o) => o.id === numId) || null;
  },

  findByOrderNumber(orderNumber) {
    if (!orderNumber) return null;
    return orders.find((o) => o.orderNumber.toUpperCase() === orderNumber.toUpperCase()) || null;
  },

  findByUserId(userId) {
    const numId = Number(userId);
    return orders
      .filter((o) => o.userId === numId)
      .sort((a, b) => b.id - a.id)
      .map((o) => ({ ...o }));
  },

  findAll({ status } = {}) {
    let result = [...orders];
    if (status) {
      result = result.filter((o) => o.status.toLowerCase() === status.toLowerCase());
    }
    return result.sort((a, b) => b.id - a.id).map((o) => ({ ...o }));
  },

  update(id, updates) {
    const order = this.findById(id);
    if (!order) return null;

    Object.assign(order, updates);
    return { ...order };
  },

  clear() {
    orders = [];
    nextOrderId = 1;
  }
};
