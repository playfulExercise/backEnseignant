const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost:27017/playful', { useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;
mongoose.set('useFindAndModify', false);

connection.once('open', function(){
    console.log("MondoDB database connection established successfully");
});

app.listen(PORT, function() {
    console.log("Server is running on Port : " + PORT);
});

app.use(
    bodyParser.urlencoded({
        extended: false
    })
)

var Professeurs = require('./routes/Professeurs.js');
app.use('/professeurs', Professeurs);
