import crypto from 'node:crypto';
import { promisify } from 'node:util';

const scryptAsync = promisify(crypto.scrypt);

export async function hashPassword(password, salt) {
  const userSalt = salt || crypto.randomBytes(16).toString('hex');
  const derivedKey = await scryptAsync(password, userSalt, 64);
  return {
    hash: derivedKey.toString('hex'),
    salt: userSalt
  };
}

export async function verifyPassword(password, hash, salt) {
  try {
    const derivedKey = await scryptAsync(password, salt, 64);
    const hashBuffer = Buffer.from(hash, 'hex');
    if (hashBuffer.length !== derivedKey.length) {
      return false;
    }
    return crypto.timingSafeEqual(hashBuffer, derivedKey);
  } catch {
    return false;
  }
}

export function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}
