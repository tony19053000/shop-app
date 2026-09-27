const tokens = new Map();

export const tokenStore = {
  set(token, userId) {
    tokens.set(token, userId);
  },
  get(token) {
    return tokens.get(token);
  },
  delete(token) {
    tokens.delete(token);
  },
  clear() {
    tokens.clear();
  }
};
