function Player(x,y, col) {
  this.x = x;
  this.y = y;
  this.prevx;
  this.prevy;
  this.speed = 3;
  this.size = 30;
  this.col = col;
  this.fillcol;

  this.img;


  this.pos = createVector(this.x, this.y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);



  //Pour les forces verticales
  this.applyForce = function(f) {
    this.acc.add(f);
  }

  this.applyChange = function(f) {
    this.pos.add(f);
  }

      this.bounce = function() {
        this.applyForce(createVector(0, -8));
      }

      this.rebounce = function(rbspeed) {
        if(rbspeed < 0) {
          rbspeed *= -1;
        }
        this.applyChange(createVector(0, 2));
        this.applyForce(createVector(0, rbspeed));
      }

      this.colorSwitch = function() {
        if(this.col == 0) {
          this.col = 1;
        }else {
          this.col = 0;
        }
      }
    this.update = function() {
      if(keyIsDown(RIGHT_ARROW)) {
        this.applyChange(this.speed, 0);
      }
      if(keyIsDown(LEFT_ARROW)) {
        this.applyChange(-this.speed, 0);
      }
      this.prevx = this.pos.x;
      this.prevy = this.pos.y;

      this.vel.add(this.acc);
      this.vel.limit(20);
      this.pos.add(this.vel);
      this.acc.mult(0);



switch(this.col) {
  case 0 :
  this.fillcol = color(115, 227, 9);
  break;
  case 1 :
  this.fillcol = color(255, 121, 0);
  break;
}
    }

    this.display = function() {
      fill(this.fillcol);
      imageMode(CENTER);
      image(this.img,this.pos.x,this.pos.y,40,40);
      // ellipse(this.pos.x, this.pos.y, this.size);
  }
  this.setSpeed = function(num){
    this.speed = num;
  }

  this.setImg = function(imgg){
    this.img = imgg;
  }
}



function keyPressed() {
  if(keyIsDown(UP_ARROW))  {
    player.colorSwitch();
  }
}
