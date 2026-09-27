let users = [];
let nextUserId = 1;

export const userRepository = {
  create({ name, email, passwordHash, salt, role = 'customer', address = null, createdAt = new Date().toISOString() }) {
    const user = {
      id: nextUserId++,
      name,
      email: email.trim().toLowerCase(),
      passwordHash,
      salt,
      role,
      address,
      createdAt
    };
    users.push(user);
    return user;
  },

  findById(id) {
    const numId = Number(id);
    return users.find((u) => u.id === numId) || null;
  },

  findByEmail(email) {
    if (!email) return null;
    const normalized = email.trim().toLowerCase();
    return users.find((u) => u.email === normalized) || null;
  },

  findAll() {
    return [...users];
  },

  sanitize(user) {
    if (!user) return null;
    const { passwordHash, salt, ...safeUser } = user;
    return safeUser;
  },

  clear() {
    users = [];
    nextUserId = 1;
  }
};
