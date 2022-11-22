const authRouter = require('express').Router();
const users = require('../controllers/users');
const  {auth}  = require('../utils/passport')

authRouter.post('/login', auth(), users.login)

authRouter.post('/register', users.register);

authRouter.delete('/logout', users.logout);

export  {authRouter};