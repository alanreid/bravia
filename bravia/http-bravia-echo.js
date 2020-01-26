#!/usr/bin/env node

const http = require('http')
var express = require('express');
var bravia = require('./lib');

var app = express();

process.on('SIGINT', function() {
    console.log("Caught interrupt signal");
		process.exit();
});

const tvIP = process.env.TV_IP
const tvMAC = process.env.TV_MAC
const pskKey = '0000'

// Set up the server
app.get('/:intent', function (req, res) {

	// Get the intent
	var intent = req.params.intent;

	// Confirm the intent
	console.log('Running ' + intent);

	// Call the Bravia function.
	bravia(tvIP, tvMAC, pskKey, function(client) {

    // Call a command
	client.exec(intent);

    // Send back the ok status.
    res.sendStatus(200);

	});
});

// Set up the port listener
app.listen(3100, function () {
	console.log('Bravia listening on port 3100!');
	console.log('Bravia TV is set to ' + tvIP);
	console.log('Bravia TV is wake up(able) to ' + tvMAC);
});
