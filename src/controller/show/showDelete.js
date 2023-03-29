const { Op } = require('sequelize')
const Show = require('../../models/shows')
const { respond } = require('../../../helper')

async function showDelete ( req, res ) {
    if (req.role_id !== 1 && req.role_id !== 2) {
        return respond.err(res , "Access not provided!")
    }

    try {
        const show = await Show.findOne({ where: { show_id: req.body.show_id } })
        await Show.destroy({ where: { show_id: show.show_id } })
        return respond.ok(res , { show_id: show.show_id })
    } catch (error) {
        return respond.err(res , "Cannot Delete Show")
    } 
}

module.exports = showDelete