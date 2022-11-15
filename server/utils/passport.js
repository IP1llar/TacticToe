const passport = require('passport');
const db = require('../models');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local');

passport.serializeUser(function(user, done) { // TODO: think about just done(null, user.id) then deserialize using id
  if (user) done(null, user.id);
})

passport.deserializeUser(function(id, done) {
  done(null, id); // TODO: get user from database and change any req.user reference 
});

passport.use(new LocalStrategy(
  async function verify(email, password, done) {
    const user = await db.Users.findOne({where: {email}});
    if (user === null) return done('no such user', false)
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return done(null, {id: user.id, email, firstName: user.firstName, lastName: user.lastName});
    } else {
      return done('unauthorised access', false)
    }
  }
))

const auth = () => {
  return (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
      if (error) res.status(400).json({'statusCode': 200, 'message':error, 'user':{}});
      req.login(user, function(error) {
        if (error) return next(error);
        next();
      })
    })(req, res, next);
  }
}

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()){
      return next()
  }
  return res.status(400).json({"statusCode" : 400, "message" : "not authenticated"})
}

module.exports = { passport, auth, isLoggedIn }