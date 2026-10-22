import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import * as service from '../services/project.service';

const bodySchema = z.object({ name: z.string().min(1), description: z.string().optional() });

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const data = bodySchema.parse(req.body);
    res.status(201).json(await service.create({ ...data, ownerId: (req as any).user.id }));
  } catch (e) { next(e); }
}

export async function list(_req: Request, res: Response, next: NextFunction) {
  try { res.json(await service.list()); } catch (e) { next(e); }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try { res.json(await service.getById(req.params.id)); } catch (e) { next(e); }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await service.update(req.params.id, bodySchema.partial().parse(req.body)));
  } catch (e) { next(e); }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await service.remove(req.params.id);
    res.status(204).send();
  } catch (e) { next(e); }
}
