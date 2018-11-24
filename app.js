const express = require('express');
const mongoose = require('mongoose');
const nodepath = require('path');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const login = require('./routes/login');
const register = require('./routes/register');
const blogAPI = require('./routes/blog');
const app = express();
mongoose.Promise = global.Promise;

mongoose
    .connect(
        "mongodb+srv://vijaykumar:" + process.env.DB_PASS + "@cluster0-mhhcs.mongodb.net/myblog?retryWrites=true",
        { useNewUrlParser: true }
    )
    .then(() => console.log("succesfully connected to db"))
    .catch(err => console.log(err));

app.use(express.json());
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(nodepath.join(__dirname, "dist/myblog/")));

if (process.env.ENV === 'development') {
    app.use(morgan('tiny'));
}

app.use('/api/blog', blogAPI);
app.use('/api/login', login);
app.use('/api/register', register);

app.use('*', express.static(nodepath.join(__dirname, 'dist/myblog/')));

let port = process.env.PORT || 3000;

app.listen(process.env.PORT, () => {
    console.log(`Connected to ${port}`);
});
