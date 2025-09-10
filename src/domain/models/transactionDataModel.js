import { DataTypes } from 'sequelize';
import sequelize from '../../infraestructure/database/connectionSQLServer.js';
import Customer from './Customer.js';
import FiscalConfig from './FiscalConfig.js';
import Session from './Session.js';

/**
 * Modelo TransactionData
 * 
 * Tabla creada en: 2023-11-02 12:55:16
 * Owner: dbo
 * Ubicación: PRIMARY filegroup
 * 
 * Clave primaria:
 *   - traId (int, autoincrement)
 * 
 * Claves foráneas:
 *   - cusId → Customer.cusId
 *   - fisId → FiscalConfig.fisId
 *   - sesId → Session.sesId
 * 
 * Índices:
 *   - PK_TransactionData (clustered, unique, primary key en traId)
 * 
 * Restricciones:
 *   - DEFAULT traIsTransmited = 0
 *   - DEFAULT traSaveTime = getdate()
 * 
 * Relacionada por FK desde:
 *   - Item, Payment, TransactionCredit, TransactionDataDiscount, TransmitionLog
 */
const TransactionData = sequelize.define('TransactionData', {
  /**
   * Identificador único de la transacción
   * PK, autoincremental
   */
  traId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },

  /**
   * Identificador de referencia externa
   * varchar(50), permite nulos
   */
  traReferenceId: {
    type: DataTypes.STRING(50),
    allowNull: true
  },

  /**
   * Indica si es duplicado
   * bit → BOOLEAN
   */
  traIsDuplicate: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },

  /**
   * Marca de tiempo de la transacción
   */
  traTimestamp: {
    type: DataTypes.DATE,
    allowNull: true
  },

  /**
   * Número de factura de la transacción
   * varchar(50)
   */
  traInvoiceNumber: {
    type: DataTypes.STRING(50),
    allowNull: true
  },

  /**
   * FK hacia Customer (cusId)
   */
  cusId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },

  /**
   * Número de identificación tributaria
   */
  traNIT: {
    type: DataTypes.STRING(20),
    allowNull: true
  },

  /**
   * Razón social
   */
  traFiscalName: {
    type: DataTypes.STRING(100),
    allowNull: true
  },

  /**
   * Teléfono del cliente
   */
  traTelephone: {
    type: DataTypes.STRING(30),
    allowNull: true
  },

  /**
   * Dirección del cliente
   */
  traAddress: {
    type: DataTypes.STRING(200),
    allowNull: true
  },

  /**
   * Nombre del operador
   */
  traOperator: {
    type: DataTypes.STRING(200),
    allowNull: true
  },

  /**
   * Número de factura (bigint en SQL Server)
   */
  traNroFactura: {
    type: DataTypes.BIGINT,
    allowNull: true
  },

  /**
   * FK hacia FiscalConfig (fisId)
   */
  fisId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },

  /**
   * FK hacia Session (sesId)
   * NOT NULL
   */
  sesId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  /**
   * Indica si fue transmitido
   * DEFAULT 0
   */
  traIsTransmited: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },

  /**
   * Indica si fue cancelado
   */
  traCanceled: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },

  /**
   * Fecha de guardado en BD
   * DEFAULT getdate()
   */
  traSaveTime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },

  /**
   * Código CUFE
   */
  traCufe: {
    type: DataTypes.STRING(200),
    allowNull: true
  },

  /**
   * Fecha de atención
   */
  traAtteDate: {
    type: DataTypes.DATE,
    allowNull: true
  },

  /**
   * Ruta o referencia del PDF externo
   */
  traExternalPdf: {
    type: DataTypes.STRING(400),
    allowNull: true
  }
}, {
  tableName: 'TransactionData',
  timestamps: false
});

// Relaciones definidas dentro del mismo modelo
TransactionData.belongsTo(Customer, { foreignKey: 'cusId' });
TransactionData.belongsTo(FiscalConfig, { foreignKey: 'fisId' });
TransactionData.belongsTo(Session, { foreignKey: 'sesId' });
TransactionData.hasMany(Payment, { foreignKey: 'traId' });//
TransactionData.hasMany(Item, { foreignKey: 'traId' });


Customer.hasMany(TransactionData, { foreignKey: 'cusId' });
FiscalConfig.hasMany(TransactionData, { foreignKey: 'fisId' });
Session.hasMany(TransactionData, { foreignKey: 'sesId' });



Payment.belongsTo(TransactionData, { foreignKey: 'traId' });///

export default TransactionData;