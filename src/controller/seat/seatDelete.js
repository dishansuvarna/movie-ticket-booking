const { Op } = require('sequelize')
const Seat = require('../../models/seats')
const { respond } = require('../../../helper')

async function seatDelete ( req, res ) {
    if (req.role_id !== 1 && req.role_id !== 2) {
        return respond.err(res , "Access not provided!")
    }

    try {
        const seat = await Seat.findOne({ where: { seat_id: req.body.seat_id } })
        await seat.destroy({ where: { seat_id: seat.seat_id } })
        return respond.ok(res , { seat_id: seat.seat_id })
    } catch (error) {
        return respond.err(res , "Cannot Delete Seat")
    } 
}

module.exports = seatDelete