const express = require('express');
const router = express.Router();


// get user
router.get('/user', (req, res) =>{
  res.send('User present');
})


module.exports = router;