var o1 = -150, o2 = -50, o3 = 100;
var r1 = 8, r2 = 4, r3 = 1.75, r4 = 16;
var s1 = Math.random()+1, s2=Math.random()+1, s3=Math.random()+1, s4=Math.random()+1;

var stars = [{x:-10, y:-10, w: 1}];

var cloudImgs = [];

var clouds = [{x:-60, y:-36, t:1, o:1}];

var night = false, exfx = true;

var lmouseX = 0, lmouseY = 0;

var canw = {width: 0, height: 0};

var lmX = 0, lmY = 0;

var lmouseDown = false, lmouseLeft = false, lmouseRight=false, lmouseClicked = false, lmouseDBLClicked = false;
var initiated = false;

var layerCan = document.getElementById("BackgroundC");

 var ix = 0;
var iy = 30;
var iw = 100;
var is = 20;
var ih = false;

var dx = 0;
var dw = 100;
var ds = 20;
var dh = false;

var nx = 0;
var nw = 100;
var ns = 20;
var nh = false;

var cx = 0;
var cw = 100;
var cs = 20;
var ch = false;

var mx = 0;
var mw = 100;
var ms = 20;
var mh = false;

function display() {
    layerCan = document.getElementById("BackgroundC");            
    
    if(layerCan.width!=canw.width||layerCan.height!=canw.height){
        canw.width=layerCan.width;
        canw.height=layerCan.height;
        initStars();
        initClouds();
    }
    
    var c = layerCan.getContext("2d");
    
    c.canvas.width=window.innerWidth;
    c.canvas.height=window.innerHeight;
    
    c.clearRect(0,0,layerCan.width,layerCan.height);
    
    if(night){
        c.fillStyle="rgb(13, 4, 38)";
        c.fillRect(0, 0, layerCan.width, layerCan.height);
        if(exfx)
            for(var i = 0; i<50; i++){
                c.fillStyle="rgba(200, 200, 255, 0.002)";
                c.beginPath();
                c.ellipse(50*s4+18, 80-scrollY/r4+18, i*4, i*4, 0, 0, 180, false);
                c.fill();
            }
    }
            
    var img0 = new Image();
    img0.src = "BGImg0.png";
    var img1 = new Image();
    img1.src = "BGImg1.png";
    var img2 = new Image();
    img2.src = "BGImg2.png";
    
    var img3 = new Image();
    img3.src = "assets/Sun.png";
    if(night){
        img3.src = "assets/Moon.png";
        
        c.fillStyle = "rgb(100, 100, 120)";
        for(var i = 0; i<100; i++) {
            c.fillRect(stars[i].x, stars[i].y, stars[i].w, stars[i].w);
        }
    }
    
    c.drawImage(img3, 50*s4, 80-scrollY/r4);
    
    c.drawImage(img0, layerCan.width-3240*s1, o1-scrollY/r1, 6480, 2322);
    c.drawImage(img1, layerCan.width-3440*s2, o2-scrollY/r2, 6880, 2722);
    c.drawImage(img2, layerCan.width-3640*s3, o3-scrollY/r3, 7280, 3122);
    c.drawImage(img0, layerCan.width-3240*s1, o1-scrollY/r1+2322, 6480, -2322);
    c.drawImage(img1, layerCan.width-3440*s2, o2-scrollY/r2+2722, 6880, -2722);
    if(!night && exfx){
        for(var i = 0; i<clouds.length; i++) {
            clouds[i].x+=(1/clouds[i].o);
            if(clouds[i].x>layerCan.width)
                clouds[i].x=-60;
            c.drawImage(cloudImgs[clouds[i].t], clouds[i].x, clouds[i].y-scrollY/clouds[i].o, 74-clouds[i].o*2, 56-clouds[i].o*2);
        }
    }
    c.drawImage(img2, layerCan.width-3640*s3, o3-scrollY/r3+3122, 7280, -3122);
    
    if(night) {
        c.fillStyle = "rgba(15, 8, 33, 0.2)";
        
        c.fillRect(0, 0, layerCan.width, layerCan.height);
        
    }
    if(night) {
        c.fillStyle = "rgba(20, 10, 50, "+(scrollY/Math.max(layerCan.height)*0.1+0.2)+")";
    } else {
        c.fillStyle = "rgba(20, 50, 100, "+(scrollY/Math.max(layerCan.height)*0.1)+")";
    }
    
    c.fillRect(0, 0, layerCan.width, layerCan.height);
    
    c.font = "20px monospace";
    
    outText(c, "ExtraFX", layerCan.width-80, 20-scrollY, "rgba(0, 0, 255, 0.05)", 1, exfx ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)");
    
    if(lmouseX>s4*50-5 && lmouseX<s4*50+31){
        if(lmouseY-scrollY>50-scrollY/r4-5&&lmouseY-scrollY<80-scrollY/r4+31){
            c.drawImage(img3, 50*s4, 80-scrollY/r4);
            document.body.style.cursor="pointer";
            if(lmouseClicked){
                night = !night;
                lmouseClicked = false;
                cssNight();
                display();
            }
        } else {
            document.body.style.cursor="";
        }
    } else {
        
        if(lmouseX>layerCan.width-100 && lmouseY<20){
            outText(c, "ExtraFX", layerCan.width-80, 20-scrollY, "rgba(0, 0, 255, 0.59)", 1, exfx ? "#ffffff" : "rgba(0,0,0,0)");
            if(lmouseClicked){
                exfx = !exfx;
            }
        }
        
        document.body.style.cursor="";
    }
    
    ldraw();
    
    window.localStorage['zandgall_dayNight'] = night ? "night" : "day";
    window.localStorage['zandgall_exFx'] = exfx ? "true" : "false";
    
    lmouseClicked=false;
}

