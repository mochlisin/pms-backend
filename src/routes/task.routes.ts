import { Router } from 'express';
import * as c from '../controllers/task.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';

const r = Router();
r.use(authenticate);
r.get('/', c.list);
r.post('/', requireRole('ADMIN', 'PROJECT_MANAGER'), c.create);
r.patch('/:id', c.update);
r.delete('/:id', requireRole('ADMIN', 'PROJECT_MANAGER'), c.remove);
export default r;
