import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { requireAuth } from './middleware/auth.js';
import authRouter from './routes/auth.js';
import categoriesRouter from './routes/categories.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');

export const app = express();

app.use(express.json());

// Root health check endpoint
app.get('/health', (req, res) => {
  return res.status(200).json({ ok: true });
});

// Authentication routes
app.use('/api/auth', authRouter);

// Current user profile endpoint
app.get('/api/me', requireAuth, (req, res) => {
  return res.status(200).json(req.user);
});

// Categories endpoint
app.use('/api/categories', categoriesRouter);

// Serve static frontend assets
app.use(express.static(publicDir));

// Route handlers for frontend pages
app.get('/shop', (req, res) => res.sendFile(path.join(publicDir, 'shop.html')));
app.get('/shop/:category', (req, res) => res.sendFile(path.join(publicDir, 'shop.html')));
app.get('/product/:id', (req, res) => res.sendFile(path.join(publicDir, 'product.html')));
app.get('/search', (req, res) => res.sendFile(path.join(publicDir, 'shop.html')));
app.get('/cart', (req, res) => res.sendFile(path.join(publicDir, 'cart.html')));
app.get('/checkout', (req, res) => res.sendFile(path.join(publicDir, 'checkout.html')));
app.get('/order/:id', (req, res) => res.sendFile(path.join(publicDir, 'order.html')));
app.get('/signin', (req, res) => res.sendFile(path.join(publicDir, 'signin.html')));
app.get('/signup', (req, res) => res.sendFile(path.join(publicDir, 'signup.html')));
app.get('/account', (req, res) => res.sendFile(path.join(publicDir, 'account.html')));
app.get('/account/orders/:id', (req, res) => res.sendFile(path.join(publicDir, 'account.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(publicDir, 'admin.html')));
app.get('/about', (req, res) => res.sendFile(path.join(publicDir, 'about.html')));
app.get('/journal', (req, res) => res.sendFile(path.join(publicDir, 'journal.html')));
app.get('/faq', (req, res) => res.sendFile(path.join(publicDir, 'faq.html')));
app.get('/shipping', (req, res) => res.sendFile(path.join(publicDir, 'shipping.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(publicDir, 'contact.html')));
app.get('/terms', (req, res) => res.sendFile(path.join(publicDir, 'terms.html')));
app.get('/privacy', (req, res) => res.sendFile(path.join(publicDir, 'privacy.html')));

// 404 handler for unmatched API routes
app.use('/api/*', (req, res) => {
  return res.status(404).json({ error: 'Endpoint not found' });
});

// 404 handler for HTML pages
app.use((req, res) => {
  const notFoundHtml = path.join(publicDir, '404.html');
  res.status(404).sendFile(notFoundHtml);
});

// Global error handler
app.use((err, req, res, next) => {
  if (!err.status || err.status >= 500) {
    console.error('Unexpected error:', err.message);
  }
  const status = err.status || 500;
  return res.status(status).json({
    error: err.message || 'An unexpected error occurred'
  });
});

export default app;
