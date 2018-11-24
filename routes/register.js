const express = require("express");
const router = express.Router();
const _ = require('lodash');
const User = require('../models/Users');

router.post("/", async (req, res, next) => {
    let user = req.body;
    const result = await User.findOne({ email: user.email });
    if (result) {
        return res.status(401).send('User already exists.');
    }

    user = new User({
        email: user.email,
        password: user.password
    });

    if (!user) {
        return res.send(400).send('Invalid request');
    }

    user.password = user.createPassword(user.password);

    await user.save()
    const token = user.generateJWT();
    res.header("Authorization", token).send(_.pick(user, ["_id", "email"]));
    // The following piece of code is identical to the previous one.
    // res.header("Authorization", token).json({id: user._id, email: user.email});
});

module.exports = router;
