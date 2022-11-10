const router = require('express').Router();
const ai = require('./controllers/ai')

router.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
})

router.post('/ai/move', (req, res, next) => {
  console.log('movement')
  next();
},ai.move);
router.post('/ai/train', ai.train);

router.post('/random/move', ai.random);

module.exports = router;