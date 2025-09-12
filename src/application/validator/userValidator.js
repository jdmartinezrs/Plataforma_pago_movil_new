import { body, query, validationResult } from 'express-validator';


class UserValidator {
    
    validateUserData() {
        return [  
            body('usr_name').isString().withMessage('El nombre de usuario debe ser una cadena de texto'),
            body('usr_passwd').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
            body('usr_last_name').optional().isString().withMessage('El apellido debe ser una cadena de texto'),
            body('usr_first_name').optional().isString().withMessage('El nombre debe ser una cadena de texto'),
        ];
    }       
    
    userLogginValidator() {
        return [
            body('usr_name').isString().withMessage('El nombre de usuario debe ser una cadena de texto'),
            body('usr_passwd').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
        ];
    }
/*
    handleValidationErrors(req, res, next) {
        const errors = validationResult(req);  
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }*/
}
export default new UserValidator();