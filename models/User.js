const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  isAdmin: {
    type: boolean,
    default: true,
  }
},{timestamps: true})

const User = mongoose.model('User', UserSchema);
module.exports = User;