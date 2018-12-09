class enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.timer = 0;
    }
    
    tick() {
        if(this.timer<20) {
            this.timer++;
            
            if(dist(this.x, this.y, PLAYER.x+off, PLAYER.y+off)<can.width/8) {
                this.x=Math.random()*can.width;
                this.y=Math.random()*can.height;
                PLAYER.health--;
                if(PLAYER.health<=0) {
                    window.location.reload(true);
                }
            }
        } else {
            this.timer = 0;
            var off = can.width/10;
            
            var ata = Math.atan2(PLAYER.getX()-this.x, PLAYER.getY()-this.y);
            
            var yp = Math.cos(ata);
            var xp = Math.sin(ata);
            
            if(Math.abs(xp)>Math.abs(yp)){
                if(xp<0)
                    this.x-=can.width/10;
                else this.x+=can.width/10;
            } else {
                if(yp<0)
                    this.y-=can.height/10;
                else this.y+=can.height/10;
            }
            
        }
        
        if(dist(this.x, this.y, PLAYER.getX(), PLAYER.getY())<10) {
            this.x=Math.random()*can.width;
            this.y=Math.random()*can.height;
            PLAYER.health--;
            if(PLAYER.health<0) {
                window.location.reload(true);
            }
        }
        
        this.y=grid(this.y, can.height/10);
        
        this.x=grid(this.x, can.width/10);
    }
    
    render(c) {
        c.fillStyle="#ff0000";
        var s = can.width/100;
        var t = can.height/100;
        c.beginPath();
        c.ellipse(this.x, this.y, s, t, 0, 0, 180, false);
        c.fill();
        c.fillStyle=rgba(255, 0, 0, 0.1);
        c.beginPath();
        c.ellipse(this.x, this.y, s*2, t*2, 0, 0, 180, false);
        c.fill();
    }
}

class exenemy {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.timer = 0;
        this.direction=direction;
    }
    
    tick() {
        if(this.timer<5) {
            this.timer++;
        } else {
            this.timer = 0;
            var off = can.width/9;
            
            if(this.direction==1){
                this.x-=off;
            } else if(this.direction==2){
                this.x+=off;
            } else if(this.direction==3){
                this.y-=off;
            } else if(this.direction==4){
                this.y+=off;
            }
            
        }
        
        if(dist(this.x, this.y, PLAYER.x+off, PLAYER.y+off)<can.width/9) {
            this.x=Math.random()*can.width;
            this.y=Math.random()*can.height;
        }
        
        this.y=grid(this.y, can.height/10);
        
        this.x=grid(this.x, can.width/10);
    }
    
    render(c) {
        c.fillStyle="#00ff00";
        var s = can.width/100;
        var t = can.height/100;
        c.beginPath();
        c.ellipse(this.x, this.y, s, t, 0, 0, 180, false);
        c.fill();
        c.fillStyle=rgba(0, 255, 0, 0.1);
        c.beginPath();
        c.ellipse(this.x, this.y, s*2, t*2, 0, 0, 180, false);
        c.fill();
    }
}