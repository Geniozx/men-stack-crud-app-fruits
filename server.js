const express = require('express');

const app = express();

// Get /
app.get('/', async (requestAnimationFrame, res) => {
    res.send('hello')
})


app.listen(3000, () => {
    console.log('Listening on Port 3000');
})