import path from 'path'
import DailyRotateFile from 'winston-daily-rotate-file'
import { createLogger, format, transports } from 'winston'
const { combine, timestamp, label, printf, prettyPrint } = format

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hour = date.getHours()
  const minute = date.getMinutes()
  const seconds = date.getSeconds()
  return `${date.toDateString()}{${hour}:${minute}:${seconds}} [${label}] ${level}: ${message}`
})

const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'PH' }), timestamp(), myFormat, prettyPrint()),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winstone',
        'sucesses',
        'ph-%DATE%-sucess.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'PH' }), timestamp(), myFormat, prettyPrint()),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winstone',
        'error',
        'phu-%DATE%-error.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

export { logger, errorLogger }
