const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require("path");

let users = 0;
const usernums  = [];
const game = [];

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
    };
    console.log(++users + " users connected");
    if (users === 2) {
        console.log('starting');
        for (var i = 0; i < users; i++) {
            io.to(usernums[i]).emit('start', game, i)
        }
    }
    socket.on('move', function(x, y, direction, usernum) {
        socket.broadcast.emit('move', x, y, direction, usernum);
    });
    socket.on('disconnect', function(){
        console.log(--users + " users connected");
    });
});

http.listen(process.env.PORT || 3000, function() {
    console.log('listening on *:3000');
});
