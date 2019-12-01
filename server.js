const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');

const app = express();

app.use(express.json());

const db = config.get('mongoURI');
//console.log(db);
//const MongoClient = require('mongodb');
// connect to mongo
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/audioAnalysis', require('./routes/api/audioAnalysis'));


const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server started on port ${port}`)); 