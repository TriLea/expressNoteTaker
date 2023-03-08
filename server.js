const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

var fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');

const PORT = process.env.PORT || 3001; //allows heroku

const app = express();

app.use(express.json()) // for parsing application/json
//app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// GET Route for homepage
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for feedback page
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Wildcard route to direct users to a 404 page
app.get('/api/notes', (req, res) => {
    let data = readFile();
    res.json(data.notes);
}
);

app.post('/api/notes', (req, res) => 
    addNote(req.body),
    res.json(req.body)
);

//making a function to
function writeFile(data)
{
    return fs.writeFileSync("./db/db.json", JSON.stringify(data)); 
    //writes the file, converts data to a string
}

function readFile()
{
    //add try catch for null error, if null return an obj with id field, like +1 to skip or somehting
    let data = fs.readFileSync("./db/db.json", "utf8"); 
    return JSON.parse(data); // seprated to make it easier to read
    //reads the file and returns the data as a string
}

function addNote(note)
{
    let data = readFile();
    note.id = data.nextID++; // unique id made, client never sees it. npm uniqid was to big imo
    data.notes.push(note);
    writeFile(data); //saves the updated database
}

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);