function outText(c, string, x, y, stroke, s, fill) {
                c.fillStyle=stroke;
                c.fillText(string, x-s, y-s);
                c.fillText(string, x, y-s);
                c.fillText(string, x+s, y-s);
                c.fillText(string, x-s, y);
                c.fillText(string, x, y);
                c.fillText(string, x+s, y);
                c.fillText(string, x-s, y+s);
                c.fillText(string, x, y+s);
                c.fillText(string, x+s, y+s);
                c.fillStyle=fill;
                c.fillText(string, x, y);
            }
            
function mesh(a, b, r) {
                var nr = 1.0-r;
                return a*r + b*nr;
            }

function desire(desire, current) {
    return ((desire-current)*0.3);
}

function ldraw() {
    
    var van = document.getElementById("links");
    var c = van.getContext("2d");
    c.clearRect(0, 0, layerCan.width, layerCan.height);
    
    c.font='30px monospace';
    if(night) c.fillStyle = "rgb(149, 177, 222)";
    else c.fillStyle = "rgb(36, 84, 162)";
    iw=c.measureText("Home").width;
    dw=c.measureText("Download").width;
    nw=c.measureText("What's New").width;
    cw=c.measureText("Contact").width;
    mw=c.measureText("Resource").width;
    
    ix=van.width/2-(iw+dw+nw+cw+mw)/2;
    dx=ix+iw+10;
    nx=dx+dw+10;
    cx=nx+nw+10
    mx=cx+cw+10;
            
    c.fillText("Home",ix,iy+10);
    c.fillText("Download",dx,iy+10);
    c.fillText("What's New",nx,iy+10);
    c.fillText("Contact",cx,iy+10);
    c.fillText("Resource",mx,iy+10);
    
    c.font='16px monospace';
    if(ih){
        if(exfx)
            is += desire(55, is);
        else is = 55;
        
        outText(c, "Homepage", ix, iy+is-14, "#a6ebff", 1, "#0000ff");
        outText(c, "About", ix, iy+is+4, "#a6ebff", 1, "#0000ff");
        
        c.fillStyle="#ffff00";
        if(lmY>iy+is-34&&lmY<iy+is-14)
            c.fillText("Homepage", ix, iy+is-14);
        else if(lmY>iy+is-14&&lmY<iy+is+4)
            c.fillText("About", ix, iy+is+4);
    } else {
        if(exfx)
        is += desire(30, is);
        else is=30;
    }
    if(dh){
        if(exfx)
        ds += desire(55, ds);
        else ds = 55;
        
        outText(c, "Arvopia", dx, iy+ds-14, "#a6ebff", 1, "#0000ff");
        outText(c, "LevelCreator", dx, iy+ds+4, "#a6ebff", 1, "#0000ff");
        outText(c, "Arvopia Builds", dx, iy+ds+22, "#a6ebff", 1, "#0000ff");
        
        c.fillStyle="#ffff00";
        if(lmY>iy+ds-34&&lmY<iy+ds-14)
            c.fillText("Arvopia", dx, iy+ds-14);
        else if(lmY>iy+ds-14&&lmY<iy+ds+4)
            c.fillText("LevelCreator", dx, iy+ds+4);
        else if(lmY>iy+ds+4&&lmY<iy+ds+22)
            c.fillText("Arvopia Builds", dx, iy+ds+22);
    } else {
        if(exfx)
        ds += desire(30, ds);
        else ds = 30;
    }
    if(nh){
        if(exfx)
        ns += desire(55, ns);
        else ns=55;
        
        outText(c, "Teasers", nx, iy+ns-14, "#a6ebff", 1, "#0000ff");
        outText(c, "Future Plans", nx, iy+ns+4, "#a6ebff", 1, "#0000ff");
        outText(c, "What's Old", nx, iy+ns+22, "#a6ebff", 1, "#0000ff");
        
        c.fillStyle="#ffff00";
        if(lmY>iy+ns-34&&lmY<iy+ns-14)
            c.fillText("Teasers", nx, iy+ns-14);
        else if(lmY>iy+ns-14&&lmY<iy+ns+4)
            c.fillText("Future Plans", nx, iy+ns+4);
        else if(lmY>iy+ns+4&&lmY<iy+ns+22)
            c.fillText("What's Old", nx, iy+ns+22);
    } else {
        if(exfx)
        ns += desire(30, ns);
        else ns=30;
    }
    if(ch){
        if(exfx)
        cs += desire(55, cs);
        else cs=55;
        outText(c, "Social Media", cx, iy+cs-14, "#a6ebff", 1, "#0000ff");
        outText(c, "Bug Reports", cx, iy+cs+4, "#a6ebff", 1, "#0000ff");
        outText(c, "Contributions", cx, iy+cs+22, "#a6ebff", 1, "#0000ff");
        
        c.fillStyle="#ffff00";
        if(lmY>iy+cs-34&&lmY<iy+cs-14)
            c.fillText("Social Media", cx, iy+cs-14);
        else if(lmY>iy+cs-14&&lmY<iy+cs+4)
            c.fillText("Bug Reports", cx, iy+cs+4);
        else if(lmY>iy+cs+4&&lmY<iy+cs+22)
            c.fillText("Contributions", cx, iy+cs+22);
    } else {
        if(exfx)
        cs += desire(30, cs);
        else cs=30;
    }
    if(mh){
        if(exfx)
        ms += desire(55, ms);
        else ms = 55;
        outText(c, "Music", mx, iy+ms-14, "#a6ebff", 1, "#0000ff");
        outText(c, "Fun stuff", mx, iy+ms+4, "#a6ebff", 1, "#0000ff");
         c.fillStyle="#ffff00";
        if(lmY>iy+ms-34&&lmY<iy+ms-14)
            c.fillText("Music", mx, iy+ms-14);
        else if(lmY>iy+ms-14&&lmY<iy+ms+4)
            c.fillText("Fun stuff", mx, iy+ms+4);
    } else {
        if(exfx)
        ms += desire(30, ms);
        else ms = 30;
    }
    
    if((nh||dh||ih||ch||mh) && lmY>iy+Math.max(ms,cs,ns,is,ds)-34)
        document.body.style.cursor="pointer";
    else document.body.style.cursor=document.body.style.cursor;
    
    c.lineJoin="round";
    c.lineWidth=3;
    
    if(night) 
        c.strokeStyle = "rgb(149, 177, 222)";
    else 
        c.strokeStyle = "rgb(36, 84, 162)";
    
    c.strokeRect(ix, iy-is/2, iw, 0);
    c.strokeRect(ix, iy+is/2, iw, 0);
    
    c.strokeRect(dx, iy-ds/2, dw, 0);
    c.strokeRect(dx, iy+ds/2, dw, 0);    
                
    c.strokeRect(nx, iy-ns/2, nw, 0);
    c.strokeRect(nx, iy+ns/2, nw, 0);
                
    c.strokeRect(cx, iy-cs/2, cw, 0);
    c.strokeRect(cx, iy+cs/2, cw, 0);
                
    c.strokeRect(mx, iy-ms/2, mw, 0);
    c.strokeRect(mx, iy+ms/2, mw, 0);
}

