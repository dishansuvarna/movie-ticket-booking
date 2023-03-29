const { Op } = require('sequelize')
const Screen = require('../../models/screens')
const { respond } = require('../../../helper')

async function screenDelete ( req, res ) {
    if (req.role_id !== 1 && req.role_id !== 2) {
        return respond.err(res , "Access not provided!")
    }

    try {
        const screen = await Screen.findOne({ where: { screen_id: req.body.screen_id } })
        await Screen.destroy({ where: { screen_id: screen.screen_id } })
        return respond.ok(res , { screen_id: screen.screen_id })
    } catch (error) {
        return respond.err(res , "Cannot Delete Movie")
    } 
}

module.exports = screenDelete