import { Router } from 'express';
import auth from './auth.routes';
import projects from './project.routes';
import tasks from './task.routes';
import dashboard from './dashboard.routes';

const router = Router();
router.use('/auth', auth);
router.use('/projects', projects);
router.use('/tasks', tasks);
router.use('/dashboard', dashboard);
export default router;
