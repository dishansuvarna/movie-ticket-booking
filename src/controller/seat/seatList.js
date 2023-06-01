const { Op } = require('sequelize')
const SeatBooked = require('../../models/seatBooked')
const Booking = require('../../models/bookings')
const Seat = require('../../models/seats')
const Screen = require('../../models/screens')
const { respond } = require('../../../helper')
const { RESPONSE } = require('../../../config')

async function seatList ( req, res ) {
    try {
        if (req.body.screen_id) {
            const screen = await Screen.findOne({ where: { screen_id: req.body.screen_id } , attributes: ["screen_id" , "name"], raw: true})
            if (!screen) {
                return respond.err(res , RESPONSE.INVALID_ID)
            }

            const seats = await Seat.findAll({ where: { screen_id: screen.screen_id } , attributes: ["seat_id" , "seat_no" , "seat_type" , "price" , "status"], raw:true })
            if (seats.length === 0) {
                return respond.err(res , RESPONSE.SEAT_NOT_FOUND)
            }

            // await Seat.update({
            //     status: 0
            // } , {
            //     where: { screen_id: screen.screen_id }
            // })

            // if (req.body.show_id) {
            //     for (const seat of seats) {
            //         const seatBooked = await SeatBooked.findAll({ where: { seat_id: seat.seat_id } })
            //         if (seatBooked.length !== 0) {
            //             for (const seatBook of seatBooked) {
            //                 const bookings = await Booking.findAll({ where: { show_id: req.body.show_id } })
            //                 if (bookings.length !== 0) {
            //                     for (const booking of bookings) {
            //                         if (booking.booking_id === seatBook.booking_id) {
            //                             await Seat.update({
            //                                 status: 1
            //                             } , {
            //                                 where: { seat_id: seat.seat_id }
            //                             })
            //                         }
            //                     }
            //                 }
            //             }
            //         }
            //     }
            // }



            if (req.body.show_id) {
                const bookings = (await Booking.findAll({ where: { show_id: req.body.show_id } })).map( b=> b.booking_id)

                const seatBooked = (await SeatBooked.findAll({ where: { booking_id: { [Op.in]:bookings } } })).map( s => s.seat_id );
                
                seats.forEach( s => {
                    s.isBooked = seatBooked.includes( s.seat_id )
                })
            }
            // const seatAll = await Seat.findAll({ where: { screen_id: screen.screen_id } , attributes: ["seat_id" , "seat_no" , "seat_type" , "price" , "status"] })
            // if (seatAll.length === 0) {
            //     return respond.err(res , RESPONSE.SEAT_NOT_FOUND)
            // }

            return respond.ok(res , { screen , seat: seats })
        }
    } catch (error) {
        respond.err(res , RESPONSE.INVALID)
    }
}
module.exports = seatList