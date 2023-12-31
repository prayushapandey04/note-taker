// Establish Router using UUID (also helper functions)

const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils');

// GET route to get all of the notes

notes.get('/', (_, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// Getting one note

notes.get('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.id === noteId);
        return result.length >0
        ? res.json(result)
        : res.json('No note with that ID');
      });
})
;
// POST route for adding a new note

notes.post('/', (req, res) => {
    
    const { title, text } = req.body;
    const newNote = {
        title,
        text,
        id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json('Your new note has been added successfully!');
});


// Delete route to delete a note

notes.delete('/:id', (req, res) => {

    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id !== noteId);

            writeToFile('./db/db.json', result);

            res.json(`Item ${noteId} has been deleted!`);
        });
});

module.exports = notes;