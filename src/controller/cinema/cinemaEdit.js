const { Op } = require('sequelize')
const Cinema = require('../../models/cinemas')
const { respond } = require('../../../helper')

async function cinemaEdit ( req, res ) {
    if (req.role_id !== 1) {
        return respond.err(res , "Access not Provided!")
    }
    
    const isExist = await Cinema.findOne({
        where: { cinema_id: req.body.cinema_id }
    })

    if(!isExist) {
        return respond.err(res , "Cinema doesn't Exist!")
    }

    if (req.body.name !== undefined) {
        try {
            await Cinema.update({
                name: req.body.name
            } , {
                where: { cinema_id: req.body.cinema_id }
            })
        } catch (error) {
            return respond.err(res , "Invalid Credentials")
        }
    }

    if (req.body.city !== undefined) {
        try {
            await Cinema.update({
                city: req.body.city
            } , {
                where: { cinema_id: req.body.cinema_id }
            })
        } catch (error) {
            return respond.err(res , "Invalid Credentials")
        }
    }

    if (req.body.state !== undefined) {
        try {
            await Cinema.update({
                state: req.body.state
            } , {
                where: { cinema_id: req.body.cinema_id }
            })
        } catch (error) {
            return respond.err(res , "Invalid Credentials")
        }
    }

    if (req.body.zip_code !== undefined) {
        try {
            await Cinema.update({
                zip_code: req.body.zip_code
            } , {
                where: { cinema_id: req.body.cinema_id }
            })
        } catch (error) {
            return respond.err(res , "Invalid Credentials")
        }
    }

    const cinema = await Cinema.findOne({
        where: { cinema_id: req.body.cinema_id }
    })

    return respond.ok(res , { cinema_id: cinema.cinema_id , name: cinema.name , city: cinema.city })
}

module.exports = cinemaEdit