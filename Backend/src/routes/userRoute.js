const {Router} = require('express');
const { register, login, logout } = require('../controller/userController');
const { validateRegistration, validateLogin } = require('../middileware/validation');

const userRouter = Router();

userRouter.post('/register', validateRegistration, register );
userRouter.post('/login', validateLogin, login);
userRouter.delete('/logout', logout);

module.exports = userRouter;
