const express = require('express')
const router = express.Router();
const Cinema = require('../models/cinemas')
const Movie = require('../models/movies')
const MovieCinema = require('../models/movieCinemas')
const auth = require('../middleware/auth')
const { respond } = require('../../helper')

router.post("/add" , auth , require("../controller/cinema/cinemaAdd"))
router.get("/list" , require("../controller/cinema/cinemaList"))
router.patch("/edit" , auth , require("../controller/cinema/cinemaEdit"))
router.delete("/delete" , auth , require("../controller/cinema/cinemaDelete"))

router.post("/movie/add" , auth , async (req , res) => {
    if (req.role_id !== 1 && req.role_id !== 2) {
        return respond.err(res , "Access not Provided!")
    }

    const cinema = await Cinema.findOne({ where: { cinema_id: req.body.cinema_id } })
    if (!cinema) {
        return respond.err(res , "Cinema doesn't Exist!")
    }

    const movie = await Movie.findOne({ where: { movie_id: req.body.movie_id } })
    if (!movie) {
        return respond.err(res , "Movie doesn't Exist!")
    }

    try {
        if (req.body.release_date === undefined) {
            const movieCinema = await MovieCinema.create({
                cinema_id: cinema.cinema_id ,
                movie_id: movie.movie_id ,
                release_date: movie.release_date ,
                advance_booking_days: req.body.days
            })
            return respond.ok(res , { movie_cinema_id: movieCinema.movie_cinema_id , movie_id: movieCinema.movie_id , cinema_id: movieCinema.cinema_id })
        }

        const movieCinema = await MovieCinema.create({
            cinema_id: cinema.cinema_id ,
            movie_id: movie.movie_id ,
            release_date: req.body.release_date ,
            advance_booking_days: req.body.days
        })
        return respond.ok(res , { movie_cinema_id: movieCinema.movie_cinema_id , movie_id: movieCinema.movie_id , cinema_id: movieCinema.cinema_id })
    } catch (error) {
        return respond.err(res , "Invalid Credentials!")
    }
})

router.post("/screen/add" , auth , require("../controller/screen/screenAdd"))
router.patch("/screen/edit" , auth , require("../controller/screen/screenEdit"))
router.delete("/screen/delete" , auth , require("../controller/screen/screenDelete"))

router.post("/show/add" , auth , require("../controller/show/showAdd"))
router.get("/show/list" , require("../controller/show/showList"))
router.patch("/show/edit" , auth , require("../controller/show/showEdit"))
router.delete("/show/delete" , auth , require("../controller/show/showDelete"))

router.post("/seat/add" , auth , require("../controller/seat/seatAdd"))
router.get("/seat/list" , require("../controller/seat/seatList"))
router.patch("/seat/edit" , auth , require("../controller/seat/seatEdit"))
router.delete("/seat/delete" , auth , require("../controller/seat/seatDelete"))

module.exports = router