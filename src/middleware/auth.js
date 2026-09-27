import { tokenStore } from '../store/tokenStore.js';
import { userRepository } from '../store/userRepository.js';

function extractBearerToken(req) {
  const header = req.headers.authorization;
  if (!header) return null;
  const parts = header.split(' ');
  if (parts.length === 2 && parts[0].toLowerCase() === 'bearer') {
    return parts[1].trim();
  }
  return null;
}

export function optionalAuth(req, res, next) {
  const token = extractBearerToken(req);
  if (!token) {
    req.user = null;
    return next();
  }

  const userId = tokenStore.get(token);
  if (!userId) {
    req.user = null;
    return next();
  }

  const user = userRepository.findById(userId);
  req.user = user ? userRepository.sanitize(user) : null;
  next();
}

export function requireAuth(req, res, next) {
  const token = extractBearerToken(req);
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const userId = tokenStore.get(token);
  if (!userId) {
    return res.status(401).json({ error: 'Invalid or expired session token' });
  }

  const user = userRepository.findById(userId);
  if (!user) {
    return res.status(401).json({ error: 'Account not found' });
  }

  req.user = userRepository.sanitize(user);
  req.token = token;
  next();
}

export function requireAdmin(req, res, next) {
  requireAuth(req, res, () => {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Administrative privileges required' });
    }
    next();
  });
}
