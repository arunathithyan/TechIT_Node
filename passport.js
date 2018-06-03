const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
require("./models/user")
var UserModel = mongoose.model('User');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
require('dotenv').config()

let secret = process.env.JWT_SECRET;

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, 
    function (username, password, cb) {
        return UserModel.findOne({username, password})
           .then(user => {
               if (!user) {
                    console.log('Database hit unsuccessfull')
                    return cb(null, false, {message: 'Incorrect email or password.'});
               }
            //    console.log('Database hit successfully. These are user details:')
            //    console.log(user)
               return cb(null, user, {message: 'Logged In Successfully'});
          })
          .catch(err => cb(err));
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : secret
},
function (jwtPayLoad, cb) {
    console.log(jwtPayLoad)
    return cb(null, jwtPayLoad.user)
}
));

module.exports = passport;