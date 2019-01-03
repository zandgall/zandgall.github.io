var o1 = -150, o2 = -50, o3 = 100;
var r1 = 8, r2 = 4, r3 = 1.75, r4 = 16;
var s1 = Math.random()+1, s2=Math.random()+1, s3=Math.random()+1, s4=Math.random();

function display() {
    var can = document.getElementById("BackgroundC");
                
    var c = can.getContext("2d");
                
    c.canvas.width=window.innerWidth;
    c.canvas.height=window.innerHeight;
            
    c.clearRect(0,0,can.width,can.height);
            
    var img0 = document.getElementById("BGImg0");
    var img1 = document.getElementById("BGImg1");
    var img2 = document.getElementById("BGImg2");
    
    var img3 = new Image();
    img3.src = "assets/Sun.png";
    
    c.drawImage(img3, can.width*s4, 150-scrollY/r4);
    c.drawImage(img0, can.width-3240*s1, o1-scrollY/r1, 6480, 2322);
    c.drawImage(img1, can.width-3440*s2, o2-scrollY/r2, 6880, 2722);
    c.drawImage(img2, can.width-3640*s3, o3-scrollY/r3, 7280, 3122);
    c.drawImage(img0, can.width-3240*s1, o1-scrollY/r1+2322, 6480, -2322);
    c.drawImage(img1, can.width-3440*s2, o2-scrollY/r2+2722, 6880, -2722);
    c.drawImage(img2, can.width-3640*s3, o3-scrollY/r3+3122, 7280, -3122);
    
    c.fillStyle = "rgba(20, 50, 100, "+(scrollY/Math.max(5000, can.height))+")";
    c.fillRect(0, 0, can.width, can.height);
}

function set(no1, no2, no3, nr1, nr2, nr3) {
    o1=no1;
    o2=no2;
    o3=no3;
    r1=nr1;
    r2=nr2;
    r3=nr3;
}
                
display();
window.onscroll = function() {
    display();
}