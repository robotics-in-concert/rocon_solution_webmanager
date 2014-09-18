var app = require('http').createServer(handler), 
    io = require('C:/Users/goodB2/AppData/Roaming/npm/node_modules/socket.io').listen(app), 
    fs = require('fs'); //,
    //firmata = require('C:/Users/goodB2/AppData/Roaming/npm/node_modules/firmata'),
    //board = new firmata.Board('COM5', arduinoReady);

/*
var ledPin = 13;
 
function arduinoReady(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Firmware: ' + board.firmware.name 
      + '-' + board.firmware.version.major 
      + '.' + board.firmware.version.minor);
 
    var ledOn = true;
    board.pinMode(ledPin, board.MODES.OUTPUT);
}
*/ 
app.listen(8080);
console.log("Listening on http://localhost:8080...");
 
// directs page requests to html files
/*-------------------------------------------------
1xx : Information, 2xx : Success, 3xx : Redirection
4xx : Client Error, 5xx : Server Error
-------------------------------------------------*/ 
function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500); 
      return res.end('Error loading index.html');
    }
 
    res.writeHead(200); 
    res.end(data);
  });
}
 
// this handles socket.io comm from html files
 
io.sockets.on('connection', function(socket) {
    socket.send('connected...');
 
    socket.on('message', function(data) {
        if (data == 'turn on') {
            console.log('+');
            //board.digitalWrite(ledPin, board.HIGH);
            socket.broadcast.send("let there be light!");
        }
        if (data == 'turn off') {
            console.log('-');
            //board.digitalWrite(ledPin, board.LOW);
            socket.broadcast.send("who turned out the light?");
        }
        return;
    });
 
    socket.on('disconnect', function() {
        socket.send('disconnected...');
    });
});
