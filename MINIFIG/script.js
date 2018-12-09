var can = document.getElementById("canvas");

var mouseDown = false, mouseLeft = false, mouseRight = false, mouseClicked = false, mouseDBLClicked = false;

var keyTyped = false, keyPressed = false;
var keys = [false], currentKey = "w";

var PLAYER = new Player(0, 0);

var enemies;

var teste = new exenemy(100, 100, 2);

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
        kode.w=keys[87];
        kode.a=keys[65];
        kode.s=keys[83];
        kode.d=keys[68];
        kode.space=keys[32];
        
        kode.arrowright=keys[39]||kode.d;
        kode.arrowleft=keys[37]||kode.a;
        kode.arrowup=keys[38]||kode.w;
        kode.arrowdown=keys[40]||kode.s;
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
    
    enemies = [];
    for(var i = 0; i<5; i++) {
        enemies[i] = new enemy(Math.random()*can.width, Math.random()*can.height);
    }
}

function draw(){
    
    var c = can.getContext("2d");
    
    c.canvas.width  = window.innerWidth;
    c.canvas.height = window.innerHeight;
    
    c.clearRect(0, 0, can.width, can.height);
    c.fillRect(0,0,can.width,can.height);
    
    c.fillStyle="rgb(100, 100, 100)";
    for(var i = 0; i<can.width; i+=can.width/10) {
        for(var j = 0; j<can.height; j+=can.height/10) {
            roundRect(c, i, j, can.width/10, can.height/10, 10, true, false);
            c.strokeStyle="#f0f0f0";
            roundRect(c, i+2, j+2, can.width/10-1, can.height/10-1, 10);
            c.strokeStyle="#000000";
            roundRect(c, i, j, can.width/10, can.height/10, 10);
            roundRect(c, i+1, j+1, can.width/10, can.height/10, 10);
        }
    }
    
    //DO STUFF HERE
    kode.set();
    
    PLAYER.tick();
    PLAYER.render(c);
    
    for(var i = 0; i<enemies.length; i++) {
        enemies[i].tick();
        enemies[i].render(c);
    }
    teste.tick();
    teste.render(c);
    
    mouseClicked=false;
    mouseDBLClicked=false;
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }

}

function grid(num, gridsize) {
    return Math.round(num/gridsize) * gridsize;
}

function rgb(r, g, b){
    return "rgb("+Math.min(Math.max(r, 0), 255)+", "+Math.min(Math.max(g, 0), 255)+", "+Math.min(Math.max(b, 0), 255)+")";
}

function rgba(r, g, b, a){
    return "rgba("+Math.min(Math.max(r, 0), 255)+", "+Math.min(Math.max(g, 0), 255)+", "+Math.min(Math.max(b, 0), 255)+", "+Math.min(Math.max(a, 0), 255)+")";
}

function dist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2-x1, 2)+Math.pow(y2-y1, 2));
}

function col(x1, y1, w1, h1, x2, y2, w2, h2) {
    var b1 = (x1+w1>x2);
    var b2 = (x1<x2+w2);
    var b3 = (y1+h1>y2);
    var b4 = (y1<y2+h2);
    return b1 && b2 && b3 && b4;
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