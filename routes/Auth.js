const express = require('express');
const router = express.Router();
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

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
    return res.status(201).json(newUser);
  }catch(error){
    return res.status(500).json(error)
  }
})

// LOGIN ROUTE
router.post('/login', async (req, res) =>{
  try{
    const user =  await User.findOne({username: req.body.username});

   
    if(!user){
      return res.status(401).json('Wrong Credentials!');
    }
    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_KEY);
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if(OriginalPassword !== req.body.password){
      return res.status(401).json('Wrong Credentials!');
    }

    // access token
    const accessToken = jwt.sign({
      id:user._id,
      isAdmin: user.isAdmin
    }, process.env.JWT_SEC_KEY,{expiresIn:"3h"})

    const {password, ...others} = user._doc;

    return res.status(200).json({...others, accessToken});

  }catch(error){
    return res.status(500).json(error);
  }
})

module.exports = router;