const aiRouter = require('express').Router();
const ai = require('../controllers/ai')
const {isLoggedIn} = require('../utils/passport')

aiRouter.post('/create', ai.create)
aiRouter.post('/move', ai.move);
aiRouter.post('/train', ai.train);

module.exports = aiRouter;