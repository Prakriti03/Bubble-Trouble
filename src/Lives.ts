import { CANVAS_DIMENSIONS } from "./constants";

export class Lives {
    ctx: CanvasRenderingContext2D;
    life : number;  
    constructor(ctx: CanvasRenderingContext2D) {
      this.ctx = ctx;
      this.life = 5;
    } 
    decrement() {
      this.life -= 1;
    }
   draw() {
      this.ctx.fillStyle = "white";
      this.ctx.font = "20px Arial";
      this.ctx.fillText(`Lives: ${this.life}`, CANVAS_DIMENSIONS.CANVAS_WIDTH-100, CANVAS_DIMENSIONS.CANVAS_HEIGHT - 50);
    }
  }
  