import { Router } from 'express';
import * as c from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';

const r = Router();
r.post('/register', c.register);
r.post('/login', c.login);
r.get('/users', authenticate, requireRole('ADMIN', 'PROJECT_MANAGER'), c.listUsers);
r.patch('/users/:id/role', authenticate, requireRole('ADMIN'), c.updateRole);
export default r;
