const sequelize = require('../db/sequelize')
const { Sequelize , DataTypes } = require('sequelize')

const MovieCinema = sequelize.define('movie_cinemas' , {
    movie_cinema_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    } ,
    cinema_id: {
        type: DataTypes.INTEGER,
        references: { model: "cinemas" , key: "cinema_id" },
        onDelete: 'CASCADE' ,
        onUpdate: 'CASCADE' ,
        allowNull: false
    } ,
    movie_id: {
        type: DataTypes.INTEGER,
        references: { model: "movies" , key: "movie_id" },
        onDelete: 'CASCADE' ,
        onUpdate: 'CASCADE' ,
        allowNull: false
    } ,
    release_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    } ,
    advance_booking_days: {
        type: DataTypes.INTEGER,
        allowNull: true
    } ,
    status: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
} , {
    timestamps: true ,
    updatedAt: false ,
    createdAt: 'created_at',
})

// MovieCinema.sync({ alter: true })
module.exports = MovieCinema