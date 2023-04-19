const { Op } = require('sequelize')
const Cinema = require('../../models/cinemas')
const { respond } = require('../../../helper')
const { ROLE, RESPONSE } = require('../../../config')

async function cinemaEdit ( req, res ) {
    if (req.role_id !== ROLE.ADMIN) {
        return respond.err(res , RESPONSE.USER_ACCESS)
    }

    const isExist = await Cinema.findOne({
        where: { cinema_id: req.body.cinema_id }
    })

    if(!isExist) {
        return respond.err(res , RESPONSE.CINEMA_NOT_FOUND)
    }

    try {
        await Cinema.update({
            name: req.body.name || isExist.name,
            city: req.body.city || isExist.city,
            state: req.body.state || isExist.state,
            zip_code: req.body.zip_code || isExist.zip_code
        }, {
          where: { cinema_id: req.body.cinema_id }
        })
    } catch (error) {
        return respond.err(res , RESPONSE.INVALID)
    }

    const cinema = await Cinema.findOne({
        where: { cinema_id: req.body.cinema_id }
    })

    return respond.ok(res , cinema)
}

module.exports = cinemaEdit