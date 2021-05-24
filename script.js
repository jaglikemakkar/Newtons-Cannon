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
var trailCanvas = document.getElementById("trailCanvas");
var context = canvas.getContext("2d");
var trailContext = trailCanvas.getContext("2d")
context.beginPath();
trailContext.beginPath();
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
var stats = document.getElementById("stats");

function drawProjectile() {
    context.beginPath();
    context.arc(pixelX, pixelY, 5, 0, 2 * Math.PI);
    gradient = context.createRadialGradient(pixelX - 1, pixelY - 2, 1, pixelX, pixelY, 5);
    gradient.addColorStop(0, "#ffd0d0");
    gradient.addColorStop(1, "#ff0000");
    context.fillStyle = gradient;
    context.fill();
    trailContext.fillStyle = "red";
    trailContext.fillRect(pixelX-0.5, pixelY-0.5, 1, 1);
}

function clearTrails() {
    trailContext.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
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
    // console.log(pixelX, pixelY, x, y);

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawProjectile();
    updateStats();
    if (r > earthRadius && pixelX <= screen.width && pixelY <= screen.height && x != NaN) {
        timer = window.setTimeout(moveProjectile, 10);
    }
}

function updateStats(){
    var html = `
    <h3>Statistics</h3>
    <p>G: ${newtonG} Nm^2/kg^2</p>
    <p>M: ${earthMass} kg</p>
    <p>R: ${earthRadius/1000} km</p>
    <p>X: ${Math.round(x/100000)*100} km</p>
    <p>Y: ${Math.round(y/100000)*100} km</p>
    <p>Vx: ${Math.round(vx/100)*100} mps</p>
    <p>Vy: ${Math.round(vy/100)*100} mps</p>
    <p>Ax: ${Math.round(ax*10)/10} m/s^2</p>
    <p>Ay: ${Math.round(ay*10)/10} m/s^2</p>`

    stats.innerHTML = html;
}

function stopSimulation(){
    console.log("HHHH")
    window.clearTimeout(timer);
}

function fireProjectile() {
    window.clearTimeout(timer);
    x = 0;
    y = earthRadius + mountainHeight;
    vx = Number(speedSlider.value);
    vy = 0;
    moveProjectile();
}

function showSpeed() {
    speedReadout.innerHTML = speedSlider.value;
}