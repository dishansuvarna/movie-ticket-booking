const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')

router.post("/" , auth , require("../controller/booking/booking"))
router.post("/list/:show_id" , require("../controller/booking/bookingList"))

module.exports = router