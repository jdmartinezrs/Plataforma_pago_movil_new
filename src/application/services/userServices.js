import bcrypt from 'bcrypt';
import userRepository from "../../domain/repositories/userRepository.js"
import deviceRepository from '../../domain/repositories/deviceRepository.js';
import fiscalConfigRepository from '../../domain/repositories/fiscalConfigRepository.js';
import sessionRepository from '../../domain/repositories/sessionRepository.js';
//import TransactionData from '../../domain/models/transactionDataModel.js';

class UserServices {

       async postNewUserRepository(data) {
    // 1. Verificar si el usuario ya existe
    const existingUser = await userRepository.findByUsername(data.usr_name);

    if (existingUser) {
      throw new Error("El usuario ya existe");
    }

    // 2. Hashear la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.usr_passwd, saltRounds);

    // 3. Preparar datos
    const newUserData = {
      ...data,
      usr_passwd: hashedPassword,
    };

    // 4. Guardar en la base de datos
    const createdUser = await userRepository.postNewUser(newUserData);

    // 5. Retornar el usuario creado
    return createdUser;
  }
  async userLogin(usr_name, usr_passwd) {
    const user = await userRepository.userLogin(usr_name);
    if (!user) return { success: false, error: "USER_NOT_FOUND" };
    
    const isMatch = await bcrypt.compare(usr_passwd, user.usr_passwd);
    if (!isMatch) return { success: false, error: "WRONG_PASSWORD" };
    
    return { success: true, user };
  }

  async validateDevice(uuid) {
    const device = await deviceRepository.findByUuid(uuid);
    if (!device) return { success: false, error: "DEVICE_NOT_FOUND" };
    
    return { success: true, device };
  }

  async getFiscalConfig(devId) {
    const fiscalConfig = await fiscalConfigRepository.getLastByDeviceId(devId);
    if (!fiscalConfig) return { success: false, error: "FISCAL_CONFIG_NOT_FOUND" };
    
    return { success: true, fiscalConfig };
  }

  async createUserSession(user, fiscalConfig) {
    // Verificar si ya hay una sesión activa para este usuario
    const activeSession = await sessionRepository.findActiveByUser(user.usr_id.toString());
    
    if (activeSession) {
      // Cerrar sesión anterior
      await sessionRepository.closeSession(activeSession.sesId);
    }

    // Crear nueva sesión
    const sessionData = {
      fisId: fiscalConfig.fisId,
      sesCashierName: `${user.usr_first_name} ${user.usr_last_name}`,
      sesCashierId: user.usr_id.toString(),
      sesShiftId: `SHIFT_${Date.now()}`, // Generar ID de turno único
      InvoiceFrom: fiscalConfig.fisCurrentInvoice || fiscalConfig.fisInvoiceFrom,
      InvoiceUntil: fiscalConfig.fisInvoiceUntil,
      DateFrom: new Date(),
      DateUntil: null, // Sesión activa
      sessName: Date.now() // Nombre de sesión único
    };

    const session = await sessionRepository.createSession(sessionData);
    return { success: true, session };
  }

  async completeLogin(usr_name, usr_passwd, uuid) {
    try {
      // 1. Validar usuario
      const userResult = await this.userLogin(usr_name, usr_passwd);
      if (!userResult.success) return userResult;

      // 2. Validar device
      const deviceResult = await this.validateDevice(uuid);
      if (!deviceResult.success) return deviceResult;

      // 3. Obtener configuración fiscal
      const fiscalResult = await this.getFiscalConfig(deviceResult.device.devId);
      if (!fiscalResult.success) return fiscalResult;

      // 4. Crear sesión
      const sessionResult = await this.createUserSession(userResult.user, fiscalResult.fiscalConfig);
      if (!sessionResult.success) return sessionResult;

      return {
        success: true,
        data: {
          user: userResult.user,
          device: deviceResult.device,
          fiscalConfig: fiscalResult.fiscalConfig,
          session: sessionResult.session
        }
      };

    } catch (error) {
      return { success: false, error: "INTERNAL_ERROR", details: error.message };
    }
  }
}

export default new UserServices();






























/*
class UserService {
        async postNewUserRepository(data) {
        // 1. Verificar si el usuario ya existe (por nombre o correo)
        const existingUser = await userRepository.findByUsername(data.usr_name, data.email);

        if (existingUser) {
            throw new Error("El usuario ya existe");
        }

        // 2. Hashear la contraseña antes de guardarla
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.usr_passwd, saltRounds);

        const newUserData = {
            ...data,
            usr_passwd: hashedPassword,
        };

        // 3. Crear usuario en DB
        return await userRepository.postNewUser(newUserData);
    }


    async userLogin(usr_name, usr_passwd) {
        const user = await userRepository.userLogin(usr_name);
        if (!user) return null;

        const isMatch = await bcrypt.compare(usr_passwd, user.usr_passwd);
        if (!isMatch) return "wrong_password";

        return user;
    }
}

export default new UserService();
*/