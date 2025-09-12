/**
 * Modelo Sequelize para la tabla 'Device'.
 *
 * Esta tabla almacena los dispositivos físicos asociados
 * a puntos de venta o terminales de facturación.
 *
 * Estructura de la tabla en SQL Server:
 * - devId        (tinyint, PK, Identity, NOT NULL)
 * - devPLid      (int, NOT NULL)
 * - devPath      (varchar(100), NOT NULL)
 * - devName      (varchar(15), NULL)
 * - devFiscalName(varchar(15), NULL)
 * - devEnabled   (bit, NOT NULL, DEFAULT 1)
 * - devUuid      (uniqueidentifier, NULL)
 *
 * Restricciones:
 * - PK: devId
 * - Referenciada por: FiscalConfig (FK_FiscalConfig_Device)
 */

import { DataTypes } from "sequelize";
import sequelize from "../../infraestructure/database/connectionSQLServer.js";
import FiscalConfig from "./fiscalConfigModel.js";
// Model definition
const Device = sequelize.define(
  "Device",
  {
    /**
     * Identificador único del dispositivo.
     * - Clave primaria (PK)
     * - Identity (auto-increment)
     * - NOT NULL
     */
    devId: {
      type: DataTypes.TINYINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    /**
     * Identificador del punto de venta o entidad relacionada.
     * - int, NOT NULL
     */
    devPLid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    /**
     * Ruta o path del dispositivo.
     * - varchar(100), NOT NULL
     */
    devPath: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    /**
     * Nombre del dispositivo.
     * - varchar(15), NULL permitido
     */
    devName: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },

    /**
     * Nombre fiscal del dispositivo.
     * - varchar(15), NULL permitido
     */
    devFiscalName: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },

    /**
     * Estado del dispositivo.
     * - bit, NOT NULL
     * - DEFAULT 1
     */
    devEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    /**
     * UUID del dispositivo.
     * - uniqueidentifier, NULL permitido
     */
    devUuid: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    tableName: "Device",
    schema: "dbo",
    timestamps: false,
  }
);

export default Device;

/**
 * Relaciones:
 *
 * Un Device puede tener muchas configuraciones fiscales (FiscalConfig)
 * Cada FiscalConfig pertenece a un único Device
 */
import FiscalConfig from "./fiscalConfigModel.js";
import TransactionData from "./transactionDataModel.js";

// Relaciones
Device.hasMany(FiscalConfig, { foreignKey: "devId", as: "fiscalConfigs" });
FiscalConfig.belongsTo(Device, { foreignKey: "devId", as: "device" });

// Relaciones indirectas: un Device puede acceder a las transacciones
// a través de FiscalConfig
FiscalConfig.hasMany(TransactionData, { foreignKey: "fisId", as: "transactions" });
TransactionData.belongsTo(FiscalConfig, { foreignKey: "fisId", as: "fiscalConfig" });
