const express = require('express');
const app = express();

const PORT = 80;

function handleListening() {
    console.log(`Server Running On http://localhost:${PORT}`);
}

app.get('/', (req, res) => {
    res.send('Hello from home');
})

app.get('/profile', (req, res) => {
    res.send('Hello from profile')
})

app.listen(80,handleListening);