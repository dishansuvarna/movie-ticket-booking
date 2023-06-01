const SeatBooked = require('../../models/seatBooked')
const Show = require('../../models/shows')
const Seat = require('../../models/seats')
const Booking = require('../../models/bookings')
const { respond } = require('../../../helper')
const { RESPONSE } = require('../../../config')

async function booking (req , res) {
    const show = await Show.findOne({ where: { show_id: req.body.show_id } })
    if (!show) {
        return respond.err(res , RESPONSE.SHOW_NOT_FOUND)
    }

    let total_price = 0
    for (const seat_id of req.body.seat_id) {
        const seat = await Seat.findOne({ where: { seat_id } })
        if (!seat) {
            return respond.err(res , RESPONSE.SEAT_NOT_FOUND)
        }
        total_price = total_price + seat.price
    }

    try {
        const booking = await Booking.create({
            user_id: req.user_id ,
            show_id: show.show_id ,
            total_price
        })
        for (const seat_id of req.body.seat_id) {
            await SeatBooked.create({
                booking_id: booking.booking_id ,
                seat_id
            })
        }
        const seatBooked = await SeatBooked.findAll({ where: { booking_id: booking.booking_id } })
        return respond.ok(res , { booking , seatBooked })
    } catch (error) {
        return respond.err(res , RESPONSE.INVALID)
    }
}

module.exports = booking