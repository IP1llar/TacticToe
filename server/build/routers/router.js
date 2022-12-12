"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
const { aiRouter } = require('./aiRouter');
// const {ai} = require('../controllers/ai') Not used
const { authRouter } = require('./authRouter');
const { isLoggedIn } = require('../utils/passport');
router.use('/', authRouter);
router.use('/ai', isLoggedIn, aiRouter);
router.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});
router.get('/loggedin', isLoggedIn, (req, res) => {
    res.json('logged in');
});
