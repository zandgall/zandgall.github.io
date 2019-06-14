class insect {

  constructor(x, y, size, type) {

    this.still = new Image();
    this.still.src = "Funsies/OpenInsects/"+type+"0.png?"+new Date().getTime();
    this.fly = new Image();
    this.fly.src = "Funsies/OpenInsects/"+type+"1.png?"+new Date().getTime();

    this.type = type;
    this.angle = Math.random()*Math.PI*2;
    this.x=x;
    this.y=y;
    this.size =0.002*size;

    this.i=0;
    this.chased = false;

    this.flying = false;

  }

  defaultAiMove() {
    if(this.i<10) {
      if(Math.random()<0.5){
       if(Math.random()<0.5){
          this.angle+=0.2;
        } else {
          this.angle-=0.2;
        }
      }
      if(this.x>can.width-50)
        if(this.angle<Math.PI)
          this.angle+=0.2;
        else this.angle-=0.2;
      if(this.x<50)
        if(this.angle<0)
          this.angle+=0.2;
        else this.angle-=0.2;
      if(this.y<50)
        if(this.angle<Math.PI/2)
          this.angle+=0.2;
        else this.angle-=0.2;
      if(this.y>can.height-50)
        if(this.angle<Math.PI*1.5)
          this.angle+=0.2;
        else this.angle-=0.2;
      this.x+=Math.cos(this.angle)*2;
      this.y+=Math.sin(this.angle)*2;
      this.i++;
    } else if(Math.random()<0.02)
      this.i=0;

    this.flying = (Math.random()<0.001);
  }

  flyAiMove() {
      if(Math.random()<0.5){
       if(Math.random()<0.5){
          this.angle+=0.2;
        } else {
          this.angle-=0.2;
        }
      }
      if(this.x>can.width-50)
        if(this.angle<Math.PI)
          this.angle+=0.2;
        else this.angle-=0.2;
      if(this.x<50)
        if(this.angle<0)
          this.angle+=0.2;
        else this.angle-=0.2;
      if(this.y<50)
        if(this.angle<Math.PI/2)
          this.angle+=0.2;
        else this.angle-=0.2;
      if(this.y>can.height-50)
        if(this.angle<Math.PI*1.5)
          this.angle+=0.2;
        else this.angle-=0.2;
      this.x+=Math.cos(this.angle)*7;
      this.y+=Math.sin(this.angle)*7;
      this.i++;

    this.flying = (Math.random()<0.99);
  }

  runAiMove() {
    this.angle = Math.atan2(mouseY - this.y, mouseX - this.x)+Math.PI;
    this.x+=Math.cos(this.angle)*7;
    this.y+=Math.sin(this.angle)*7;
  }

  tick() {
    if(dist(this.x, this.y, mouseX, mouseY)<(this.chased ? 100 : 50)){
      this.chased = true;
      this.flying = true;
      this.runAiMove();
    } else {
      this.chased = false;
      if(this.flying) {
        this.flyAiMove();
      } else {
        this.defaultAiMove();
      }
    }
  }

  render(c) {
    var image = this.still;
    if(this.chased||this.flying)
      image = this.fly;
    c.translate(this.x-image.width*this.size/2, this.y-image.height*this.size/2);
    c.rotate(this.angle);
    c.drawImage(image, 0, 0, image.width*this.size, image.height*this.size);
    c.rotate(-this.angle);
    c.translate(-this.x+image.width*this.size/2, -this.y+image.height*this.size/2);
  }

}
