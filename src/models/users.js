const sequelize = require('../db/sequelize')
const { Sequelize , DataTypes } = require('sequelize')

const User = sequelize.define('users' , {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    } ,
    name: {
        type: DataTypes.STRING,
        allowNull: false
    } ,
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        trim: true ,
        lowercase: true ,
        validate: {
            isEmail: true
        }
    } ,
    adhaar_no: {
        type: DataTypes.BIGINT ,
        unique: true ,
        allowNull: false ,
        validate: {
            isNumeric: true ,
            len: 12
        }
    } ,
    phone_no: {
        type: DataTypes.BIGINT,
        unique: true,
        validate: {
            isNumeric: true ,
            len: 10
        }
    } ,
    password: {
        type: DataTypes.STRING ,
        allowNull: false ,
        validate: {
            min: 8
        }
    } ,
    status: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
} , {
    initialAutoIncrement: 1000 ,
    timestamps: true ,
    updatedAt: false ,
    createdAt: 'created_at'
})

// User.sync({ force: true })
module.exports = User