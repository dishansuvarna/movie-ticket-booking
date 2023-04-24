const SeatBooked = require('../../models/seatBooked')
const Show = require('../../models/shows')
const Seat = require('../../models/seats')
const Booking = require('../../models/bookings')
const { respond } = require('../../../helper')
const { RESPONSE } = require('../../../config')

async function bookingList (req , res) {
    try {
        const bookings = await Booking.findAll({ where: { show_id: req.params.show_id } })
        if (bookings.length === 0) {
            respond.err(res , RESPONSE.SHOW_NOT_FOUND)
        }
        return respond.ok(res , bookings)
    } catch (error) {
        return respond.err(res , RESPONSE.INVALID)
    }
}

module.exports = bookingList