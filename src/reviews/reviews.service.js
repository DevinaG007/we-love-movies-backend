const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function destroy(review_id){
return knex("reviews")
.where({review_id})
.del()
}

function read(review_id){
    return knex("reviews")
    .select("*")
    .where({"review_id": review_id})
    .first()
}

const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at"
})

async function update(updatedReview){
    return knex("reviews")
    .select("*")
    .where({"review_id": updatedReview.review_id})
    .update(updatedReview, "*")
    .then((updatedRecords) => updatedRecords[0])
}

module.exports = {
    read,
    destroy,
    update
}