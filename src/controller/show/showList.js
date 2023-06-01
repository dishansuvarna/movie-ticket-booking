const { Op } = require('sequelize')
const sequelize = require('../../db/sequelize');
const Show = require('../../models/shows')
const Screen = require('../../models/screens')
const { respond } = require('../../../helper')
const { RESPONSE } = require('../../../config')

async function showList ( req, res ) {
    try {
        if (req.body.show_id) {
            const show = await Show.findOne({ where: { show_id: req.body.show_id } , attributes: ["show_id" , "movie_cinema_id" , "screen_id" , "show_date" , [sequelize.fn('date_format', sequelize.literal('start_time'), '%H:%i'), 'start_time']] })
            if (show.length === 0) {
                return respond.err(res , RESPONSE.SHOW_NOT_FOUND)
            }
            const screen = await Screen.findOne({ where: { screen_id: show.screen_id } })
            return respond.ok(res , { show , screen })
        }

        if (req.body.movie_cinema_id) {
            const show = await Show.findAll({ where: { movie_cinema_id: req.body.movie_cinema_id } , attributes: ["show_id" , "movie_cinema_id" , "screen_id" , "show_date" , [sequelize.fn('date_format', sequelize.literal('start_time'), '%H:%i'), 'start_time']] })
            if (show.length === 0) {
                return respond.err(res , RESPONSE.SHOW_NOT_FOUND)
            }
            const screen = await Screen.findOne({ where: { screen_id: show[0].screen_id } })
            return respond.ok(res , { show: show , screen })
        }
        
        const show = await Show.findAll()
        if (show.length === 0) {
            return respond.err(res , RESPONSE.SHOW_NOT_FOUND)
        }
        return respond.ok(res , show)
    } catch (error) {
        console.log(error)
        respond.err(res , RESPONSE.INVALID)
    }
}
module.exports = showList