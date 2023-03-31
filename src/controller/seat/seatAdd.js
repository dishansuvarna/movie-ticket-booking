const { Op } = require('sequelize')
const Screen = require('../../models/screens')
const Seat = require('../../models/seats')
const { respond } = require('../../../helper')
const { ROLE, RESPONSE } = require('../../../config')

async function seatAdd ( req, res ) {
    if (req.role_id !== ROLE.ADMIN && req.role_id !== ROLE.EMPLOYEE) {
        return respond.err(res , RESPONSE.USER_ACCESS)
    }

    const screen = await Screen.findOne({ where: { screen_id: req.body.screen_id } })
    if (!screen) {
        return respond.err(res , RESPONSE.INVALID_ID)
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
        return respond.err(res , RESPONSE.INVALID)
    }
}

module.exports = seatAdd