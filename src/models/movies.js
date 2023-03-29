const sequelize = require('../db/sequelize')
const { Sequelize , DataTypes } = require('sequelize')

const Movie = sequelize.define('movies' , {
    movie_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    } ,
    movie_name: {
        type: DataTypes.STRING,
        allowNull: false
    } ,
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    } ,
    genre: {
        type: DataTypes.STRING,
        allowNull: true
    } ,
    language: {
        type: DataTypes.STRING,
        allowNull: true
    } ,
    release_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    } ,
    country: {
        type: DataTypes.STRING,
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

// Movie.sync({ alter: true })
module.exports = Movie