import logger from "./../logs/logger.js"

export const logInfo = (req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl}`);
    next();
}

export const logWarning = (req, res, next) => {
    logger.warn(`${req.method} ${req.originalUrl}`);
    next();
}
