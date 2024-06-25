import { CANVAS_DIMENSIONS, WALL_WIDTH } from "../constants";

/* The Score class in TypeScript manages and displays scores on a canvas. */
export class Score {
  ctx: CanvasRenderingContext2D;
  score: number;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.score = 0;
  }

  draw(score: number = 0, index: number) {
    this.ctx.fillStyle = "red";
    this.ctx.font = "20px Arial";
    if (index == 0) {
      this.ctx.fillText(
        `Score: ${score}`,
        WALL_WIDTH + 150,
        CANVAS_DIMENSIONS.CANVAS_HEIGHT - 10
      );
    }
    if (index == 1) {
      this.ctx.fillText(
        `Score: ${score}`,
        WALL_WIDTH + 650,
        CANVAS_DIMENSIONS.CANVAS_HEIGHT - 10
      );
    }
  }
}
