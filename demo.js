var bravia = require('./lib');
// Accepts two parameters: IP and PSKKey

var readline = require('readline');

bravia('10.0.0.244', '1234', function(client) {

  // List available commands
  client.getCommandNames(function(list) {
    console.log(list);
  });
      var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
      });

      rl.on('line', function(line){
        // console.log(line);
        client.exec(line);
    })


});
