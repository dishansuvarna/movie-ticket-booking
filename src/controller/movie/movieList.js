const { Op } = require('sequelize')
const Movie = require('../../models/movies')
const { respond } = require('../../../helper')

async function movieList ( req, res ) {
    if (req.body.movie_name) {
        const movie = await Movie.findAll({ where: { movie_name: req.body.movie_name } })
        if (movie.length === 0) {
            return respond.err(res , "Movie Not Found!")
        }
        return respond.ok(res , movie)
    }
    
    try {
        const movie = await Movie.findAll()
        if (movie.length === 0) {
            return respond.err(res , "No Movie Found!")
        }
        return respond.ok(res , movie)
    } catch (error) {
        return respond.err(res , "Invalid Credentials")
    }
}

module.exports = movieList