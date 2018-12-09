class Player {
    constructor(x, y) {
        this.x=x;
        this.y=y;
        
        this.xM = 0;
        this.yM = 0;
        
        this.direction = 0;
        
        this.health = 10;
        
        this.rimages = [
            document.getElementById("r1"),
            document.getElementById("r2"),
            document.getElementById("r3"),
            document.getElementById("r4"),
            document.getElementById("r5"),
            document.getElementById("r6"),
            document.getElementById("r7"),
            document.getElementById("r8")
        ];
        
        this.limages = [
            document.getElementById("l1"),
            document.getElementById("l2"),
            document.getElementById("l3"),
            document.getElementById("l4"),
            document.getElementById("l5"),
            document.getElementById("l6"),
            document.getElementById("l7"),
            document.getElementById("l8")
        ];
        
        this.fimages = [
            document.getElementById("f1"),
            document.getElementById("f2"),
            document.getElementById("f3"),
            document.getElementById("f4"),
            document.getElementById("f5"),
            document.getElementById("f6"),
            document.getElementById("f7"),
            document.getElementById("f8")
        ];
        
        this.bimages = [
            document.getElementById("b1"),
            document.getElementById("b2"),
            document.getElementById("b3"),
            document.getElementById("b4"),
            document.getElementById("b5"),
            document.getElementById("b6"),
            document.getElementById("b7"),
            document.getElementById("b8")
        ];

        this.aniIndex = 0;
    }
    
    tick() {
        var up = can.width/200;
        if(kode.arrowleft){
            this.xM-=up;
            this.direction=1;
            
            this.yM=0;
            this.y=grid(this.y, can.height/10)+6;
        }
        if(kode.arrowright){
            this.xM+=up;
            this.direction=0;
            
            this.yM=0;
            this.y=grid(this.y, can.height/10)+6;
        }
        if(kode.arrowdown) {
            this.yM+=up;
            this.direction=2;
            
            this.xM=0;
            this.x=grid(this.x, can.width/10)+6;
        }
        if(kode.arrowup){
            this.yM-=up;
            this.direction=3;
            
            this.xM=0;
            this.x=grid(this.x, can.width/10)+6;
        }
        
        this.yM = Math.max(Math.min(up*20, this.yM), up*-20);
        this.xM = Math.max(Math.min(up*20, this.xM), up*-20);
        
        this.x+=this.xM;
        this.y+=this.yM;
        
        this.xM*=0.7;
        this.yM*=0.7;
        this.x=Math.max(Math.min(this.x, can.width-can.width/10), -can.width/10); 
        this.y=Math.max(Math.min(this.y, can.height-can.height/10), -can.height/10);
    }
    
    getX() {
        return grid(this.x+can.width/10, can.width/10);
    }
    
    getY() {
        return grid(this.y+can.height/5, can.height/10);
    }
    
    render(c) {
        if(!kode.arrowleft && !kode.arrowright && !kode.arrowup && !kode.arrowdown)
            this.aniIndex=7;
        if(this.direction==0)
            c.drawImage(this.rimages[this.aniIndex], this.x, this.y, can.width/5, can.height/5);
        if(this.direction==1)
            c.drawImage(this.limages[this.aniIndex], this.x, this.y, can.width/5, can.height/5);
        if(this.direction==2)
            c.drawImage(this.fimages[this.aniIndex], this.x, this.y, can.width/5, can.height/5);
        if(this.direction==3)
            c.drawImage(this.bimages[this.aniIndex], this.x, this.y, can.width/5, can.height/5);
        this.aniIndex++;
        if(this.aniIndex>=7)
            this.aniIndex=0;
        
        c.fillStyle="#ff0000";
        c.fillRect(10, 10, can.width-20, can.height/20);
        c.fillStyle="#00ff00";
        c.fillRect(10, 10, (can.width-20) * (this.health/10.0), can.height/20);
        c.fillStyle="#000000";
        c.font="Arial 100px"
        c.fillText("Health: " + this.health +"/10", 10, 10);
    }
}