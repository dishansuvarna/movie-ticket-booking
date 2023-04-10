const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const User = require('../../models/users')
const UserRole = require('../../models/userRoles')
const { respond } = require('../../../helper')
const { ROLE, RESPONSE } = require('../../../config')

async function userEdit ( req, res ) {
    let user_id

    if (req.role_id === ROLE.ADMIN) {
        if (!req.body.user_id) {
            user_id = req.user_id
        } else {
            user_id = req.body.user_id
        }
    } else {
        user_id = req.user_id
    }
    
    const isExist = await User.findOne({
        where: { user_id }
    })

    if(!isExist) {
        return respond.err(res , RESPONSE.USER_NOT_FOUND)
    }

    if (req.body.email) {
        try {
            await User.update({
                email: req.body.email
            } , {
                where: { user_id }
            })
        } catch (error) {
            return respond.err(res , RESPONSE.INVALID)
        }
    }

    if (req.body.name) {
        try {
            await User.update({
                name: req.body.name
            } , {
                where: { user_id }
            })
        } catch (error) {
            return respond.err(res , RESPONSE.INVALID)
        }
    }

    if (req.body.adhaar_no) {
        try {
            await User.update({
                adhaar_no: req.body.adhaar_no
            } , {
                where: { user_id }
            })
        } catch (error) {
            return respond.err(res , RESPONSE.INVALID)
        }
    }

    if (req.body.phone_no) {
        try {
            await User.update({
                phone_no: req.body.phone_no
            } , {
                where: { user_id }
            })
        } catch (error) {
            return respond.err(res , RESPONSE.INVALID)
        }
    }

    if (req.body.password) {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 8)
            await User.update({
                password: hashedPassword
            } , {
                where: { user_id }
            })
        } catch (error) {
            return respond.err(res , RESPONSE.INVALID)
        }
    }

    const user = await User.findOne({
        where: { user_id }
    })

    return respond.ok(res , { user_id: user.user_id , email: user.email , name: user.name , adhaar_no: user.adhaar_no , phone_no: user.phone_no })
}

module.exports = userEdit