import express from 'express'
const passport = require('passport');
const {db} = require('../models');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local');
import { User } from '../models/users'




passport.serializeUser(function(user:User, done:(err: any, user?: string | false | null) => void) { // TODO: think about just done(null, user.id) then deserialize using id
  if (user) done(null, user.id);
})

passport.deserializeUser(function(id:string, done:(err: any, user?: string | false | null) => void) {
  done(null, id); // TODO: get user from database and change any req.user reference 
});

passport.use(new LocalStrategy(
  async function verify(email:string, password:string, done:(err: any, user?: User | string | false | null) => void) {
    const user:User = await db.Users.findOne({where: {email}});
    if (user === null) return done('no such user', false);
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return done(null, {id: user.id, email, firstName: user.firstName, lastName: user.lastName});
    } else {
      return done('unauthorised access', false)
    }
  }
))

const auth = () => {
  return (req:express.Request, res:express.Response, next:express.NextFunction) => {
    passport.authenticate('local', (error:any, user:User) => {
      if (error) res.status(400).json({'statusCode': 200, 'message':error, 'user':{}});
      req.login(user, function(error:any) {
        if (error) return next(error);
        next();
      })
    })(req, res, next);
  }
}

const isLoggedIn = (req:express.Request, res:express.Response, next:express.NextFunction) => {
  console.log('here');
  if(req.isAuthenticated()){
      return next()
  }
  return res.status(400).json({"statusCode" : 400, "message" : "not authenticated"})
}

export { passport, auth, isLoggedIn }