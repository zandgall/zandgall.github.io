var socket = io();
socket.on('message', function(data) {
  console.log(data);
});

var thisplayer = {
    x: 122,
    y: 122,
    rotation: 0,
    point: 0,
    id: Math.random(),
    dead: false,
    points: 0,
    ticked: 0,
    health: 100,
    stamina: 100,
}

var movement = {
    up: false,
    down: false,
    left: false,
    right: false,
    d: false,
    a: false,
    space: false,
    shift: false,
}

var thisbullets = [
    {
    id:thisplayer.id,
    x: 300,
    y: 300,
    rotation: 0,
    dead: true,
    timer: 0,
    }
]

var WORLD;

socket.on('world', function(data){
    WORLD=data;
});

socket.emit('new player');

socket.on('disconnect', function(){
    thisplayer=null;
    socket.emit("player", thisplayer);
});

var rotMove = 0, poiMove = 0, yMove = 0;

var lastUpdateTime = (new Date()).getTime();

var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 800;
var context = canvas.getContext('2d');

var redtank = new Image();
var greentank = new Image();
var redtower = new Image();
var greentower = new Image();

redtank.src="static/redtank.png";
greentank.src="static/greentank.png";
redtower.src="static/redtower.png";
greentower.src="static/greentower.png";

var stoneTile = new Image();
var grass = new Image();
stoneTile.src = "static/StoneTile.png";
grass.src = "static/grass.png";

var maxSpeed = 1;
var staminadecrease = 0;

