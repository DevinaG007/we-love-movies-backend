function notFound(req, res, next){
    next({status: 400, message: `Path not found: ${req.originalUrl}`});
}

module.exports = notFound;