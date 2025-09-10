import {DataTypes } from "sequelize";
import sequelize from '../../infraestructure/database/connectionSQLServer.js';

const User = sequelize.define('User', {
  usr_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  usr_name: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  usr_passwd: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  usr_last_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  usr_first_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'user',  // nombre exacto de la tabla
  timestamps: false   // no hay createdAt ni updatedAt
});

export default User;