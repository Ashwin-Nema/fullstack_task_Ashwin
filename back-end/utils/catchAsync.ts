import { Request, Response, NextFunction } from 'express';
import { CatchAsyncType } from '../utils/types';

const catchAsync: CatchAsyncType =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err: any) => next(err));
  };

export default catchAsync;
