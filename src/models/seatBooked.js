const sequelize = require('../db/sequelize')
const { Sequelize , DataTypes } = require('sequelize')

const SeatBooked = sequelize.define('seat_booked' , {
    seat_booked_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    } ,
    booking_id: {
        type: DataTypes.INTEGER,
        references: { model: "bookings" , key: "booking_id" },
        onDelete: 'CASCADE' ,
        onUpdate: 'CASCADE' ,
        allowNull: false
    } ,
    seat_id: {
        type: DataTypes.INTEGER,
        references: { model: "seats" , key: "seat_id" },
        onDelete: 'CASCADE' ,
        onUpdate: 'CASCADE' ,
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
    freezeTableName: true
})

// SeatBooked.sync({ force: true })
module.exports = SeatBooked