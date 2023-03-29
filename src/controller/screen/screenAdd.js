const { Op } = require('sequelize')
const Screen = require('../../models/screens')
const Cinema = require('../../models/cinemas')
const { respond } = require('../../../helper')

async function screenAdd ( req, res ) {
    if (req.role_id !== 1 && req.role_id !== 2) {
        return respond.err(res , "Access not Provided!")
    }

    const cinema = await Cinema.findOne({ where: { cinema_id: req.body.cinema_id } })
    if (!cinema) {
        return respond.err(res , "Please Provide a Valid Cinema ID")
    }

    try {
        const screen = await Screen.create({
            name: req.body.name ,
            cinema_id: req.body.cinema_id 
        })
        return respond.ok(res , { screen_id: screen.screen_id , name: screen.name , cinema_id: screen.cinema_id , cinema_name: cinema.name })
    } catch (error) {
        return respond.err(res , "Invalid Credentials")
    }
}

module.exports = screenAdd