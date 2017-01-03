const http = require('http')
var express = require('express');
var bravia = require('./lib');

var app = express();

const port = 5006
const tvIP = '192.1.168.100'
const pskKey = '0000'

// Set up the server
app.get('/:intent', function (req, res) {

	// Get the intent 
	var intent = req.params.intent;
  	
  	// Confirm the intent
  	console.log('Running ' + intent);

  	// Call the Bravia function. 
  	bravia(tvIP, pskKey, function(client) {

      // Call a command
  	  client.exec(intent);

      // Send back the ok status.
      res.sendStatus(200);

  	});
});

// Set up the port listener
app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});