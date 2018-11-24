const express = require('express');
const router = express.Router();
const User = require('../models/Users')
const _ = require('lodash');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).send('Email or username is incorrect.');
    }

    const validPwd = await bcrypt.compare(req.body.password, user.password);

    if (!validPwd) {
        return res.status(400).send('Email or username is incorrect.');
    }

    // if (!user.validPassword(req.body.password, user.password)) {
    //     return res.status(400).send("Email or username is incorrect.");
    // }

    const token = user.generateJWT();
    res.header("Authorization", token).send(_.pick(user, ["_id", "email"]));
});

module.exports = router;