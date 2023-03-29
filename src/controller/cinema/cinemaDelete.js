const { Op } = require('sequelize')
const Cinema = require('../../models/cinemas')
const { respond } = require('../../../helper')

async function cinemaDelete ( req, res ) {
    if (req.role_id !== 1) {
        return respond.err(res , "Access not provided!")
    }

    try {
        const cinema = await Cinema.findOne({ where: { cinema_id: req.body.cinema_id } })
        await Cinema.destroy({ where: { cinema_id: cinema.cinema_id } })
        return respond.ok(res , { cinema_id: cinema.cinema_id })
    } catch (error) {
        return respond.err(res , "Cannot Delete Cinema")
    } 
}

module.exports = cinemaDelete