const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const blogAPI = require("./routes/blog");
const app = express();
const path = require("path");

mongoose
    .connect(
        "mongodb+srv://vijaykumar:GA78mM9C4jO2Nbey@cluster0-mhhcs.mongodb.net/myblog?retryWrites=true",
        { useNewUrlParser: true }
    )
    .then(() => console.log("succesfully connected to db"))
    .catch(err => console.log(err));

app.use(express.json());
app.use(morgan("tiny"));
app.use("/api/blog", blogAPI);
app.use(express.static(path.join(__dirname, "dist/myblog/")));
app.use("*", express.static(path.join(__dirname, "dist/myblog/")));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("listening on port 3000"));
