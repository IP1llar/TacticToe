const router = require('express').Router();
const ai = require('./controllers/ai')

router.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
})

router.post('/ai/move', ai.move);

module.exports = router;