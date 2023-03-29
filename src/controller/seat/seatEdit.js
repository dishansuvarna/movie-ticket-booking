const { Op } = require('sequelize')
const Seat = require('../../models/seats')
const Screen = require('../../models/screens')
const { respond } = require('../../../helper')

async function seatEdit ( req, res ) {
    if (req.role_id !== 1 && req.role_id !== 2) {
        return respond.err(res , "Access not Provided!")
    }
    
    const isExist = await Seat.findOne({
        where: { seat_id: req.body.seat_id }
    })

    if(!isExist) {
        return respond.err(res , "Seat doesn't Exist!")
    }

    if (req.body.screen_id !== undefined) {
        const screen = await Screen.findOne({ where: { screen_id: req.body.screen_id } })
        if (!screen) {
            return respond.err(res , "Provide a Valid ID")
        }
        try {
            await Seat.update({
                screen_id: screen.screen_id
            } , {
                where: { seat_id: req.body.seat_id }
            })
        } catch (error) {
            return respond.err(res , "Invalid Credentials")
        }
    }

    if (req.body.seat_no !== undefined) {
        try {
            await Seat.update({
                seat_no: req.body.seat_no
            } , {
                where: { seat_id: req.body.seat_id }
            })
        } catch (error) {
            return respond.err(res , "Invalid Credentials")
        }
    }

    if (req.body.seat_type !== undefined) {
        try {
            await Seat.update({
                seat_type: req.body.seat_type
            } , {
                where: { seat_id: req.body.seat_id }
            })
        } catch (error) {
            return respond.err(res , "Invalid Credentials")
        }
    }

    if (req.body.price !== undefined) {
        try {
            await Seat.update({
                price: req.body.price
            } , {
                where: { seat_id: req.body.seat_id }
            })
        } catch (error) {
            return respond.err(res , "Invalid Credentials")
        }
    }

    const seat = await Seat.findOne({
        where: { seat_id: req.body.seat_id }
    })

    return respond.ok(res , seat)
}

module.exports = seatEdit