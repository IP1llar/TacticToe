const express = require('express');
require('dotenv').config();
const app = express();
const router = require('./router');
const cors = require('cors');
const session = require('express-session');
const {passport, auth} = require('./utils/passport');

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

app.post('/authenticate', auth(), (req, res) => {
  res.status(200).json({'statusCode': 200, 'message':'hello'});
})

app.use(router);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})