function draw(players) {
    var tx = 0;//Xwards physical Pixels per tile
    var ty = 0;//Ywards physical Pixels per tile
    var worldOffsetX = 0;
    var worldOffsetY = 0;
    if(WORLD!=null){
        tx = canvas.width/10;
        ty = canvas.height/10;
        
        worldOffsetX = Math.max(0, Math.min(thisplayer.x-canvas.width/2, WORLD.width*tx-canvas.width));
        worldOffsetY = Math.max(0, Math.min(thisplayer.y-canvas.height/2, WORLD.height*ty-canvas.height));
    }
    
    var currentTime = (new Date()).getTime();
    var diff = currentTime - lastUpdateTime;
    lastUpdateTime=currentTime;
    
    if(!thisplayer.dead) {
        if(movement.right){
            poiMove+=0.01*diff;
            poiMove = Math.min(poiMove, 4);
        } else if(movement.left) {
            poiMove-=0.01*diff;
            poiMove = Math.max(poiMove, -4);
        }

        if(movement.d){
            rotMove+=0.01*diff;
            rotMove = Math.min(rotMove, 4);
        } else if(movement.a) {
            rotMove-=0.01*diff;
            rotMove = Math.max(rotMove, -4);
        }

        if(movement.down){
            yMove+=0.01*diff;
            yMove = Math.min(yMove, 4);
        } else if(movement.up) {
            yMove-=0.01*diff;
            yMove = Math.max(yMove, -4);
        }

        thisplayer.rotation+=rotMove*(Math.PI/180);
        thisplayer.point+=poiMove*(Math.PI/180);
        thisplayer.x+=Math.cos(thisplayer.rotation)*yMove*maxSpeed;
        thisplayer.y+=Math.sin(thisplayer.rotation)*yMove*maxSpeed;
        
        if(movement.shift && thisplayer.stamina>0){
            if(maxSpeed<3)
                maxSpeed+=0.1;
            
            console.log(maxSpeed);
            
            thisplayer.stamina-=0.2;
            
            staminadecrease = 100;
        } else {
            if(maxSpeed>1)
                maxSpeed-=0.1;
            
            if(staminadecrease<=0 && thisplayer.stamina<100){
                thisplayer.stamina+=0.1;
            } else {
                staminadecrease--;
            }
        }
        
        if(leftCollision()){
            thisplayer.x = Math.floor((thisplayer.x/tx))*tx+width()/2;
        } else if(rightCollision()){
            thisplayer.x = Math.floor(((thisplayer.x+width())/tx))*tx-width()/2;
        }

        if(topCollision()) {
            thisplayer.y = Math.floor((thisplayer.y/ty))*ty+height()/2;
        } else if(bottomCollision()) {
            thisplayer.y = Math.floor(((thisplayer.y+height())/ty))*ty-height()/2;
        }
    //    if(collision(thisplayer.x+64-(48*Math.abs(Math.sin(thisplayer.rotation))), thisplayer.y-(32-16*Math.abs(Math.cos(thisplayer.rotation))))){
    //        thisplayer.x = Math.floor(thisplayer.x/tx)*tx-64-(32*Math.abs(Math.sin(thisplayer.rotation)));
    //        thisplayer.y = Math.floor(thisplayer.y/ty+1)*ty;
    //    }

    //    thisplayer.x+=xMove;
    //    thisplayer.y+=yMove;

        rotMove*=0.9;
        poiMove*=0.9;
        yMove*=0.9;

        if(movement.space) {
            movement.space=false;
            for(var i = 0; i<15; i++){
                if(thisbullets[i]==null){
                    thisbullets[i]={
                        x: 300,
                        y: 300,
                        rotation: 0,
                        dead: true,
                        timer: 0,
                        id:thisplayer.id,
                    };
                }
                if(thisbullets[i].dead){
                    thisbullets[i].dead = false;
                    thisbullets[i].rotation = thisplayer.rotation+thisplayer.point;
                    thisbullets[i].x=thisplayer.x-32*Math.cos(thisbullets[i].rotation);
                    thisbullets[i].y=thisplayer.y-32*Math.sin(thisbullets[i].rotation);
                    thisbullets[i].timer=0;
                    break;
                }
            }
        }
    }
    socket.emit('player', thisplayer);

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle="#00590a";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle='red';
    
    context.save();
    context.translate(-worldOffsetX, -worldOffsetY);
    
    if(WORLD!=null)
        for(var x = 0; x<WORLD.width; x++){
            for(var y = 0; y<WORLD.height; y++){
                if(x%2==0&&y%2==0) {
                    context.drawImage(grass, x*tx, y*ty, tx*2, ty*2);
                }
                if(WORLD.data[x+y*WORLD.width]){
//                    context.fillRect(x*tx, y*ty, tx, ty);
                    context.drawImage(stoneTile, x*tx, y*ty, tx, ty);
                }
            }
        }
    for (var id in players) {
        var player = players[id];
        if(player!=null&&!player.dead&&thisplayer.id!=player.id){
            context.save();
            context.translate(player.x, player.y);
            context.rotate(player.rotation-Math.PI);
            context.drawImage(redtank, -32, -16);
            context.rotate(player.point);
            context.drawImage(redtower, -32, -16);
            context.restore();
        }
    }
    
    if(!thisplayer.dead) {
        context.save();
        context.translate(thisplayer.x, thisplayer.y);
        context.rotate(thisplayer.rotation-Math.PI);
        context.drawImage(greentank, -32, -16);
        context.rotate(thisplayer.point);
        context.drawImage(greentower, -32, -16);
        context.restore();
    }
    context.restore();
    
    context.fillRect(10, 10, canvas.width-20, 20);
    context.fillStyle='green';
    context.fillRect(10, 10, (canvas.width-20)*Math.max(thisplayer.health/100.0, 0), 20);
    context.fillStyle='red';
    context.fillRect(10, 40, canvas.width-20, 20);
    context.fillStyle='blue';
    context.fillRect(10, 40, (canvas.width-20)*Math.max(thisplayer.stamina/100.0, 0), 20);
    
}

socket.on('killthybullet', function(j){
   thisbullets[j].dead=true; 
});

