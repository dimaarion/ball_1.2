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
  image = "./asset/player.png";
  frame = 1;
  img;
  world;
  p5;
  animate = new Animate();
  constructor(props) {
    super(props);
  }
  loadImg(p5) {
    this.p5 = p5;
   
  }

  view(p5) {
    p5.push();
    p5.noStroke();
    p5.fill(207, 7, 99);
    p5.drawingContext.shadowOffsetX = 0;
    p5.drawingContext.shadowOffsetY = 0;
    p5.drawingContext.shadowBlur = 15;
    p5.drawingContext.shadowColor = p5.color(207, 7, 99);
    this.viewEllipse(p5);
    this.setRotate();
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
