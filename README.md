import { DataTypes, Model, Optional } from "sequelize";
//import sequelize from "../../infraestructure/database/connectionSQLServer.js";

interface DeviceAttributes {
  devId: number;
  devPLid: number;
  devPath: string;
  devName?: string;
  devFiscalName?: string;
  devEnabled: boolean;
  devUuid?: string;
}

// Para creación (devId es autoincremental)
interface DeviceCreationAttributes extends Optional<DeviceAttributes, "devId"> {}

class Device extends Model<DeviceAttributes, DeviceCreationAttributes>
  implements DeviceAttributes {
  public devId!: number;
  public devPLid!: number;
  public devPath!: string;
  public devName?: string;
  public devFiscalName?: string;
  public devEnabled!: boolean;
  public devUuid?: string;
}

Device.init({
  devId: {
    type: DataTypes.TINYINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  devPLid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  devPath: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  devName: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  devFiscalName: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  devEnabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  devUuid: {
    type: DataTypes.UUID,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: "Device",
  tableName: "Device",
  schema: "dbo",
  timestamps: false,
});

export default Device;
