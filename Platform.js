// var anim;

// function preload(){
//   anim = loadAnimation("img/anim1.png", "img/anim2.png", "img/anim3.png","img/anim4.png");

// }

function Platform(x,y,width,col,index,img) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = 50;
  this.col = col;
  this.fillcol;
  this.img = img;
  switch(this.col) {
    case 0 :
    this.fillcol = color(255,255,255);
    break;
    case 1 :
    this.fillcol = color(255,163,81);
    break;
  }
  this.index = index;


  this.display = function() {
    // imageMode(CENTER);
    if(img == 0){
      fill(this.fillcol);
    }
    else{
      fill(255,255,255,0);
      animation(this.img, this.x - 10, this.y - 20);
    }

    rect(this.x, this.y, this.width, this.height, 30);
  }

  this.stopAnim = function(){
    this.img.stop();
  }

  this.playAnim = function(){
    this.img.play();
    this.img.looping = false;
  }


}
