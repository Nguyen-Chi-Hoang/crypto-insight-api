const {createLogger,format,transports}=require('winston');
const {combine,timestamp,printf,colorize}=format;
const logger = createLogger({
    level: 'info',
    format: combine(
        colorize(),
        timestamp(),
        printf(({level,message,timestamp}) => `${timestamp} [${level}]: ${message}`)
    ),
    transports: [new transports.Console()],
});

module.exports = logger;