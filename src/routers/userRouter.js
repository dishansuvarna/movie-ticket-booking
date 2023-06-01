const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
const { validateUserLogin, validateUserSignup } = require('../middleware/userValidation')

router.post("/login" , validateUserLogin , require("../controller/user/userLogin"))
router.post("/signup" , validateUserSignup , require("../controller/user/userSignup"))
router.post("/add" , auth , validateUserSignup , require("../controller/user/userAdd"))
router.post("/details" , auth , require("../controller/user/userDetails"))
router.patch("/edit" , auth , validateUserSignup , require('../controller/user/userEdit'))
router.delete("/delete" , auth , require('../controller/user/userDelete'))

module.exports = router