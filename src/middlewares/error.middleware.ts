import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ message: 'Route not found' });
}

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: 'Validation failed', issues: err.issues });
  }
  if (err?.code === 'P2002') return res.status(409).json({ message: 'Duplicate value' });
  if (err?.code === 'P2025') return res.status(404).json({ message: 'Record not found' });
  const status = err.status ?? 500;
  res.status(status).json({ message: status === 500 ? 'Internal server error' : err.message });
}
