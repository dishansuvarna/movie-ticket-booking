const User = require('./models/users')
const Role = require('./models/roles')
const UserRole = require('./models/userRoles')
const Movie = require('./models/movies')
const Cinema = require('./models/cinemas')
const MovieCinema = require('./models/movieCinemas')
const Screen = require('./models/screens')
const Seat = require('./models/seats')
const Show = require('./models/shows')
const Booking = require('./models/bookings')
const SeatBooked = require('./models/seatBooked')
const Payment = require('./models/payments')

models = [User,Role,UserRole,Movie,Cinema,MovieCinema,Screen,Seat,Show,Booking,SeatBooked,Payment]

models.forEach((model) => {
    model.sync({ alter: true })
})

// const path = require('path')
// const fs = require('fs')

// const directoryPath = path.join(__dirname , './models')
// fs.readdir(directoryPath , (err , files) => {
//     if (err) {
//         return console.log('Unable to scan directory: ' + err)
//     }

//     files.forEach((file) => {
//         const model = require(`./models/${file}`)
//         model.sync({ alert: true })
//     })
// })