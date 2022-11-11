const router = require('express').Router();
const aiRouter = require('./aiRouter');
const ai = require('../controllers/ai')
const authRouter = require('./authRouter');
const {isLoggedIn} = require('../utils/passport');

router.use('/', authRouter);
router.use('/ai', aiRouter); // TODO: add isLoggedIn as middleware

router.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
})

router.get('/loggedin', isLoggedIn, (req, res) => {
  res.json('logged in')
})


router.post('/random/move', ai.random); // TODO: rename in client and here to /ai/randomMove
router.post('/perfect/move', ai.perfect); // TODO: rename in client and here to /ai/perfectMove

module.exports = router;