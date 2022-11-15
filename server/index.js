const express = require('express');
require('dotenv').config();
const app = express();
const router = require('./routers/router');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const {passport} = require('./utils/passport');
const db = require('./models/index');

const http = require('http').Server(app);
const io = require('socket.io')(http, {cors: {
  origin: process.env.CLIENTURL || "http://localhost:4200", // TODO: .env
  methods: ["GET", "POST"],
  credentials: true
}});
require('./utils/socket')(io);

const port = process.env.PORT || 3001;
const SECRET = process.env.SECRET || 'this is not very secure';

const corsConfig = {
  origin: [process.env.URL || 'http://localhost:3000', process.env.CLIENTURL || 'http://localhost:4200'],
  credentials: true,
}
app.use(cors(corsConfig));

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
    http.listen(port, () => {
      console.log(`Listening on port: ${port}`)
    })
  } catch (error) {
    console.log(error);
  }
}

start();