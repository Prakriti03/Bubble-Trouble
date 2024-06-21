import { GROUND_X, GROUND_HEIGHT } from "../constants";
import { CANVAS_DIMENSIONS } from "../constants";
import { WALL_WIDTH } from "../constants";
import groundImage from "/wall.jpg";

export class GroundWalls {
  //need to separate walls from ground class
  posX: number;
  posY: number;
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  groundImg: CanvasImageSource;
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.posX = GROUND_X;
    this.posY = CANVAS_DIMENSIONS.CANVAS_HEIGHT - GROUND_HEIGHT;
    this.width = CANVAS_DIMENSIONS.CANVAS_WIDTH;
    this.height = GROUND_HEIGHT;
    this.groundImg = new Image();
    this.groundImg.src = groundImage;
  }

  draw(level: number) {
    this.ctx.beginPath();
    this.ctx.drawImage(
      this.groundImg,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
    console.log("inside draw!!!")
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.closePath();
    this.drawTexts(
      "Player 1",
      WALL_WIDTH,
      CANVAS_DIMENSIONS.CANVAS_HEIGHT - 10
    );
    this.drawTexts(
      "Level",
      (CANVAS_DIMENSIONS.CANVAS_WIDTH - WALL_WIDTH) / 2,
      CANVAS_DIMENSIONS.CANVAS_HEIGHT - 50
    );
    this.drawTexts(
      "Player 2",
      CANVAS_DIMENSIONS.CANVAS_WIDTH - WALL_WIDTH - 100,
      CANVAS_DIMENSIONS.CANVAS_HEIGHT - 10
    );
    this.drawTexts(
      level.toString(),
      (CANVAS_DIMENSIONS.CANVAS_WIDTH - WALL_WIDTH) / 2 + 25,
      CANVAS_DIMENSIONS.CANVAS_HEIGHT - 10
    );
  }
  
  drawTexts(text: string, posX: number, posY: number) {
    //draw Player 1 text
    this.ctx.font = "24px Luckiest Guy";
    this.ctx.fillStyle = "red";
    const TEXT = text;
    const textMetrics = this.ctx.measureText(TEXT);
    const textWidth = textMetrics.width;
    const textHeight = parseInt(this.ctx.font, 7);
    const PADDING = 7;

    // Calculate the rectangle background dimensions
    const rectX = posX - PADDING;
    const rectY = posY - textHeight - PADDING;
    const rectWidth = textWidth + 2 * PADDING;
    const rectHeight = textHeight + 2 * PADDING;

    // Draw the filled rectangle
    this.ctx.fillStyle = "#D3D3D3"; // Fill color for the rectangle
    this.ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

    // Draw the border for the rectangle
    this.ctx.strokeStyle = "grey";
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);

    // Draw the text inside the rectangle
    this.ctx.fillStyle = "red";
    this.ctx.fillText(TEXT, posX, posY);
  }
}
