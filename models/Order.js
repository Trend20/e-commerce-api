const mongoose = require('mongoose');
const {boolean} = require('webidl-conversions')

const UserSchema = new mongoose.Schema({
 title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  categories: {
    type: Array
  },
  size: {
    type: String
  },

  price: {
    type: Number,
    required: true
  },
},{timestamps: true})

const User = mongoose.model('User', UserSchema);
module.exports = User;