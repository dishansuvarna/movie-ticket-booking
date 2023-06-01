const { Op } = require('sequelize')
const Screen = require('../../models/screens')
const MovieCinema = require('../../models/movieCinemas')
const Show = require('../../models/shows')
const { respond } = require('../../../helper')
const { ROLE, RESPONSE } = require('../../../config')

async function showAdd ( req, res ) {
    if (req.role_id !== ROLE.ADMIN && req.role_id !== ROLE.EMPLOYEE) {
        return respond.err(res , RESPONSE.USER_ACCESS)
    }

    const movieCinemas = await MovieCinema.findOne({ where: { movie_cinema_id: req.body.movie_cinema_id } })
    if (!movieCinemas) {
        return respond.err(res , RESPONSE.INVALID_ID)
    }

    const screen = await Screen.findOne({ where: { screen_id: req.body.screen_id } })
    if (!screen) {
        return respond.err(res , RESPONSE.INVALID_ID)
    }

    try {
        const show = await Show.create({
            movie_cinema_id: movieCinemas.movie_cinema_id ,
            screen_id: screen.screen_id ,
            start_time: req.body.start_time ,
            show_date: req.body.show_date
        })
        return respond.ok(res , show)
    } catch (error) {
        return respond.err(res , RESPONSE.INVALID)
    }
}

module.exports = showAdd