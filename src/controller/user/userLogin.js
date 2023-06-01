const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../models/users')
const UserRole = require('../../models/userRoles')
const { respond } = require('../../../helper')
const { RESPONSE, JWT_SECRET } = require('../../../config')

async function userLogin( req, res ) {
    try {
        const user = await User.findOne({ where:{ email: req.body.email }, attributes: ["user_id", "password", "status"]})
        if (!user) {
            respond.err(res , RESPONSE.USER_NOT_FOUND)
        }

        const userRole = await UserRole.findOne({ where: { user_id: user.user_id } })

        if (userRole.role_id === 1) {
            if (req.body.password !== user.password) {
                respond.err(res , RESPONSE.PASSWORD)
            }
        } else {
            if (!await bcrypt.compare(req.body.password, user.password)) {
                respond.err(res , RESPONSE.PASSWORD)
            }
        }

        const token = jwt.sign({ user_id: user.user_id , role_id: userRole.role_id } , JWT_SECRET)
        return respond.ok( res, {
            user_id: user.user_id , role_id: userRole.role_id , token
        })
    } catch (error) {
        return respond.err(res , RESPONSE.INVALID)
    }
}

module.exports = userLogin