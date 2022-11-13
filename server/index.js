const express = require('express');
require('dotenv').config();
const app = express();
const router = require('./routers/router');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const {passport} = require('./utils/passport');
const db = require('./models/index');

const port = process.env.PORT || 3001;
const SECRET = process.env.SECRET || 'this is not very secure';

const corsConfig = {
  origin: ['http://localhost:3000', 'http://localhost:4200'],
  credentials: true,
}
app.use(cors(corsConfig));

app.use(cookieParser());
app.use(session({
  name: 'sid',
  saveUninitialized: false,
  resave: false,
  secret: SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use(router);

async function start() {
  try {
    await db.sequelize.sync({force: true});
    app.listen(port, () => {
      console.log(`Listening on port: ${port}`)
    })
  } catch (error) {
    console.log(error);
  }
}

start();