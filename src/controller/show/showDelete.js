const { Op } = require('sequelize')
const Show = require('../../models/shows')
const { respond } = require('../../../helper')
const { ROLE, RESPONSE } = require('../../../config')

async function showDelete ( req, res ) {
    if (req.role_id !== ROLE.ADMIN && req.role_id !== ROLE.EMPLOYEE) {
        return respond.err(res , RESPONSE.USER_ACCESS)
    }

    try {
        const show = await Show.findOne({ where: { show_id: req.body.show_id } })
        await Show.destroy({ where: { show_id: show.show_id } })
        return respond.ok(res , { show_id: show.show_id })
    } catch (error) {
        return respond.err(res , RESPONSE.INVALID)
    } 
}

module.exports = showDelete