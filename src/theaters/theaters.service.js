const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");
const mapProperties = require("../utils/map-properties");

const addMovies = reduceProperties("movies", {
    movie_id: "m.movie_id",
    title: "m.title",
    runtime_in_minutes: "m.runtime_in_minutes",
    rating: "m.rating",
    description: "m.description",
    image_url: "m.image_url",
    created_at: "m.created_at",
    updated_at: "m.updated_at",
    is_showing: "mt.is_showing",
    theater_id: "t.theater_id",
});

async function list(){
    return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("t.*", "m.*")
}

module.exports = {
    list
}