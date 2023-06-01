const { Op } = require('sequelize')
const Seat = require('../../models/seats')
const Screen = require('../../models/screens')
const { respond } = require('../../../helper')
const { ROLE, RESPONSE } = require('../../../config')

async function seatEdit ( req, res ) {
    if (req.role_id !== ROLE.ADMIN && req.role_id !== ROLE.EMPLOYEE) {
        return respond.err(res , RESPONSE.USER_ACCESS)
    }
    
    const isExist = await Seat.findOne({
        where: { seat_id: req.body.seat_id }
    })

    if(!isExist) {
        return respond.err(res , RESPONSE.SEAT_NOT_FOUND)
    }

    if (req.body.screen_id) {
        const screen = await Screen.findOne({ where: { screen_id: req.body.screen_id } })
        if (!screen) {
            return respond.err(res , RESPONSE.INVALID_ID)
        }
        try {
            await Seat.update({
                screen_id: screen.screen_id
            } , {
                where: { seat_id: req.body.seat_id }
            })
        } catch (error) {
            return respond.err(res , RESPONSE.INVALID)
        }
    }

    if (req.body.seat_no) {
        try {
            await Seat.update({
                seat_no: req.body.seat_no
            } , {
                where: { seat_id: req.body.seat_id }
            })
        } catch (error) {
            return respond.err(res , RESPONSE.INVALID)
        }
    }

    if (req.body.seat_type) {
        try {
            await Seat.update({
                seat_type: req.body.seat_type
            } , {
                where: { seat_id: req.body.seat_id }
            })
        } catch (error) {
            return respond.err(res , RESPONSE.INVALID)
        }
    }

    if (req.body.price) {
        try {
            await Seat.update({
                price: req.body.price
            } , {
                where: { seat_id: req.body.seat_id }
            })
        } catch (error) {
            return respond.err(res , RESPONSE.INVALID)
        }
    }

    const seat = await Seat.findOne({
        where: { seat_id: req.body.seat_id }
    })

    return respond.ok(res , seat)
}

module.exports = seatEdit