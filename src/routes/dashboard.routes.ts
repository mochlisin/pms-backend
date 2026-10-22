import { Router } from 'express';
import * as c from '../controllers/dashboard.controller';
import { authenticate } from '../middlewares/auth.middleware';

const r = Router();
r.get('/', authenticate, c.stats);
export default r;
