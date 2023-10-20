const knex = require("../db/connection");

async function list(){
    return knex("movies").select("*");
}

function listAllShowing(){
    return knex.distinct()
    .from("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({"mt.is_showing": true})
}

async function read(movie_id){
return knex("movies")
.select("*")
.where({"movie_id": movie_id})
.first()
}

module.exports = {
    list,
    listAllShowing,
    read
}