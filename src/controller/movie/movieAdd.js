const { Op } = require('sequelize')
const Movie = require('../../models/movies')
const { respond } = require('../../../helper')
const { ROLE, RESPONSE } = require('../../../config')

async function movieAdd ( req, res ) {
    if (req.role_id !== ROLE.ADMIN) {
        return respond.err(res , RESPONSE.USER_ACCESS)
    }

    try {
        const movie = await Movie.create({
            movie_name: req.body.movie_name ,
            duration: req.body.duration ,
            genre: req.body.genre ,
            language: req.body.language ,
            release_date: req.body.release_date ,
            country: req.body.country
        })
        return respond.ok(res , { movie_id: movie.movie_id , movie_name: movie.movie_name , release_date: movie.release_date })
    } catch (error) {
        return respond.err(res , RESPONSE.INVALID)
    }
}

module.exports = movieAdd