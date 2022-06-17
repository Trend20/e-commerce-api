const express = require('express');
const router = express.Router();
const CryptoJS = require('crypto-js');

// import the user model
const User = require('../models/User');

// REGISTER ROUTE
router.post('/register', async (req, res) =>{
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY).toString()

  })

  try{
    await newUser.save();
    res.status(201).json(newUser);
  }catch(error){
    res.status(500).json(error)
  }
})



module.exports = router;