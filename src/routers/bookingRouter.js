const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')

router.post("/" , auth , require("../controller/booking/booking"))

module.exports = router