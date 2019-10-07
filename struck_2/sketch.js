let player;
let platforms = [];
let splat = [];
const gravity = 0.1;
const fps = 60;
let timers = [];
var img;

var losePossib, gameOver;
var curPos, origPos, generate;

var r, g, b;
let xoff = 0.0;

var initCount, algo;

var sequence, heartCount;

var noiseVal2,a;

var char1,char2, char3, char4, splash;
var tut;

function preload(){
  img = loadAnimation("img/anim1.png", "img/anim2.png", "img/anim3.png","img/anim4.png");

  char1 = loadImage("img/chara1.png");
  char2 = loadImage("img/chara2.png");
  char3 = loadImage("img/chara3.png");
  char4 = loadImage("img/chara4.png");
  lI = loadImage("img/loveInterest4.png");

  splash = loadImage("img/Splash.png");
}

function setup() {
  var myCanvas = createCanvas(480, 700);
  myCanvas.parent("center");
  tut = false;
  background(51);
  rectMode(CENTER);
  pixelDensity(3);
  frameRate(fps);
  xoff = 0.0;
  origPos = 0;
  // img = loadGif('img/heart_anim.gif');
  noStroke();
  r = 129;
  b = 212; 
  g = 255;
  heartCount = 0;
  noiseVal2 = 0.1;
  gameOver = false;
  generate = false;
  initCount = -1;
  algo = -1;
  losePossib = false;
  platforms.push(new Platform(200, height, 2000, 0, 0,0));  
  player = new Player(width/2, 600, round(random(0, 1)));
  player.setImg(char1);
  for(let i = 1; i < 5; i++) {
    platforms.push(new Platform(random(0, width), (i-1)*175, 100, round(random(0, 1)), i,loadAnimation("img/anim1.png", "img/anim2.png", "img/anim3.png","img/anim4.png")));
  }
  curPos = player.pos.y;

      for(let i = 1; i < 5; i++) {
        platforms.push(new Platform(random(60, width), -1 * ((i-1)*175), 100, round(random(0, 1)), i, loadAnimation("img/anim1.png", "img/anim2.png", "img/anim3.png","img/anim4.png")));
        // console.log("PLATFORM pos + " + platforms[i].y);
      }
  
      start = -1 * (initCount * 3) + algo;
        for(let i = start; i>start - 400; i--) {
            platforms.push(new Platform(random(60, width), (i-1)*175, 100, round(random(0, 1)), i * -1, loadAnimation("img/anim1.png", "img/anim2.png", "img/anim3.png","img/anim4.png")));
            // console.log((i-1)*175);
        }
      
    initCount++;
    algo++;
    generate = true;

}

