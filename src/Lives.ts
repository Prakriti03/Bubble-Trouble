import { CANVAS_DIMENSIONS, WALL_WIDTH } from "./constants";

export class Lives {
  ctx: CanvasRenderingContext2D;
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }


  draw(playerOneLife: number, playerTwoLife : number) {
    //draw for Player 2
    this.ctx.fillStyle = "red";
    this.ctx.font = "20px";
    this.ctx.fillText(
      `Lives: ${playerTwoLife} `,
      CANVAS_DIMENSIONS.CANVAS_WIDTH - WALL_WIDTH - 100,
      CANVAS_DIMENSIONS.CANVAS_HEIGHT - 50
    );

    //draw for Player 1
    this.ctx.fillStyle = "red";
    this.ctx.font = "20px";
    this.ctx.fillText(
      `Lives: ${playerOneLife} `,
      WALL_WIDTH,
      CANVAS_DIMENSIONS.CANVAS_HEIGHT - 50
    );
  }
}
