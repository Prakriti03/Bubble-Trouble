import { CANVAS_DIMENSIONS, WALL_WIDTH } from "../constants";

export class Score {
  ctx: CanvasRenderingContext2D;
  score: number;
  // highScore : number
  // onScoreIncrement: () => void;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.score = 0;
    //   this.highScore = highScore;
    //   this.onScoreIncrement = onScoreIncrement;
  }

  increment() {
    this.score += 10;
    //   this.onScoreIncrement();
  }

  draw() {
    this.ctx.fillStyle = "red";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(`Score: ${this.score}`, WALL_WIDTH+150, CANVAS_DIMENSIONS.CANVAS_HEIGHT-10);
    //   this.ctx.fillStyle = "white";
    //   this.ctx.font = "22px Arial"
    //   this.ctx.fillText(`High Score : ${this.highScore}`, 10, 60);
  }
}
