if (process.env.USER) require("dotenv").config();
const express = require("express");
const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");
const app = express();
const cors = require("cors");

app.use(cors());
app.get("/movies", moviesRouter);
app.get("/reviews", reviewsRouter);
app.get("/theaters", theatersRouter);

module.exports = app;
