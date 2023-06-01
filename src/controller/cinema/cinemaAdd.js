const { Op } = require('sequelize')
const Cinema = require('../../models/cinemas')
const { respond } = require('../../../helper')
const { ROLE , RESPONSE } = require('../../../config')

async function cinemaAdd ( req, res ) {
    if (req.role_id !== ROLE.ADMIN) {
        return respond.err(res , RESPONSE.USER_ACCESS)
    }

    try {
        const cinema = await Cinema.create({
            name: req.body.name ,
            city: req.body.city ,
            state: req.body.state ,
            zip_code: req.body.zip_code 
        })
        return respond.ok(res , { cinema_id: cinema.cinema_id , name: cinema.name , city: cinema.city })
    } catch (error) {
        return respond.err(res , RESPONSE.INVALID)
    }
}

module.exports = cinemaAdd