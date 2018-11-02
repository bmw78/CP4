// $(function() {
//     // ...
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var forward = true;
var imageObj = new Image();
var cp = 00; // currentposition
var cur = { x: 0, y: 0, direc: 1 };

document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", keyDownHandler, false);



console.log("Initial Direction");
console.log(cur.direc);
imageObj.onload = function() {
    ctx.drawImage(imageObj, 0, 0);
};
imageObj.src = 'Walk2.gif';

function keyDownHandler(e) {
    if (e.keyCode == 38) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        imageObj.src = 'Walk2.gif';
    }
}





function keyUpHandler(e) {

    if (e.keyCode == 39) { // Rigth
        if (cur.direc === 3) {
            cur.direc = 0;
        }
        else {
            cur.direc += 1;
        }
        if (move(cur.x, cur.y, cur.direc)) {
            displayPath(true);
        }
        else {
            displayPath(false);
        }

    }
    else if (e.keyCode == 37) { // Left 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        imageObj.src = 'Hall.png';
        if (cur.direc === 0) {
            cur.direc = 3;
        }
        else {
            cur.direc -= 1;
        }
        if (move(cur.x, cur.y, cur.direc)) {
            displayPath(true);
        }
        else {
            displayPath(false);
        }
    }
    else if (e.keyCode == 38) { // Forward
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (move(cur.x, cur.y, cur.direc)) {
            updatePosition(cur.direc);
            displayPath(true);
        }
        else {
            displayPath(false);
            console.log("it returned false");
        }
        //imageObj.src = 'Wall.png';
    }
    console.log("Direction");
    console.log(cur.direc);
    console.log(cur);
    UpdateInfo();
}


function displayPath(e) {
    if (e) { // THERE IS A PATH
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        imageObj.src = 'Hall.png';
    }
    else { // THERE IS A WALL
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        imageObj.src = 'Wall.png';
    }

}


function updatePosition(dir) {
    switch (dir) {
        case 0:
            cur.y += 1;
            break;
        case 1:
            cur.x += 1;
            break;
        case 2:
            cur.y -= 1;
            break;
        case 3:
            cur.x -= 1;
            break;
    }
}



/* For direction, it is defined as 
    North = 0
    East = 1
    South = 2
    West = 3 
 */
function move(x, y, dir) {
    if (startTime == null)
    {
        StartTimer();
    }
    
    switch (x) {
        case 0:
            switch (y) {
                case 0:
                    if (dir != 1) { return false; }
                    else { return true; }
                    break;
                case 1:
                    if (dir != 0) { return false; }
                    else { return true; }
                    break;
                case 2:
                    if (dir != 3) { return true; }
                    else { return false; }
                    break;
                case 3:
                    if (dir != 2) { return false; }
                    else { return true; }
                    break;
            }
            break;
        case 1:
            switch (y) {
                case 0:
                    if (dir != 2) { return true; }
                    else { return false; }
                    break;
                case 1:
                    //console.log("HERE")
                    console.log(dir);;
                    if ((dir === 2) || (dir === 0)) { return true; }
                    else { return false; }
                    break;
                case 2:
                    if (dir != 1) { return true; }
                    else { return false; }
                    break;
                case 3:
                    if (dir === 1 || dir === 2) { return true; }
                    else { return false; }
                    break;
            }
            break;
        case 2:
            switch (y) {
                case 0:
                    if (dir != 3) { return false; }
                    else { return true; }
                    break;
                case 1:
                    if (dir === 0 || dir === 1) { return true; }
                    else { return false; }
                    break;
                case 2:
                    if (dir === 0 || dir === 2) { return true; }
                    else { return false; }
                    break;
                case 3:
                    if (dir === 3 || dir === 2) { return true; }
                    else { return false; }
                    break;
            }
            break;
        case 3:
            switch (y) {
                case 0:
                    if (dir != 0) { return false; }
                    else { return true; }
                    break;
                case 1:
                    if (dir != 1) { return true; }
                    else { return false; }
                    break;
                case 2:
                    if (dir === 0 || dir === 2) { return true; }
                    else { return false; }
                    break;
                case 3:
                    if (dir === 1) {
                        console.log("You Win");
                        window.location = "../index.html?time=" + EndTimer();
                        return true;
                    }
                    else if (dir === 2) {
                        return true;
                    }
                    else {
                        return false;
                    }
                    break;
            }
            break;
    }
}


// });

var startTime, endTime;

function StartTimer()
{
    startTime = new Date();
}

function EndTimer() {
    endTime = new Date();
    var timeDifference = endTime - startTime;
    
    timeDifference /= 1000;
    
    var seconds = Math.round(timeDifference);
    return seconds;
}

function UpdateInfo()
{
    document.getElementById("currentPosition").innerHTML = cur.x + ", " + cur.y;
    
    var directionString;
    var directionNum = cur.direc;
    
    if (directionNum == "0")
    {
        directionString = "North";
    }
    else if (directionNum == "1")
    {
        directionString = "East";
    }
    else if (directionNum == "2")
    {
        directionString = "South";
    }
    else if (directionNum == "3")
    {
        directionString = "West";
    }
    
    document.getElementById("currentDirection").innerHTML = directionString;
}