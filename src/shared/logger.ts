import { createLogger, format, transports, addColors } from 'winston';
const { combine, timestamp, printf, colorize, splat, align } = format;
import * as WinstonDailyRouteFile from 'winston-daily-rotate-file';
import config from '../configs/configVariable';
import * as path from 'path';

// custom logger format
const BASE_DIR = process.cwd();
const env = process.env.ENV;
const logLevels = config.log.levels;
const logColors = config.log.colors;

addColors(logColors);
const customOutLog = (message) => {
  if (message instanceof Object) return JSON.stringify(message);
  return message;
};

const formatLog = printf((msg: any) => {
  return `${msg.timestamp} - ${msg.level}: ${customOutLog(msg.message)}`;
});

const logConsole = new transports.Console();

// custom logger output logfile
const logFiles = [];
if (env !== 'local') {
  Object.keys(logLevels).forEach((level: any) => {
    logFiles.push(new WinstonDailyRouteFile({
      filename: `%DATE%-${level}.log`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxSize: '20m',
      dirname: path.join(BASE_DIR, `/logs/%DATE%`),
      format: combine(
        format((info, opt) => {
          if (info.level === level) {
            return info;
          }
        })()
      )
    }));
  });
}

// logger instanace
export const logger = createLogger({
  levels: logLevels,
  format: combine(
    align(),
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    colorize(),
    formatLog,
    splat()
  ),
  transports: [
    logConsole,
    ...logFiles
  ]
});
