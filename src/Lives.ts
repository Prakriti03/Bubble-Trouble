import { CANVAS_DIMENSIONS, WALL_WIDTH } from "./constants";

/* The `Lives` class in TypeScript is responsible for drawing the remaining lives of players on a
canvas based on the player index. */
export class Lives {
  ctx: CanvasRenderingContext2D;
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  draw(lives: number, playerIndex: number) {
    //draw for Player 2
    if (playerIndex == 1) {
      this.ctx.fillStyle = "red";
      this.ctx.font = "20px";
      this.ctx.fillText(
        `Lives: ${lives} `,
        CANVAS_DIMENSIONS.CANVAS_WIDTH - WALL_WIDTH - 100,
        CANVAS_DIMENSIONS.CANVAS_HEIGHT - 50
      );
    }

    //draw for Player 1
    if (playerIndex == 0) {
      this.ctx.fillStyle = "red";
      this.ctx.font = "20px";
      this.ctx.fillText(
        `Lives: ${lives} `,
        WALL_WIDTH,
        CANVAS_DIMENSIONS.CANVAS_HEIGHT - 50
      );
    }
  }
}
