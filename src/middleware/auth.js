const jwt = require('jsonwebtoken')

const auth = async (req , res , next) => {
    try {
        const token = req.header('token')
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        
        req.token = token
        req.user_id = decoded.user_id
        req.role_id = decoded.role_id

        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth