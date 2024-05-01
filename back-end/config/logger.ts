import winston, { Logger } from 'winston';

interface ErrorInfo {
  stack?: string;
}

const enumerateErrorFormat = winston.format((info: any) => {
  if (info instanceof Error) {
    const errorInfo: ErrorInfo = {};
    if (info.stack) {
      errorInfo.stack = info.stack;
    }
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger: Logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    enumerateErrorFormat(),
    winston.format.colorize(),
    //   : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

export default logger;

