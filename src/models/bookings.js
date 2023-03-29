const sequelize = require('../db/sequelize')
const { Sequelize , DataTypes } = require('sequelize')

const Booking = sequelize.define('bookings' , {
    booking_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    } ,
    user_id: {
        type: DataTypes.INTEGER,
        references: { model: "users" , key: "user_id" },
        onDelete: 'CASCADE' ,
        onUpdate: 'CASCADE' ,
        allowNull: false
    } ,
    show_id: {
        type: DataTypes.INTEGER,
        references: { model: "shows" , key: "show_id" },
        onDelete: 'CASCADE' ,
        onUpdate: 'CASCADE' ,
        allowNull: false
    } ,
    total_price: {
        type: DataTypes.INTEGER,
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

// Booking.sync({ force: true })
module.exports = Booking