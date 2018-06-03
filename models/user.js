'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  hash: String,
  department : String,
  firstName: {
    type: String,
    required: true
  },
  lastName:  {
    type: String,
    required: true
  },
  phoneNumber:  {
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  position: {type: String, enum:['ADMIN', 'SUPERVISOR', 'TECHNICIAN', 'USER']} ,
  unit: {type: Schema.Types.ObjectId,ref: 'Unit'},
/*supervisor:{
    type: Schema.Types.ObjectId,
    ref: 'User'
},*/
  tickets:[{type: Schema.Types.ObjectId,ref: 'Ticket'}]
});

userSchema.statics.findTickets = function(userId, callback){
  // console.log(userId)
  return this.findById(userId, callback).populate('tickets');
}

module.exports = mongoose.model('User', userSchema);