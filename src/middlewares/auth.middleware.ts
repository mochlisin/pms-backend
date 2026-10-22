import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const h = req.headers.authorization;
  if (!h?.startsWith('Bearer ')) return res.status(401).json({ message: 'Missing bearer token' });
  try {
    const p = verifyToken(h.slice(7));
    (req as any).user = { id: p.sub, role: p.role };
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}
