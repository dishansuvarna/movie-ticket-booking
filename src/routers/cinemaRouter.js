const express = require('express')
const router = express.Router();
const Cinema = require('../models/cinemas')
const Movie = require('../models/movies')
const MovieCinema = require('../models/movieCinemas')
const SeatBooked = require('../models/seatBooked')
const auth = require('../middleware/auth')
const { respond } = require('../../helper');
const { RESPONSE } = require('../../config');

router.post("/add" , auth , require("../controller/cinema/cinemaAdd"))
router.post("/list" , require("../controller/cinema/cinemaList"))
router.patch("/edit" , auth , require("../controller/cinema/cinemaEdit"))
router.delete("/delete" , auth , require("../controller/cinema/cinemaDelete"))

router.post("/movie/add" , auth , async (req , res) => {
    if (req.role_id !== 1 && req.role_id !== 2) {
        return respond.err(res , RESPONSE.USER_ACCESS)
    }

    const cinema = await Cinema.findOne({ where: { cinema_id: req.body.cinema_id } })
    if (!cinema) {
        return respond.err(res , RESPONSE.CINEMA_NOT_FOUND)
    }

    const movie = await Movie.findOne({ where: { movie_id: req.body.movie_id } })
    if (!movie) {
        return respond.err(res , RESPONSE.MOVIE_NOT_FOUND)
    }

    try {
        if (!req.body.release_date) {
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
        return respond.err(res , RESPONSE.INVALID)
    }
})

router.post("/movie/list" , async (req , res) => {
    try {
        const movieCinema = await MovieCinema.findAll({ where: { movie_id: req.body.movie_id } })
        if (!movieCinema) {
            return respond.err(res , RESPONSE.CINEMA_NOT_FOUND)
        }
        return respond.ok(res , movieCinema)
    } catch (error) {
        return respond.err(res , RESPONSE.INVALID)
    }
})

router.post("/screen/add" , auth , require("../controller/screen/screenAdd"))
router.patch("/screen/edit" , auth , require("../controller/screen/screenEdit"))
router.delete("/screen/delete" , auth , require("../controller/screen/screenDelete"))

router.post("/show/add" , auth , require("../controller/show/showAdd"))
router.post("/show/list" , require("../controller/show/showList"))
router.patch("/show/edit" , auth , require("../controller/show/showEdit"))
router.delete("/show/delete" , auth , require("../controller/show/showDelete"))

router.post("/seat/add" , auth , require("../controller/seat/seatAdd"))
router.post("/seat/list" , require("../controller/seat/seatList"))
router.patch("/seat/edit" , auth , require("../controller/seat/seatEdit"))
router.delete("/seat/delete" , auth , require("../controller/seat/seatDelete"))

router.post("/seatBook" , async (req , res) => {
    try {
        const seatBooked = await SeatBooked.findAll({ where: { seat_id: req.body.seat_id } })
        if (seatBooked.length === 0) {
            respond.err(res , RESPONSE.SEAT_NOT_FOUND)
        }
        respond.ok(res , seatBooked)
    } catch (error) {
        return respond.err(res , RESPONSE.INVALID)
    }
})

module.exports = router