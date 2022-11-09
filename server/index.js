const express = require('express');
require('dotenv').config();
const app = express();
const router = require('./router');
const cors = require('cors');

const port = process.env.PORT || 3001;

const corsConfig = {

}

app.use(cors(corsConfig));
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})