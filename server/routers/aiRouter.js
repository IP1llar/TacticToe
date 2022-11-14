const aiRouter = require('express').Router();
const ai = require('../controllers/ai')
const {isLoggedIn} = require('../utils/passport')

aiRouter.post('/create', ai.create)
aiRouter.post('/move', ai.move);
aiRouter.post('/train', ai.train);
aiRouter.get('/getAllAi', isLoggedIn, ai.getAllAi)
aiRouter.post('/get', ai.get)
aiRouter.post('/edit', ai.editAi)

aiRouter.post('/randommove', ai.random);
aiRouter.post('/perfectmove', ai.perfect);

module.exports = aiRouter;