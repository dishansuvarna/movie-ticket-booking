const sequelize = require('../db/sequelize')
const { Sequelize , DataTypes } = require('sequelize')

const Role = sequelize.define('roles' , {
    role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false
    } ,
    role_name: {
        type: DataTypes.STRING,
        unique: true,
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

// Role.sync({ force: true })
module.exports = Role