import { Router } from 'express';
import { generateToken, hashPassword, verifyPassword } from '../services/auth.js';
import { tokenStore } from '../store/tokenStore.js';
import { userRepository } from '../store/userRepository.js';

const router = Router();

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body || {};

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'A valid email address is required' });
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  const existing = userRepository.findByEmail(email);
  if (existing) {
    return res.status(409).json({ error: 'An account with this email address already exists' });
  }

  const authData = await hashPassword(password);
  const user = userRepository.create({
    name: name.trim(),
    email: email.trim(),
    passwordHash: authData.hash,
    salt: authData.salt,
    role: 'customer'
  });

  const token = generateToken();
  tokenStore.set(token, user.id);

  return res.status(201).json({
    token,
    user: userRepository.sanitize(user)
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = userRepository.findByEmail(email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const isValid = await verifyPassword(password, user.passwordHash, user.salt);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = generateToken();
  tokenStore.set(token, user.id);

  return res.status(200).json({
    token,
    user: userRepository.sanitize(user)
  });
});

router.post('/logout', (req, res) => {
  const header = req.headers.authorization;
  if (header) {
    const parts = header.split(' ');
    if (parts.length === 2 && parts[0].toLowerCase() === 'bearer') {
      tokenStore.delete(parts[1].trim());
    }
  }
  return res.status(204).end();
});

export default router;
