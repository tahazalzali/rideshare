import type { Request, Response, NextFunction } from 'express';
import { collectDefaultMetrics, Registry } from 'prom-client';

const register = new Registry();
collectDefaultMetrics({ register });

export function metricsHandler(_req: Request, res: Response) {
  res.set('Content-Type', register.contentType);
  res.end(register.metrics());
}

export function metricsMiddleware(_req: Request, _res: Response, next: NextFunction) {
  // Reserved for custom labels if needed
  next();
}
