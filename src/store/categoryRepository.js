let categories = [];
let nextCategoryId = 1;

export const categoryRepository = {
  create({ slug, name, description, heroIllustration, image }) {
    const category = {
      id: nextCategoryId++,
      slug,
      name,
      description,
      heroIllustration: heroIllustration || image,
      image: image || heroIllustration
    };
    categories.push(category);
    return category;
  },

  findAll() {
    return [...categories];
  },

  findBySlug(slug) {
    if (!slug) return null;
    return categories.find((c) => c.slug.toLowerCase() === slug.toLowerCase()) || null;
  },

  findById(id) {
    const numId = Number(id);
    return categories.find((c) => c.id === numId) || null;
  },

  clear() {
    categories = [];
    nextCategoryId = 1;
  }
};
