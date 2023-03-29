const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('MOVIE_TICKET_BOOKING', 'dishan', '1.gptjadmW', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize