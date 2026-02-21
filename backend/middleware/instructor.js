const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (!req.user || req.user.role !== 'instructor') {
        return res.status(403).json({ msg: 'Access denied. Instructor role required.' });
    }
    next();
};
