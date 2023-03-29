const sequelize = require('../db/sequelize')
const { Sequelize , DataTypes } = require('sequelize')

const Screen = sequelize.define('screens' , {
    screen_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    } ,
    name: {
        type: DataTypes.STRING,
        allowNull: false
    } ,
    cinema_id: {
        type: DataTypes.INTEGER,
        references: { model: "cinemas" , key: "cinema_id" },
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
})

// Screen.sync({ force: true })
module.exports = Screen