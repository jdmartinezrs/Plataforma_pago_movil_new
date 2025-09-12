import userServices from "../services/userServices.js";
import jwt from "jsonwebtoken";

class UserController {
    async postNewUserController(req, res) {
        try {
            const newUser = await userServices.postNewUserRepository(req.body);
            res.status(201).json(newUser);
        } catch (err) {
            res.status(500).json({ message: 'Error al crear usuario', error: err.message });
        }
    }

    /*async userLoginController(req, res) {
        try {
            const { usr_name, usr_passwd } = req.body;

            const result = await userServices.userLogin(usr_name, usr_passwd);

            if (result === null) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            if (result === "wrong_password") {
                return res.status(401).json({ message: "Contraseña incorrecta" });
            }

            // Login exitoso
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ message: "Error en el login", error: err.message });
        }
    }*/

     async userLoginController(req, res) {
    try {
      const { usr_name, usr_passwd } = req.body;

      const result = await userServices.userLogin(usr_name, usr_passwd);

      if (result === null) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      if (result === "wrong_password") {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }
     

      // Generar token
      const token = jwt.sign(
        { id: result.id, usr_name: result.usr_name }, // payload mínimo
        process.env.JWT_SECRET,                      // clave secreta
        { expiresIn: process.env.JWT_EXPIRES || "2h" } // duración del token
      );

      res.status(200).json({
        message: "Login exitoso",
        token,
      });
    } catch (err) {
      res.status(500).json({ message: "Error en el login", error: err.message });
    }
  }

};
export default new UserController();