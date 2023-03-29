const { Op } = require('sequelize')
const Seat = require('../../models/seats')
const Screen = require('../../models/screens')
const { respond } = require('../../../helper')

async function seatList ( req, res ) {
    try {
        if (req.body.screen_id !== undefined) {
            const screen = await Screen.findOne({ where: { screen_id: req.body.screen_id } , attributes: ["screen_id" , "name"]})
            if (!screen) {
                return respond.err(res , "Enter a Valid ID")
            }
            const seat = await Seat.findAll({ where: { screen_id: screen.screen_id } , attributes: ["seat_id" , "seat_no" , "seat_type" , "price"] })
            if (seat.length === 0) {
                return respond.err(res , "No Seats!")
            }
            return respond.ok(res , {screen , seat})
        }
    } catch (error) {
        respond.err(res , error)
    }
}
module.exports = seatList