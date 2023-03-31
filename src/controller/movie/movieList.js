const { Op } = require('sequelize')
const Movie = require('../../models/movies')
const { respond } = require('../../../helper')
const { RESPONSE } = require('../../../config')

async function movieList ( req, res ) {
    if (req.body.movie_name) {
        const movie = await Movie.findAll({ where: { movie_name: req.body.movie_name } })
        if (movie.length === 0) {
            return respond.err(res , RESPONSE.MOVIE_NOT_FOUND)
        }
        return respond.ok(res , movie)
    }
    
    try {
        const movie = await Movie.findAll()
        if (movie.length === 0) {
            return respond.err(res , RESPONSE.MOVIE_NOT_FOUND)
        }
        return respond.ok(res , movie)
    } catch (error) {
        return respond.err(res , RESPONSE.INVALID)
    }
}

module.exports = movieList