function cssNight() {
    if(night) {
        $(".section").css("background", "linear-gradient(rgb(53, 53, 88), rgb(30, 32, 56))");
        $(".section").css("border", "2px solid rgba(3, 9, 52, 0.5)");
        $("p").css("color", "#e8eaf5");
        $("h1").css("color", "rgb(209, 207, 227)");
        $("h2").css("color", "#d1cfe3");
        $("h3").css("color", "#d1cfe3");
        $("h4").css("color", "#d1cfe3");
        $("a").css("color", "#c27bff");
        $(".title").css("color", "#d1cfe3");
        $("img").css("opacity", "0.7");
    } else {
        $(".section").css("background", "linear-gradient(rgb(124, 182, 229), rgb(75, 147, 185))");
        $(".section").css("border", "2px solid rgba(59, 99, 163, 0.5)");
        $("p").css("color", "#37383c");
        $("h1").css("color", "#201f2a");
        $("h2").css("color", "#201f2a");
        $("h3").css("color", "#201f2a");
        $("h4").css("color", "#201f2a");
        $("a").css("color", "#0000ff");
        $(".title").css("color", "#00d8ff");
        $("img").css("opacity", "1");
//        document.getElementById("twit").setAttribute("data-theme", "light");
    }
}

function layerInit() {
    initiated = true;
    console.log("Setting up mouse move");
    document.addEventListener("mousemove", lmove, false);
    console.log("Setting up mouse click");
    document.addEventListener("click", lclick, false);
    console.log("Setting up mousedown");
    document.addEventListener("mousedown", lmousedown, false);
    console.log("Setting up mouseup");
    document.addEventListener("mouseup", lmouseup, false);
    
    console.log("INITIATE");
    
    window.setInterval(display, 30);
    
    cloudImgs[0] = new Image();
    cloudImgs[0].src="assets/Cloud1.png";
    cloudImgs[1] = new Image();
    cloudImgs[1].src="assets/Cloud2.png";
    cloudImgs[2] = new Image();
    cloudImgs[2].src="assets/Cloud3.png";
    cloudImgs[3] = new Image();
    cloudImgs[3].src="assets/Cloud4.png";
    
    night = (localStorage["zandgall_dayNight"] || "day") == "night";
    exfx = (localStorage["zandgall_exFx"] || "true") == "true"; 
    
}

