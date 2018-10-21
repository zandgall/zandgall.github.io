var mouseX = 0, mouseY =0;
            
            var ix = 0;
            var iy = 30;
            var iw = 100;
            var is = 20;
            var ih = false;
            
            var dx = 0;
            var dy = 30;
            var dw = 100;
            var ds = 20;
            var dh = false;
            
            var nx = 0;
            var ny = 30;
            var nw = 100;
            var ns = 20;
            var nh = false;
            
            var cx = 0;
            var cy = 30;
            var cw = 100;
            var cs = 20;
            var ch = false;
            
            var mx = 0;
            var my = 30;
            var mw = 100;
            var ms = 20;
            var mh = false;
            
            var can = document.getElementById("links");
            
            function init() {
                document.addEventListener("mousemove", on_mousemove, false);
                document.addEventListener("click", on_click, false);
                window.setInterval(ldraw, 100);
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
            
            function menu(c, x, y, w, h) {
                c.lineJoin="round";
                c.lineWidth=2;
                c.fillStyle="#00f0ff";
                c.strokeStyle = "#0000ff";
                
                c.fillRect(x, y, w, h);
                c.strokeRect(x, y, w, h);
            }

            function ldraw() {
                var c = can.getContext("2d");
                c.clearRect(0, 0, can.width, can.height);
                
                c.font='30px monospace';
                c.fillStyle = "#0000ff";
                
                iw=c.measureText("Home").width;
                ix=can.width/7-iw/2;
                
                dw=c.measureText("Download").width;
                dx=ix+iw+10;
                
                nw=c.measureText("What's New").width;
                nx=dx+dw+10;
//                nx=can.width/5*3-nw/2;
                
                cw=c.measureText("Contact").width;
                cx=nx+nw+10;
                
                mw=c.measureText("Resource").width;
                mx=cx+cw+10;
                
                c.fillText("Home",ix,iy+10);
                c.fillText("Download",dx,dy+10);
                c.fillText("What's New",nx,ny+10);
                c.fillText("Contact",cx,cy+10);
                c.fillText("Resource",mx,my+10);
                
                c.font='16px monospace';
                if(ih){
                    is = (55+is)/2;
                    
                    outText(c, "Homepage", ix, iy+is-14, "#a6ebff", 1, "#0000ff");
                    outText(c, "About", ix, iy+is+4, "#a6ebff", 1, "#0000ff");
                    
                    c.fillStyle="#ffff00";
                    if(mouseY>iy+is/2&&mouseY<iy+is-14)
                        c.fillText("Homepage", ix, iy+is-14);
                    else if(mouseY>iy+is-14&&mouseY<iy+is+4)
                        c.fillText("About", ix, iy+is+4);
                } else {
                    is = (30+is)/2;
                }
                if(dh){
                    ds = (55+ds)/2;
                    
                    outText(c, "Arvopia", dx, dy+ds-14, "#a6ebff", 1, "#0000ff");
                    outText(c, "LevelCreator", dx, dy+ds+4, "#a6ebff", 1, "#0000ff");
                    outText(c, "Arvopia Builds", dx, dy+ds+22, "#a6ebff", 1, "#0000ff");
                    
                    c.fillStyle="#ffff00";
                    if(mouseY>dy+ds/2&&mouseY<dy+ds-14)
                        c.fillText("Arvopia", dx, dy+ds-14);
                    else if(mouseY>dy+ds-14&&mouseY<dy+ds+4)
                        c.fillText("LevelCreator", dx, dy+ds+4);
                    else if(mouseY>dy+ds+4&&mouseY<dy+ds+22)
                        c.fillText("Arvopia Builds", dx, dy+ds+22);
                } else {
                    ds = (30+ds)/2;
                }
                if(nh){
                    ns = (55+ns)/2;
                    
                    outText(c, "Teasers", nx, ny+ns-14, "#a6ebff", 1, "#0000ff");
                    outText(c, "Future Plans", nx, ny+ns+4, "#a6ebff", 1, "#0000ff");
                    outText(c, "What's Old", nx, ny+ns+22, "#a6ebff", 1, "#0000ff");
                    
                    c.fillStyle="#ffff00";
                    if(mouseY>ny+ns/2&&mouseY<ny+ns-14)
                        c.fillText("Teasers", nx, ny+ns-14);
                    else if(mouseY>ny+ns-14&&mouseY<ny+ns+4)
                        c.fillText("Future Plans", nx, ny+ns+4);
                    else if(mouseY>ny+ns+4&&mouseY<ny+ns+22)
                        c.fillText("What's Old", nx, ny+ns+22);
                } else {
                    ns = (30+ns)/2;
                }
                if(ch){
                    cs = (55+cs)/2;
                    
                    outText(c, "Social Media", cx, cy+cs-14, "#a6ebff", 1, "#0000ff");
                    outText(c, "Bug Reports", cx, cy+cs+4, "#a6ebff", 1, "#0000ff");
                    outText(c, "Contributions", cx, cy+cs+22, "#a6ebff", 1, "#0000ff");
                    
                    c.fillStyle="#ffff00";
                    if(mouseY>cy+cs/2&&mouseY<cy+cs-14)
                        c.fillText("Social Media", cx, cy+cs-14);
                    else if(mouseY>cy+cs-14&&mouseY<cy+cs+4)
                        c.fillText("Bug Reports", cx, cy+cs+4);
                    else if(mouseY>cy+cs+4&&mouseY<cy+cs+22)
                        c.fillText("Contributions", cx, cy+cs+22);
                } else {
                    cs = (30+cs)/2;
                }
                if(mh){
                    ms = (55+ms)/2;
                    outText(c, "Music", mx, my+ms-14, "#a6ebff", 1, "#0000ff");
                    outText(c, "Fun stuff", mx, my+ms+4, "#a6ebff", 1, "#0000ff");
                     c.fillStyle="#ffff00";
                    if(mouseY>my+ms/2&&mouseY<my+ms-14)
                        c.fillText("Music", cx, cy+cs-14);
                    else if(mouseY>my+ms-14&&mouseY<my+ms+4)
                        c.fillText("Fun stuff", cx, cy+cs+4);
                } else {
                    ms = (30+ms)/2;
                }
                
//                c.strokeRect(ix, iy-is/2, iw, is);
                
                if(nh||dh||ih||ch||mh)
                    document.body.style.cursor="pointer";
                else document.body.style.cursor="";
                
                c.lineJoin="round";
                c.lineWidth=3;
                c.strokeStyle = "#0000ff";
                
                c.strokeRect(ix, iy-is/2, iw, 0);
                c.strokeRect(ix, iy+is/2, iw, 0);
                
                c.strokeRect(dx, dy-ds/2, dw, 0);
                c.strokeRect(dx, dy+ds/2, dw, 0);
                
                c.strokeRect(nx, ny-ns/2, nw, 0);
                c.strokeRect(nx, ny+ns/2, nw, 0);
                
                c.strokeRect(cx, cy-cs/2, cw, 0);
                c.strokeRect(cx, cy+cs/2, cw, 0);
                
                c.strokeRect(mx, my-ms/2, mw, 0);
                c.strokeRect(mx, my+ms/2, mw, 0);
                    
//                c.strokeRect(mouseX, mouseY, 20, 20);
            }

            function move(ev) {
                var x, y;
                    
                x = ev.pageX-can.offsetLeft;
                y = ev.pageY-can.offsetTop;
                
                ih=(x>=ix && x<ix+iw && y>0 && y<is+iy+4);
                
                dh=(x>=dx && x<dx+dw && y>0 && y<ds+dy+(dh ? 22: -ds/2));
                
                nh=(x>=nx && x<nx+nw && y>0 && y<ns+ny+(nh ? 22: -ns/2));
                
                ch=(x>=cx && x<cx+cw && y>0 && y<cs+cy+(ch ? 22: -cs/2));
                
                mh=(x>=mx && x<mx+mw && y>0 && y<ms+my+(mh ? 22: -ms/2));
                
                mouseX=x;
                mouseY=y;
            }
     
            function click(e) {
                console.log(mouseX, mouseY);
                
                if(ih){
                    if(mouseY>iy+is-14)
                        window.location.href="about.html";
                    else window.location.href="index.html";
                }
                if(dh){ 
                    if(mouseY>dy+ds-14 && mouseY<dy+ds+4)
                        window.location.href="levelcreatordownload.html";
                    else if(mouseY>dy+ds+4 && mouseY<dy+ds+22)
                        window.location.href="arvopiabuilddownload.html";
                    else window.location.href="arvopiadownload.html";
                }
                if(nh){
                    if(mouseY>ny+ns-14 && mouseY<ny+ns+4)
                        window.location.href="futureplans.html";
                    else if(mouseY>ny+ns+4 && mouseY<ny+ns+22)
                        window.location.href="whatsold.html";
                    else window.location.href="teasers.html";
                }
                if(ch){
                    if(mouseY>cy+cs-14 && mouseY<cy+cs+4)
                        window.location.href="bugreports.html";
                    else if(mouseY>cy+cs+4 && mouseY<cy+cs+22)
                        window.location.href="contribute.html";
                    else window.location.href="socialmedia.html";
                }
                if(mh){
                    if(mouseY>my+ms-14 && mouseY<my+ms+4)
                        window.location.href="music.html";
                    else if(mouseY>my+ms+4 && mouseY<my+ms+22)
                        window.location.href="funstuff.html";
                }
            }   
            
            function on_mousemove(ev) {
                move(ev);
            }
            
            function on_click(e) {
                click(e);
            }
        
//            window.onmousemove = function() {
//                move(window.MouseEvent);
//            }
//            
//            window.onmousedown = function() {
//                click(window.MouseEvent);
//            }
            
            window.onload = function() {
                init();
                ldraw();
            }