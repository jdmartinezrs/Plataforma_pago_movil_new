/**
 * Modelo Sequelize para la tabla 'Session'.
 * 
 * Esta tabla almacena la información de las sesiones de caja/turno.
 * 
 * Restricciones:
 * - PK: sesId
 * - FK: Referenciada por TransactionData (FK_TransactionData_Session)
 */

import { DataTypes } from "sequelize";
import sequelize from '../../infraestructure/database/connectionSQLServer.js';
import TransactionData from "./transactionDataModel.js"; // ✅ Importar modelo relacionado

/**
 * Definición del modelo Session.
 * 
 * @constant
 * @type {Model}
 */
const Session = sequelize.define(
  "Session",
  {
    sesId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true, // Identity
    },
    fisId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sesCashierName: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    sesCashierId: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    sesShiftId: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    InvoiceFrom: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    InvoiceUntil: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    DateFrom: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    DateUntil: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    sessName: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    tableName: "Session",
    schema: "dbo",
    timestamps: false,
    indexes: [
      {
        name: "PK_Session",
        unique: true,
        fields: ["sesId"],
      },
    ],
  }
);

/**
 * Relaciones con TransactionData:
 * - Una Session tiene muchas TransactionData (1:N).
 * - Cada TransactionData pertenece a una Session.
 */
Session.hasMany(TransactionData, {
  foreignKey: "sesId",   // FK en TransactionData
  sourceKey: "sesId",    // PK en Session
  as: "transactions",    // Alias para acceder a las transacciones
});

TransactionData.belongsTo(Session, {
  foreignKey: "sesId",   // FK en TransactionData
  targetKey: "sesId",    // PK en Session
  as: "session",         // Alias para acceder a la sesión
});

export default Session;
