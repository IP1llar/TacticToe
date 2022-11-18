const express = require('express');
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/.env' });
const app = express();
const { router } = require('./routers/router');
const cors = require('cors');
const session = require('express-session');
const { passport } = require('./utils/passport')
const { db } = require('./models/index');


import { User } from './models/users'
declare module 'express' {
  interface Request {
    user: User,
    login(user: User, done: (err: any) => void): void;
    login(user: User, options: any, done: (err: any) => void): void;
    logIn(user: User, done: (err: any) => void): void;
    logIn(user: User, options: any, done: (err: any) => void): void;
    logout(options: { keepSessionInfo?: boolean }, done: (err: any) => void): void;
    logout(done: (err: any) => void): void;
    logOut(options: { keepSessionInfo?: boolean }, done: (err: any) => void): void;
    logOut(done: (err: any) => void): void;
    isAuthenticated(): this is AuthenticatedRequest;
  }
  interface Response {
    error: (code: number, message: string) => Response;
    success: (code: number, message: string, result: any) => Response
}
  interface AuthenticatedRequest extends Request {
    user: User;
  }
}



const http = require('http').Server(app);


const io = require('socket.io')(http, {
  cors: {
    origin: process.env.CLIENTURL || "http://localhost:4200", // TODO: .env
    methods: ["GET", "POST"],
    credentials: true
  }
});
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
    await db.sequelize.sync();
    http.listen(port, () => {
      console.log(`Listening on port: ${port}`)
    })
  } catch (error) {
    console.log(error);
  }
}

start();