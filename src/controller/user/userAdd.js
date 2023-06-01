const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const User = require('../../models/users')
const UserRole = require('../../models/userRoles')
const { respond } = require('../../../helper')
const { ROLE, RESPONSE, SALT_LENGTH } = require('../../../config')

async function userAdd ( req, res ) {
    if (req.role_id !== ROLE.ADMIN) {
        return respond.err(res , RESPONSE.USER_ACCESS)
    }
    
    const isExist = await User.findOne({
        where: {
            [Op.or] : [
                {email: req.body.email} , {adhaar_no: req.body.adhaar_no} , {phone_no: req.body.phone_no}
            ]
        }
    })
    if(isExist) {
        return respond.err(res , RESPONSE.USER_EXISTS)
    }

    const hashedPassword = await bcrypt.hash(req.body.password, SALT_LENGTH)

    try {
        const user = await User.create({
            email: req.body.email ,
            name: req.body.name ,
            adhaar_no: req.body.adhaar_no ,
            phone_no: req.body.phone_no ,
            password: hashedPassword
        })
        await UserRole.create({
            user_id: user.user_id ,
            role_id: req.body.role_id
        })
        return respond.ok(res , { user_id: user.user_id , email: user.email , name: user.name })
    } catch (error) {
        return respond.err(res , RESPONSE.INVALID)
    }
}

module.exports = userAdd