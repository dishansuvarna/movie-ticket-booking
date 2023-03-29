const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')

router.post("/login" , require("../controller/user/userLogin"))
router.post("/signup" , require("../controller/user/userSignup"))
router.post("/add" , auth , require("../controller/user/userAdd"))
router.get("/details" , auth , require("../controller/user/userDetails"))
router.patch("/edit" , auth , require('../controller/user/userEdit'))
router.delete("/delete" , auth , require('../controller/user/userDelete'))

module.exports = router