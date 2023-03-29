const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')

router.post("/add" , auth , require("../controller/movie/movieAdd"))
router.get("/list" , require("../controller/movie/movieList"))
router.patch("/edit" , auth , require("../controller/movie/movieEdit"))
router.delete("/delete" , auth , require("../controller/movie/movieDelete"))

module.exports = router