function bullets(bullets){
    
    var worldOffsetX = 0;
    var worldOffsetY = 0;
    if(WORLD!=null){
        var tx = canvas.width/10;
        var ty = canvas.height/10;
        
        worldOffsetX = Math.max(0, Math.min(thisplayer.x-canvas.width/2, WORLD.width*tx-canvas.width));
        worldOffsetY = Math.max(0, Math.min(thisplayer.y-canvas.height/2, WORLD.height*ty-canvas.height));
    }
    
    for(var i = 0; i<thisbullets.length; i++) {
        thisbullets[i].x-=Math.cos(thisbullets[i].rotation)*2;
        thisbullets[i].y-=Math.sin(thisbullets[i].rotation)*2;
        thisbullets[i].timer++;

        if(collision(thisbullets[i].x+3, thisbullets[i].y)||collision(thisbullets[i].x-3, thisbullets[i].y)){
            var incedence = (Math.PI/2)-thisbullets[i].rotation;
            thisbullets[i].rotation+=incedence*2;
        } else if(collision(thisbullets[i].x, thisbullets[i].y+3)||collision(thisbullets[i].x, thisbullets[i].y-3)){
            var incedence = (Math.PI)-thisbullets[i].rotation;
            thisbullets[i].rotation+=incedence*2;
        }

        if(thisbullets[i].timer>350)
            thisbullets[i].dead=true;
    }
    
    socket.emit('bullet', thisbullets);
    
    context.save();
    
    context.translate(-worldOffsetX, -worldOffsetY);
    
    for(var id in bullets) {
        for(var j = 0; j<bullets[id].length; j++){
            if(!bullets[id][j].dead) {
                context.fillStyle="#000000";

                context.save();
                context.beginPath(); 
                context.translate(bullets[id][j].x, bullets[id][j].y);
                context.rotate(bullets[id][j].rotation-Math.PI);

                context.moveTo(-4, -4);
                context.lineTo(4, -4);
                context.arcTo(6, -4, 6, 0, 4);
                context.arcTo(6, 4, -4, 4, 4);
                context.lineTo(-4, 4);
                context.lineTo(-4, -4);

                context.fill();
                context.restore();
                
//                console.log(xO()<bullets[id][j].x, bullets[id][j].y, yO(), yO()+height(), yO()<bullets[id][j].y,yO()+height()>bullets[id][j].y);
                
                if(!thisplayer.dead){
                    if(xO()<bullets[id][j].x&&xO()+width()>bullets[id][j].x&&yO()<bullets[id][j].y&&yO()+height()>bullets[id][j].y){
                        thisplayer.health--;
                        socket.emit('killbullet', id, j);
                        if(thisplayer.health<=0){
                            thisplayer.dead=true;
                        }
                    }
                }
                
            }
        }
    }
    context.restore();
    
}

function countProps(obj) {
    var count = 0;
    for (var p in obj) {
      obj.hasOwnProperty(p) && count++;
    }
    return count; 
}

function xO() {
    return thisplayer.x-(32-16*Math.abs(Math.sin(thisplayer.rotation)));
}

function yO() {
    return thisplayer.y-(32-16*Math.abs(Math.cos(thisplayer.rotation)));
}

function width() {
    return 64-(32*Math.abs(Math.sin(thisplayer.rotation)));
}

function height() {
    return 64-(32*Math.abs(Math.cos(thisplayer.rotation)));
}

function leftCollision() {
    return collision(xO(), yO()+5) || collision(xO(), yO()+height()-5);
}

function topCollision() {
    return collision(xO()+5, yO()) || collision(xO()+width()-5, yO());
}

function bottomCollision() {
    return collision(xO()+5, yO()+height()) || collision(xO()+width()-5, yO()+height());
}

function rightCollision() {
    return collision(xO()+width(), yO()+5) || collision(xO()+width(), yO()+height()-5);
}

function collision(x, y) {
    if(WORLD!=null){
        var tx = canvas.width/10;
        var ty = canvas.height/10;
        
        
        var ix = Math.floor(x/tx);
        var iy = Math.floor(y/ty);
        
        return (WORLD.data[ix+iy*WORLD.width]==1);
        
    }
    return false;
}

document.addEventListener('keydown', function(event) {
    console.log("Key pressed", event.keyCode);
    switch (event.keyCode) {
        case 65: // A
            movement.a = true;
            break;
        case 32: // SPACE
            movement.space = true;
            break;
        case 16: // SHIFT
            movement.shift = true;
            break;
        case 37: // LEFT
            movement.left = true;
            break;
        case 39: // RIGHT
            movement.right = true;
            break;
        case 87: // W
            movement.up = true;
            break;
        case 68: // D
            movement.d = true;
            break;
        case 83: // S
            movement.down = true;
            break;
    }
});
document.addEventListener('keyup', function(event) {
    switch (event.keyCode) {
        case 65: // A
            movement.a = false;
            break;
        case 32: // SPACE
            movement.space = false;
            break;
        case 16: // SHIFT
            movement.shift = false;
            break;
        case 37: // LEFT
            movement.left = false;
            break;
        case 39: // RIGHT
            movement.right = false;
            break;
        case 87: // W
            movement.up = false;
            break;
        case 68: // D
            movement.d = false;
            break;
        case 83: // S
            movement.down = false;
            break;
    }
});

socket.on('state', draw);
socket.on('stateb', bullets);