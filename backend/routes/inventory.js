import express from 'express';
import Inventory from '../models/Inventory.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();
router.use(protect);

router.get('/', async (req, res) => {
  try {
    const items = await Inventory.find().populate('createdBy', 'name email').sort('-createdAt');
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post('/', adminOnly, async (req, res) => {
  try {
    const { name, category, stock, price, sku } = req.body;
    if (!name?.trim()) return res.status(400).json({ message: 'Product name is required' });
    const item = await Inventory.create({
      name: name.trim(),
      category: category?.trim() || 'General',
      stock: Number(stock),
      price: Number(price),
      sku: sku?.trim() || '',
      createdBy: req.user._id
    });
    res.status(201).json(await item.populate('createdBy', 'name email'));
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.put('/:id', adminOnly, async (req, res) => {
  try {
    const data = {};
    ['name', 'category', 'stock', 'price', 'sku'].forEach(key => {
      if (req.body[key] !== undefined) data[key] = ['stock', 'price'].includes(key) ? Number(req.body[key]) : req.body[key];
    });
    const item = await Inventory.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Product not found' });
    Object.assign(item, data);
    await item.save();
    res.json(await item.populate('createdBy', 'name email'));
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.delete('/:id', adminOnly, async (req, res) => {
  try {
    const item = await Inventory.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

export default router;
