// @ts-nocheck
var colCan = document.getElementById("Canvas");

var mouseDown = false,
    mouseLeft = false,
    mouseRight = false,
    mouseClicked = false,
    mouseDBLClicked = false;

var colMouseX, colMouseY;

function init() {
    document.addEventListener("mousemove", on_mousemove, false);
    document.addEventListener("click", on_click, false);
    document.addEventListener("dblclick", dblClick, false);
    document.addEventListener("mousedown", mousedown, false);
    document.addEventListener("mouseup", mouseup, false);

    document.addEventListener("keydown", keyDown, false);
    document.addEventListener("keyup", keyUp, false);

    window.setInterval(colDraw, 100);
    console.log("INITIATE");
}

function colDraw() {

    var c = colCan.getContext("2d");

    c.clearRect(0, 0, colCan.width, colCan.height);
    var mouseX = colMouseX;
    var mouseY = colMouseY;

    //DO STUFF HERE
    var v0 = new Vec(100, 0, 100);
    var v1 = new Vec(150, 0, 200);
    var v3 = new Vec(mouseX, 0, mouseY);
    var v2 = new Vec(400, 0, 50);
    c.beginPath();
    c.strokeStyle = rgb(0, 0, 0);
    if(triBarycentricCollision(new Tri(v0, v1, v2), v3)) {
        c.strokeStyle = rgb(100, 255, 0);
    }
    
    c.moveTo(v0.x, v0.z);
    c.lineTo(v1.x, v1.z);
    c.lineTo(v2.x, v2.z);
    c.lineTo(v0.x, v0.z);
    c.stroke();
    c.fillStyle = rgb(255, 0, 0);
    var max = AREATIME + BARYCENTRICTIME + SAMESIDETIME;
    // c.fillText(Math.floor((AREATIME / max) * 1000) / 10 + "%", 20, 400);
    c.fillText(AREATIME, 20, 400);
    c.fillText(BARYCENTRICTIME, 20, 410);
    // c.fillText(Math.floor((BARYCENTRICTIME / max) * 1000) / 10 + "%", 20, 410);
    c.fillText(Math.floor((SAMESIDETIME / max) * 1000) / 10 + "%", 20, 420);

    mouseClicked = false;
    mouseDBLClicked = false;
}

function rgb(r, g, b) {
    return "rgb(" + Math.min(Math.max(r, 0), 255) + ", " + Math.min(Math.max(g, 0), 255) + ", " + Math.min(Math.max(b, 0), 255) + ")";
}

function rgba(r, g, b, a) {
    return "rgba(" + Math.min(Math.max(r, 0), 255) + ", " + Math.min(Math.max(g, 0), 255) + ", " + Math.min(Math.max(b, 0), 255) + ", " + Math.min(Math.max(a, 0), 255) + ")";
}

function dist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function col(x1, y1, w1, h1, x2, y2, w2, h2) {
    var b1 = (x1 + w1 > x2);
    var b2 = (x1 < x2 + w2);
    var b3 = (y1 + h1 > y2);
    var b4 = (y1 < y2 + h2);
    return b1 && b2 && b3 && b4;
}

function move(ev) {
    var x, y;

    x = ev.pageX - colCan.offsetLeft;
    y = ev.pageY - colCan.offsetTop;

    colMouseX = x;
    colMouseY = y;
}

function click(e) {
    console.log(colMouseX, colMouseY, e.button);

    mouseClicked = true;
}

function dblClick(e) {
    mouseDBLClicked = true;
}

function on_mousemove(ev) {
    move(ev);
}

function mousedown(ev) {
    mouseDown = true;
}

function mouseup(ev) {
    mouseDown = false;
    mouseClicked = false;
}

function on_click(e) {
    click(e);
}

function keyDown(e) {
    console.log("Key pressed: ", e.key, e.keyCode)
    keys[e.keyCode] = true;
    keyPressed = true;
    currentKey = e.key;
}

function keyUp(e) {
    keys[e.keyCode] = false;
    keyPressed = false;
}

$("document").ready(new function () {
    init();
    colDraw();
});