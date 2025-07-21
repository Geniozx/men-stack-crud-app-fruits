const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGODB_URI); 
mongoose.connection.on('connected', () => {
  console.log(`Connected to MONGODB ${mongoose.connection.name}`)}
);

//Import fruit model
const Fruit = require('./models/fruit.js');

// adding middleware for app
app.use(express.urlencoded({ extended: false }));


// Get /git 
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.get('/fruits', async (req, res) => {
  const allFruits = await Fruit.find({});

  res.render('fruits/index.ejs', { fruit: allFruits });
});

// Get /fuits/new
app.get('/fruits/new', (req, res) => {
  res.render('fruits/new.ejs')
})

// post /fruits
app.post('/fruits', async (req, res) => {
  if (req.body.isReadyToEat === 'on') {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  await Fruit.create(req.body); //This line is the database transaction from line 15
  res.redirect('/fruits');
})

app.listen(3000, () => {
    console.log('Listening on Port 3000');
})