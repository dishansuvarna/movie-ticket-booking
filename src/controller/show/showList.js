const { Op } = require('sequelize')
const Show = require('../../models/shows')
const { respond } = require('../../../helper')

async function showList ( req, res ) {
    try {
        if (req.body.show_id) {
            const show = await Show.findAll({ where: { show_id: req.body.show_id } })
            if (show.length === 0) {
                return respond.err(res , "Show Not Found!")
            }
            return respond.ok(res , show)
        }
        
        const show = await Show.findAll()
        if (show.length === 0) {
            return respond.err(res , "No Show Found!")
        }
        return respond.ok(res , show)
    } catch (error) {
        respond.err(res , error)
    }
}
module.exports = showList