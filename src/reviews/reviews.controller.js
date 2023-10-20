const service = require("./reviews.service");

async function reviewExists(req, res, next){
    const review = await service.read(req.params.reviewId);
    if (review){
        res.locals.review = review;
        return next()
    } else {
        next({ status: 404, message: `error: Review cannot be found.`})
    }
}

async function destroy(req, res, next){
    const review = res.locals.review;
    await service.destroy(review.review_id);
    res.sendStatus(204)
}

module.exports = {
    delete: [reviewExists, destroy]
}