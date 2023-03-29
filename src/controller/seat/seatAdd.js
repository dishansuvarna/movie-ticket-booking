const { Op } = require('sequelize')
const Screen = require('../../models/screens')
const Seat = require('../../models/seats')
const { respond } = require('../../../helper')

async function seatAdd ( req, res ) {
    if (req.role_id !== 1 && req.role_id !== 2) {
        return respond.err(res , "Access not Provided!")
    }

    const screen = await Screen.findOne({ where: { screen_id: req.body.screen_id } })
    if (!screen) {
        return respond.err(res , "Please Provide a Valid ID")
    }

    try {
        const seat = await Seat.create({
            seat_no: req.body.seat_no ,
            seat_type: req.body.seat_type ,
            screen_id: screen.screen_id ,
            price: req.body.price
        })
        return respond.ok(res , seat)
    } catch (error) {
        return respond.err(res , "Invalid Credentials")
    }
}

module.exports = seatAdd