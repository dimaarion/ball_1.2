import Body from "./Body";
import Animate from "./Animate";

export default class Many extends Body{
    animate = new Animate();
    constructor(props){
        super(props)
      }

      preloadImage(p5){
        this.animate.setup(p5);
        this.animate.animateD("./asset/level1/objects/money.png", 12)
      }

      create(world){
        this.animate.setupAnimate();
        this.sensor = true
        console.log(this.animate.newArrImg)
      }

      view(p5){
      
       this.body.map((b)=>p5.image(this.animate.newArrImg[(Math.floor(p5.frameCount / 2) ) % this.animate.newArrImg.length],b.position.x - b.circleRadius / 2 , b.position.y - b.circleRadius / 2,b.circleRadius * 2,b.circleRadius * 2 ))
      }
}