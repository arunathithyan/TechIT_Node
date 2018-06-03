var express = require('express');
var router = express.Router();
var Ticket = require('../models/ticket')
var mongoose = require('mongoose')
var passport = require('passport')
require('dotenv').config()
const db = process.env.DBURL

/* GET users listing. */
mongoose.connect(db);

const unauthorizedErrorMessage = 'Unauthorized Access'

router.get('/api/tickets/:ticketId/technicians', passport.authenticate('jwt', {session: false}), (req, res) => {
        let user = req.user
        let authorization = false
        if(['SUPERVISOR', 'USER'].includes(user.role)){
        Ticket.findTechnicians(req.params.ticketId)
            .then(ticket=>{
                    if(ticket == null)
                        res.status(404).json({errorMessage:'Not Found'})
                    if(user.role =='SUPERVISOR' && ticket.unitID == user.unit)
                        res.status(200).json(ticket.technicians)
                        else if(user.role=='USER' && ticket.userid == user.id)
                                {res.status(200).json(ticket.technicians)}
                        else{res.status(403).json({errorMessage:'Unauthorized Access'})}
                        }
            )
            .catch(err=>{console.log(err)})
        }
        if('ADMIN'===user.role){
                        Ticket.findTechnicians(req.params.ticketId)
                            .then(ticket=>{
                                 ticket !== null ?    
                                res.status(200).json(ticket.technicians):res.status(404).json({errorMessage:'Not Found'}) })
                            .catch(err=>{console.log(err)})
                        }
})

router.put('/api/tickets/:ticketId/status/:status', passport.authenticate('jwt', {session: false}), (req, res) => {
        let user = req.user
        if(['ADMIN','TECHNICIAN','SUPERVISOR'].includes(user.role)){
                let message = req.body.message
                let params = req.params
                Ticket.setStatus(params, message, user.id)
                .then(tickets=>{
                        tickets !== null ? 
                        res.status(200).json(tickets) : res.status(404).json({errorMessage:'Not Found'})})
                .catch(err=>{console.log(err)})
        }else{res.status(403).json({errorMessage:'Unauthorized Access'})}
    })
        

router.put('/api/tickets/:ticketId/priority/:priority', passport.authenticate('jwt', {session: false}), (req, res) => {
        let user = req.user
        if(['ADMIN','TECHNICIAN','SUPERVISOR'].includes(user.role)){
        let params = req.params
        Ticket.setPriority(params)
                .then(updated=>{
                        updated !== null ? 
                        res.status(200).json(updated) : res.status(404).json({errorMessage:'Not Found'})})
                .catch(err=>{console.log(err)})
        }else{res.status(403).json({errorMessage:'Unauthorized Access'})}
})

router.post('/api/tickets/', passport.authenticate('jwt', {session: false}), (req, res) => {
        let ticket = req.body
        let userId = req.user.id
        Ticket.createTicket(ticket, userId)
        .then(result=>{
                result !==null ? 
                res.status(200).json(result) : res.status(404).json({errorMessage:'Not Found'})})
        .catch(err=>{console.log(err)})
})
module.exports = router;