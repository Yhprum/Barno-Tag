var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require("path");

var users = 0;
var usernums  = [];
var game = [];

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket) {
    usernums[users] = socket.id;
    game[users] = {
        x: 1,
        y: 1,
        oldx: 1,
        oldy: 1,
        i: 0,
        moving: 0,
        direction: 0
    }
    console.log(++users + " users connected");
    if (users == 3) {
        console.log('starting')
        for (var i = 0; i < users; i++) {
            io.to(usernums[i]).emit('start', game, i)
        };
    }
    socket.on('move', function(x, y, usernum) {
        socket.broadcast.emit('move', x, y, usernum)
    });
    socket.on('disconnect', function(){
        console.log(--users + " users connected");
    });
});

http.listen(process.env.PORT || 3000, function() {
    console.log('listening on *:3000');
});
