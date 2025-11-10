import { randomUUID } from 'crypto';
import { Request, Response, NextFunction } from 'express';

export function correlationIdMiddleware(req: Request, res: Response, next: NextFunction) {
  const existing = req.headers['x-correlation-id'] as string | undefined;
  const cid = existing || randomUUID();
  req.headers['x-correlation-id'] = cid;
  res.setHeader('x-correlation-id', cid);
  next();
}
