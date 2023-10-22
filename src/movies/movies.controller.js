const service = require("./movies.service");

async function listAllShowing(req, res, next){
    if (req.query.is_showing){
        data = await service.listAllShowing();
        res.json({data});
    } else { 
        next();
    }
}
async function list(req, res){
        let data = await service.list();
        res.json({data});
}

async function movieExists(req, res, next){
    const movie = await service.read(req.params.movieId);
    if (movie){
        res.locals.movie = movie;
        return next()
    } else {
        next({status: 404, message: `error: Movie cannot be found.`})
    }
}

async function read(req, res){
    const movieId = req.params.movieId;
    res.json({data: await service.read(movieId)})
}

async function readWithTheaters(req, res){
    const movie = res.locals.movie;
    const data = await service.readWithTheaters(movie.movie_id);
    res.json({data})
}

async function listMoviesReviews(req, res){
    const movie = res.locals.movie;
    const data = await service.listMoviesReviews(movie.movie_id);
    res.json({data})
}

module.exports = {
    list: [listAllShowing, list],
    read: [movieExists, read],
    readWithTheaters: [movieExists, readWithTheaters],
    listMoviesReviews: [movieExists, listMoviesReviews]
}