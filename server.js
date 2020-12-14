const fs = require('fs');
const express = require('express');
const path = require('path');
const { parse } = require('path');

// Set up express
const PORT = process.env.PORT || 3000   
const app = express();

// Data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Connect HTMl, js and CSS
app.use(expres.static(path.join(_dirname, 'public')));


//Routes
// GET new note request
app.get('/', (req, res) => res.sendFile(path.join(_dirname, '/public/index.html')));
// GET new notes
app.get('/notes', (req, res) => res.sendFile(path.join(_dirname, '/public/notes.html')));
// GET saved notes
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(_dirname, "/db/db/.json"));    
});


// POST new note
app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    newNote.id = shortid.generate();
    fs.readFile(path.join(_dirname, '/db/db.json'), (err,data) => {
        if (err) {
            console.log(error);
        } else {
            let storedData = JSON.parse(data);
            storedData.push(newNote);
            fs.writeFile(
                path.join(_dirname, "/db/db.json"),
                JSON.stringify(storedData),
                (err) => {
                    if (err) {
                        console.log(error);
                    }
                }
            );
        }
    });
    // End
    res.end();
});

app.listen.(PORT, () => console.log(`You are tuned to PORT ${PORT}`));



