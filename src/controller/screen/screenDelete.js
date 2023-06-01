const { Op } = require('sequelize')
const Screen = require('../../models/screens')
const { respond } = require('../../../helper')
const { ROLE, RESPONSE } = require('../../../config')

async function screenDelete ( req, res ) {
    if (req.role_id !== ROLE.ADMIN && req.role_id !== ROLE.EMPLOYEE) {
        return respond.err(res , RESPONSE.USER_ACCESS)
    }

    try {
        const screen = await Screen.findOne({ where: { screen_id: req.body.screen_id } })
        await Screen.destroy({ where: { screen_id: screen.screen_id } })
        return respond.ok(res , { screen_id: screen.screen_id })
    } catch (error) {
        return respond.err(res , RESPONSE.INVALID)
    } 
}

module.exports = screenDelete