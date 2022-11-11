const authRouter = require('express').Router();
const users = require('../controllers/users');
const { auth } = require('../utils/passport')

authRouter.post('/login', auth(), (req, res) => {
  res.status(200).json({'statusCode': 200, 'message':'logged in', 'user':req.user});
})

authRouter.post('/register', users.register);

module.exports = authRouter;