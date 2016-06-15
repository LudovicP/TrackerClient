var tessel = require('tessel');
var gpsLib = require('gps-a2235h');

var gps = gpsLib.use(tessel.port['A']);
var sha1 = require('sha1');
var Client = require('node-rest-client').Client;
var fs;

fs = require('fs');

var config = JSON.parse(fs.readFileSync("config.json"));


var client = new Client();



// Wait until the module is connected
gps.on('ready', function () {
  console.log('GPS module powered and ready. Waiting for satellites...');
  // Emit coordinates when we get a coordinate fix
  gps.on('coordinates', function (coords) {
    console.log('Lat:', coords.lat, '\tLon:', coords.lon, '\tTimestamp:', coords.timestamp);
    
  var now = Date.now();

      var args = {
      data: {
      "objectId" : config.objectId,
      "date" : now,
      "longitude" : coords.lon,
      "latitude" : coords.lat
  },
      headers: {  "Content-Type": "application/json",
                  "Authorization" : sha1(config.token+now)}
  };

  client.registerMethod("postMethod", server, "POST");


  client.methods.postMethod(args, function (data, response) {
      console.log(response);
  });  
});

  // Emitted when we have information about a fix on satellites
  gps.on('fix', function (data) {
    console.log(data.numSat, 'fixed.');
  });

  gps.on('dropped', function(){
    // we dropped the gps signal
    console.log("gps signal dropped");
  });
});

gps.on('error', function(err){
  console.log("got this error", err);
});