import stickyArrow from "/sticky-arrow.png";
import timePowerUp from "/time-powerup.png";
import coinPowerUp from "/coin-powerup.png";
import { CANVAS_DIMENSIONS, GROUND_HEIGHT } from "../constants";
import { POWER_UPS } from "../constants";

/* The PowerUp class in TypeScript represents a power-up object that can be drawn on a canvas and
updated with a specific power-up option. */
export class PowerUp {
  ctx: CanvasRenderingContext2D;
  stickyArrowImg: HTMLImageElement;
  timeImg: HTMLImageElement;
  coinImg: HTMLImageElement;
  posX: number;
  posY: number;
  width: number;
  height: number;
  powerUpOption: number;
  constructor(
    ctx: CanvasRenderingContext2D,
    posX: number,
    posY: number,
    powerUpOption: number
  ) {
    this.ctx = ctx;
    this.stickyArrowImg = new Image();
    this.stickyArrowImg.src = stickyArrow;
    this.timeImg = new Image();
    this.timeImg.src = timePowerUp;
    this.coinImg = new Image();
    this.coinImg.src = coinPowerUp;
    this.posX = posX;
    this.posY = posY;
    this.width = POWER_UPS.WIDTH;
    this.height = POWER_UPS.HEIGHT;
    this.powerUpOption = powerUpOption;
  }
  draw() {
    const POWER_UPS = [this.timeImg, this.coinImg, this.stickyArrowImg];
    this.ctx.beginPath();
    this.ctx.drawImage(
      POWER_UPS[this.powerUpOption],
      this.posX,
      this.posY,
      this.width,
      this.height
    );
    this.ctx.closePath();
  }
  update() {
    if (
      this.posY <
      CANVAS_DIMENSIONS.CANVAS_HEIGHT - GROUND_HEIGHT - this.height
    ) {
      this.posY += 3;
    }
  }
}
