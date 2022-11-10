const router = require('express').Router();
const ai = require('./controllers/ai')

const {isLoggedIn} = require('./utils/passport')


router.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
})



router.get('/getData', isLoggedIn, (req, res) => {
  res.json('Hello world this is the secret data')
})

router.post('/ai/move', (req, res, next) => {
  console.log('movement')
  next();
},ai.move);
router.post('/ai/train', ai.train);

router.post('/random/move', ai.random);
router.post('/perfect/move', ai.perfect);

module.exports = router;