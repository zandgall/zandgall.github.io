var can = document.getElementById("Canvas");

var mouseDown = false, mouseLeft = false, mouseRight=false, mouseClicked = false, mouseDBLClicked = false;

var keyTyped=false, keyPressed=false;
var keys = [false], currentKey = "w";




var kode = {
    arrowright: false,
    arrowleft: false,
    arrowup: false,
    arrowdown: false,
    a: false,
    d: false,
    s: false,
    w: false,
    space: false,
    
    set: function() {
        kode.arrowright=keys[39];
        kode.arrowleft=keys[37];
        kode.arrowup=keys[38];
        kode.arrowdown=keys[40];
        
        kode.w=keys[87];
        kode.a=keys[65];
        kode.s=keys[83];
        kode.d=keys[68];
        kode.space=keys[32];
    }
}

function init() {
    document.addEventListener("mousemove", on_mousemove, false);
    document.addEventListener("click", on_click, false);
    document.addEventListener("dblclick", dblClick, false);
    document.addEventListener("mousedown", mousedown, false);
    document.addEventListener("mouseup", mouseup, false);
    
    document.addEventListener("keydown", keyDown, false);
    document.addEventListener("keyup", keyUp, false);
    
    window.setInterval(draw, 100);
    console.log("INITIATE");
}

function draw(){
    
    var c = can.getContext("2d");
    
    c.canvas.width  = window.innerWidth;
    c.canvas.height = window.innerHeight;
    
    c.clearRect(0, 0, can.width, can.height);
    
    //DO STUFF HERE
    kode.set();
    
    c.fillStyle="#0000ff";
    if(mouseDBLClicked)
        c.fillStyle="#00ff00";
    else if(mouseClicked)
        c.fillStyle="#00ffff";
    else if(mouseDown)
        c.fillStyle="#ff00ff";
    else if(kode.a)
        c.fillStyle="#ffff00";
    c.fillRect(0, 0, 100, 100);
    
    mouseClicked=false;
    mouseDBLClicked=false;
}

function move(ev) {
    var x, y;
                    
    x = ev.pageX-can.offsetLeft;
    y = ev.pageY-can.offsetTop;
    
    mouseX=x;
    mouseY=y;
}
function click(e) {
    console.log(mouseX, mouseY, e.button);
    
    mouseClicked=true;
}   
function dblClick(e) {
    mouseDBLClicked=true;
}           
function on_mousemove(ev) {
    move(ev);
}
function mousedown(ev) {
    mouseDown=true;
}
function mouseup(ev){
    mouseDown=false;
    mouseClicked=false;
}           
function on_click(e) {
    click(e);
}
function keyDown(e) {
    console.log("Key pressed: ", e.key, e.keyCode)
    keys[e.keyCode]=true;
    keyPressed=true;
    currentKey=e.key;
}
function keyUp(e) {
    keys[e.keyCode]=false;
    keyPressed=false;
}

window.onload = function() {
    init();
    draw();
}