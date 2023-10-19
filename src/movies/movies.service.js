const knex = require("../db/connection");

async function list(){
    return knex("movies").select("*");
}

async function listAllShowing(){
    return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .select("m.*")
    .where({"mt.is_showing": true})
}

module.exports = {
    list,
    listAllShowing
}