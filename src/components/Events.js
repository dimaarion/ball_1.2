import Matter from "matter-js";
import { getRndInteger,scale } from "../action";
export default class Events {
  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  collideStart(engine, scena) {

    let body = {};
let d = 0;
let d2 = 0;
let speed = 1;
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
        if (pair.bodyA.typeObject === "lift_1" && pair.bodyB.typeObject === "point_t_1") {
          d = 0
        }
        if (pair.bodyA.label === "player" && pair.bodyB.typeObject === "point_b_1") {
          d = -speed
        }
        if (pair.bodyA.label === "player" && pair.bodyB.typeObject === "point_b_2") {
          d2 = -speed
        }
        if (pair.bodyA.typeObject === "lift_2" && pair.bodyB.typeObject === "point_t_2") {
          d2 = 0
        }

      }
    });

    Matter.Events.on(engine, "collisionActive", function (event) {
      var pairs = event.pairs;
      for (var i = 0, j = pairs.length; i != j; ++i) {
        var pair = pairs[i];
        if (pair.bodyA.label === "player" && pair.bodyB.label === "lift") {
                if( pair.bodyB.position.y >= scena.size(80,scale) ){
               //  d = -1
                }else{
               //   d = 1
                }
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
    })
    engine.world.bodies.filter((f)=>f.typeObject === "lift_1").map((b)=>console.log(b))
    Matter.Events.on(engine, "beforeUpdate", function (event) {
    
         engine.world.bodies.filter((f)=>f.typeObject === "lift_1").map((b)=>Matter.Body.translate(b, { x: 0, y: d }))
         engine.world.bodies.filter((f)=>f.typeObject === "lift_2").map((b)=>Matter.Body.translate(b, { x: 0, y: d2 }))
     
    });
   

   
  }


}
