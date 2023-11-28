// Establish Router using UUID (also helper functions)

const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils');

// GET route to get all of the notes

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST route for adding a new note

notes.post('/', (req, res) => {
    
    const { title, text } = req.body;
    const addNewNote = {
        title,
        text,
        id: uuidv4(),
    };

    readAndAppend(addNewNote, './db/db.json');
    res.json('Your new note has been added successfully!');
});