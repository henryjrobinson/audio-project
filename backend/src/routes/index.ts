import { Router } from 'express';
import authRoutes from './auth.routes';
import projectRoutes from './project.routes';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
    },
  });
});

// API routes
router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);

export default router;