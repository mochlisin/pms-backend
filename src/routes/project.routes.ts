import { Router } from 'express';
import * as c from '../controllers/project.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';

const r = Router();
r.use(authenticate);
r.get('/', c.list);
r.get('/:id', c.getById);
r.post('/', requireRole('ADMIN', 'PROJECT_MANAGER'), c.create);
r.patch('/:id', requireRole('ADMIN', 'PROJECT_MANAGER'), c.update);
r.delete('/:id', requireRole('ADMIN'), c.remove);
export default r;
