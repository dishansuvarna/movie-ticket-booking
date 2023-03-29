const { Op } = require('sequelize')
const Screen = require('../../models/screens')
const MovieCinema = require('../../models/movieCinemas')
const Show = require('../../models/shows')
const { respond } = require('../../../helper')

async function showAdd ( req, res ) {
    if (req.role_id !== 1 && req.role_id !== 2) {
        return respond.err(res , "Access not Provided!")
    }

    const movieCinemas = await MovieCinema.findOne({ where: { movie_cinema_id: req.body.mvcn_id } })
    if (!movieCinemas) {
        return respond.err(res , "Please Provide a Valid ID")
    }

    const screen = await Screen.findOne({ where: { screen_id: req.body.screen_id } })
    if (!screen) {
        return respond.err(res , "Please Provide a Valid Screen ID")
    }

    try {
        const show = await Show.create({
            movie_cinema_id: movieCinemas.movie_cinema_id ,
            screen_id: screen.screen_id ,
            start_time: req.body.start_time
        })
        return respond.ok(res , { show_id: show.show_id , movie_cinema_id: movieCinemas.movie_cinema_id , screen_id: screen.screen_id , start_time: show.start_time })
    } catch (error) {
        return respond.err(res , "Invalid Credentials")
    }
}

module.exports = showAdd