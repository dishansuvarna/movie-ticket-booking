const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const User = require('../../models/users')
const UserRole = require('../../models/userRoles')
const { respond } = require('../../../helper')

async function userEdit ( req, res ) {
    if (req.role_id !== 1 && req.user_id !== req.body.user_id) {
        return respond.err(res , "Access not Provided!")
    }
    
    const isExist = await User.findOne({
        where: { user_id: req.body.user_id }
    })

    if(!isExist) {
        return respond.err(res , "User doesn't Exist!")
    }

    if (req.body.email !== undefined) {
        try {
            await User.update({
                email: req.body.email
            } , {
                where: { user_id: req.body.user_id }
            })
        } catch (error) {
            return respond.err(res , "Invalid Credentials")
        }
    }

    if (req.body.name !== undefined) {
        try {
            await User.update({
                name: req.body.name
            } , {
                where: { user_id: req.body.user_id }
            })
        } catch (error) {
            return respond.err(res , "Invalid Credentials")
        }
    }

    if (req.body.adhaar_no !== undefined) {
        try {
            await User.update({
                adhaar_no: req.body.adhaar_no
            } , {
                where: { user_id: req.body.user_id }
            })
        } catch (error) {
            return respond.err(res , "Invalid Credentials")
        }
    }

    if (req.body.phone_no !== undefined) {
        try {
            await User.update({
                phone_no: req.body.phone_no
            } , {
                where: { user_id: req.body.user_id }
            })
        } catch (error) {
            return respond.err(res , "Invalid Credentials")
        }
    }

    if (req.body.password !== undefined) {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 8)
            await User.update({
                password: hashedPassword
            } , {
                where: { user_id: req.body.user_id }
            })
        } catch (error) {
            return respond.err(res , "Invalid Credentials")
        }
    }

    const user = await User.findOne({
        where: { user_id: req.body.user_id }
    })

    return respond.ok(res , { user_id: user.user_id , email: user.email , name: user.name , adhaar_no: user.adhaar_no , phone_no: user.phone_no })
}

module.exports = userEdit