function initStars() {
    for(var i = 0; i<100; i++) {
        stars[i] = {x:Math.random()*layerCan.width, y:Math.random()*layerCan.height, w:Math.random()*3};
    }
}

function initClouds() {
    for(var i = 0; i<20; i++) {
        clouds[i] = {x:Math.random()*layerCan.width, y:Math.random()*layerCan.height, t:Math.floor(Math.random()*4), o:(20-i)/20.0*5+1};
    }
}

function lmove(ev) {
    
    var van = document.getElementById("links");
    
    var x, y;
    
    var posX = layerCan.getBoundingClientRect().left; 
    var posY = layerCan.getBoundingClientRect().top; 
    
    posX=layerCan.offsetLeft;
    posY=layerCan.offsetTop;
    
    lmX = lmouseX-van.offsetLeft;
    lmY = lmouseY-van.offsetTop;
    
    x = ev.pageX-layerCan.offsetLeft;
    y = ev.pageY-layerCan.offsetTop;
                
    ih=(lmX>=ix && lmX<ix+iw && lmY>0 && lmY<is+iy+4);
                
    dh=(lmX>=dx && lmX<dx+dw && lmY>0 && lmY<ds+iy+(dh ? 22: -ds/2));
                
    nh=(lmX>=nx && lmX<nx+nw && lmY>0 && lmY<ns+iy+(nh ? 22: -ns/2));
                
    ch=(lmX>=cx && lmX<cx+cw && lmY>0 && lmY<cs+iy+(ch ? 22: -cs/2));
                
    mh=(lmX>=mx && lmX<mx+mw && lmY>0 && lmY<ms+iy+(mh ? 22: -ms/2));
    
    lmouseX=x;
    lmouseY=y;
}

function lclick(e) {
    lmouseClicked=true;
    
    if(ih){
        if(lmY>iy+is-14)
            window.location.href="about.html";
        else if(lmY>iy+is-34 && lmY<iy+is-14)window.location.href="index.html";
    }
    if(dh){ 
        if(lmY>iy+ds-14 && lmY<iy+ds+4)
            window.location.href="levelcreatordownload.html";
        else if(lmY>iy+ds+4 && lmY<iy+ds+22)
            window.location.href="arvopiabuilddownload.html";
        else if(lmY>iy+ds-34 && lmY<iy+ds-14)window.location.href="arvopiadownload.html";
    }
    if(nh){
        if(lmY>iy+ns-14 && lmY<iy+ns+4)
            window.location.href="futureplans.html";
        else if(lmY>iy+ns+4 && lmY<iy+ns+22)
            window.location.href="whatsold.html";
        else if(lmY>iy+ns-34 && lmY<iy+ns-14)window.location.href="teasers.html";
    }
    if(ch){
        if(lmY>iy+cs-14 && lmY<iy+cs+4)
            window.location.href="bugreports.html";
        else if(lmY>iy+cs+4 && lmY<iy+cs+22)
            window.location.href="contribute.html";
        else if(lmY>iy+cs-34 && lmY<iy+cs-14) window.location.href="socialmedia.html";
    }
    if(mh){
        if(lmY>iy+ms-34 && lmY<iy+ms-14)
            window.location.href="music.html";
        else if(lmY>iy+ms-14 && lmY<iy+ms+4)
            window.location.href="funstuff.html";
    }
}
function lmousedown(ev) {
    lmouseDown=true;
}
function lmouseup(ev){
    lmouseDown=false;
    lmouseClicked=false;
}

function set(no1, no2, no3, nr1, nr2, nr3) {
    o1=no1;
    o2=no2;
    o3=no3;
    r1=nr1;
    r2=nr2;
    r3=nr3;
}

$("document").ready(function() {
    console.log("Supposedly initiating");
    layerInit();
    cssNight();
});