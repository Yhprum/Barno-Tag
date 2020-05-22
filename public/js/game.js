$(document).ready(function() {
    // Game variables
    const context = document.getElementById('canvas').getContext("2d");

    let canvas = document.getElementById('canvas');
    canvas.setAttribute('width', '1024');
    canvas.setAttribute('height', '704');
    
    const maze = new Image();
    maze.src = "images/mazeBig.png";
    maze.onload = function () {
        context.drawImage(maze, 0, 0, 1024, 704);
    };
    context.fillStyle = "red";

    const map = [
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


    const socket = io();
    //user variables
    let up = 0, down = 0, left = 0, right = 0;
    socket.on('test', function() {
        console.log('test')
    });

    socket.on('start', function(users, usernum) {
        console.log(users);
        console.log(usernum);
        let direction = [0, 0];
        document.onkeydown = function(e) {
            e = e || window.event;
            if (e.keyCode === 38) {
                up = 1;
                down = 0;
                left = 0;
                right = 0;
            } else if (e.keyCode === 40) {
                up = 0;
                down = 1;
                left = 0;
                right = 0;
            } else if (e.keyCode === 37) {
                up = 0;
                down = 0;
                left = 1;
                right = 0;
            } else if (e.keyCode === 39) {
                up = 0;
                down = 0;
                left = 0;
                right = 1;
            }
        };
        document.onkeyup = function(e) {
            e = e || window.event;
            if (e.keyCode === 38) up = 0;
            else if (e.keyCode === 40) down = 0;
            else if (e.keyCode === 37) left = 0;
            else if (e.keyCode === 39) right = 0;
        };
        function move() {
            context.drawImage(maze, 0, 0, 1024, 704);
            for (let j = 0; j < Object.keys(users).length; j++) {
                if (users[j]['moving']) {
                    // debugger
                    context.fillRect(users[j]['oldx']*64 + users[j]['i']*users[j].direction[0] + 16, users[j]['oldy']*64 + users[j]['i']*users[j].direction[1] + 16, 32, 32);
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
            let user = users[usernum];
            if (!user['moving'] && (up||down||left||right)) {
                if (map[user['y'] + down - up][user['x'] + right - left] === 0) {
                    direction = [right-left, down-up];
                    user['x'] += direction[0];
                    user['y'] += direction[1];
                    socket.emit('move', user['x'], user['y'], direction, usernum);
                    user['direction'] = direction;
                    user['moving'] = 1;
                }
            } else {
                move();
            }
        }
        function updatePosition(j) {
            users[j]['i'] = 0;
            users[j]['moving'] = 0;
            users[j]['oldx'] = users[j]['x'];
            users[j]['oldy'] = users[j]['y'];
        }
        socket.on('move', function(x1, y1, direction, user) {
            users[user]['x'] = x1;
            users[user]['y'] = y1;
            users[user]['direction'] = direction;
            users[user]['moving'] = 1;
        });
    });
});