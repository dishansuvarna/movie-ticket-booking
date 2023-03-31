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

    if (req.body.movie_name !== undefined) {
        try {
            await Movie.update({
                movie_name: req.body.movie_name
            } , {
                where: { movie_id: req.body.movie_id }
            })
        } catch (error) {
            return respond.err(res , RESPONSE.INVALID)
        }
    }

    if (req.body.duration !== undefined) {
        try {
            await Movie.update({
                duration: req.body.duration
            } , {
                where: { movie_id: req.body.movie_id }
            })
        } catch (error) {
            return respond.err(res , RESPONSE.INVALID)
        }
    }

    if (req.body.genre !== undefined) {
        try {
            await Movie.update({
                genre: req.body.genre
            } , {
                where: { movie_id: req.body.movie_id }
            })
        } catch (error) {
            return respond.err(res , RESPONSE.INVALID)
        }
    }

    if (req.body.language !== undefined) {
        try {
            await Movie.update({
                language: req.body.language
            } , {
                where: { movie_id: req.body.movie_id }
            })
        } catch (error) {
            return respond.err(res , RESPONSE.INVALID)
        }
    }

    if (req.body.release_date !== undefined) {
        try {
            await Movie.update({
                release_date: req.body.release_date
            } , {
                where: { movie_id: req.body.movie_id }
            })
        } catch (error) {
            return respond.err(res , RESPONSE.INVALID)
        }
    }

    if (req.body.country !== undefined) {
        try {
            await Movie.update({
                country: req.body.country
            } , {
                where: { movie_id: req.body.movie_id }
            })
        } catch (error) {
            return respond.err(res , RESPONSE.INVALID)
        }
    }

    const movie = await Movie.findOne({
        where: { movie_id: req.body.movie_id }
    })

    return respond.ok(res , { movie_id: movie.movie_id , movie_name: movie.movie_name , release_date: movie.release_date })
}

module.exports = movieEdit