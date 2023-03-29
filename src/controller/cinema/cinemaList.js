const { Op } = require('sequelize')
const Cinema = require('../../models/cinemas')
const { respond } = require('../../../helper')

async function cinemaList ( req, res ) {
    if (req.body.name) {
        const cinema = await Cinema.findAll({ where: { name: req.body.name } })
        if (cinema.length === 0) {
            return respond.err(res , "Cinema Not Found!")
        }
        return respond.ok(res , cinema)
    }
    
    try {
        const cinema = await Cinema.findAll()
        if (cinema.length === 0) {
            return respond.err(res , "No Cinema Found!")
        }
        return respond.ok(res , cinema)
    } catch (error) {
        return respond.err(res , "Invalid Credentials")
    }
}

module.exports = cinemaList