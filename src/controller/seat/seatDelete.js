const { Op } = require('sequelize')
const Seat = require('../../models/seats')
const { respond } = require('../../../helper')
const { ROLE, RESPONSE } = require('../../../config')

async function seatDelete ( req, res ) {
    if (req.role_id !== ROLE.ADMIN && req.role_id !== ROLE.EMPLOYEE) {
        return respond.err(res , RESPONSE.USER_ACCESS)
    }

    try {
        const seat = await Seat.findOne({ where: { seat_id: req.body.seat_id } })
        await seat.destroy({ where: { seat_id: seat.seat_id } })
        return respond.ok(res , { seat_id: seat.seat_id })
    } catch (error) {
        return respond.err(res , RESPONSE.INVALID)
    } 
}

module.exports = seatDelete