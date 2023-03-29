const sequelize = require('../db/sequelize')
const { Sequelize , DataTypes } = require('sequelize')

const Payment = sequelize.define('payments' , {
    payments_id: {
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
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    } ,
    card_number: {
        type: DataTypes.BIGINT,
        allowNull: false
    } ,
    booking_id: {
        type: DataTypes.INTEGER,
        references: { model: "bookings" , key: "booking_id" },
        onDelete: 'CASCADE' ,
        onUpdate: 'CASCADE' ,
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

// Payment.sync({ force: true })
module.exports = Payment