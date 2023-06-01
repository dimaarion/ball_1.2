import { scale } from "../action";
import Animate from "./Animate";
export default class Map {
  x = 0;
  y = 0;
  width = 1250;
  height = 1250;
  name;
  img;
  image;
  scena = {};
  animate = new Animate();

  loadImg(p5, name) {
    this.animate.setup(p5)
    this.animate.animateE(name);
  }

  create() { }

  generateMap = (scena) => {
    this.scena = scena;


  }

  view(p5, id) {
    let col = 0;
    let row = 0;
    this.scena.getObjectData("level 1").map((x) => {
      col++;
      if (x === id) {
        p5.image(
          this.animate.sprite(),
          this.scena.size(col * this.scena.scena.tilewidth, scale) - this.scena.size(this.scena.scena.tilewidth, scale),
          this.scena.size(row * this.scena.scena.tileheight, scale),
          this.scena.size(this.scena.scena.tilewidth, scale),
          this.scena.size(this.scena.scena.tileheight, scale)
        );
      }
      if (col > this.scena.scena.width - 1) {
        col = 0;
        row++;
      }
    })

  }
}
