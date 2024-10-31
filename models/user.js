const mongoose = require("mongoose");
const {CONNECTION_STR}=require('../config.js')
const { Schema } = mongoose; 

mongoose.connect(CONNECTION_STR).then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user_name: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    friends: [{
      type:String
  }],
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;