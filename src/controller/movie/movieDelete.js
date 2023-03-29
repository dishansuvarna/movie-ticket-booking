const { Op } = require('sequelize')
const Movie = require('../../models/movies')
const { respond } = require('../../../helper')

async function movieDelete ( req, res ) {
    if (req.role_id !== 1) {
        return respond.err(res , "Access not provided!")
    }

    try {
        const movie = await Movie.findOne({ where: { movie_id: req.body.movie_id } })
        await Movie.destroy({ where: { movie_id: movie.movie_id } })
        return respond.ok(res , { movie_id: movie.movie_id })
    } catch (error) {
        return respond.err(res , "Cannot Delete Movie")
    } 
}

module.exports = movieDelete