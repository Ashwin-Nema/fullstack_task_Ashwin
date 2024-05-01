import morgan, { StreamOptions } from 'morgan';
import logger from './logger';

import { Request, Response } from 'express';

morgan.token(
  'message',
  (req: Request, res: Response) => res.locals.errorMessage || ''
);

const getIpFormat = (): string => ':remote-addr - ';
const successResponseFormat: string = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat: string = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode >= 400,
  stream: {
    write: (message: string) => logger.info(message.trim()),
  } as StreamOptions,
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode < 400,
  stream: {
    write: (message: string) => logger.error(message.trim()),
  } as StreamOptions,
});

export default { successHandler, errorHandler };
