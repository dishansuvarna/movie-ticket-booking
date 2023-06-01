const express = require('express')
const router = express.Router();

router.use( "/user" , require("./userRouter") )
router.use( "/movie" , require("./movieRouter") )
router.use( "/cinema" , require("./cinemaRouter") )
router.use( "/booking" , require("./bookingRouter") )
router.use( "/payment" , require("./paymentRouter") )

module.exports = router;