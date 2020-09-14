require("dotenv").config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sqlite = require('sqlite3');
const env = process.env;
const port = process.env.PORT || 8080;

// models
const models = require("./models");

// routes
const comments = require('./routes/comments');
const movies = require("./routes/movies")
const characters = require("./routes/characters")

//Sync Database
models.sequelize.sync().then(function() {
    console.log('connected to database')
}).catch(function(err) {
    console.log(err)
});

app.set('trust proxy', true)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// register routes
app.use(comments);
app.use(movies);
app.use(characters)

// index path
app.get('/', function(req, res){
    console.log('app listening on port: ' + port);
    res.send('Hi!')
});

app.listen(port, function(){
    console.log('app listening on port: ' + port);
});

module.exports = app;