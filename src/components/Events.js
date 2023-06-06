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
        if (pair.bodyB.label === "portal" && pair.bodyB.typeObject == "1") {
          Matter.Body.setPosition(pair.bodyA, {
            x:body.getType(engine, "point_portal_1").position.x,
            y: body.getType(engine, "point_portal_1").position.y,
          });
        }

        if (
          pair.bodyA.label === "player" &&
          pair.bodyB.typeObject === "point_active_lift_1_up"
        ) {
          d = 1;
        }
        if (
          pair.bodyA.label === "player" &&
          pair.bodyB.typeObject === "point_active_lift_1_down"
        ) {
          d = 2;
        }
        if (
          pair.bodyA.label === "player" &&
          pair.bodyB.typeObject === "point_active_lift_3"
        ) {
          d2 = 1;
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

    Matter.Events.on(engine, "beforeUpdate", function (event) {
     
      if (d === 1) {
        body.translateY(engine, "point_up_lift_1","lift_1","lift_1");
      } else if (d === 2) {
        body.translateY(engine, "point_down_lift_1","lift_1","lift_1");
      }
      if (d2 === 1) {
        body.translateY(engine, "point_Lift_3","lift_3","lift_3");
      } else if (d === 2) {
        body.translateY(engine, "point_down_lift_1","lift_1","lift_1");
      }

     
    });
  }
}
