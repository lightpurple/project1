const jwt = require("jsonwebtoken");

var validate = {};

validate.validateRegister = function (req, res, next) {
    data = req.body;

    if (!(data.username && data.nickname && data.password && data.password.length >= 8)) {
        return res.status(400).send({
            msg: "Something wrong!",
        });
    }
    next();
};

validate.isLoggedin = function (req, res, next) {
    const token = req.cookies.user;

    if (!token) {
        return res.status(403).send({
            msg: "No token provided!",
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                msg: "Unauthorized!",
            });
        }
        req.decoded = decoded;
        next();
    });
};

validate.validatePost = function (req, res, next) {
    const data = req.body;

    if (!(data.title && data.contents)) {
        return res.status(400).send({
            msg: "Post form invalid! "
        })
    }
    next();
}

module.exports = validate;
