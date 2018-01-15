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
    var x = 1;
    var y = 1;
    var oldx = 1
    var oldy = 1;
    var i = 0;
    var moving = false;
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
        context.fillRect(oldx*64 + i*mdirection[0], oldy*64 + i*mdirection[1], 64, 64)
        if (i++ >= 64) {
            updatePosition()
        }
    }
    window.setInterval(update, 5); // change tp global speed for easy changing?

    function update() {
        if (!moving && (up||down||left||right)) {
            if (map[y + down - up][x + right - left] == 0) {
                direction = [right-left, down-up]
                x += direction[0];
                y += direction[1];
                move(direction);
                moving = true;
            }
        } else if (moving) {
            move(direction);
        }
    }
    function updatePosition() {
        i = 0;
        moving = false;
        oldx = x;
        oldy = y;
    }
});