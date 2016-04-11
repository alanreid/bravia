
var bravia = require('./lib');

// IP & PSK Key
bravia('192.168.1.100', '0000', function(client) {

  // List available commands
  // client.getCommandNames(function(list) {
  //   console.log(list);
  // });
  // Call a command
  client.exec('Netflix');

});