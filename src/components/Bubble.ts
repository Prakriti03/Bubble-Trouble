// import { GRAVITY } from "../constants";
import { BUBBLE_DY, BUBBLE_DX } from "../constants";
import { BUBBLE_CENTER_X, BUBBLE_CENTER_Y } from "../constants";

export class Bubble {
  ctx: CanvasRenderingContext2D;
  centerX: number;
  centerY: number;
  radius: number;
  dy: number;
  dx : number;
  numberOfBubbles : number;
//   gravity: number;
  hasLanded: boolean;
  constructor(ctx: CanvasRenderingContext2D, numberOfBubbles: number, radius : number) {
    this.ctx = ctx;
    this.centerX = BUBBLE_CENTER_X;
    this.centerY = BUBBLE_CENTER_Y;
    this.radius = radius;
    // this.gravity = GRAVITY;
    this.dy = BUBBLE_DY;
    this.dx = BUBBLE_DX;
    this.hasLanded = false;
    this.numberOfBubbles = numberOfBubbles;
  }
  draw() {
    this.ctx.beginPath();
    console.log("inside bubble draw");

    const gradient = this.ctx.createRadialGradient(
      this.centerX - this.radius / 3, // Inner circle x
      this.centerY - this.radius / 3, // Inner circle y
      this.radius / 4,                // Inner circle radius
      this.centerX,                   // Outer circle x
      this.centerY,                   // Outer circle y
      this.radius                     // Outer circle radius
    );

    // Define the gradient color stops
    gradient.addColorStop(0, "white"); // Highlight color
    gradient.addColorStop(0.5, "red"); // Main color
    gradient.addColorStop(1, "darkred"); // Shadow color

    this.ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
    this.ctx.closePath();
  }
  resetDy(){
    this.dy = -this.dy;
  }
  resetDx(){
    this.dx = -this.dx;
  }
  update() {
    console.log("inside bubble update")
    this.centerX += this.dx;
    this.centerY += this.dy;
    // this.dy += this.gravity;
  }
  splitBubbles(){
    if (this.radius >= 20){
      this.radius /= 2; 
    }
  }
}
