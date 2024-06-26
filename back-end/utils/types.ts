import { Request, Response, NextFunction } from 'express';

export type CatchAsyncType = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => (req: Request, res: Response, next: NextFunction) => void;
