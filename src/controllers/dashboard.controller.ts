import { Request, Response, NextFunction } from 'express';
import * as service from '../services/dashboard.service';

export async function stats(_req: Request, res: Response, next: NextFunction) {
  try { res.json(await service.stats()); } catch (e) { next(e); }
}
