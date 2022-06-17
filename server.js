const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// routes
const userRouter = require('./routes/User');

// simple route for testing
app.get('/', (req, res) =>{
  res.send('Application running successfully')
})

// use dotenv
require('dotenv').config();

// connect to the database
const db_url = process.env.DATABASE_URL;
mongoose.connect(db_url, {useNewUrlParser: true})
        .then(() =>{
          console.log('Connected to Database successfully!');
        })
        .catch((error) =>{
          console.log(error);
        })

// USE MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// use the routes
app.use('/api/users', userRouter);

// initialize a port
const PORT = process.env.PORT || 9000;

// listen to the port
app.listen(PORT, () =>{
  console.log(`Application running on port ${PORT}`);
})