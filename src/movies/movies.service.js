const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const reduceProperties = require("../utils/reduce-properties");

async function list() {
  return knex("movies").select("*");
}

function listAllShowing() {
  return knex
    .distinct()
    .from("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({ "mt.is_showing": true });
}

function readWithTheaters(movie_id) {
  return knex
    .distinct()
    .from("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "mt.theater_id", "mt.theater_id")
    .select("t.*", "m.movie_id")
    .where({ "m.movie_id": movie_id });
}

async function read(movie_id) {
  return knex("movies").select("*").where({ movie_id: movie_id }).first();
}

const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at",
})


async function listMoviesReviews(movie_id) {
  return knex("movies as m")
    .join("reviews as r", "m.movie_id", "r.movie_id")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "m.movie_id": movie_id })
    .then(addCritic)
}

module.exports = {
  list,
  listAllShowing,
  read,
  readWithTheaters,
  listMoviesReviews,
};
