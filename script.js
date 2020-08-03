
const clock = document.getElementById("clock");
let ctx = clock.getContext("2d");
let r = .9 * clock.width / 2;
let img = new Image();
img.src = "flag.png";
ctx.translate(clock.width / 2, clock.height / 2);

drowFace();

img.onload = function () {
    setInterval(() => { drowFace(); drowHands(); }, 1000);
}

function drowHands() {
    let time = new Date();
    let hour = time.getHours() % 12;
    let minute = time.getMinutes();
    let second = time.getSeconds();

    hour = hour * Math.PI / 6 + minute * Math.PI / 360;
    minute = minute * Math.PI / 30 + second * Math.PI / 1800;
    second *= Math.PI / 30;

    hand(hour, .5 * r, .07 * r, "#333");
    hand(minute, .8 * r, .07 * r, "#333");
    hand(second, .9 * r, .02 * r, "#333");
}

function hand(angle, length, size, color) {
    ctx.rotate(angle);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -length);
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.rotate(-angle);
}

function drowFace() {
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, 2 * Math.PI);
    ctx.fillStyle = "#FFF";
    ctx.fill();
    ctx.lineWidth = .1 * r;
    var grd = ctx.createRadialGradient(0, 0, .95 * r, 0, 0, 1.05 * r);
    grd.addColorStop(0, '#333');
    grd.addColorStop(.5, '#FFF');
    grd.addColorStop(1, '#333');
    ctx.strokeStyle = grd;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, .05 * r, 0, 2 * Math.PI);
    ctx.fillStyle = "#333";
    ctx.fill();

    ctx.font = r * 0.15 + "px Arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (i = 1; i <= 12; i++) {
        ctx.rotate(i * Math.PI / 6);
        ctx.translate(0, -.85 * r);
        ctx.rotate(-i * Math.PI / 6);
        ctx.fillText(i, 0, 0);
        ctx.rotate(i * Math.PI / 6);
        ctx.translate(0, .85 * r);
        ctx.rotate(-i * Math.PI / 6);
    }

    ctx.drawImage(img, -.2 * r, .2 * r, .4 * r, .4 * r);
}