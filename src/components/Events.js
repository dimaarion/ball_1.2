import Matter from "matter-js";
import { collidePointRect } from "../action";
import Body from "./Body";
export default class Events {
  p5;
  preload(p5) {
    this.p5 = p5;
  }
  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  collideStart(engine, scena) {
    let body = new Body();
    body.ini(this.p5);
    let d = 0;
    let d2 = 0;
    let d3 = 0;
    let speed = 3;
    Matter.Events.on(engine, "collisionStart", function (event) {
      var pairs = event.pairs;
      for (var i = 0, j = pairs.length; i != j; ++i) {
        var pair = pairs[i];
        // console.log(pair);
        if (pair.bodyB.label === "portal") {
          Matter.Body.setPosition(pair.bodyA, {
            x: 100,
            y: 100,
          });
        }

        if (
          pair.bodyA.label === "player" &&
          pair.bodyB.typeObject === "point_b_1"
        ) {
          d = 1;
        }
        if (
          pair.bodyA.label === "player" &&
          pair.bodyB.typeObject === "point_s_1"
        ) {
          //  d = speed;
        }
        if (
          pair.bodyA.label === "player" &&
          pair.bodyB.typeObject === "point_r_1"
        ) {
          d2 = speed;
        }
        if (
          pair.bodyA.label === "player" &&
          pair.bodyB.typeObject === "point_b_3"
        ) {
          d3 = -speed;
          d = 2;
        }
        if (
          pair.bodyA.label === "player" &&
          pair.bodyB.typeObject === "point_r_1"
        ) {
          // d2 = -speed;
        }
      }
    });

    Matter.Events.on(engine, "collisionEnd", function (event) {
      var pairs = event.pairs;
      for (var i = 0, j = pairs.length; i != j; ++i) {
        var pair = pairs[i];
        if (pair.bodyA.label === "player" && pair.bodyB.label === "lift") {
        }
      }
    });

    Matter.Events.on(engine, "beforeUpdate", function (event) {
      if (
        d === 1 &&
        body.getType(engine, "point_t_1").position.y >
          body.getType(engine, "lift_1").position.y
      ) {
        d = 0;
      }
      if (
        d === 2 &&
        body.getType(engine, "point_v_3").position.y <
          body.getType(engine, "lift_1").position.y
      ) {
        d = 0;
      }

      if (d === 1) {
        Matter.Body.translate(body.getType(engine, "lift_1"), {
          x: 0,
          y: -speed,
        });
      } else if (d === 2) {
        Matter.Body.translate(body.getType(engine, "lift_1"), {
          x: 0,
          y: speed,
        });
      }

      if (
        body.getType(engine, "lift_2").position.x <=
        body.getType(engine, "point_r_2").position.x
      ) {
        Matter.Body.translate(body.getType(engine, "lift_2"), { x: d2, y: 0 });
      }

      if (
        body.getType(engine, "lift_3").position.y >=
        body.getType(engine, "point_t_3").position.y
      ) {
        Matter.Body.translate(body.getType(engine, "lift_3"), { x: 0, y: d3 });
      }

      if (
        body.getType(engine, "lift_1").position.y <=
        body.getType(engine, "point_v_3").position.y
      ) {
        //   Matter.Body.translate(body.getType(engine, "lift_1"), { x: 0, y: d3 });
      }
    });
  }
}
