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
    critics_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    critic_created: "critic.created_at",
    critic_updated: "critic.updated_at"
})

async function update(updateReview){
     const updated = await knex("reviews")
    .select("*")
    .where({review_id: updateReview.review_id})
    .update(updateReview, "*");

   
    return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*", "c.updated_at as critic_updated", "c.created_at as critic_created", "c.critic_id as critics_id")
    .where({review_id: updateReview.review_id})
    .first()
    .then(addCritic)
}

module.exports = {
    update,
    read,
    destroy
}