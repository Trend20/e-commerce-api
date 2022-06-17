const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
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

const Product = mongoose.model('User', ProductSchema);
module.exports = Product;