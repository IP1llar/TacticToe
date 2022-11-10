const express = require('express');
require('dotenv').config();
const app = express();
const router = require('./router');
const cors = require('cors');
const session = require('express-session');
const {passport} = require('./utils/passport');
const db = require('./models/index');
require('./models')

const port = process.env.PORT || 3001;

const corsConfig = {

}
app.use(cors(corsConfig));

app.use(session({ // TODO: env and check options
  secret: 'hello',
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge:3600000*24}
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