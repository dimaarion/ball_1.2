import Matter from "matter-js";
import {
  getObjectsType,
  collideRectRect,
  collidePointRect,
  size,
  sizeX,
  sizeY,
} from "../action";
import Animate from "./Animate";
import Body from "./Body";
export default class Lift extends Body {
  body = {};
  scena = {};
  m = {};
  x = 100;
  y = 100;
  static = true;
  width = 50;
  height = 50;
  radius = 50;
  mass = 1;
  speed = 3;
  friction = 1;
  getObj;
  image = "./asset/player.png";
  frame = 1;
  img;
  world;
  p5;
  engine;
  direction = 0;
  liftPlayer = [{}];
  animate = new Animate();
  constructor(props) {
    super(props);
  }
  loadImg(p5) {
   //  this.animate.setup(p5);
   //  this.animate.animateE("./asset/level1/objects/lift.png");
  }
  setup(engine) {
    // this.engine = engine;
    // this.slope = 0.6;
  }

  speedCalculation(p5) {
    let p = (p5.windowWidth + p5.windowHeight) / 3000;
    console.log(p)
    return p;
  }

  view(p5) {
    if (this.body.length > 0) {
      this.world.bodies
        .filter((f) => f.label === "pointBottom")
        .map((b) => {
          if (
            collideRectRect(
              this.body[0].position.x,
              this.body[0].position.y,
              this.body[0].width,
              this.body[0].height,
              b.position.x,
              b.position.y,
              b.width,
              b.height
            )
          ) {
            this.direction = 1;
          }
        });
      this.world.bodies
        .filter((f) => f.label === "pointTop")
        .map((b) => {
          if (
            collideRectRect(
              this.body[0].position.x,
              this.body[0].position.y,
              this.body[0].width,
              this.body[0].height,
              b.position.x,
              b.position.y,
              b.width,
              b.height
            )
          ) {
            this.direction = 2;
          }
        });

      if (this.direction === 1) {
        this.body.map((b) =>
          Matter.Body.translate(b, { x: 0, y: -this.speedCalculation(p5) })
        );
      } else if (this.direction === 2) {
        this.body.map((b) =>
          Matter.Body.translate(b, { x: 0, y: this.speedCalculation(p5) / 2 })
        );
      } else if (this.direction === 0) {
        Matter.Body.translate(this.body[0], { x: 0, y: 0 });
      } else if (this.direction === 0) {
        // Matter.Body.translate(this.body[0],{x:0,y:0})
      }
    }
  }
}
