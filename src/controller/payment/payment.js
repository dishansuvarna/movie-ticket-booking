const Payment = require('../../models/payments')
const Booking = require('../../models/bookings')
const { respond } = require('../../../helper')
const { RESPONSE, CARD_LENGTH } = require('../../../config')

async function payment (req , res) {
    const booking = await Booking.findOne({ where: { user_id: req.user_id } , attributes: ["booking_id" , "show_id" , "total_price"] })

    if (req.body.card_number === undefined) {
        return respond.err(res , RESPONSE.CARD_NO)
    }

    try {
        if (req.body.card_number.toString().length !== CARD_LENGTH) {
            return respond.err(res , RESPONSE.CARD_NO)
        }
    } catch (error) {
        respond.err(res , RESPONSE.CARD_NO)
    }

    try {
        const payment = await Payment.create({
            user_id: req.user_id ,
            amount: booking.total_price ,
            card_number: req.body.card_number ,
            booking_id: booking.booking_id
        })
        respond.ok(res , payment)
    } catch (error) {
        respond.err(res , RESPONSE.INVALID)
    }
}

module.exports = payment