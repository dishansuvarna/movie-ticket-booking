const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')

router.post("/" , auth , require("../controller/booking/booking"))
router.post("/list" , require("../controller/booking/bookingList"))

module.exports = router