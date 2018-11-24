require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 150
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 150
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.createPassword = function (pwd) {
    return bcrypt.hashSync(pwd, bcrypt.genSaltSync(10));
}

userSchema.methods.validPassword = function (pwdToCompare, pwd) {
    return bcrypt.compareSync(pwdToCompare, pwd);
}

userSchema.methods.generateJWT = function () {
    const token = jwt.sign({ _id: this._id, email: this.email, isAdmin: this.isAdmin }, process.env.SECRET, {
        expiresIn: "7d"
    });
    return token;
}

module.exports = mongoose.model('User', userSchema);
