$(document).ready(function() {
    // Game variables
    var context = document.getElementById('canvas').getContext("2d");

    canvas = document.getElementById('canvas');
    canvas.setAttribute('width', '1024');
    canvas.setAttribute('height', '704');
    
    var maze = new Image();
    maze.src = "images/mazeBig.png";
    maze.onload = function () {
        context.drawImage(maze, 0, 0, 1024, 704);
    }
    context.fillStyle = "red";

    var map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];


    var socket = io();
    //user variables
    var up = 0, down = 0, left = 0, right = 0;
    socket.on('test', function() {
        console.log('test')
    })

    socket.on('start', function(users, usernum) {
        console.log(users)
        console.log(usernum)
        var direction = [0, 0];
        document.onkeydown = function(e) {
            e = e || window.event;
            if (e.keyCode == '38') {
                up = 1
                down = 0
                left = 0
                right = 0
            } else if (e.keyCode == '40') {
                up = 0
                down = 1
                left = 0
                right = 0
            } else if (e.keyCode == '37') {
                up = 0
                down = 0
                left = 1
                right = 0
            } else if (e.keyCode == '39') {
                up = 0
                down = 0
                left = 0
                right = 1
            }
        }
        document.onkeyup = function(e) {
            e = e || window.event;
            if (e.keyCode == '38') up = 0
            else if (e.keyCode == '40') down = 0
            else if (e.keyCode == '37') left = 0
            else if (e.keyCode == '39') right = 0
        }
        function move(mdirection) {
            context.drawImage(maze, 0, 0, 1024, 704);
            for (let j = 0; j < Object.keys(users).length; j++) {
                if (users[j]['moving']) {
                    context.fillRect(users[j]['oldx']*64 + users[j]['i']*mdirection[0] + 16, users[j]['oldy']*64 + users[j]['i']*mdirection[1] + 16, 32, 32);
                    if (users[j]['i']++ >= 64) {
                        updatePosition(j);
                    }
                } else {
                    context.fillRect(users[j]['x']*64 + 16, users[j]['y']*64 + 16, 32, 32);
                }
            }
        }
        window.setInterval(update, 5); // change to global speed for easy changing?

        function update() {
            if (!users[usernum]['moving'] && (up||down||left||right)) {
                if (map[users[usernum]['y'] + down - up][users[usernum]['x'] + right - left] == 0) {
                    direction = [right-left, down-up];
                    users[usernum]['x'] += direction[0];
                    users[usernum]['y'] += direction[1];
                    socket.emit('move', users[usernum]['x'], users[usernum]['y'], usernum);
                    users[usernum]['moving'] = 1;
                }
            } else {
                move(direction);
            }
        }
        function updatePosition(j) {
            users[j]['i'] = 0;
            users[j]['moving'] = 0;
            users[j]['oldx'] = users[j]['x'];
            users[j]['oldy'] = users[j]['y'];
        }
        socket.on('move', function(x1, y1, user) {
            users[user]['x'] = x1;
            users[user]['y'] = y1;
            users[user]['moving'] = 1;
        });
    });
});