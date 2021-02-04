const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const User = require('./models/User');

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['access_token'];
  }
  return token;
};

// authorization, protecting endpoints
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: '0NtbJkk6hr',
    },
    (payload, done) => {
      // user id will be the same as the payload sub
      User.findById({ _id: payload.sub }, (err, res) => {
        if (err) {
          return done(err, false); // return error
        } else if (res) {
          return done(null, res); // return user
        } else {
          return done(null, false);
        }
      });
    }
  )
);

// authentication
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, res) => {
      if (err) {
        // database error
        return done(err);
      } else if (!res) {
        // no user exists
        return done(null, false);
      }
      res.comparePassword(password, done); // check password
    });
  })
);
