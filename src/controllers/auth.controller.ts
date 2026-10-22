import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import * as service from '../services/auth.service';

const roleEnum = z.enum(['ADMIN', 'PROJECT_MANAGER', 'MEMBER']);
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
  role: roleEnum.optional(),
});

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(201).json(await service.register(registerSchema.parse(req.body)));
  } catch (e) { next(e); }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const b = z.object({ email: z.string().email(), password: z.string() }).parse(req.body);
    res.json(await service.login(b.email, b.password));
  } catch (e) { next(e); }
}

export async function listUsers(_req: Request, res: Response, next: NextFunction) {
  try { res.json(await service.listUsers()); } catch (e) { next(e); }
}

export async function updateRole(req: Request, res: Response, next: NextFunction) {
  try {
    const { role } = z.object({ role: roleEnum }).parse(req.body);
    res.json(await service.updateRole(req.params.id, role));
  } catch (e) { next(e); }
}
