const { Op } = require('sequelize')
const Cinema = require('../../models/cinemas')
const { respond } = require('../../../helper')
const { ROLE, RESPONSE } = require('../../../config')

async function cinemaDelete ( req, res ) {
    if (req.role_id !== ROLE.ADMIN) {
        return respond.err(res , RESPONSE.USER_ACCESS)
    }

    try {
        const cinema = await Cinema.findOne({ where: { cinema_id: req.body.cinema_id } })
        await Cinema.destroy({ where: { cinema_id: cinema.cinema_id } })
        return respond.ok(res , { cinema_id: cinema.cinema_id })
    } catch (error) {
        return respond.err(res , RESPONSE.INVALID)
    } 
}

module.exports = cinemaDelete