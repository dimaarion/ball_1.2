import Matter from "matter-js";
import { getObjects, size, sizeX, sizeY } from "../action";
import Animate from "./Animate";
import Body from "./Body";
export default class Player extends Body {
  body = {};
  scena = {};
  m = {};
  x = 100;
  y = 100;
  static = false;
  width = 50;
  height = 50;
  radius = 50;
  left = 0;
  right = 0;
  up = 0;
  down = 6;
  mass = 1;
  speed = 0;
  friction = 1;
  getObj;
  image = "./asset/Player/player.png";
  imageR = "./asset/Player/playerR.png";
  imageS = "./asset/Player/soplo.png"
  imageS2 = "./asset/Player/soplo2.png"
  frame = 1;
  baseY = 0;
  img = 0;
  world;
  p5;
  time = 0;
  time2 = 0;
  direction = 0;
  soploX = 1.1;
  soploX2 = 0.5;
  animate = new Animate();
  animateR = new Animate();
  soplo = new Animate();
  soplo2 = new Animate();
  constructor(props) {
    super(props);
  }
  loadImg(p5) {
    this.p5 = p5;
    this.animate.setup(p5)
    this.animate.animateD(this.image,13);
    this.animateR.setup(p5)
    this.animateR.animateD(this.imageR,13);
    this.soplo.setup(p5)
    this.soplo.animateD(this.imageS,29)
    this.soplo2.setup(p5)
    this.soplo2.animateD(this.imageS2,29)
  }

  setup(engine,world,scena) {
    this.scena = scena;
    this.animate.setupAnimate();
    this.animateR.setupAnimate();
    this.soplo.setupAnimate();
    this.soplo2.setupAnimate();
    this.createEllipse(world,scena)
  }

  view(p5) {
    p5.push();
  //  p5.noStroke();
  //  p5.fill(207, 7, 99);
   // p5.drawingContext.shadowOffsetX = 0;
   // p5.drawingContext.shadowOffsetY = 0;
   // p5.drawingContext.shadowBlur = 15;
   // p5.drawingContext.shadowColor = p5.color(207, 7, 99);
    // p5.rotateX(90);
   // this.viewEllipse(p5);
    //this.setRotate();
   // this.animate.newArrImg[(Math.floor(p5.frameCount / 2) ) % this.animate.newArrImg.length].resize(10, 32);
   
   if(this.speed === -5){
    this.soploX2 = 0.5;
    this.direction = 1
    this.time2 = 0;
   }else if(this.speed === 5){
    this.soploX = 1;
    this.time = 0;
    this.direction = 2
   } else{
    this.soploX2 = -1.8;
    this.soploX = 1.1
    this.description = 0;
    //this.time = 0;
   // this.img = 0  
   }
if(this.speed === 0){
  //this.time = 0;
  //this.time2 = 0;
}



if(this.direction === 1){
  try {
    this.body.map((b)=> p5.image(this.soplo2.newArrImg[(Math.floor(p5.frameCount)) % this.soplo2.newArrImg.length],b.position.x + this.scena.size(this.soploX2,this.scena.scale) ,b.position.y - b.width / 2.4,b.width,b.width-10))
  } catch (error) {
    
  }
  this.time += 1;
  this.img = (Math.floor(p5.frameCount / 2) ) % this.animate.newArrImg.length;
  if(this.time >= 22){
    this.img = this.animate.newArrImg.length - 1
  }
  this.body.map((b)=> p5.image(this.animate.newArrImg[this.img],b.position.x - b.width / 2 ,b.position.y - b.width / 2,b.width,b.width))
}else if(this.direction === 2){
  try {
    this.body.map((b)=> p5.image(this.soplo.newArrImg[(Math.floor(p5.frameCount)) % this.soplo.newArrImg.length],b.position.x - b.width / this.soploX ,b.position.y - b.width / 2.4,b.width,b.width-10))
  } catch (error) {
    
  }
  this.time2 += 1;
  this.img = (Math.floor(p5.frameCount / 2) ) % this.animateR.newArrImg.length;
  if(this.time2 >= 22){
    this.img = this.animateR.newArrImg.length - 1
  }
  this.body.map((b)=> p5.image(this.animateR.newArrImg[this.img],b.position.x - b.width / 2 ,b.position.y - b.width / 2,b.width,b.width))
  
}else{
  this.body.map((b)=> p5.image(this.animate.newArrImg[0],b.position.x - b.width / 2 ,b.position.y - b.width / 2,b.width,b.width))
}

console.log(this.time)

  
   this.setVelosity(this.speed, 5);

    p5.pop();
    //   p5.fill(110);
    //  p5.rectMode(p5.CENTER);

    //  if (this.world !== undefined) {
    //  this.world.bodies
    //    .filter((f) => f.label === "player")
    //    .map((b) => p5.rect(b.position.x, b.position.y, b.width, b.width));

    //  this.world.bodies
    //    .filter((f) => f.label === "player")
    //    .map((b) =>
    //      p5.image(
    //        this.animate.sprite(),
    //        b.position.x - b.width / 2,
    //       b.position.y - b.width / 2,
    //        b.width,
    //       b.height
    //    )
    //   );
    //  }
  }
}
