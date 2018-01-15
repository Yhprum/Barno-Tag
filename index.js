var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require("path");

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket) {
    console.log("connected");
});

http.listen(process.env.PORT || 3000, function() {
    console.log('listening on *:3000');
});
