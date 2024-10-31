const mongoose = require('mongoose');
const {CONNECTION_STR}=require('../config.js')
const { Schema } = mongoose; 

const messageSchema = new Schema({
  sender_id: { type: String, required: true },
  receiver_id: { type: String, required: true },
  message: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
},
{ timestamps: true }

);

module.exports = mongoose.model('Message', messageSchema);
module.exports = Message;
