import { adminMail } from "./../configs/config.js";

export function auth (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).send({ message: 'Unauthorized' });
}

export function isAdmin (req, res, next) {
    if (req.user?.email === adminMail) {
        return next();
    }
    res.status(403).send({ message: 'Forbidden' });
}