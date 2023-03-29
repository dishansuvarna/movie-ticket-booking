const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../models/users')
const UserRole = require('../../models/userRoles')
const { respond } = require('../../../helper')

async function userLogin( req, res ) {
    try {
        const user = await User.findOne({ where:{ email: req.body.email }, attributes: ["user_id", "password", "status"]})
        if (!user) {
            respond.err(res , 'Email not found!')
        }

        const userRole = await UserRole.findOne({ where: { user_id: user.user_id } })

        if (userRole.role_id === 1) {
            if (req.body.password !== user.password) {
                respond.err(res , 'Incorrect Password')
            }
        } else {
            if (!await bcrypt.compare(req.body.password, user.password)) {
                respond.err(res , 'Incorrect Password')
            }
        }

        const token = jwt.sign({ user_id: user.user_id , role_id: userRole.role_id } , process.env.JWT_SECRET)
        return respond.ok( res, {
            user_id: user.user_id , role_id: userRole.role_id , token
        })
    } catch (error) {
        return respond.err(res , error)
    }
}

module.exports = userLogin