var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require("path");

var users = 0;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket) {
    console.log(++users + " users connected");
    socket.on('move', function(x, y) {
        // emit position to other players
    });
    socket.on('disconnect', function(){
        console.log(--users + " users connected");
    });
});

http.listen(process.env.PORT || 3000, function() {
    console.log('listening on *:3000');
});
