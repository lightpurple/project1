var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validate = require("../config/validate");
const db = require("../models/index");
const User = db.user;

/* GET users listing. */

router.post("/signup", validate.validateRegister, async function (req, res) {
    User.findOne({ where: { username: req.body.username } })
    .then(function (data) {
        if ((data == null || data == undefined) === false) {
            return res
                .status(400)
                .json({ result: false, msg: "User is aleady exist!" });
        }

        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) throw err;
            User.create({
                username: req.body.username,
                nickname: req.body.nickname,
                password: hash,
                isAdmin: false,
            }).then(function (createUser) {
                return res.status(200).json({ result: true, msg: "User create Successful!" });
            });
        });
    });
});

router.post("/login", function (req, res) {
    User.findOne({ where: { username: req.body.username } })
    .then(function (data) {
        if (!data) return res.status(400).json({ result: false, msg: "User does not exist! "});
        bcrypt.compare(req.body.password, data.password, function(err, result) {
            if (err) throw err;
            if (result) {
                // 로그인 성공
                const jwtToken = jwt.sign({
                    username: data.username,
                  }, process.env.JWT_SECRET,
                  {
                    expiresIn: '15d',
                    issuer: 'localhost',
                    subject: 'user_info'
                  })
                  return res.status(200).cookie('user', jwtToken, { maxAge: 24 * 60 * 60 * 15}).json({result: true, msg: 'Login Successful!'});
            } else {
                // 로그인 실패
                return res.status(400).json({ result: false, msg: "Password is incorrect! "});
            }
        });
    });
});

router.get("/logout", validate.isLoggedin, function(req, res) {
    return res.status(200).cookie('user', '', {maxAge:0}).json({'result': true, 'msg': 'User logout successful!'});
});

module.exports = router;
