const { Op } = require('sequelize')
const Screen = require('../../models/screens')
const Cinema = require('../../models/cinemas')
const { respond } = require('../../../helper')

async function screenEdit ( req, res ) {
    if (req.role_id !== 1 && req.role_id !== 2) {
        return respond.err(res , "Access not Provided!")
    }
    
    const isExist = await Screen.findOne({
        where: { screen_id: req.body.screen_id }
    })

    if(!isExist) {
        return respond.err(res , "Screen doesn't Exist!")
    }

    if (req.body.cinema_id !== undefined) {
        const cinema = await Cinema.findOne({ where: { cinema_id: req.body.cinema_id } })
        if (!cinema) {
            return respond.err(res , "Provide a Valid Cinema ID")
        }
        try {
            await Screen.update({
                cinema_id: cinema.cinema_id
            } , {
                where: { screen_id: req.body.screen_id }
            })
        } catch (error) {
            return respond.err(res , "Invalid Credentials")
        }
    }

    if (req.body.name !== undefined) {
        try {
            await Screen.update({
                name: req.body.name
            } , {
                where: { screen_id: req.body.screen_id }
            })
        } catch (error) {
            return respond.err(res , "Invalid Credentials")
        }
    }

    const screen = await Screen.findOne({
        where: { screen_id: req.body.screen_id }
    })

    return respond.ok(res , { screen_id: screen.screen_id , name: screen.name , cinema_id: screen.cinema_id })
}

module.exports = screenEdit