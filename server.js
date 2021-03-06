const fs = require("fs");
const express = require("express");
const path = require("path");
const { parse } = require("path");
const shortid = require("shortid");

// Set up express
const PORT = process.env.PORT || 3000;
const app = express();

// Data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect HTMl, js and CSS
app.use(express.static(path.join(__dirname, "public")));

//Routes
// GET new note request
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);
// GET new notes
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);
// GET saved notes
app.get("/api/notes", (req, res) => {
  const note = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(note);
});

// POST new note
app.post("/api/notes", (req, res) => {
  let newNote = req.body;
  newNote.id = shortid.generate();
  fs.readFile(path.join(__dirname, "/db/db.json"), (err, data) => {
    if (err) {
      console.log(error);
    } else {
      let storedData = JSON.parse(data);
      storedData.push(newNote);
      fs.writeFile(
        path.join(__dirname, "/db/db.json"),
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

app.delete("/api/notes/:id", (req, res) => {
  let uniqId = req.params.id;
  fs.readFile(path.join(__dirname, "/db/db.json"), (err, data) => {
    if (err) {
      console.log(error);
    } else {
      let storedData = JSON.parse(data);
      for (let i = 0; i < storedData.length; i++) {
        if (storedData[i].id === uniqId) {
          storedData.splice(i, i);
        }
      }
      fs.writeFile(
        path.join(__dirname, "/db/db.json"),
        JSON.stringify(storedData),
        (err) => {
          if (err) {
            console.log(error);
          }
        }
      );
    }
  });
  res.end();
});

app.listen(PORT, () => console.log(`You are tuned to PORT ${PORT}`));
