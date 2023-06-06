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
  p5;
  animate = new Animate();
  constructor(name) {
    this.name = name;
  }

  ini(p5) {
    this.p5 = p5;
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

translateY(engine, name1, name2,events, n = 10){
  Matter.Body.translate(this.getType(engine, events), {
    x: 0,
    y: (this.getType(engine, name1).position.y / n) - (this.getType(engine, name2).position.y / n),
  });
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

  collideRectRect(x, y, w, h, x2, y2, w2, h2) {
    //2d
    //add in a thing to detect rectMode CENTER
    if (
      x + w >= x2 && // r1 right edge past r2 left
      x <= x2 + w2 && // r1 left edge past r2 right
      y + h >= y2 && // r1 top edge past r2 bottom
      y <= y2 + h2
    ) {
      // r1 bottom edge past r2 top
      return true;
    }
    return false;
  }

  collidePointRect(pointX, pointY, x, y, xW, yW) {
    //2d
    if (
      pointX >= x && // right of the left edge AND
      pointX <= x + xW && // left of the right edge AND
      pointY >= y && // below the top AND
      pointY <= y + yW
    ) {
      // above the bottom

      return true;
    }
    return false;
  }

  getType(engine, name, n = 0) {
    return engine.world.bodies.filter((f) => f.typeObject === name)[n];
  }
  collideRectCircle = function (rx, ry, rw, rh, cx, cy, diameter) {
    //2d
    // temporary variables to set edges for testing
    var testX = cx;
    var testY = cy;

    // which edge is closest?
    if (cx < rx) {
      testX = rx; // left edge
    } else if (cx > rx + rw) {
      testX = rx + rw;
    } // right edge

    if (cy < ry) {
      testY = ry; // top edge
    } else if (cy > ry + rh) {
      testY = ry + rh;
    } // bottom edge

    // // get distance from closest edges
    var distance = this.p5.dist(cx, cy, testX, testY);

    // if the distance is less than the radius, collision!
    if (distance <= diameter / 2) {
      return true;
    }
    return false;
  };

  collidePointRectCircle(engine, name1, name2) {
    return this.collideRectRect(
      this.getType(engine, name1).position.x,
      this.getType(engine, name1).position.y,
      this.getType(engine, name1).width,
      this.getType(engine, name1).height,
      this.getType(engine, name2).position.x,
      this.getType(engine, name2).position.y,
      this.getType(engine, name2).width,
      this.getType(engine, name2).width
    );
  }

  collideTypePointRect(engine, name1, name2) {
    return this.collidePointRect(
      this.getType(engine, name1).position.x,
      this.getType(engine, name1).position.y,
      this.getType(engine, name2).position.x,
      this.getType(engine, name2).position.y,
      this.getType(engine, name2).width,
      this.getType(engine, name2).height
    );
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
