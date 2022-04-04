const express = require("express");
const path = require("path");
const methodOverride = require('method-override'); 
const publicPath = path.resolve(__dirname, "./public");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");


const app = express();

// allows cors policies in order to use these with a frontend 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});




app.use(methodOverride('_method')); 
const authRouter = require("./routes/authRouter");
const charactersRouter = require("./routes/charactersRouter");
const moviesRouter = require("./routes/moviesRouter");
const characterMoviesRouter = require("./routes/characterMovieRouter");
const genresRouter = require("./routes/genresRouter");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


 
app.use("/api/v1/auth",             authRouter);
app.use("/api/v1/characters",       charactersRouter);
app.use("/api/v1/movies",           moviesRouter);
app.use("/api/v1/charactermovies",  characterMoviesRouter);
app.use("/api/v1/genres",           genresRouter);



const port = process.env.PORT || 3003;
module.exports = app.listen(port, () => console.log(`Up and running on port ${port}...`));