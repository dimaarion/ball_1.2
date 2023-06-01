import Matter from "matter-js";
import { getRndInteger } from "../action";
export default class Events {
  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  collideStart(engine) {
    Matter.Events.on(engine, "collisionStart", function (event) {
      var pairs = event.pairs;
    //  console.log(getRndInteger(100, 1000));
      for (var i = 0, j = pairs.length; i != j; ++i) {
        var pair = pairs[i];
       // console.log(pair);
        if (pair.bodyB.label === "portal") {
          Matter.Body.setPosition(pair.bodyA, {
            x: getRndInteger(100, 1000),
            y: getRndInteger(100, 1000),
          });
        }
      }
    });
  }
}
