const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const User = require('../../models/users')
const { respond } = require('../../../helper')

async function userDetails ( req, res ) {
    try {
        if (req.role_id === 1 || req.user_id === req.body.user_id) {
            if (req.body.user_id) {
                const user = await User.findOne({ where: { user_id: req.body.user_id } , attributes: ["user_id" , "name" , "adhaar_no" , "phone_no"] })
                if (!user) {
                    return respond.err(res , "User not found!")
                }
                return respond.ok(res , user)
            }
    
            const user = await User.findAll({ attributes: ["user_id" , "name" , "adhaar_no" , "phone_no"] })
            return respond.ok(res , user)
        }

        if (req.body.user_id) {
            if (req.user_id !== req.body.user_id) {
                return respond.err(res , "Access not provided!")
            }
        }
    
        const user = await User.findOne({ where: { user_id: req.user_id } , attributes: ["user_id" , "name" , "adhaar_no" , "phone_no"] })
        return respond.ok(res , user)
    } catch (error) {
        return respond.err(res , error)
    } 
}

module.exports = userDetails