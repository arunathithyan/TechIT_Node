'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ticketSchema = new Schema({
  status: {
    type: String,
    enum: ['OPEN', 'INPROGRESS', 'ONHOLD', 'COMPLETED', 'CLOSED']
  },
  priority: {
    type: String,
    enum: [ 'NA', 'LOW', 'MEDIUM', 'HIGH']
  },
  subject:{
    type: String,
    required: true,
  },
  details:{
    type: String,
    required: true,
  },
 startDate:{
   type: Date,
   default: new Date()
  },
 dateAssigned: Date,
 dateUpdated: Date,
 location: String,
 createdForName: String,
 createdForEmail:{
    type: String,
    required: true,
 },
phone:String,
createdForDepartment: String,
endDate: Date,
userid: {type: Schema.Types.ObjectId, ref: 'User'},
unitId: {type: Schema.Types.ObjectId,ref: 'Unit'},
technicians: [{type: Schema.Types.ObjectId, ref: 'User'}],
updates:[
  {
    description: String,
    technician:{
        type: Schema.Types.ObjectId,
        ref: 'User'}
  }],
}, {versionKey:false});

ticketSchema.statics.findTechnicians = function(ticketId, callback){
  return this.findById(ticketId, callback).populate('technicians')
};

//ticketSchema.statics.setStatus = function(params, message, technicianId, callback){
  //  let statusValue = this.schema.obj.status.enum[params.status]
    //return this.findOneAndUpdate(params.ticketId, {'$set': {'status':statusValue, '$push': {updates: {'description': message, 'technician':technicianId}}}}, 
    //{returnOriginal:false})
//}

ticketSchema.statics.setStatus = function(params, message, technicianId, callback){
  let statusValue = this.schema.obj.status.enum[params.status]
  const update={
    $set:{'status': statusValue},
    $push:{'updates': {'description': message, 'technician':technicianId}}
  }
  return this.findOneAndUpdate({'_id':params.ticketId}, update, {"new":true})
}

ticketSchema.statics.setPriority = function(params, callback){
  let priorityValue = this.schema.obj.priority.enum[params.priority]
  return this.findOneAndUpdate({'_id':params.ticketId}, {'$set': {'priority':priorityValue}}, {"new":true})
}

ticketSchema.statics.createTicket = function(ticket,userId, callback){
    ticket.userId = userId   
    return this.create(ticket)
}

module.exports = mongoose.model('Ticket', ticketSchema);