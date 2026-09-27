import { Router } from 'express';
import { optionalAuth, requireAdmin, requireAuth } from '../middleware/auth.js';
import { categoryRepository } from '../store/categoryRepository.js';
import { productRepository } from '../store/productRepository.js';

const router = Router();

// GET /api/products?category=&q=&sort=price_asc|price_desc|name|rating
router.get('/', optionalAuth, (req, res) => {
  const { category, q, sort } = req.query;
  const isAdmin = req.user && req.user.role === 'admin';

  const products = productRepository.find({
    category,
    q,
    sort,
    includeInactive: isAdmin
  });

  return res.json(products);
});

// GET /api/products/:id
router.get('/:id', optionalAuth, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const product = productRepository.findById(id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const isAdmin = req.user && req.user.role === 'admin';
  if (!product.active && !isAdmin) {
    return res.status(404).json({ error: 'Product not found' });
  }

  return res.json(product);
});

// POST /api/products/:id/reviews (auth required)
router.post('/:id/reviews', requireAuth, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const product = productRepository.findById(id);
  if (!product || !product.active) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const { rating, title, body } = req.body || {};
  const numRating = Number(rating);

  if (!Number.isInteger(numRating) || numRating < 1 || numRating > 5) {
    return res.status(400).json({ error: 'Rating must be an integer between 1 and 5' });
  }

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'Review title is required' });
  }

  if (!body || typeof body !== 'string' || !body.trim()) {
    return res.status(400).json({ error: 'Review text is required' });
  }

  const review = productRepository.addReview(product.id, {
    author: req.user.name,
    rating: numRating,
    title: title.trim(),
    body: body.trim(),
    createdAt: new Date().toISOString()
  });

  return res.status(201).json(review);
});

// POST /api/products (admin only)
router.post('/', requireAdmin, (req, res) => {
  const { name, description, price, stock, category } = req.body || {};

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'Product name is required' });
  }

  if (!description || typeof description !== 'string' || !description.trim()) {
    return res.status(400).json({ error: 'Product description is required' });
  }

  const numPrice = Number(price);
  if (!Number.isInteger(numPrice) || numPrice <= 0) {
    return res.status(400).json({ error: 'Price must be a positive integer in cents' });
  }

  const numStock = Number(stock);
  if (!Number.isInteger(numStock) || numStock < 0) {
    return res.status(400).json({ error: 'Stock must be a non-negative integer' });
  }

  if (!category || typeof category !== 'string') {
    return res.status(400).json({ error: 'Category is required' });
  }

  const categoryRecord = categoryRepository.findBySlug(category);
  if (!categoryRecord) {
    return res.status(400).json({ error: 'Invalid product category' });
  }

  const product = productRepository.create({
    name: name.trim(),
    description: description.trim(),
    price: numPrice,
    stock: numStock,
    category: categoryRecord.slug,
    active: true,
    details: {
      material: 'Artisanal stoneware and natural materials',
      dimensions: 'Standard home and kitchen proportions',
      care: 'Hand wash recommended with mild soap',
      origin: 'Small-batch workshop'
    },
    color: '#C8553D',
    image: categoryRecord.heroIllustration || '/img/categories/cookware.svg'
  });

  return res.status(201).json(product);
});

// PATCH /api/products/:id (admin only)
router.patch('/:id', requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const product = productRepository.findById(id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const updates = {};
  if (req.body.price !== undefined) {
    const numPrice = Number(req.body.price);
    if (!Number.isInteger(numPrice) || numPrice <= 0) {
      return res.status(400).json({ error: 'Price must be a positive integer in cents' });
    }
    updates.price = numPrice;
  }

  if (req.body.stock !== undefined) {
    const numStock = Number(req.body.stock);
    if (!Number.isInteger(numStock) || numStock < 0) {
      return res.status(400).json({ error: 'Stock must be a non-negative integer' });
    }
    updates.stock = numStock;
  }

  if (req.body.active !== undefined) {
    updates.active = Boolean(req.body.active);
  }

  if (req.body.name !== undefined) {
    updates.name = String(req.body.name).trim();
  }

  if (req.body.description !== undefined) {
    updates.description = String(req.body.description).trim();
  }

  const updatedProduct = productRepository.update(product.id, updates);
  return res.json(updatedProduct);
});

export default router;
