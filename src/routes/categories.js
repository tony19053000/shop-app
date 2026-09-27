import { Router } from 'express';
import { categoryRepository } from '../store/categoryRepository.js';

const router = Router();

router.get('/', (req, res) => {
  const categories = categoryRepository.findAll();
  return res.json(categories);
});

export default router;
