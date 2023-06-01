import Player from "./Player";
import Walls from "./Walls";
import Map from "./Map";
import Lift from "./Lift";
import Portal from "./Portal";
import Scena from "./Scena";
import Events from "./Events";
import Animate from "./Animate";
import {scale } from "../action/index";
import Many from "./Many";
import scena1 from "../scena/scena.json"
export default class Level {
  player = new Player("player");
  map = new Map();
  walls = new Walls("platform");
  pointB = new Walls("pointBottom");
  pointT = new Walls("pointTop");
  liftPoint = new Walls("liftPoint");
  lift = new Lift("lift");
  lift2 = new Lift("lift2");
  lift3 = new Lift("lift3");
  lift4 = new Lift("lift4");
  portal = new Portal("portal");
  scena = new Scena(scena1);
  animate = new Animate();
  event = new Events();
  many = new Many("many");
  imgMap;
  preload(p5) {
    this.player.loadImg(p5);
    this.scena.preload(p5);
    this.animate.setup(p5);
    this.map.loadImg(p5,"./asset/level1/Tiles/IndustrialTile_73.png");
    this.lift.loadImage(p5)
    this.lift2.loadImage(p5);
    this.lift3.loadImage(p5);
    this.lift4.loadImage(p5);
    this.many.preloadImage(p5);
   this.imgMap = p5.loadImage("./asset/level1/Tiles/IndustrialTile_73.png")
  }

  create(world, engine) {
    this.many.create(world);
    this.scena.create();
    this.map.generateMap(this.scena)
    this.lift.setupImage("./asset/level1/objects/lift.png");
    this.lift2.setupImage("./asset/level1/objects/lift.png");
    this.lift3.setupImage("./asset/level1/objects/lift.png");
    this.lift4.setupImage("./asset/level1/objects/lift.png");
    this.player.createEllipse(world, this.scena);
    this.walls.createRect(world, this.scena);
    this.lift.createRect(world, this.scena);
    this.lift2.createRect(world, this.scena);
    this.lift3.createRect(world, this.scena);
    this.lift4.createRect(world, this.scena);
    this.portal.createRect(world, this.scena);
    this.lift.setup(engine);
    this.pointB.createRect(world, this.scena);
    this.pointT.createRect(world, this.scena);
    this.pointB.sensor = true;
    this.pointT.sensor = true;
    this.portal.sensor = true;
    // this.map.create();
    this.event.collideStart(engine);
    this.animate.animateE("./asset/level1/Background.png");
    this.many.createEllipse(world, this.scena);
   
  }

  view(p5) {
    p5.background(102, 98, 97);
    p5.rectMode(p5.CENTER);

    this.player.translates(p5);
    p5.image(
      this.animate.sprite(),
      -window.innerWidth / 2,
      -window.innerHeight / 2,
      this.scena.size(this.scena.scenaWidth, scale) + window.innerWidth,
      this.scena.size(this.scena.scenaHeigiht, scale) + window.innerHeight
    );
    this.map.view(p5, 25);

    //this.walls.viewRect(p5);
    this.player.view(p5);
    this.lift.viewImage(p5);
    this.lift2.viewImage(p5);
    this.lift3.viewImage(p5);
    this.lift4.viewImage(p5);
    // this.pointB.viewRect(p5);
    // this.pointT.viewRect(p5);
    this.lift.view(p5);
    this.lift2.view(p5);
    this.lift3.view(p5);
    this.lift4.view(p5);
    this.portal.viewRect(p5);
    this.many.view(p5)
  }

  pressed(e) {
    if (e.key === "ArrowRight") {
      this.player.speed = 0.1;
    } else if (e.key === "ArrowLeft") {
      this.player.speed = -0.1;
    }
  }
  rePressed(e) {
    if (e.key === "ArrowRight") {
      this.player.speed = 0;
    } else if (e.key === "ArrowLeft") {
      this.player.speed = 0;
    }
  }
}
