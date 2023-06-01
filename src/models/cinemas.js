const sequelize = require('../db/sequelize')
const { Sequelize , DataTypes } = require('sequelize')

const Cinema = sequelize.define('cinemas' , {
    cinema_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    } ,
    name: {
        type: DataTypes.STRING,
        allowNull: false
    } ,
    city: {
        type: DataTypes.STRING,
        allowNull: false
    } ,
    state: {
        type: DataTypes.STRING,
        allowNull: false
    } ,
    zip_code: {
        type: DataTypes.STRING,
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

// Cinema.sync({ force: true })
module.exports = Cinema