function draw() {
  if( tut == true ){
  b = map(player.pos.y, 300, -6000, 220, 0);
  r = map(player.pos.y, 300, -7000, 0, 255);
  g = map(player.pos.y, 300, -6000, 220, 0);
  background(255,g,b);
  // console.log(player.pos.y);
  fill(255);
  if(player.pos.y < -3500){
  for(var i = 0; i < 600; i+=50){
    for(var j = 0; j < 700; j+=50){
      fill(255,0,0);
      xoff = xoff + 0.01;
      let n = noise(xoff) * 20;
      ellipse(i-n,j+player.pos.y-300-n, random(10));
    }
  }
}

for(var i = -30; i < 30; i+=10){
  blendMode(OVERLAY);
  fill(255,30);
  rect(random(player.pos.y/100), player.pos.y+random(player.pos.y/100)+(i*10), 3000,random(30));
}
blendMode(REPLACE);

  // for (let x=0; x < abs(player.pos.y/500); x++) {
  //   let noiseVal = noise(((player.pos.y)+x)*0.2, player.pos.y*0.2);
  //   var rand = random(50);
  //   // fill(r+rand,g+rand,b+rand);
  //   fill(255,0,0,x*10)
  //   // ellipse(noiseVal*30,random(player.pos.y + 300, player.pos.y - 300 ), player.pos.y+noiseVal*30, 30);
  //   ellipse(player.pos.x,random(player.pos.y - 100,player.pos.y + 100), 100,100)
  // }

  noStroke();
  

  player.applyForce(createVector(0, gravity));
  player.update();



  for(let i=0; i<platforms.length;i++) {

//     if(GoThrough(i)) {
//         player.vel.mult(0);
//         player.applyChange(createVector(0, -1*(player.pos.y - player.prevy)/2));
//       console.log('WENT THROUGH');
    // }
   
    if(i != 0){
        platforms[i].stopAnim();
         platforms[i].x+=random(heartCount *-1, heartCount);
    }
    if(UpCollision(i)) {
        // Disappearing platform
                 // console.log(i);

        if(i != 0 ){
            heartCount++;
            platforms[i].playAnim();
             splat.push(platforms[i]);
             platforms.splice(i,1);
             splat[splat.length-1].playAnim();

            // }
            // platforms[i].playAnim();
            losePossib = true;
        }
        else{
          if(losePossib == true){
            gameOver = true;
            console.log("LOSE");
          }
        }

        player.vel.mult(0);
        player.bounce();

        // console.log('bouncing');


    }
    // else{
    // }


  //   if(DownCollision(i)) {
  //       // let rbspeed = player.vel.y;
  //       // player.rebounce(rbspeed);
  //       console.log('rebouncing');
  //   // }

  //   // if((player.vel.y < 0 || losePossib == false) && UpCollision(i) == false){

  //   // }
  // }
}


// for(let i = 0; i < 10; i++) {
//   if(typeof timers[i] !== 'undefined') {
//     timers[i].update();
//   }
// }

camera.position.y = player.pos.y;
if(player.pos.y < -100){
   player.setSpeed(3);
}

if(player.vel.y > 9){
  gameOver = true;
}

// if(player.pos.y > height - 200 && gameOver== true && UpCollision(0) == false){
//   player.vel.y++;
// }

  for(plat of platforms) {
    plat.display();
  }
  for(var i = 0; i < splat.length; i++) {
    splat[i].display();
  }
  player.display();

  if(player.vel.y > 10){
    player.vel.y = 10;
  }

  if(player.pos.y < -1500 && player.pos.y > -3000 ){
    player.setImg(char2);
  }
  else if(player.pos.y <= -3000 && player.pos.y > -4500 ){
    player.setImg(char3);
  }
  else if(player.pos.y <= -4500 && player.pos.y > -6000 ){
    player.setImg(char4);
  }

  fill(255);
  stroke(0);
  strokeWeight(3);
  var mapped1 = map(player.pos.x,0,480,220,250);
  var mapped2 = map(player.pos.x,0,480,170,300);
  var mapped3 = map(player.pos.x,0,480,120,350);
  image(lI, 225, player.pos.y + 250,175,169);
  ellipse(mapped3,player.pos.y+50, 10);
  ellipse(mapped2,player.pos.y+85, 20);
  ellipse(mapped1,player.pos.y+130, 30);
}
else{
  image(splash,0,0);
}

  
}

function UpCollision(i) {
  return player.pos.x+(player.size/2) > platforms[i].x-(platforms[i].width/2)
  && player.pos.x-(player.size/2) < platforms[i].x+(platforms[i].width/2)
  && player.pos.y+(player.size/2) > platforms[i].y-(platforms[i].height/2)
  && player.pos.y-(player.size/2) < platforms[i].y-(platforms[i].height/2)
  && player.pos.y < platforms[i].y;
}
function DownCollision(i) {
//   return player.pos.x+(player.size/2) > platforms[i].x-(platforms[i].width/2)
//   && player.pos.x-(player.size/2) < platforms[i].x+(platforms[i].width/2)
//   && player.pos.y+(player.size/2) > platforms[i].y+(platforms[i].height/2)
//   && player.pos.y-(player.size/2) < platforms[i].y+(platforms[i].height/2)
//   && player.pos.y > platforms[i].y;
}
function GoThrough(i) {
  // return player.prevx+(player.size/2) > platforms[i].x-(platforms[i].width/2)
  // && player.prevx-(player.size/2) < platforms[i].x+(platforms[i].width/2)
  // && player.pos.x+(player.size/2) > platforms[i].x-(platforms[i].width/2)
  // && player.pos.x-(player.size/2) < platforms[i].x+(platforms[i].width/2)
  // && player.prevy < platforms[i].y
  // && player.pos.y > platforms[i].y;
}

function keyReleased(){
  tut = true;
}