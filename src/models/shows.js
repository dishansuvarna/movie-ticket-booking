const sequelize = require('../db/sequelize')
const { Sequelize , DataTypes } = require('sequelize')

const Show = sequelize.define('shows' , {
    show_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    } ,
    movie_cinema_id: {
        type: DataTypes.INTEGER,
        references: { model: "movie_cinemas" , key: "movie_cinema_id" },
        onDelete: 'CASCADE' ,
        onUpdate: 'CASCADE' ,
        allowNull: false
    } ,
    screen_id: {
        type: DataTypes.INTEGER,
        references: { model: "screens" , key: "screen_id" },
        onDelete: 'CASCADE' ,
        onUpdate: 'CASCADE' ,
        allowNull: false
    } ,
    start_time: {
        type: DataTypes.TIME,
        allowNull: false
    } ,
    status: {
        type: DataTypes.INTEGER,
        defaultValue: null
    }
} , {
    timestamps: true ,
    updatedAt: false ,
    createdAt: 'created_at',
})

// Show.sync({ force: true })
module.exports = Show