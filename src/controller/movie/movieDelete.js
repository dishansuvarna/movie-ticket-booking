const { Op } = require('sequelize')
const Movie = require('../../models/movies')
const { respond } = require('../../../helper')
const { ROLE, RESPONSE } = require('../../../config')

async function movieDelete ( req, res ) {
    if (req.role_id !== ROLE.ADMIN) {
        return respond.err(res , RESPONSE.USER_ACCESS)
    }

    try {
        const movie = await Movie.findOne({ where: { movie_id: req.body.movie_id } })
        await Movie.destroy({ where: { movie_id: movie.movie_id } })
        return respond.ok(res , { movie_id: movie.movie_id })
    } catch (error) {
        return respond.err(res , RESPONSE.INVALID)
    } 
}

module.exports = movieDelete