$(document).ready(function() {
    var socket = io();
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

    //user variables
    var up = 0, down = 0, left = 0, right = 0;

    var maze = new Image();
    maze.src = "images/mazeBig.png";
    maze.onload = function () {
        context.drawImage(maze, 0, 0, 1024, 704);
    }

    socket.on('start', function() {
        var x = [1, 1];
        var y = [1, 1];
        var oldx = [1, 1];
        var oldy = [1, 1];
        var i = [0, 0];
        var moving = [0, 0];
        var direction = [0, 0];
        startGame(x, y, oldx, oldy, i, moving, direction);
    });

    function startGame(x, y, oldx, oldy, i, moving, direction) {
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
            for (let j = 0; j < moving.length; j++) {
                if (moving[j]) {
                    context.fillStyle = "red";
                    context.fillRect(oldx[j]*64 + i[j]*mdirection[0] + 16, oldy[j]*64 + i[j]*mdirection[1] + 16, 32, 32);
                    if (i[j]++ >= 64) {
                        updatePosition(j);
                    }
                } else {
                    context.fillRect(x[j]*64 + 16, y[j]*64 + 16, 32, 32);
                }
            }
        }
        window.setInterval(update, 5); // change to global speed for easy changing?

        function update() {
            if (!moving[0] && (up||down||left||right)) {
                if (map[y[0] + down - up][x[0] + right - left] == 0) {
                    direction = [right-left, down-up];
                    x[0] += direction[0];
                    y[0] += direction[1];
                    socket.emit('move', x[0], y[0]);
                    moving[0] = 1;
                }
            } else {
                move(direction);
            }
        }
        function updatePosition(j) {
            i[j] = 0;
            moving[j] = 0;
            oldx[j] = x[j];
            oldy[j] = y[j];
        }
        socket.on('move', function(x1, y1) {
            x[1] = x1;
            y[1] = y1;
        });
    }
});