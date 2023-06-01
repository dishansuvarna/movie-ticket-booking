const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const User = require('../../models/users')
const UserRole = require('../../models/userRoles')
const { respond } = require('../../../helper')
const { ROLE, RESPONSE } = require('../../../config')

async function userDelete ( req, res ) {
    try {
        let user_id

        if (req.role_id === ROLE.ADMIN) {
            if (!req.body.user_id) {
                return respond.err(res , RESPONSE.INVALID_ID)
            }
            user_id = req.body.user_id
        } else {
            user_id = req.user_id
        }
    
        await User.destroy({ where: { user_id } })
        return respond.ok(res , { user_id })
    } catch (error) {
        return respond.err(res , RESPONSE.INVALID)
    } 
}

// async function userDelete ( req, res ) {
//     if (req.role_id !== 1 && req.user_id !== req.body.user_id) {
//         return respond.err(res , "Access not Provided!")
//     }
    
//     const isExist = await User.findOne({
//         where: { user_id: req.body.user_id }
//     })

//     if(!isExist) {
//         return respond.err(res , "User doesn't Exist!")
//     }

//     return respond.ok(res , { user_id: user.user_id })
// }

module.exports = userDelete