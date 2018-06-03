'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let unitSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
  },
  description: String,
  phone: Number,
  department : String,
  tickets:[{type: Schema.Types.ObjectId, ref: 'Ticket'}],
  technicians:[{type: Schema.Types.ObjectId, ref: 'User'}],
  supervisors:[{type: Schema.Types.ObjectId, ref: 'User'}]
});

unitSchema.statics.findTechnicians = function (unitId, callback){
  return this.findById(unitId, callback).populate('technicians')
};

unitSchema.statics.findTickets = function (unitId, callback){
  return this.findById(unitId, callback).populate('tickets')
};

module.exports = mongoose.model('Unit', unitSchema);