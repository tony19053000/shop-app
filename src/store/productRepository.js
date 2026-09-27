let products = [];
let nextProductId = 1;
let nextReviewId = 1;

export const productRepository = {
  create({
    sku,
    name,
    slug,
    category,
    price,
    compareAt = null,
    stock = 10,
    active = true,
    description,
    details = {},
    image,
    color,
    featured = false,
    rating = 5.0,
    reviewCount = 0,
    reviews = []
  }) {
    const product = {
      id: nextProductId++,
      sku: sku || `KC-ITEM-${String(nextProductId).padStart(4, '0')}`,
      name,
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      category,
      price: Number(price),
      compareAt: compareAt !== null && compareAt !== undefined ? Number(compareAt) : null,
      stock: Number(stock),
      active: active !== undefined ? Boolean(active) : true,
      description,
      details: {
        material: details.material || 'Artisanal stoneware & natural materials',
        dimensions: details.dimensions || 'Standard home & kitchen proportions',
        care: details.care || 'Hand wash recommended with mild soap',
        origin: details.origin || 'Crafted in small batches'
      },
      image: image || `/img/products/product-${nextProductId}.svg`,
      color: color || '#C8553D',
      featured: Boolean(featured),
      rating: Number(rating) || 5.0,
      reviewCount: Number(reviewCount) || (reviews ? reviews.length : 0),
      reviews: reviews.map((r) => ({
        id: nextReviewId++,
        productId: nextProductId - 1,
        author: r.author || 'Store Customer',
        rating: Number(r.rating) || 5,
        title: r.title || 'Exceptional craftsmanship',
        body: r.body || 'Arrived beautifully packaged and works flawlessly.',
        createdAt: r.createdAt || new Date().toISOString()
      }))
    };

    products.push(product);
    return product;
  },

  findById(id) {
    const numId = Number(id);
    return products.find((p) => p.id === numId) || null;
  },

  findBySlug(slug) {
    if (!slug) return null;
    return products.find((p) => p.slug === slug) || null;
  },

  find({ category, q, sort, includeInactive = false } = {}) {
    let result = products.filter((p) => includeInactive || p.active);

    if (category) {
      const catLower = category.toLowerCase();
      result = result.filter((p) => p.category.toLowerCase() === catLower);
    }

    if (q) {
      const query = q.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          (p.details && Object.values(p.details).some((val) => String(val).toLowerCase().includes(query)))
      );
    }

    if (sort) {
      switch (sort) {
        case 'price_asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'name':
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
          break;
        default:
          break;
      }
    }

    return result.map((p) => ({ ...p }));
  },

  update(id, updates) {
    const product = this.findById(id);
    if (!product) return null;

    if (updates.price !== undefined) {
      product.price = Number(updates.price);
    }
    if (updates.stock !== undefined) {
      product.stock = Number(updates.stock);
    }
    if (updates.active !== undefined) {
      product.active = Boolean(updates.active);
    }
    if (updates.name !== undefined) {
      product.name = updates.name;
    }
    if (updates.description !== undefined) {
      product.description = updates.description;
    }
    if (updates.category !== undefined) {
      product.category = updates.category;
    }

    return { ...product };
  },

  addReview(productId, { author, rating, title, body, createdAt = new Date().toISOString() }) {
    const product = this.findById(productId);
    if (!product) return null;

    const newReview = {
      id: nextReviewId++,
      productId: product.id,
      author: author || 'Verified Customer',
      rating: Math.max(1, Math.min(5, Number(rating) || 5)),
      title: title || 'Quality addition to our kitchen',
      body: body || 'Very pleased with the build quality and aesthetic.',
      createdAt
    };

    product.reviews.unshift(newReview);
    product.reviewCount = product.reviews.length;
    const sumRatings = product.reviews.reduce((acc, cur) => acc + cur.rating, 0);
    product.rating = Number((sumRatings / product.reviewCount).toFixed(1));

    return newReview;
  },

  decrementStock(productId, quantity) {
    const product = this.findById(productId);
    if (!product) return null;
    product.stock -= quantity;
    return product.stock;
  },

  incrementStock(productId, quantity) {
    const product = this.findById(productId);
    if (!product) return null;
    product.stock += quantity;
    return product.stock;
  },

  clear() {
    products = [];
    nextProductId = 1;
    nextReviewId = 1;
  }
};
