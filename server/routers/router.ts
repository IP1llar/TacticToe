import express from 'express';


const router = express.Router();
const {aiRouter} = require('./aiRouter');
// const {ai} = require('../controllers/ai') Not used
const {authRouter} = require('./authRouter');
const {isLoggedIn} = require('../utils/passport');

router.use('/', authRouter);
router.use('/ai', isLoggedIn, aiRouter);

router.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
})

router.get('/loggedin', isLoggedIn, (req, res) => {
  res.json('logged in')
})

export {router};