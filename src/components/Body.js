import Matter from "matter-js";
import { scale } from "../action";
import Scena from "./Scena";
import Animate from "./Animate";
import Player from "./Player";
export default class Body {
  name;
  world;
  getObj;
  body;
  static = true;
  sensor = false;
  scale = 50;
  slope = 0.9;
  n = 0;
  scena;
  image;
  animate = new Animate();
  constructor(name) {
    this.name = name;
  }

  main(world) {
    this.world = world;
  }

  timer(num) {
    if (this.n > num) {
      this.n = 0;
    }
    return this.n++;
  }

  loadImage(p5, image) {
    this.image = image;
    this.animate.setup(p5);
  }

  setupImage(image) {
    this.image = image;
    this.animate.animateE(this.image);
  }

  setupAnimate(image) {
    this.animate.animateD(image, 8);
    this.animate.animated = true;

    this.animate.setupAnimate();
  }
  translates(p5) {
    if (this.world !== undefined) {
      this.world.bodies
        .filter((f) => f.label === this.name)
        .map((b) =>
          p5.translate(
            -b.position.x + (p5.windowWidth / 2 - b.width),
            -b.position.y + (p5.windowHeight / 2 - b.width)
          )
        );
    }
  }

  getType(engine, name, n = 0) {
    return engine.world.bodies.filter((f) => f.typeObject === name)[n];
  }

  setRotate() {
    if (this.world !== undefined) {
      this.world.bodies
        .filter((f) => f.label === this.name)
        .map((b) => Matter.Body.setAngularVelocity(b, this.speed));
    }
  }

  setVelosity(x, y) {
    if (this.world !== undefined) {
      this.world.bodies
        .filter((f) => f.label === this.name)
        .map((b) => Matter.Body.setVelocity(b, { x: x, y: y }));
    }
  }

  createRect(world, scena) {
    this.world = world;
    this.getObj = scena.getObjects(this.name);
    this.body = this.getObj.map((b) =>
      Matter.Bodies.rectangle(
        scena.size(b.x + b.width / 2, scale),
        scena.size(b.y + b.height / 2, scale),
        scena.size(b.width, scale),
        scena.size(b.height, scale),
        {
          width: scena.size(b.width, scale),
          height: scena.size(b.height, scale),
          label: this.name,
          isStatic: this.static,
          isSensor: this.sensor,
          typeObject: b.type,
        }
      )
    );
    Matter.World.add(this.world, this.body);
  }

  createEllipse(world, scena) {
    this.world = world;
    this.getObj = scena.getObjects(this.name);
    console.log(scena.size(1, scale));
    this.body = this.getObj.map((b) =>
      Matter.Bodies.circle(
        scena.size(b.x + b.width / 2, scale),
        scena.size(b.y + b.height / 2, scale),
        scena.size(b.width / 2, scale),
        {
          width: scena.size(b.width, scale),
          label: this.name,
          isStatic: this.static,
          isSensor: this.sensor,
          typeObject: b.type,
        }
      )
    );
    Matter.World.add(this.world, this.body);
  }

  createTrapezoid(world, scena) {
    this.world = world;
    this.getObj = scena.getObjects(this.name);
    this.body = this.getObj.map((b) =>
      Matter.Bodies.trapezoid(
        scena.size(b.x + b.width / 2, scale),
        scena.size(b.y + b.height / 2, scale),
        scena.size(b.width, scale),
        scena.size(b.height, scale),
        this.slope,
        {
          width: scena.size(b.width, scale),
          height: scena.size(b.height, scale),
          label: this.name,
          isStatic: this.static,
          isSensor: this.sensor,
          typeObject: b.type,
        }
      )
    );
    Matter.World.add(this.world, this.body);
  }

  createVertices(world, scena) {
    let a = [{}];
    this.world = world;
    this.getObj = scena.getObjects(this.name);
    this.body = this.getObj.map((b) =>
      Matter.Bodies.fromVertices(
        scena.size(b.x, scale),
        scena.size(b.y, scale),
        b.polygon.map((v, i) => {
          a[i] = {
            x: scena.size(v.x, scale),
            y: scena.size(v.y, scale),
          };
          return a;
        }),
        {
          width: scena.size(b.width, scale),
          height: scena.size(b.height, scale),
          label: this.name,
          isStatic: this.static,
          isSensor: this.sensor,
          typeObject: b.type,
        }
      )
    );
    Matter.World.add(this.world, this.body);
  }

  viewRect(p5) {
    if (this.world !== undefined) {
      p5.rectMode(p5.CENTER);
      this.world.bodies
        .filter((f) => f.label === this.name)
        .map((b) => p5.rect(b.position.x, b.position.y, b.width, b.height));
    }
  }
  viewEllipse(p5) {
    if (this.world !== undefined) {
      p5.ellipseMode(p5.RADIUS);
      this.world.bodies
        .filter((f) => f.label === this.name)
        .map((b) =>
          p5.ellipse(b.position.x, b.position.y, b.circleRadius, b.circleRadius)
        );
    }
  }

  viewVertices(p5) {
    if (this.world !== undefined) {
      p5.rectMode(p5.CENTER);
      this.world.bodies
        .filter((f) => f.label === this.name)
        .map((b) => {
          p5.beginShape();
          b.vertices.map((v) => p5.vertex(v.x, v.y));
          p5.endShape(p5.CLOSE);
        });
    }
  }

  viewImage(p5) {
    if (this.world !== undefined) {
      p5.rectMode(p5.CENTER);
      this.world.bodies
        .filter((f) => f.label === this.name)
        .map((b) =>
          p5.image(
            this.animate.sprite(),
            b.position.x - b.width / 2,
            b.position.y - b.height / 2,
            b.width,
            b.height
          )
        );
    }
  }

  viewAnimate(p5) {
    if (this.world !== undefined) {
      p5.rectMode(p5.CENTER);
      this.world.bodies
        .filter((f) => f.label === this.name)
        .map((b) => {
          this.animate.params();
          p5.image(
            this.animate.sprite(),
            b.position.x - b.width / 2,
            b.position.y - b.height / 2,
            b.width,
            b.height
          );
        });
    }
  }

  viewEllipseImage(p5, image) {
    if (this.world !== undefined) {
      p5.ellipseMode(p5.RADIUS);
      this.world.bodies
        .filter((f) => f.label === this.name)
        .map((b) =>
          p5.image(
            image,
            b.position.x,
            b.position.y,
            b.circleRadius,
            b.circleRadius
          )
        );
    }
  }
  viewEllipseAnimate(p5, img) {
    if (this.world !== undefined) {
      p5.ellipseMode(p5.RADIUS);
      this.world.bodies
        .filter((f) => f.label === this.name)
        .map((b) => {
          p5.image(img, b.position.x, b.position.y);
        });
    }
  }
}
