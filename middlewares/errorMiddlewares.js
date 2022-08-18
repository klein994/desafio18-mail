import logger from "../logs/logger.js";

export function handleError(err, req, res, next) {
    logger.error(err.message);
    res.status(500).send(err);
}