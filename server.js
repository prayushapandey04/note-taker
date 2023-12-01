// Import the packages

const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

// Setting up port 

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// Homepage GET route 

app.get('/', (_, res) => {

    res.sendFile(path.join(__dirname, './public/index.html'))

});

// Notes page GET route

app.get('/notes', (_, res) => {

    res.sendFile(path.join(__dirname, './public/notes.html'))

});

// Wildcard route for user be routed to homepage

app.get('*', (_, res) => {

    res.sendFile(path.join(__dirname, './public/index.html'))

});

app.listen(PORT, () => {

    console.log(`Server is listening on http://localhost:${PORT}`);

});
