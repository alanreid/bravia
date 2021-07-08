// File taken from arpjs (MIT License) by Ahamed Nafeez (https://github.com/skepticfx/arpjs)

var spawn = require('child_process').spawn;

// Works on Mac.
// TODO: Linux - Ubuntu et al.

function get_arp_table(callback){
  var arp = spawn('arp', ['-a']);
  var arp_str = "";

  arp.stdout.setEncoding('utf8');
  arp.stdout.on('data', function(data){
    arp_str = data;
  });
  arp.on('close', function(x){
    callback(null, parse_arp_table(arp_str));
    //arp.kill();
  });

}

// Parse ARP details from table
// TODO: Validate and format IP and MAC Addresses
function parse_arp_table(arpt){

  var arp_arr = [];
  arpt = arpt.split('\n');
  var x;
  for(x in arpt){
    var entry = arpt[x];
    var arp_obj = {};

    // Get the IP from the "(1.2.3.4)" fromat
    var ip_start = entry.indexOf('(');
    if(ip_start === -1)
      continue;
    var ip_end = entry.indexOf(')');
    var ip = entry.slice(ip_start + 1, ip_end);
    arp_obj['ip'] = ip;

    // Get the Corresponding MAC Addres by splitting
    var mac = entry.split(' ')[3];

    // make sure MAC addresses are in lowercase
    mac = mac.toLowerCase();

    // make sure octets have a leading zero
    var mac_splited = mac.split(":");
    for(var i in mac_splited) {
      if(mac_splited.hasOwnProperty(i)) {
        if(mac_splited[i].length == 1) {
          mac_splited[i] = "0" + mac_splited[i];
        }
      }
    }

    // join octets again
    mac = mac_splited.join(":");

    arp_obj['mac'] = mac;

    arp_arr.push(arp_obj);
  }

return arp_arr;
}

exports.fetch = get_arp_table;