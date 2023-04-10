const { Op } = require('sequelize')
const Movie = require('../../models/movies')
const { respond } = require('../../../helper')
const { ROLE, RESPONSE } = require('../../../config')

async function movieEdit ( req, res ) {
    if (req.role_id !== ROLE.ADMIN) {
        return respond.err(res , RESPONSE.USER_ACCESS)
    }

    const isExist = await Movie.findOne({
        where: { movie_id: req.body.movie_id }
    })

    if(!isExist) {
        return respond.err(res , RESPONSE.MOVIE_NOT_FOUND)
    }

    try {
        await Movie.update({
            movie_name: req.body.movie_name || isExist.movie_name,
            duration: req.body.duration || isExist.duration,
            genre: req.body.genre || isExist.genre,
            language: req.body.language || isExist.language,
            release_date: req.body.release_date || isExist.release_date,
            country: req.body.country || isExist.country
        }, {
            where: { movie_id: req.body.movie_id }
        })
    } catch (error) {
        return respond.err(res , RESPONSE.INVALID)
    }

    const movie = await Movie.findOne({
        where: { movie_id: req.body.movie_id }
    })

    return respond.ok(res , { movie_id: movie.movie_id , movie_name: movie.movie_name , release_date: movie.release_date })
}

module.exports = movieEdit