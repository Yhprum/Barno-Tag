$(document).ready(function() {
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
    var x = 1;
    var y = 1;

    document.onkeydown = function(e) {
        e = e || window.event;

        if (e.keyCode == '38' && map[y-1][x] == 0) {
            y--;
            move('up');
        } else if (e.keyCode == '40' && map[y+1][x] == 0) {
            y++;
            move('down');
        } else if (e.keyCode == '37' && map[y][x-1] == 0) {
           x--;
           move('left');
        } else if (e.keyCode == '39' && map[y][x+1] == 0) {
           x++;
           move('right');
        }
    }
    function move(direction) {
        context.drawImage(maze, 0, 0, 1024, 704);
        context.fillRect(x*64, y*64, 64, 64)
    }
});