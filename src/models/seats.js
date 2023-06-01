const sequelize = require('../db/sequelize')
const { Sequelize , DataTypes } = require('sequelize')

const Seat = sequelize.define('seats' , {
    seat_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    } ,
    seat_no: {
        type: DataTypes.STRING,
        allowNull: false
    } ,
    seat_type: {
        type: DataTypes.INTEGER,
        allowNull: false
    } ,
    screen_id: {
        type: DataTypes.INTEGER,
        references: { model: "screens" , key: "screen_id" },
        onDelete: 'CASCADE' ,
        onUpdate: 'CASCADE' ,
        allowNull: false
    } ,
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
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

// Seat.sync({ force: true })
module.exports = Seat