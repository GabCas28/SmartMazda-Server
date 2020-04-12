var express = require("express");
var tripController = require('./controllers/tripController');
var homeController = require('./controllers/homeController');
var app = express();
// Static files
app.use(express.static('public'));

// Set up view engine
app.set('view engine', 'ejs');

// favicon setup
app.use('/favicon.ico', express.static('public/assets/favicon.ico'));

// Fire controllers

tripController(app);

// Home controller
homeController(app);

// Run listening server 
app.listen("3000", function(){
    console.log("Listening to requests in port 3000");
});