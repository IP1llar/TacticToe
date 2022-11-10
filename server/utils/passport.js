const passport = require('passport');
const LocalStrategy = require('passport-local');

passport.serializeUser(function(user, done) {
  if (user) done(null, user);
})

passport.deserializeUser(function(id, done) {
  done(null, id);
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    if (username === 'admin' && password === 'admin') { // TODO: query database
      return done(null, username);
    } else {
      return done('unauthorised access', false)
    }
  }
))

const auth = () => {
  return (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
      if (error) res.status(400).json({"statusCode": 200, "message": error});
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