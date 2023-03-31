const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const User = require('../../models/users')
const { respond } = require('../../../helper')
const { ROLE, RESPONSE } = require('../../../config')

async function userDetails ( req, res ) {
    try {
        if (req.role_id === ROLE.ADMIN || req.user_id === req.body.user_id) {
            if (req.body.user_id) {
                const user = await User.findOne({ where: { user_id: req.body.user_id } , attributes: ["user_id" , "name" , "adhaar_no" , "phone_no"] })
                if (!user) {
                    return respond.err(res , RESPONSE.USER_NOT_FOUND)
                }
                return respond.ok(res , user)
            }
    
            const user = await User.findAll({ attributes: ["user_id" , "name" , "adhaar_no" , "phone_no"] })
            return respond.ok(res , user)
        }

        if (req.body.user_id) {
            if (req.user_id !== req.body.user_id) {
                return respond.err(res , RESPONSE.USER_ACCESS)
            }
        }
    
        const user = await User.findOne({ where: { user_id: req.user_id } , attributes: ["user_id" , "name" , "adhaar_no" , "phone_no"] })
        return respond.ok(res , user)
    } catch (error) {
        return respond.err(res , RESPONSE.INVALID)
    } 
}

module.exports = userDetails