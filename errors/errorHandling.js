import logger from './../logs/logger.js'

export const errorHandling = (err, req, res, next) => {
    logger.error(err.stack);
    next(err);
}