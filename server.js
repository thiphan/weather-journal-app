// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
const cors = require('cors');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = process.env.PORT || 3000;
const server = app.listen(port, ()=>{console.log(`Running on localhost: ${port}`)})

//Routes
app.get('/get', (req,res) =>{
    res.send(projectData);
});

app.post('/add', (req,res) => {
    console.log(req.body);
    projectData = {
        temp: req.body.temp,
        date: req.body.date,
        userRes: req.body.feeling
    };
    res.send({mgs: "data received!"});
});
