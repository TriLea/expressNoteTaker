const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

//const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json()) // for parsing application/json

// GET Route for homepage
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for feedback page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Wildcard route to direct users to a 404 page
app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/db/db.json'))
);

app.post('/api/notes', (req, res) => 
    res.json(req.body)
);
