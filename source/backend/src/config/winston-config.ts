import winston from "winston";



export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf((info) => {
      return `Time: ${info.timestamp} => Level: [${info.level.toUpperCase()}] => Message: ${info.message}`;
    })
  ),
  transports: [new winston.transports.Console()],
})