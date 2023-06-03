import Matter from "matter-js";
import { getRndInteger, scale } from "../action";
import Body from "./Body";
export default class Events {
  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  collideStart(engine, scena) {
    let body = new Body();
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
          d = -speed;
        }
        if (
          pair.bodyA.label === "player" &&
          pair.bodyB.typeObject === "point_s_1"
        ) {
          d = speed;
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

    Matter.Events.on(engine, "collisionActive", function (event) {
      var pairs = event.pairs;
      for (var i = 0, j = pairs.length; i != j; ++i) {
        var pair = pairs[i];
      }
    });
    console.log(body.getType(engine, "lift_1"));

    Matter.Events.on(engine, "beforeUpdate", function (event) {
      if (
        body.getType(engine, "lift_1").position.y >=
        body.getType(engine, "point_t_1").position.y
      ) {
        Matter.Body.translate(body.getType(engine, "lift_1"), { x: 0, y: d });
      }

      engine.world.bodies
        .filter((f) => f.typeObject === "lift_2")
        .map((b) => {
          if (
            b.position.x <=
            engine.world.bodies.filter((f) => f.typeObject === "point_r_2")[0]
              .position.x
          ) {
            Matter.Body.translate(b, { x: d2, y: 0 });
          }
        });

      engine.world.bodies
        .filter((f) => f.typeObject === "lift_3")
        .map((b) => {
          if (
            b.position.y >=
            engine.world.bodies.filter((f) => f.typeObject === "point_t_3")[0]
              .position.y
          ) {
            Matter.Body.translate(b, { x: 0, y: d3 });
          }
        });
    });
  }
}
