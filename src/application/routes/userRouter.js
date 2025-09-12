import {Router } from 'express';
import {authMiddleware} from '../middlewares/authMiddleware.js';
import UserController from '../controllers/userController.js';
import UserValidator from '../validator/userValidator.js';

const router = Router();

router.post('/newUser', 
    UserValidator.validateUserData(), 
    (req, res) => UserController.postNewUserController(req, res)
);
router.post('/login', 
    UserValidator.userLogginValidator(), 
    (req, res) => UserController.userLoginController(req, res)
);

export default router;

