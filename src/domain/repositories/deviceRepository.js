import Device from '../models/deviceModel.js';


class DeviceRepository {
  async findByUuid(devUuid) {
    return await Device.findOne({ 
      where: { 
        devUuid
       // devEnabled: true // Solo devices habilitados
      } 
    });
  }

  async findById(devId) {
    return await Device.findByPk(devId);
  }
}

export default new DeviceRepository();

