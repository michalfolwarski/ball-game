var myPlayground = undefined;
var mainBall = undefined;
var mainBallInitialSize = 100;
var mainBallSize = mainBallInitialSize;
var mainBallLeft = undefined;
var mainBallTop = undefined;
var mainScore = 0;
var speed = 20;

var cssColors = ['AliceBlue','AntiqueWhite','Aqua','Aquamarine','Azure','Beige','Bisque','Black','BlanchedAlmond','Blue','BlueViolet','Brown','BurlyWood','CadetBlue','Chartreuse','Chocolate','Coral','CornflowerBlue','Cornsilk','Crimson','Cyan','DarkBlue','DarkCyan','DarkGoldenRod','DarkGray','DarkGrey','DarkGreen','DarkKhaki','DarkMagenta','DarkOliveGreen','DarkOrange','DarkOrchid','DarkRed','DarkSalmon','DarkSeaGreen','DarkSlateBlue','DarkSlateGray','DarkSlateGrey','DarkTurquoise','DarkViolet','DeepPink','DeepSkyBlue','DimGray','DimGrey','DodgerBlue','FireBrick','FloralWhite','ForestGreen','Fuchsia','Gainsboro','GhostWhite','Gold','GoldenRod','Gray','Grey','Green','GreenYellow','HoneyDew','HotPink','IndianRed','Indigo','Ivory','Khaki','Lavender','LavenderBlush','LawnGreen','LemonChiffon','LightBlue','LightCoral','LightCyan','LightGoldenRodYellow','LightGray','LightGrey','LightGreen','LightPink','LightSalmon','LightSeaGreen','LightSkyBlue','LightSlateGray','LightSlateGrey','LightSteelBlue','LightYellow','Lime','LimeGreen','Linen','Magenta','Maroon','MediumAquaMarine','MediumBlue','MediumOrchid','MediumPurple','MediumSeaGreen','MediumSlateBlue','MediumSpringGreen','MediumTurquoise','MediumVioletRed','MidnightBlue','MintCream','MistyRose','Moccasin','NavajoWhite','Navy','OldLace','Olive','OliveDrab','Orange','OrangeRed','Orchid','PaleGoldenRod','PaleGreen','PaleTurquoise','PaleVioletRed','PapayaWhip','PeachPuff','Peru','Pink','Plum','PowderBlue','Purple','RebeccaPurple','Red','RosyBrown','RoyalBlue','SaddleBrown','Salmon','SandyBrown','SeaGreen','SeaShell','Sienna','Silver','SkyBlue','SlateBlue','SlateGray','SlateGrey','Snow','SpringGreen','SteelBlue','Tan','Teal','Thistle','Tomato','Turquoise','Violet','Wheat','White','WhiteSmoke','Yellow','YellowGreen'];


function ballGenerator() {
    var size = 50,
        color = 'green',
        top = 10,
        left = 10,
        newBall = document.createElement('div');

        top = myPlayground.offsetHeight * Math.random();
        left = myPlayground.offsetWidth * Math.random();
        size = Math.round(30 * Math.random()) + 25;
        var randomColor = Math.round(cssColors.length * Math.random());
        color = cssColors[randomColor];

    newBall.className = 'ball';
    newBall.style.color = cssColors[(randomColor + 19 ) % cssColors.length];
    newBall.style.width = size + 'px';
    newBall.style.height = size + 'px';
    newBall.style.backgroundColor = color;
    newBall.style.top = top + 'px';
    newBall.style.left = left + 'px';

    newBall.innerText = size;
    newBall.style.lineHeight = size + 'px';

    myPlayground.appendChild(newBall);
}

function manageInittialSizeOfMainBall(){
    mainBall.style.width = mainBallInitialSize + 'px';
    mainBall.style.height = mainBallInitialSize + 'px';

    mainBallTop = mainBall.offsetTop;
    mainBallLeft = mainBall.offsetLeft;

    mainBall.style.top = mainBallTop + 'px';
    mainBall.style.left = mainBallLeft + 'px';
}

function moveRight() {
    console.log('ball is moving Right');
    mainBallLeft += speed;
    mainBall.style.left = mainBallLeft + 'px';
}

function moveLeft() {
    console.log('ball is moving Left');
    mainBallLeft -= speed;
    mainBall.style.left = mainBallLeft + 'px';
}

function moveUp() {
    console.log('ball is moving Up');
    mainBallTop -= speed;
    mainBall.style.top = mainBallTop + 'px';
}

function moveDown() {
    console.log('ball is moving Down');
    mainBallTop += speed;
    mainBall.style.top = mainBallTop + 'px';
}

function checkCollision(){
    var balls = document.getElementsByClassName('ball');
    for (var i = 0; i < balls.length; i++){
        if (balls[i] == mainBall) {
            continue;
        }
        var dx = (mainBall.offsetLeft + mainBallInitialSize/2) - (balls[i].offsetLeft + balls[i].innerText/2);
        var dy = (mainBall.offsetTop + mainBallInitialSize/2) - (balls[i].offsetTop + balls[i].innerText/2);
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= (mainBallInitialSize / 2 + balls[i].innerText / 2 )){
          mainScore += 1*balls[i].innerText;
          document.getElementById('result').childNodes[1].innerText = mainScore;
          playground.removeChild(balls[i]);
        }
    }
}

function keyUpEventListener(ev) {
//     alert(ev.code);
    switch (ev.code) {
        case 'Space':
            ballGenerator();
            break;
        case 'ArrowRight':
        case 'KeyD':
            moveRight();
            break;
        case 'ArrowLeft':
        case 'KeyA':
            moveLeft();
            break;
        case 'ArrowUp':
        case 'KeyW':
            moveUp();
            break;
        case 'ArrowDown':
        case 'KeyS':
            moveDown();
            break;
        default:
            console.log(ev);
            break;
    }
    checkCollision();
}


var startMyApp = function() {
    myPlayground = document.getElementById('playground');
    mainBall = document.getElementById('main-ball');
    manageInittialSizeOfMainBall();
    document.addEventListener('keyup', keyUpEventListener);
};

window.onload = startMyApp;
setInterval(ballGenerator, 5000);
