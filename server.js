const fs = require('fs');
const express = require('express');
const path = require('path');
const { parse } = require('path');

const PORT = process.env.PORT || 3000   
const app = express();

// Sets up Express
app.use(express.urlencoded({ extended: true}));
app.use(express.json());


//Routes
app.get('/', (req, res) => res.sendFile(path.join(_dirname, 'index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(_dirname, 'notes.html')));
app.get('/api/notes', function(req, res) {
    path.join(notes)
});

const  = parse(db.json());


// POST routes
app.post('/notes', function(req, res) {
    res.send(path.join(_dirname, ''))
})

// creating a variable parse database parse(db.json), read file and response is json of the variable. 
// json as a method  
// three gets, one post (review post), one delete.
