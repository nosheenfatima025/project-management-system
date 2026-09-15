import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import serverless from 'serverless-http';

import { connectDB } from '../../config/db.js';
import User from '../../models/User.js';

import authRoutes from '../../routes/auth.js';
import projectRoutes from '../../routes/projects.js';
import taskRoutes from '../../routes/tasks.js';
import inventoryRoutes from '../../routes/inventory.js';

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || '*'
}));

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    message: 'ProjectFlow API is running'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/inventory', inventoryRoutes);

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: 'Server error'
  });
});

let dbInitialized = false;

async function initialize() {
  if (dbInitialized) return;

  await connectDB();

  const email = (
    process.env.ADMIN_EMAIL || 'admin@projectflow.com'
  ).toLowerCase();

  const password =
    process.env.ADMIN_PASSWORD || 'Admin@12345';

  const existing = await User.findOne({ email });

  if (!existing) {
    await User.create({
      name: 'System Admin',
      email,
      password: await bcrypt.hash(password, 12),
      role: 'admin'
    });

    console.log(`Admin account created: ${email}`);
  } else if (existing.role !== 'admin') {
    existing.role = 'admin';
    await existing.save();
  }

  dbInitialized = true;
}

const serverlessHandler = serverless(app);

export async function handler(event, context) {
  try {
    await initialize();

    return await serverlessHandler(event, context);
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Database/server initialization failed'
      })
    };
  }
}