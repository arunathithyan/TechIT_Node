var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mongoose = require('mongoose');
require('dotenv').config()
const db = process.env.DBURL
const passport = require('passport');
mongoose.connect(db);

router.get('/api/users/:userId/tickets', passport.authenticate('jwt', {session: false}), (req, res) => {
        let id = req.user.id
        let userId = req.params.userId
        let user=req.user;
        console.log(id, '  ', userId)
        if(id===userId|| user.role==='ADMIN'){
            User.findTickets(userId)
                .then(user=>{
                    // console.log(tickets)
                    user != null ? 
                    res.status(200).json(user.tickets) : res.status(404).json({errorMessage:'Not Found'})})
                .catch(err=>{console.log(err)})
        }
        else{res.status(403).json({errorMessage:'Unauthorized Access'})}
    })
module.exports = router;
