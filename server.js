const dotenv = requre('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGODB_URI); 
mongoose.connection.on('connected', () => {
  console.log(`Connected to MONGODB ${mongoose.connection.name}`)}
);

// Get /git 
app.get("/", async (req, res) => {
  res.render("index.ejs");
});


app.listen(3000, () => {
    console.log('Listening on Port 3000');
})