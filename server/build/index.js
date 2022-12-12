"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: __dirname + '/.env' });
const app = express();
const { router } = require('./routers/router');
const cors = require('cors');
const session = require('express-session');
const { passport } = require('./utils/passport');
const { db } = require('./models/index');
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: process.env.CLIENTURL || "http://localhost:4200",
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
};
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
            console.log(`Listening on port: ${port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
}
start();
