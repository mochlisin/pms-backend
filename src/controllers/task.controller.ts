import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import * as service from '../services/task.service';

const statusEnum = z.enum(['TODO', 'IN_PROGRESS', 'DONE']);
const createSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  projectId: z.string().uuid(),
  assigneeId: z.string().uuid().optional(),
  dueDate: z.coerce.date().optional(),
});

export async function create(req: Request, res: Response, next: NextFunction) {
  try { res.status(201).json(await service.create(createSchema.parse(req.body))); } catch (e) { next(e); }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const q = z.object({
      projectId: z.string().uuid().optional(),
      assigneeId: z.string().uuid().optional(),
      status: statusEnum.optional(),
    }).parse(req.query);
    res.json(await service.list(q));
  } catch (e) { next(e); }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const data = z.object({
      title: z.string().min(1).optional(),
      status: statusEnum.optional(),
      assigneeId: z.string().uuid().optional(),
      dueDate: z.coerce.date().optional(),
    }).parse(req.body);
    res.json(await service.update(req.params.id, data));
  } catch (e) { next(e); }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await service.remove(req.params.id);
    res.status(204).send();
  } catch (e) { next(e); }
}
