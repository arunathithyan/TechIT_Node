const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('dotenv').config()

let secret = process.env.JWT_SECRET;
/* POST login. */
router.post('/api/login', function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user   : user
            });
        }
       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }
        
           const userData = {
               id : user._id, 
               role : user.position,
               unit : user.unit
           }
           // generate a signed son web token with the contents of user object and return it in the response
        const token = jwt.sign({user:userData}, secret) 
        return res.json({userData, token});
        });
     })(req, res);
});

module.exports = router;