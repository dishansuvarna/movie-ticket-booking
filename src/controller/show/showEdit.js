const { Op } = require('sequelize')
const Show = require('../../models/shows')
const MovieCinema = require('../../models/movieCinemas')
const Screen = require('../../models/screens')
const { respond } = require('../../../helper')

async function showEdit ( req, res ) {
    if (req.role_id !== 1 && req.role_id !== 2) {
        return respond.err(res , "Access not Provided!")
    }
    
    const isExist = await Show.findOne({
        where: { show_id: req.body.show_id }
    })

    if(!isExist) {
        return respond.err(res , "Show doesn't Exist!")
    }

    if (req.body.movie_cinema_id !== undefined) {
        const movieCinema = await MovieCinema.findOne({ where: { movie_cinema_id: req.body.movie_cinema_id } })
        if (!movieCinema) {
            return respond.err(res , "Provide a Valid ID")
        }
        try {
            await Show.update({
                movie_cinema_id: movieCinema.movie_cinema_id
            } , {
                where: { show_id: req.body.show_id }
            })
        } catch (error) {
            return respond.err(res , "Invalid Credentials")
        }
    }

    if (req.body.screen_id !== undefined) {
        const screen = await Screen.findOne({ where: { screen_id: req.body.screen_id } })
        if (!screen) {
            return respond.err(res , "Provide a Valid ID")
        }
        try {
            await Show.update({
                screen_id: screen.screen_id
            } , {
                where: { show_id: req.body.show_id }
            })
        } catch (error) {
            return respond.err(res , "Invalid Credentials")
        }
    }

    if (req.body.start_time !== undefined) {
        try {
            await Show.update({
                start_time: req.body.start_time
            } , {
                where: { show_id: req.body.show_id }
            })
        } catch (error) {
            return respond.err(res , "Invalid Credentials")
        }
    }

    const show = await Show.findOne({
        where: { show_id: req.body.show_id }
    })

    return respond.ok(res , show)
}

module.exports = showEdit