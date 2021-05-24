var newtonG = 6.67e-11;
var earthMass = 5.97e24;
var dt = 5;
var earthRadius = 6371000;
var mountainHeight = earthRadius * 0.165;
var x, y, vx, vy, pixelX, pixelY, timer;
var r, accel, ax, ay;

x = 0;
y = earthRadius + mountainHeight;

var canvas = document.getElementById("theCanvas");
var context = canvas.getContext("2d");
context.beginPath();
var metersPerPixel = earthRadius / (0.355 * canvas.width);
pixelX = canvas.width / 2 + x / metersPerPixel;
pixelY = canvas.height / 2 - y / metersPerPixel;
context.arc(pixelX, pixelY, 5, 0, 2 * Math.PI);
var gradient = context.createRadialGradient(pixelX - 1, pixelY - 2, 1, pixelX, pixelY, 5);
gradient.addColorStop(0, "#ffd0d0");
gradient.addColorStop(1, "#ff0000");
context.fillStyle = gradient;
context.fill();

var speedSlider = document.getElementById("speedSlider");
var speedReadout = document.getElementById("speedReadout");


function drawProjectile() {
    context.beginPath();
    context.arc(pixelX, pixelY, 5, 0, 2 * Math.PI);
    gradient = context.createRadialGradient(pixelX - 1, pixelY - 2, 1, pixelX, pixelY, 5);
    gradient.addColorStop(0, "#ffd0d0");
    gradient.addColorStop(1, "#ff0000");
    context.fillStyle = gradient;
    context.fill();
}

function moveProjectile() {
    r = Math.sqrt(x * x + y * y);
    accel = newtonG * earthMass / (r * r);

    ax = -accel * x / r;
    ay = -accel * y / r;
    vx += ax * dt;
    vy += ay * dt;
    x += vx * dt;
    y += vy * dt;
    // console.log('h',x,y,vx,vy)
    var metersPerPixel = earthRadius / (0.355 * canvas.width);
    pixelX = canvas.width / 2 + x / metersPerPixel;
    pixelY = canvas.height / 2 - y / metersPerPixel;
    console.log(pixelX, pixelY, x, y);

    context.clearRect(0, 0, canvas.width, canvas.height)
    drawProjectile();
    if (r > earthRadius && pixelX <= canvas.width && pixelY <= canvas.height && x != NaN) {
        timer = window.setTimeout(moveProjectile, 1000 / 30);
    }
}

function fireProjectile() {
    window.clearTimeout(timer);
    x = 0;
    y = earthRadius + mountainHeight;
    vx = Number(speedSlider.value);
    vy = 0;
    console.log('hhhh', x, y);
    moveProjectile();
}

function showSpeed() {
    speedReadout.innerHTML = speedSlider.value;
}