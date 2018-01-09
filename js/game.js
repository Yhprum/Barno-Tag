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
    var x = 1;
    var y = 1;
    var i = 0;
    var moving = false;
    var direction = [0, 0];
    var movingDirection = [0, 0];

    document.onkeydown = function(e) {
        e = e || window.event;
        if (e.keyCode == '38' && map[y-1][x] == 0) { // up
            y--;
            direction = [0, -1];
        } else if (e.keyCode == '40' && map[y+1][x] == 0) { // down
            y++;
            direction = [0, 1];
        } else if (e.keyCode == '37' && map[y][x-1] == 0) { // left
           x--;
           direction = [-1, 0];
        } else if (e.keyCode == '39' && map[y][x+1] == 0) { // right
           x++;
           direction = [1, 0];
        }
    }
    function move(direction) {
        context.drawImage(maze, 0, 0, 1024, 704);
        context.fillRect(x*64 + i*direction[0], y*64 + i*direction[1], 64, 64)
        i++;
    }
    window.setInterval(update, 5); // change tp global speed for easy changing?

    function update() {
        if (!moving && (direction[0] || direction[1])) {
            move(direction);
            moving = true;
            movingDirection = direction;
        } else if (movingDirection[0] || movingDirection[1]) {
            move(movingDirection);
        }
    }
});