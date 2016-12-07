import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';

function localAuthenticate(User, email, password, done) {
  User.findOneAsync({
    email: email.toLowerCase()
  })
    .then(user => {
      if (!user) {
        return done(null, false, {
          message: 'This email is not registered.'
        });
      }
      user.authenticate(password, function(authError, authenticated) {
        if (authError) {
          return done(authError);
        }
        if (!authenticated) {
          return done(null, false, { message: 'This password is not correct.' });
        } else {
          return done(null, user);
        }
      });
    })
    .catch(err => done(err));
}

function localAuthenticateViaName(User, name, password, done) {
  User.findOneAsync({
    name: name
  })
    .then(function (user) {
      if (!user) {
        return done(null, false, {
          message: 'This name is not registered.'
        });
      }
      user.authenticate(password, function (authError, authenticated) {
        if (authError) {
          return done(authError);
        }
        if (!authenticated) {
          return done(null, false, {
            message: 'This password is not correct.'
          });
        } else {
          return done(null, user);
        }
      });
    })
    .catch(function (err) {
      return done(err);
    });
}

export function setup(User, config) {
  console.log('----- passport setup -----')
  passport.use(new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password' // this is the virtual field on the model
  }, function(name, password, done) {
    return localAuthenticateViaName(User, name, password, done);
  }));
}
