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
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(`Score: ${this.score}`, 10, 30);
    //   this.ctx.fillStyle = "white";
    //   this.ctx.font = "22px Arial"
    //   this.ctx.fillText(`High Score : ${this.highScore}`, 10, 60);
  }
}
