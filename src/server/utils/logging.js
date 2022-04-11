const winston = require('winston');
const { getNamespace } = require('cls-hooked');
require('dotenv').config();

function logging(logger) {
    return (level, message) =>  logger.log({ level, message });
}
function getModuleName(callingModule) {
    if (!callingModule) {
        return '';
    }

    if (!callingModule.filename) {
        return callingModule.id;
    }

    const parts = callingModule.filename.split('/');
    return `${parts[parts.length - 2]}/${parts.pop()}`;
}
function createLogger(callingModule) {
    const label = getModuleName(callingModule);
    const logger_format = {
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.label({ label }),
            winston.format.align(),
            winston.format.printf((info) => {
                const {timestamp, label, level, message, ...args} = info;
                const appNamespace = getNamespace('app');
                const requestId = (appNamespace && appNamespace.get('requestId')) || 'GLOBAL';
                const path = (appNamespace && appNamespace.get('path')) || '';
                const method = (appNamespace && appNamespace.get('method')) || '';
                return `${timestamp} [${requestId}] [${method}] [${path}] ${label} ${level}: ${message}`;
            })
        )
    };
    const logger = winston.createLogger({
        transports: [
            new winston.transports.Console({
                timestamp: true,
                level: process.env.LOG_LEVEL || 'info',
                format: logger_format.format
            })
            // new winston.transports.File({ filename: './logs/app.log', format: logger_format.format })
        ]
    });

    return {
        logger: {
            info(message) {
                return logging(logger)('info', message);
            },
            debug(message, meta) {
                return logging(logger)('debug', message);
            },
            error(message, meta) {
                return logging(logger)('error', message);
            }
        }
    };
}

module.exports = createLogger;
