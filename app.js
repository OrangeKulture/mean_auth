const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

const app = express();
const port = process.env.port || 8080;
const users = require('./routes/users');

mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log('Connected to database '+config.database);
})

mongoose.connection.on('error', (err) => {
    console.log('Database error: '+err);
})

app.use(cors());
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users', users);

// Static filename
app.use(express.static(path.join(__dirname, 'public')));


// Index route
app.get('/', (req,res) => {
    res.send('Invalid Enpoint..');
});

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

//Server start
app.listen(port, () => {
    console.log('Listening on port '+port);
});