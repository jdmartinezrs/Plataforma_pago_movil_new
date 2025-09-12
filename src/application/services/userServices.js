import userRepository from "../../domain/repositories/userRepository.js"
import bcrypt from 'bcrypt';

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
/*
    async postNewUserRepository(data) {
        // Hashear la contraseña antes de guardarla
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.usr_passwd, saltRounds);
        // Reemplazar la contraseña en el objeto
        const newUserData = {
            ...data,
            usr_passwd: hashedPassword,
        };

        return await userRepository.postNewUser(newUserData);
    }*/

    async userLogin(usr_name, usr_passwd) {
        const user = await userRepository.userLogin(usr_name);
        if (!user) return null;

        const isMatch = await bcrypt.compare(usr_passwd, user.usr_passwd);
        if (!isMatch) return "wrong_password";

        return user;
    }
}

export default new UserService();