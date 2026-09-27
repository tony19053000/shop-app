import { hashPassword } from '../services/auth.js';
import { categoryRepository } from '../store/categoryRepository.js';
import { setCounters } from '../store/counters.js';
import { orderRepository } from '../store/orderRepository.js';
import { productRepository } from '../store/productRepository.js';
import { tokenStore } from '../store/tokenStore.js';
import { userRepository } from '../store/userRepository.js';
import { seedCategories, seedProducts } from './seedData.js';

export async function seedDatabase() {
  // Clear any existing state
  tokenStore.clear();
  userRepository.clear();
  categoryRepository.clear();
  productRepository.clear();
  orderRepository.clear();

  // Reset counters to seed baseline
  setCounters({ orders: 100000, charges: 0, refunds: 0 });

  // 1. Seed Categories
  for (const cat of seedCategories) {
    categoryRepository.create(cat);
  }

  // 2. Seed Products
  for (const prod of seedProducts) {
    productRepository.create(prod);
  }

  // 3. Seed Users with deterministic salts
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin-pass';
  const adminSalt = 'salt_admin_kettle_crate_981';
  const adminAuth = await hashPassword(adminPassword, adminSalt);
  const adminUser = userRepository.create({
    name: 'Store Administrator',
    email: 'admin@kettleandcrate.com',
    passwordHash: adminAuth.hash,
    salt: adminSalt,
    role: 'admin',
    createdAt: '2026-08-01T08:00:00.000Z'
  });

  const noraSalt = 'salt_nora_bennett_kettle_721';
  const noraAuth = await hashPassword('welcome-home', noraSalt);
  const noraUser = userRepository.create({
    name: 'Nora Bennett',
    email: 'nora.bennett@example.com',
    passwordHash: noraAuth.hash,
    salt: noraSalt,
    role: 'customer',
    address: {
      name: 'Nora Bennett',
      line1: '742 Evergreen Terrace',
      line2: 'Apt 4B',
      city: 'Portland',
      region: 'OR',
      postcode: '97201',
      country: 'United States'
    },
    createdAt: '2026-08-03T10:00:00.000Z'
  });

  const samSalt = 'salt_sam_okafor_kettle_452';
  const samAuth = await hashPassword('welcome-home', samSalt);
  const samUser = userRepository.create({
    name: 'Sam Okafor',
    email: 'sam.okafor@example.com',
    passwordHash: samAuth.hash,
    salt: samSalt,
    role: 'customer',
    address: {
      name: 'Sam Okafor',
      line1: '1284 Hawthorne Blvd',
      line2: '',
      city: 'Portland',
      region: 'OR',
      postcode: '97214',
      country: 'United States'
    },
    createdAt: '2026-08-04T11:30:00.000Z'
  });

  // 4. Seed Past Orders (3-4 each, mixed statuses, one partly refunded)
  // Nora - Order 1: Shipped
  orderRepository.create({
    orderNumber: 'KC-100001',
    userId: noraUser.id,
    customerName: noraUser.name,
    customerEmail: noraUser.email,
    items: [
      {
        productId: 1,
        name: 'Cast Iron Dutch Oven, 5.5 qt',
        sku: 'KC-CW-001',
        qty: 1,
        unitPrice: 13800
      },
      {
        productId: 9,
        name: 'Belgian Linen Napkins, Set of 4',
        sku: 'KC-TW-003',
        qty: 1,
        unitPrice: 4200
      }
    ],
    shippingAddress: noraUser.address,
    subtotal: 18000,
    shipping: 0,
    total: 18000,
    status: 'shipped',
    paidAt: '2026-08-15T12:00:00.000Z',
    shippedAt: '2026-08-16T14:30:00.000Z',
    carrier: 'USPS Priority Mail',
    trackingNumber: '9400111899562549882310',
    chargeId: 'ch_000001',
    refundedTotal: 0,
    refunds: [],
    timeline: [
      { at: '2026-08-15T11:58:00.000Z', event: 'placed', detail: 'Order placed by customer' },
      { at: '2026-08-15T12:00:00.000Z', event: 'paid', detail: 'Payment of $180.00 confirmed' },
      { at: '2026-08-16T14:30:00.000Z', event: 'shipped', detail: 'Dispatched via USPS Priority Mail (9400111899562549882310)' }
    ],
    createdAt: '2026-08-15T11:58:00.000Z'
  });

  // Nora - Order 2: Paid & Partly Refunded
  orderRepository.create({
    orderNumber: 'KC-100002',
    userId: noraUser.id,
    customerName: noraUser.name,
    customerEmail: noraUser.email,
    items: [
      {
        productId: 14,
        name: 'Hand-Thrown Ceramic Mug, Birch White',
        sku: 'KC-CT-002',
        qty: 2,
        unitPrice: 3400
      },
      {
        productId: 13,
        name: 'Stoneware Pour-Over Dripper',
        sku: 'KC-CT-001',
        qty: 1,
        unitPrice: 4200
      }
    ],
    shippingAddress: noraUser.address,
    subtotal: 11000,
    discountCode: 'WELCOME10',
    discountAmount: 1100,
    shipping: 0,
    total: 9900,
    status: 'paid',
    paidAt: '2026-08-28T09:15:00.000Z',
    chargeId: 'ch_000002',
    refundedTotal: 3400,
    refunds: [
      {
        id: 'rf_000001',
        amount: 3400,
        reason: 'One mug chipped during courier transit; partial credit applied',
        at: '2026-08-29T10:30:00.000Z'
      }
    ],
    timeline: [
      { at: '2026-08-28T09:14:00.000Z', event: 'placed', detail: 'Order placed with promotional discount WELCOME10' },
      { at: '2026-08-28T09:15:00.000Z', event: 'paid', detail: 'Payment of $99.00 confirmed' },
      { at: '2026-08-29T10:30:00.000Z', event: 'refunded', detail: 'Partial refund of $34.00 issued by support (rf_000001)' }
    ],
    createdAt: '2026-08-28T09:14:00.000Z'
  });

  // Nora - Order 3: Cancelled
  orderRepository.create({
    orderNumber: 'KC-100003',
    userId: noraUser.id,
    customerName: noraUser.name,
    customerEmail: noraUser.email,
    items: [
      {
        productId: 19,
        name: 'Smoked Sea Salt Flakes, 8 oz',
        sku: 'KC-PT-001',
        qty: 2,
        unitPrice: 1400
      }
    ],
    shippingAddress: noraUser.address,
    subtotal: 2800,
    shipping: 695,
    total: 3495,
    status: 'cancelled',
    paidAt: '2026-09-02T16:00:00.000Z',
    chargeId: 'ch_000003',
    refundedTotal: 3495,
    refunds: [
      {
        id: 'rf_000002',
        amount: 3495,
        reason: 'Order cancelled by customer prior to dispatch',
        at: '2026-09-02T16:45:00.000Z'
      }
    ],
    timeline: [
      { at: '2026-09-02T15:59:00.000Z', event: 'placed', detail: 'Order placed by customer' },
      { at: '2026-09-02T16:00:00.000Z', event: 'paid', detail: 'Payment of $34.95 confirmed' },
      { at: '2026-09-02T16:45:00.000Z', event: 'cancelled', detail: 'Order cancelled by customer' },
      { at: '2026-09-02T16:45:00.000Z', event: 'refunded', detail: 'Full refund of $34.95 processed (rf_000002)' }
    ],
    createdAt: '2026-09-02T15:59:00.000Z'
  });

  // Nora - Order 4: Paid (Ready for fulfillment)
  orderRepository.create({
    orderNumber: 'KC-100004',
    userId: noraUser.id,
    customerName: noraUser.name,
    customerEmail: noraUser.email,
    items: [
      {
        productId: 8,
        name: 'Fluted Ceramic Pasta Bowls, Set of 4',
        sku: 'KC-TW-002',
        qty: 1,
        unitPrice: 7800
      }
    ],
    shippingAddress: noraUser.address,
    subtotal: 7800,
    shipping: 0,
    total: 7800,
    status: 'paid',
    paidAt: '2026-09-24T14:10:00.000Z',
    chargeId: 'ch_000004',
    refundedTotal: 0,
    refunds: [],
    timeline: [
      { at: '2026-09-24T14:09:00.000Z', event: 'placed', detail: 'Order placed by customer' },
      { at: '2026-09-24T14:10:00.000Z', event: 'paid', detail: 'Payment of $78.00 confirmed' }
    ],
    createdAt: '2026-09-24T14:09:00.000Z'
  });

  // Sam - Order 5: Shipped
  orderRepository.create({
    orderNumber: 'KC-100005',
    userId: samUser.id,
    customerName: samUser.name,
    customerEmail: samUser.email,
    items: [
      {
        productId: 15,
        name: 'Precision Gooseneck Pouring Kettle, 1.0 L',
        sku: 'KC-CT-003',
        qty: 1,
        unitPrice: 8200
      },
      {
        productId: 16,
        name: 'Double-Wall Borosilicate Glass Server, 600 ml',
        sku: 'KC-CT-004',
        qty: 1,
        unitPrice: 3800
      }
    ],
    shippingAddress: samUser.address,
    subtotal: 12000,
    shipping: 0,
    total: 12000,
    status: 'shipped',
    paidAt: '2026-08-20T10:15:00.000Z',
    shippedAt: '2026-08-21T11:00:00.000Z',
    carrier: 'UPS Ground',
    trackingNumber: '1Z9999999999999999',
    chargeId: 'ch_000005',
    refundedTotal: 0,
    refunds: [],
    timeline: [
      { at: '2026-08-20T10:14:00.000Z', event: 'placed', detail: 'Order placed by customer' },
      { at: '2026-08-20T10:15:00.000Z', event: 'paid', detail: 'Payment of $120.00 confirmed' },
      { at: '2026-08-21T11:00:00.000Z', event: 'shipped', detail: 'Dispatched via UPS Ground (1Z9999999999999999)' }
    ],
    createdAt: '2026-08-20T10:14:00.000Z'
  });

  // Sam - Order 6: Paid
  orderRepository.create({
    orderNumber: 'KC-100006',
    userId: samUser.id,
    customerName: samUser.name,
    customerEmail: samUser.email,
    items: [
      {
        productId: 20,
        name: 'Single-Estate Cold Pressed Olive Oil, 500 ml',
        sku: 'KC-PT-002',
        qty: 2,
        unitPrice: 3200
      },
      {
        productId: 21,
        name: 'Aged Wildflower Raw Honey, 12 oz',
        sku: 'KC-PT-003',
        qty: 1,
        unitPrice: 1800
      }
    ],
    shippingAddress: samUser.address,
    subtotal: 8200,
    shipping: 0,
    total: 8200,
    status: 'paid',
    paidAt: '2026-09-18T16:20:00.000Z',
    chargeId: 'ch_000006',
    refundedTotal: 0,
    refunds: [],
    timeline: [
      { at: '2026-09-18T16:19:00.000Z', event: 'placed', detail: 'Order placed by customer' },
      { at: '2026-09-18T16:20:00.000Z', event: 'paid', detail: 'Payment of $82.00 confirmed' }
    ],
    createdAt: '2026-09-18T16:19:00.000Z'
  });

  // Sam - Order 7: Cancelled
  orderRepository.create({
    orderNumber: 'KC-100007',
    userId: samUser.id,
    customerName: samUser.name,
    customerEmail: samUser.email,
    items: [
      {
        productId: 6,
        name: 'Seasoned Cast Iron Griddle Press',
        sku: 'KC-CW-006',
        qty: 1,
        unitPrice: 3600
      }
    ],
    shippingAddress: samUser.address,
    subtotal: 3600,
    shipping: 695,
    total: 4295,
    status: 'cancelled',
    paidAt: '2026-09-22T13:40:00.000Z',
    chargeId: 'ch_000007',
    refundedTotal: 4295,
    refunds: [
      {
        id: 'rf_000003',
        amount: 4295,
        reason: 'Customer requested cancellation prior to packing',
        at: '2026-09-22T14:15:00.000Z'
      }
    ],
    timeline: [
      { at: '2026-09-22T13:39:00.000Z', event: 'placed', detail: 'Order placed by customer' },
      { at: '2026-09-22T13:40:00.000Z', event: 'paid', detail: 'Payment of $42.95 confirmed' },
      { at: '2026-09-22T14:15:00.000Z', event: 'cancelled', detail: 'Order cancelled by customer' },
      { at: '2026-09-22T14:15:00.000Z', event: 'refunded', detail: 'Full refund of $42.95 processed (rf_000003)' }
    ],
    createdAt: '2026-09-22T13:39:00.000Z'
  });

  // Advance counters so next values continue seamlessly
  setCounters({ orders: 100007, charges: 7, refunds: 3 });

  return {
    usersCount: userRepository.findAll().length,
    categoriesCount: categoryRepository.findAll().length,
    productsCount: productRepository.find({ includeInactive: true }).length,
    ordersCount: orderRepository.findAll().length
  };
}
