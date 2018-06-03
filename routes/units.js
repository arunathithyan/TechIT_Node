var express = require('express');
var router = express.Router();
var Unit = require('../models/unit');
var mongoose = require('mongoose');
var passport = require('passport')

require('dotenv').config()
const db = process.env.DBURL

/* GET users listing. */
mongoose.connect(db);

router.get(`/api/units/:unitId/technicians`, passport.authenticate('jwt', {session: false}), (req, res) => {
        let user = req.user
        let unitId = req.params.unitId
        if((user.role==='SUPERVISOR' && user.unit === unitId)|| user.role==='ADMIN'){
          Unit.findTechnicians(req.params.unitId)
              .then(unit=>{
                unit != null && unit.technicians!==[] ?
                res.status(200).json(unit.technicians): res.status(404).json({errorMessage:'Not Found'})})
              .catch(err=>{console.log(err)})
        }else{res.status(403).json({errorMessage:'Unauthorized Access'})}
  });

router.get(`/api/units/:unitId/tickets`, passport.authenticate('jwt', {session: false}), (req, res) => {
        let user = req.user
        let unitId = req.params.unitId
        if((['SUPERVISOR','TECHNICIAN'].includes(user.role) && user.unit === unitId)|| user.role==='ADMIN'){
            Unit.findTickets(unitId)
                .then(unit=>{
                  console.log(unit)
                  unit != null ?
                  res.status(200).json(unit.tickets) : res.status(404).json({errorMessage:'Not Found'})})
                .catch(err=>{console.log(err)})
        }else{res.status(403).json({errorMessage:'Unauthorized Access'})}
  });

module.exports = router;