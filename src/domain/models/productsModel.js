import { DataTypes } from "sequelize";
import sequelize from '../../infraestructure/database/connectionSQLServer.js';

const Product = sequelize.define('products',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description:{
        type: DataTypes.STRING(255),
        allowNull: true
    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false,
        default:0
    }
},{
    tableName: 'products',
    timestamps: false
});

export default Product;