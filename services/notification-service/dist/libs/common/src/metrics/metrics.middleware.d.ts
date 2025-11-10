import type { Request, Response, NextFunction } from 'express';
export declare function metricsHandler(_req: Request, res: Response): void;
export declare function metricsMiddleware(_req: Request, _res: Response, next: NextFunction): void;
