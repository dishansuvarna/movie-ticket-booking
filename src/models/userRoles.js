const sequelize = require('../db/sequelize')
const { Sequelize , DataTypes } = require('sequelize')

const UserRole = sequelize.define('user_roles' , {
    user_role_id: {
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
    role_id: {
        type: DataTypes.INTEGER,
        references: { model: "roles" , key: "role_id" },
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

// UserRole.sync({ force: true })
module.exports = UserRole