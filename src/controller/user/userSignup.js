const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const User = require('../../models/users')
const UserRole = require('../../models/userRoles')
const { respond } = require('../../../helper')

async function userSignup ( req, res ) {
    const isExist = await User.findOne({
        where: {
            [Op.or] : [
                {email: req.body.email} , {adhaar_no: req.body.adhaar_no} , {phone_no: req.body.phone_no}
            ]
        }
    })
    if(isExist) {
        return res.status(400).send('User already exists.')
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 8)

    try {
        const user = await User.create({
            email: req.body.email ,
            name: req.body.name ,
            adhaar_no: req.body.adhaar_no ,
            phone_no: req.body.phone_no ,
            password: hashedPassword
        })
        const token = jwt.sign({ user_id: user.user_id , role_id: 3 } , process.env.JWT_SIGNUP)
        await UserRole.create({
            user_id: user.user_id ,
            role_id: 3
        })
        return respond.ok(res , { user_id: user.user_id , token })
    } catch (error) {
        respond.err(res , "Invalid Credentials")
    }
}

module.exports = userSignup