const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = function (req, res, next) {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(401).send('Requires authorization');
    }
    let tokenSplit = token.split(' ');
    req.user = jwt.verify(tokenSplit[1], process.env.SECRET);
    next();
}
