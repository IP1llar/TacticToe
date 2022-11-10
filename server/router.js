const router = require('express').Router();
const ai = require('./controllers/ai');
const users = require('./controllers/users');
const { auth } = require('./utils/passport')

const {isLoggedIn} = require('./utils/passport')


router.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
})

router.get('/getData', isLoggedIn, (req, res) => {
  res.json('Hello world this is the secret data')
})

router.post('/ai/move',ai.move);
router.post('/ai/train', ai.train);
router.post('/random/move', ai.random); // TODO: rename in client and here to /ai/randomMove
router.post('/perfect/move', ai.perfect); // TODO: rename in client and here to /ai/perfectMove

router.post('/login', auth(), (req, res) => {
  res.status(200).json({'statusCode': 200, 'message':'logged in'});
})
router.post('/register', users.register);

module.exports = router;