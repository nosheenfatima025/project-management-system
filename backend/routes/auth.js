import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();
const tokenFor = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
const publicUser = (u) => ({ id: u._id, name: u.name, email: u.email, role: u.role, avatar: u.avatar || '' });

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name?.trim() || !email?.trim() || !password) return res.status(400).json({ message: 'All fields are required' });
    if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' });
    const normalized = email.toLowerCase().trim();
    if (await User.findOne({ email: normalized })) return res.status(409).json({ message: 'Email already registered' });
    const user = await User.create({ name: name.trim(), email: normalized, password: await bcrypt.hash(password, 12), role: 'employee' });
    res.status(201).json({ token: tokenFor(user._id), user: publicUser(user) });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.post('/login', async (req, res) => {
  try {
    const email = req.body.email?.toLowerCase().trim();
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(req.body.password || '', user.password))) return res.status(401).json({ message: 'Invalid email or password' });
    res.json({ token: tokenFor(user._id), user: publicUser(user) });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/me', protect, (req, res) => res.json(publicUser(req.user)));

router.put('/me', protect, async (req, res) => {
  try {
    const { name, avatar } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { name: name?.trim() || req.user.name, avatar: avatar || '' }, { new: true, runValidators: true });
    res.json(publicUser(user));
  } catch (e) { res.status(400).json({ message: e.message }); }
});

router.get('/team', protect, adminOnly, async (req, res) => {
  const users = await User.find().select('-password').sort('name');
  res.json(users);
});

router.put('/team/:id/role', protect, adminOnly, async (req, res) => {
  try {
    const allowed = ['admin', 'employee', 'developer', 'designer', 'tester', 'client'];
    if (!allowed.includes(req.body.role)) return res.status(400).json({ message: 'Invalid role' });
    const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (e) { res.status(400).json({ message: e.message }); }
});

export default router;
