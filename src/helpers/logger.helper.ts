import * as winston from 'winston';

winston.addColors({
  error: 'red bold',
  info: 'cyan',
  debug: 'green',
});

const createLogger = (service: string) => {
  const colorizer = winston.format.colorize();
  const transports: winston.transport[] = [new winston.transports.Console()];

  const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message, ...args }) =>
        colorizer.colorize(
          level,
          `${timestamp}${`[${level}]`.padEnd(7)}| ${service.padEnd(12)} | ${message}${
            Object.keys(args).length ? ` | ${JSON.stringify(args)}` : ''
          }`,
        ),
      ),
    ),
    transports,
  });

  return logger;
};

const loggerBase = createLogger('API');

export const logger = {
  error: loggerBase.error.bind(loggerBase),
  info: loggerBase.info.bind(loggerBase),
  debug: loggerBase.debug.bind(loggerBase),
};
