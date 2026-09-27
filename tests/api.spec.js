import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';
import { seedDatabase } from '../src/seed/index.js';

describe('Storefront and Administration API', () => {
  beforeEach(async () => {
    await seedDatabase();
  });

  it('verifies system health status at root endpoint', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });

  it('provisions new accounts and authenticates existing credentials', async () => {
    // Signup
    const signupRes = await request(app)
      .post('/api/auth/signup')
      .send({
        name: 'Clara Oswald',
        email: 'clara.oswald@example.com',
        password: 'rosegarden-gate'
      });

    expect(signupRes.status).toBe(201);
    expect(signupRes.body).toHaveProperty('token');
    expect(signupRes.body.user).toMatchObject({
      name: 'Clara Oswald',
      email: 'clara.oswald@example.com',
      role: 'customer'
    });

    // Login with existing seeded customer
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'nora.bennett@example.com',
        password: 'welcome-home'
      });

    expect(loginRes.status).toBe(200);
    expect(loginRes.body).toHaveProperty('token');
    expect(loginRes.body.user.email).toBe('nora.bennett@example.com');
  });

  it('retrieves catalog collections and individual product specifications', async () => {
    // List products
    const listRes = await request(app).get('/api/products');
    expect(listRes.status).toBe(200);
    expect(Array.isArray(listRes.body)).toBe(true);
    expect(listRes.body.length).toBe(24);

    // Detail product
    const detailRes = await request(app).get('/api/products/1');
    expect(detailRes.status).toBe(200);
    expect(detailRes.body.id).toBe(1);
    expect(detailRes.body.name).toBe('Cast Iron Dutch Oven, 5.5 qt');
    expect(Array.isArray(detailRes.body.reviews)).toBe(true);
    expect(detailRes.body.reviews.length).toBeGreaterThan(0);
  });

  it('authorizes customer checkout and persists paid orders', async () => {
    // Nora login
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'nora.bennett@example.com',
        password: 'welcome-home'
      });

    const token = loginRes.body.token;

    const orderPayload = {
      items: [
        { productId: 1, qty: 1 },
        { productId: 19, qty: 2 }
      ],
      shippingAddress: {
        name: 'Nora Bennett',
        line1: '742 Evergreen Terrace',
        line2: 'Apt 4B',
        city: 'Portland',
        region: 'OR',
        postcode: '97201',
        country: 'United States'
      },
      discountCode: 'WELCOME10'
    };

    const orderRes = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(orderPayload);

    expect(orderRes.status).toBe(201);
    expect(orderRes.body).toHaveProperty('id');
    expect(orderRes.body.orderNumber).toBe('KC-100008');
    expect(orderRes.body.status).toBe('paid');
    expect(orderRes.body.chargeId).toBe('ch_000008');
    expect(orderRes.body.discountAmount).toBeGreaterThan(0);
  });

  it('permits customers to cancel unshipped orders with full inventory return', async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'nora.bennett@example.com',
        password: 'welcome-home'
      });

    const token = loginRes.body.token;

    // Order 4 is seeded as paid and unshipped
    const cancelRes = await request(app)
      .post('/api/orders/4/cancel')
      .set('Authorization', `Bearer ${token}`);

    expect(cancelRes.status).toBe(200);
    expect(cancelRes.body.status).toBe('cancelled');
    expect(cancelRes.body.refundedTotal).toBe(cancelRes.body.total);
  });

  it('enables administrators to dispatch paid packages with tracking details', async () => {
    const adminLogin = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@kettleandcrate.com',
        password: 'admin-pass'
      });

    const adminToken = adminLogin.body.token;

    // Order 4 is paid and unshipped
    const shipRes = await request(app)
      .post('/api/orders/4/ship')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        carrier: 'USPS Priority Mail',
        trackingNumber: '9405511899562549880011'
      });

    expect(shipRes.status).toBe(200);
    expect(shipRes.body.status).toBe('shipped');
    expect(shipRes.body.trackingNumber).toBe('9405511899562549880011');
  });

  it('processes administrative partial refunds on eligible purchases', async () => {
    const adminLogin = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@kettleandcrate.com',
        password: 'admin-pass'
      });

    const adminToken = adminLogin.body.token;

    // Order 1 is total 18000
    const refundRes = await request(app)
      .post('/api/orders/1/refunds')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        amount: 4200,
        reason: 'Customer courtesy credit'
      });

    expect(refundRes.status).toBe(201);
    expect(refundRes.body).toHaveProperty('id');
    expect(refundRes.body.amount).toBe(4200);
  });

  it('restricts catalog modifications from standard customer roles with 403', async () => {
    const customerLogin = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'sam.okafor@example.com',
        password: 'welcome-home'
      });

    const customerToken = customerLogin.body.token;

    const patchRes = await request(app)
      .patch('/api/products/1')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({ price: 1000 });

    expect(patchRes.status).toBe(403);
    expect(patchRes.body).toHaveProperty('error');
  });
});
